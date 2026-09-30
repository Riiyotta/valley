#!/usr/bin/env python3
"""
Semantic validator for a Valley PageSpec.

Enforces everything JSON Schema draft-07 structurally cannot express:
  1. basedOnTemplate cross-reference: the PageSpec's declared `template` must
     match its `nodes[]` sequence against that template's REAL node list in
     templates/templates.json — not just validate nodes[] in isolation. This
     is the single most repeated bug class across every prior design-repo
     build (MASTER-GUIDE.md 3.3) and is deliberately the first real check
     this script performs.
  2. Route-to-template restrictions declared by individual section contracts
     (routeRestriction field in sections/*.json), e.g. homeRouteOnly-style
     rules.
  3. Rhythm rules from compatibility/graph.json, respecting each rule's
     declared severity ("error" fails the run, "warn" only prints a notice).
  4. Required reducedMotionFallback presence (also schema-enforced, checked
     again here for defense in depth and clearer error messages).
  5. Per-instance maxWords budgets, read from each section's real contract
     file in sections/*.json — not just checked on the bundled example.
  6. Pinned-value fields (assetRef generationPolicy for compliance-critical
     roles, and any content field carrying a `const` in the schema, e.g.
     third-party form/booking endpoints) — re-verified here independently of
     the schema's own `const` keyword, so a script bug in one layer doesn't
     silently defeat the other.

Path portability: the repo root is derived from this file's own location,
never a hardcoded absolute path, so this script works identically wherever
the design-repo folder is copied.
"""
import json
import os
import re
import sys

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCHEMA_DIR = os.path.join(REPO_ROOT, "schema")
SECTIONS_DIR = os.path.join(REPO_ROOT, "sections")
TEMPLATES_PATH = os.path.join(REPO_ROOT, "templates", "templates.json")
GRAPH_PATH = os.path.join(REPO_ROOT, "compatibility", "graph.json")
ASSET_REGISTRY_PATH = os.path.join(REPO_ROOT, "tokens", "llm", "asset-role-registry.json")


def load_json(path):
    with open(path, "r") as f:
        return json.load(f)


def word_count(text):
    if not isinstance(text, str):
        return 0
    return len(re.findall(r"\S+", text))


class ValidationResult:
    def __init__(self):
        self.errors = []
        self.warnings = []

    def error(self, msg):
        self.errors.append(msg)

    def warn(self, msg):
        self.warnings.append(msg)

    @property
    def ok(self):
        return len(self.errors) == 0


def _collect_maxwords(schema_fragment, path=""):
    """Recursively collect (jsonpath, maxWords) pairs from a section content schema."""
    out = []
    if not isinstance(schema_fragment, dict):
        return out
    if "maxWords" in schema_fragment:
        out.append((path, schema_fragment["maxWords"]))
    props = schema_fragment.get("properties")
    if isinstance(props, dict):
        for key, sub in props.items():
            out.extend(_collect_maxwords(sub, f"{path}.{key}" if path else key))
    items = schema_fragment.get("items")
    if isinstance(items, dict):
        out.extend(_collect_maxwords(items, f"{path}[]"))
    return out


def _get_by_path(obj, path):
    """Fetch nested value(s) for a dotted/bracket jsonpath produced by _collect_maxwords.
    Returns a list of found string values (handles [] array expansion)."""
    if obj is None:
        return []
    parts = re.findall(r"[^.\[\]]+|\[\]", path)
    current = [obj]
    for part in parts:
        nxt = []
        if part == "[]":
            for c in current:
                if isinstance(c, list):
                    nxt.extend(c)
        else:
            for c in current:
                if isinstance(c, dict) and part in c:
                    nxt.append(c[part])
        current = nxt
    return current


def validate_pagespec(pagespec, verbose=True):
    result = ValidationResult()

    templates = load_json(TEMPLATES_PATH)["templates"]
    graph = load_json(GRAPH_PATH)["rules"]
    asset_registry = load_json(ASSET_REGISTRY_PATH)["roles"]

    template_id = pagespec.get("template")
    nodes = pagespec.get("nodes", [])
    node_sections = [n.get("section") for n in nodes]

    # --- 1. Template cross-reference (the #1 repeated bug class) ---
    if template_id not in templates:
        result.error(f"Unknown template '{template_id}' — not present in templates/templates.json")
    else:
        tpl = templates[template_id]
        real_sections = [n["section"] for n in tpl["nodes"]]
        real_required = {n["section"] for n in tpl["nodes"] if n.get("required")}
        real_repeatable = {n["section"] for n in tpl["nodes"] if n.get("repeatable")}

        # Every required, non-repeatable section in the template must appear exactly once.
        for sec in real_sections:
            tpl_node = next(n for n in tpl["nodes"] if n["section"] == sec)
            count = node_sections.count(sec)
            if tpl_node.get("required") and count == 0:
                result.error(f"Template '{template_id}' requires section '{sec}' but it is missing from nodes[]")
            if not tpl_node.get("repeatable") and count > 1:
                result.error(f"Section '{sec}' appears {count} times but template '{template_id}' marks it non-repeatable")

        # Every section actually present must be one the template allows.
        for sec in set(node_sections):
            if sec not in real_sections:
                result.error(f"Section '{sec}' is not part of template '{template_id}''s real node list (templates/templates.json) — PageSpec contradicts its own declared template")

        # required/repeatable flags on each node must match the template's own declaration.
        for n in nodes:
            sec = n.get("section")
            if sec in real_sections:
                tpl_node = next(t for t in tpl["nodes"] if t["section"] == sec)
                if n.get("required") != tpl_node.get("required"):
                    result.error(f"Node '{sec}' declares required={n.get('required')} but template '{template_id}' declares required={tpl_node.get('required')}")
                if n.get("repeatable") != tpl_node.get("repeatable"):
                    result.error(f"Node '{sec}' declares repeatable={n.get('repeatable')} but template '{template_id}' declares repeatable={tpl_node.get('repeatable')}")

    # --- 2. Route restrictions from each section's own contract ---
    route = pagespec.get("route", "")
    route_restriction_map = {
        "aboutRouteOnly": lambda r: r == "/about",
        "productRouteOnly": lambda r: r == "/product",
        "pricingRouteOnly": lambda r: r == "/pricing",
        "playbooksRouteOnly": lambda r: r == "/playbooks",
        "blogIndexOnly": lambda r: r == "/blog",
        "casestudiesIndexOnly": lambda r: r == "/casestudies",
        "casestudyDetailOnly": lambda r: r.startswith("/casestudies/") and r != "/casestudies",
        "legalRoutesOnly": lambda r: r in ("/terms-of-service", "/privacy-policy"),
        "landingSeoTemplateOnly": lambda r: r in (
            "/linkedin-lead-generation-for-b2b-saas",
            "/lead-generation-for-software-companies",
            "/lead-generation-for-content-agencies",
        ),
        "agencyLandingOnly": lambda r: r == "/linkedin-outreach-for-agencies",
        "tryvalleyOnly": lambda r: r == "/tryvalley",
        "automationOnly": lambda r: r == "/linkedin-automation",
        "tryvalleyOrAutomationOnly": lambda r: r in ("/tryvalley", "/linkedin-automation"),
    }
    for sec in set(node_sections):
        contract_path = os.path.join(SECTIONS_DIR, f"{sec}.json")
        if not os.path.exists(contract_path):
            result.error(f"Section '{sec}' referenced by PageSpec has no contract file at sections/{sec}.json")
            continue
        contract = load_json(contract_path)
        restriction = contract.get("constraints", {}).get("routeRestriction")
        if restriction and restriction in route_restriction_map:
            if not route_restriction_map[restriction](route):
                result.error(f"Section '{sec}' has routeRestriction '{restriction}' which route '{route}' violates")

    # --- 3. Compatibility graph rhythm rules ---
    hero_sections = set()
    no_hero_templates = set()
    for rule in graph:
        if rule["id"] == "ONE_HERO_PER_PAGE":
            hero_sections = set(rule["heroSections"])  # driven entirely by compatibility/graph.json, never hardcoded here
            no_hero_templates = set(rule.get("exemptTemplates", []))
        if rule["id"] == "SHELL_MUST_BOOKEND":
            exempt = set(rule.get("exemptTemplates", []))
            pre_nav_exceptions = rule.get("preNavExceptions", {})
            allowed_pre_nav = pre_nav_exceptions.get(template_id, [])
            if template_id not in exempt:
                first_real_index = 0
                while first_real_index < len(node_sections) and node_sections[first_real_index] in allowed_pre_nav:
                    first_real_index += 1
                if not node_sections or first_real_index >= len(node_sections) or node_sections[first_real_index] != "shell.navbar":
                    _emit(result, rule["severity"], "SHELL_MUST_BOOKEND: first node (after any declared pre-nav exception) must be shell.navbar")
                if not node_sections or node_sections[-1] != "shell.footer":
                    _emit(result, rule["severity"], "SHELL_MUST_BOOKEND: last node must be shell.footer")
        if rule["id"] == "CLOSING_CTA_NOT_ON_LANDING":
            exempt = set(rule.get("exemptTemplates", []))
            landing_templates = {
                "template.landing-seo-template", "template.landing-agency",
                "template.landing-tryvalley", "template.landing-automation",
            }
            if template_id in landing_templates and template_id not in exempt:
                if "closing-cta.form" in node_sections:
                    _emit(result, rule["severity"], "CLOSING_CTA_NOT_ON_LANDING: closing-cta.form must never appear on a landing template")
        if rule["id"] == "REDUCED_MOTION_FALLBACK_REQUIRED":
            for n in nodes:
                motion = n.get("motion", {})
                if not motion.get("reducedMotionFallback"):
                    _emit(result, rule["severity"], f"Node '{n.get('section')}' is missing a non-empty motion.reducedMotionFallback")

    if hero_sections and template_id not in no_hero_templates:
        present_heroes = [s for s in node_sections if s in hero_sections]
        if len(present_heroes) == 0:
            result.error(f"ONE_HERO_PER_PAGE: template '{template_id}' requires exactly one hero section, found none")
        elif len(present_heroes) > 1:
            result.error(f"ONE_HERO_PER_PAGE: template '{template_id}' has {len(present_heroes)} hero sections: {present_heroes}")

    # --- 4. Per-instance maxWords, read from each section's REAL contract ---
    for n in nodes:
        sec = n.get("section")
        contract_path = os.path.join(SECTIONS_DIR, f"{sec}.json")
        if not os.path.exists(contract_path):
            continue
        contract = load_json(contract_path)
        content_schema = contract.get("content", {})
        pairs = _collect_maxwords(content_schema)
        for jpath, limit in pairs:
            values = _get_by_path(n.get("content"), jpath)
            for v in values:
                if isinstance(v, str):
                    wc = word_count(v)
                    if wc > limit:
                        result.error(f"Node '{sec}' field '{jpath}' is {wc} words, exceeds maxWords={limit}")

    # --- 5. Pinned-value checks (compliance-critical, not just enum membership) ---
    for n in nodes:
        sec = n.get("section")
        for ref in n.get("assetRefs", []) or []:
            role = ref.get("assetRole")
            policy = ref.get("generationPolicy")
            reg = asset_registry.get(role)
            if reg and role in {"customer-logo", "competitor-logo", "customer-photo", "employee-photo", "author-photo"}:
                if policy == "may-generate-new":
                    result.error(
                        f"PINNED-VALUE VIOLATION: node '{sec}' assetRole '{role}' has generationPolicy "
                        f"'may-generate-new', but this role is pinned to a non-generative policy "
                        f"(tokens/llm/asset-role-registry.json pinnedGenerationPolicyRoles)"
                    )
        content = n.get("content", {})
        contract_path = os.path.join(SECTIONS_DIR, f"{sec}.json")
        contract = load_json(contract_path) if os.path.exists(contract_path) else {}
        content_schema_props = contract.get("content", {}).get("properties", {})
        if isinstance(content, dict):
            for key, field_schema in content_schema_props.items():
                # A field schema carrying a real `const` in the section contract itself is
                # PINNED, independent of any prose note — this is the authoritative source,
                # not a substring match against pinnedValueNote's free text.
                if isinstance(field_schema, dict) and "const" in field_schema and key in content:
                    expected = field_schema["const"]
                    actual = content[key]
                    if actual != expected:
                        result.error(
                            f"PINNED-VALUE VIOLATION: node '{sec}' field '{key}' = '{actual}' does not match "
                            f"the required pinned value '{expected}' declared in sections/{sec}.json"
                        )

    return result


def _emit(result, severity, msg):
    if severity == "error":
        result.error(msg)
    else:
        result.warn(msg)


def main():
    if len(sys.argv) < 2:
        print("Usage: semantic_validate.py <pagespec.json>")
        sys.exit(2)
    pagespec = load_json(sys.argv[1])
    result = validate_pagespec(pagespec)
    for w in result.warnings:
        print(f"WARN: {w}")
    for e in result.errors:
        print(f"ERROR: {e}")
    if result.ok:
        print(f"OK: {sys.argv[1]} passed semantic validation ({len(result.warnings)} warnings)")
        sys.exit(0)
    else:
        print(f"FAIL: {sys.argv[1]} failed semantic validation ({len(result.errors)} errors)")
        sys.exit(1)


if __name__ == "__main__":
    main()
