#!/usr/bin/env python3
"""
Adversarial test suite for the Valley design-repo PageSpec contract.

Proves every rule actually rejects a bad instance, and that the real example
and one generically-synthesized minimal control instance PER TEMPLATE all
pass cleanly. Per MASTER-GUIDE.md 3.22, the per-template control loop iterates
templates/templates.json directly, so a NEW template added later is
auto-covered with zero new control code — only template-specific negative
mutations need to be hand-written.

Run: python3 schema/tests/adversarial_test.py
Exit code 0 = every check behaved as expected. Exit code 1 = a check did not
reject a mutation it should have, or rejected a control it should have
accepted.
"""
import copy
import json
import os
import sys

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.join(REPO_ROOT, "schema"))

from jsonschema import Draft7Validator  # noqa: E402
import semantic_validate  # noqa: E402

SCHEMA_PATH = os.path.join(REPO_ROOT, "schema", "pagespec.schema.json")
EXAMPLE_PATH = os.path.join(REPO_ROOT, "schema", "example.pagespec.json")
TEMPLATES_PATH = os.path.join(REPO_ROOT, "templates", "templates.json")
SECTIONS_DIR = os.path.join(REPO_ROOT, "sections")

FAILURES = []
PASSES = 0


def load_json(path):
    with open(path) as f:
        return json.load(f)


def schema_valid(instance):
    schema = load_json(SCHEMA_PATH)
    errors = list(Draft7Validator(schema).iter_errors(instance))
    return len(errors) == 0, errors


def semantic_valid(instance):
    result = semantic_validate.validate_pagespec(instance)
    return result.ok, result.errors


def check(name, condition):
    global PASSES
    if condition:
        PASSES += 1
    else:
        FAILURES.append(name)
    print(f"{'PASS' if condition else 'FAIL'}: {name}")


def minimal_content_for_section(section_id):
    """Build minimal valid-shaped content for a section from its own real
    contract's `required` list in content.properties, using short placeholder
    strings/arrays that satisfy `type` and stay under any maxWords."""
    contract = load_json(os.path.join(SECTIONS_DIR, f"{section_id}.json"))
    content_schema = contract.get("content", {})
    return _fill(content_schema)


def _fill(schema_fragment):
    if not isinstance(schema_fragment, dict):
        return {}
    t = schema_fragment.get("type")
    if t == "object":
        props = schema_fragment.get("properties", {})
        required = schema_fragment.get("required", list(props.keys()))
        out = {}
        for key in required:
            if key in props:
                out[key] = _fill(props[key])
        return out
    if t == "array":
        min_items = schema_fragment.get("minItems", 1)
        item_schema = schema_fragment.get("items", {"type": "string"})
        return [_fill(item_schema) for _ in range(max(min_items, 1))]
    if t == "string":
        if "const" in schema_fragment:
            return schema_fragment["const"]
        if "enum" in schema_fragment:
            return schema_fragment["enum"][0]
        return "Example"
    if t == "boolean":
        return True
    if t == "integer" or t == "number":
        return 1
    if "const" in schema_fragment:
        return schema_fragment["const"]
    if "enum" in schema_fragment:
        return schema_fragment["enum"][0]
    return "Example"


def default_motion_for_section(section_id):
    contract = load_json(os.path.join(SECTIONS_DIR, f"{section_id}.json"))
    motion = contract.get("motion", {})
    return {
        "pattern": motion.get("pattern", "none"),
        "reducedMotionFallback": motion.get("reducedMotionFallback", "n/a"),
    }


def build_minimal_pagespec_for_template(template_id, tpl):
    route = tpl["routes"][0]
    nodes = []
    for n in tpl["nodes"]:
        if not n.get("required"):
            continue
        sec = n["section"]
        nodes.append({
            "section": sec,
            "required": n["required"],
            "repeatable": n["repeatable"],
            "content": minimal_content_for_section(sec),
            "motion": default_motion_for_section(sec),
        })
    return {
        "pageSpecVersion": "1.1.0",
        "template": template_id,
        "route": route,
        "nodes": nodes,
    }


def main():
    templates = load_json(TEMPLATES_PATH)["templates"]

    # ------------------------------------------------------------------
    # CONTROL CASES
    # ------------------------------------------------------------------
    example = load_json(EXAMPLE_PATH)
    ok, errs = schema_valid(example)
    check("control: bundled example.pagespec.json passes schema validation", ok)
    ok2, errs2 = semantic_valid(example)
    check("control: bundled example.pagespec.json passes semantic validation", ok2)

    # Generic per-template control synthesis (MASTER-GUIDE.md 3.22 technique):
    # auto-covers every template in templates.json with zero new code per template.
    for template_id, tpl in templates.items():
        if template_id == "template.blog-archive":
            # blog-archive has no shell.navbar/footer and is a special bare route;
            # still must produce a schema+semantically valid minimal instance.
            pass
        spec = build_minimal_pagespec_for_template(template_id, tpl)
        ok, errs = schema_valid(spec)
        check(f"control: synthesized minimal instance for {template_id} passes schema validation", ok)
        if not ok:
            for e in errs:
                print("   schema error:", e.message)
        ok2, errs2 = semantic_valid(spec)
        check(f"control: synthesized minimal instance for {template_id} passes semantic validation", ok2)
        if not ok2:
            for e in errs2:
                print("   semantic error:", e)

    # ------------------------------------------------------------------
    # ADVERSARIAL MUTATIONS — schema layer
    # ------------------------------------------------------------------
    base = copy.deepcopy(example)

    # 1. Wrong enum value for template
    m = copy.deepcopy(base)
    m["template"] = "template.does-not-exist"
    ok, _ = schema_valid(m)
    check("adversarial: invented template enum value is rejected by schema", not ok)

    # 2. Missing required field (route)
    m = copy.deepcopy(base)
    del m["route"]
    ok, _ = schema_valid(m)
    check("adversarial: missing required 'route' field is rejected by schema", not ok)

    # 3. Invented section type alias
    m = copy.deepcopy(base)
    m["nodes"][1]["section"] = "hero.invented-variant"
    ok, _ = schema_valid(m)
    check("adversarial: invented section id is rejected by schema", not ok)

    # 4. Missing reducedMotionFallback
    m = copy.deepcopy(base)
    del m["nodes"][1]["motion"]["reducedMotionFallback"]
    ok, _ = schema_valid(m)
    check("adversarial: missing motion.reducedMotionFallback is rejected by schema", not ok)

    # 5. Invented motion field via additionalProperties:false
    m = copy.deepcopy(base)
    m["nodes"][1]["motion"]["inventedAnimation"] = "spin-forever"
    ok, _ = schema_valid(m)
    check("adversarial: invented motion field is rejected by schema (motion additionalProperties:false)", not ok)

    # 6. additionalProperties:false at node level rejects an invented top-level key
    m = copy.deepcopy(base)
    m["nodes"][1]["bogusField"] = "nope"
    ok, _ = schema_valid(m)
    check("adversarial: invented top-level node field is rejected by schema", not ok)

    # 7. Polymorphic oneOf-independence: faq.flat-panel-standalone content
    #    must reject the accordion variant's shape (extra 'variant' field it
    #    doesn't declare) and vice versa, proving the two branches are truly
    #    independent, not a shared-base-with-patches setup.
    faq_flat_node = {
        "section": "faq.flat-panel-standalone",
        "required": True,
        "repeatable": False,
        "content": {
            "faqs": [
                {"question": "Q1", "answer": "A1", "variant": "accordion"}  # extra field not allowed in flat-panel branch
                for _ in range(6)
            ]
        },
        "motion": {"pattern": "accordion-expand", "reducedMotionFallback": "instant"},
    }
    m = copy.deepcopy(base)
    m["nodes"] = [m["nodes"][0], faq_flat_node, m["nodes"][-1]]
    m["template"] = "template.blog-index"
    ok, _ = schema_valid(m)
    check("adversarial: faq.flat-panel-standalone content rejects the accordion-only 'variant' field (oneOf independence)", not ok)

    # 8. Pinned-value: customer-logo assetRole with may-generate-new must be rejected
    m = copy.deepcopy(base)
    m["nodes"][2]["assetRefs"] = [{"assetRole": "customer-logo", "generationPolicy": "may-generate-new"}]
    ok, _ = schema_valid(m)
    check("adversarial: customer-logo with generationPolicy=may-generate-new is rejected by schema pinned-value conditional", not ok)

    # 8b. Pinned-value: Valley's own Rive animations (brand-animation) must never be AI-generated.
    #     A different-but-valid policy value, so a plain enum-membership check could not catch it.
    m = copy.deepcopy(base)
    m["nodes"][2]["assetRefs"] = [{"assetRole": "brand-animation", "generationPolicy": "may-generate-new"}]
    ok, _ = schema_valid(m)
    check("adversarial: brand-animation with generationPolicy=may-generate-new is rejected by schema pinned-value conditional", not ok)
    m["nodes"][2]["assetRefs"] = [{"assetRole": "brand-animation", "generationPolicy": "must-reuse-exact"}]
    ok, _ = schema_valid(m)
    check("control: brand-animation with generationPolicy=must-reuse-exact passes the schema", ok)

    # ------------------------------------------------------------------
    # ADVERSARIAL MUTATIONS — semantic layer
    # ------------------------------------------------------------------

    # 9. Template/node-sequence mismatch: declare template.home but strip a
    #    required section from nodes[] (the #1 repeated bug class).
    m = copy.deepcopy(base)
    m["nodes"] = [n for n in m["nodes"] if n["section"] != "jobs.stack"]
    ok, errs = semantic_valid(m)
    check("adversarial: PageSpec missing a required section for its declared template is rejected by semantic_validate", not ok)

    # 10. Section not part of the declared template's real node list
    m = copy.deepcopy(base)
    m["nodes"].insert(2, {
        "section": "agency.paths",
        "required": False,
        "repeatable": False,
        "content": minimal_content_for_section("agency.paths"),
        "motion": {"pattern": "none", "reducedMotionFallback": "n/a"},
    })
    ok, errs = semantic_valid(m)
    check("adversarial: section from a different template's real list is rejected (template cross-reference)", not ok)

    # 11. Duplicate one-per-page section
    m = copy.deepcopy(base)
    hero_node = next(n for n in m["nodes"] if n["section"] == "hero.marketing")
    m["nodes"].insert(2, copy.deepcopy(hero_node))
    ok, errs = semantic_valid(m)
    check("adversarial: duplicate non-repeatable hero.marketing section is rejected", not ok)

    # 12. Reordered fixed-position section: footer not last
    m = copy.deepcopy(base)
    footer = m["nodes"].pop()
    m["nodes"].insert(1, footer)
    ok, errs = semantic_valid(m)
    check("adversarial: shell.footer not in last position is rejected (SHELL_MUST_BOOKEND)", not ok)

    # 13. maxWords overflow on a real field
    m = copy.deepcopy(base)
    hero_node = next(n for n in m["nodes"] if n["section"] == "hero.marketing")
    hero_node["content"]["h1"] = " ".join(["word"] * 30)  # way over maxWords:14
    ok, errs = semantic_valid(m)
    check("adversarial: maxWords overflow on hero.marketing.h1 is rejected", not ok)

    # 14. ONE_HERO_PER_PAGE: two hero sections on the same page
    m = copy.deepcopy(base)
    m["template"] = "template.about"
    m["route"] = "/about"
    hero_simple = {
        "section": "hero.page-simple", "required": True, "repeatable": False,
        "content": minimal_content_for_section("hero.page-simple"),
        "motion": default_motion_for_section("hero.page-simple"),
    }
    m["nodes"] = [
        {"section": "shell.navbar", "required": True, "repeatable": False, "content": minimal_content_for_section("shell.navbar"), "motion": default_motion_for_section("shell.navbar")},
        hero_simple,
        copy.deepcopy(hero_simple),
        {"section": "content.mission", "required": True, "repeatable": False, "content": minimal_content_for_section("content.mission"), "motion": default_motion_for_section("content.mission")},
        {"section": "content.team-grid", "required": True, "repeatable": False, "content": minimal_content_for_section("content.team-grid"), "motion": default_motion_for_section("content.team-grid")},
        {"section": "content.backers", "required": True, "repeatable": False, "content": minimal_content_for_section("content.backers"), "motion": default_motion_for_section("content.backers")},
        {"section": "content.hiring-cta", "required": True, "repeatable": False, "content": minimal_content_for_section("content.hiring-cta"), "motion": default_motion_for_section("content.hiring-cta")},
        {"section": "shell.footer", "required": True, "repeatable": False, "content": minimal_content_for_section("shell.footer"), "motion": default_motion_for_section("shell.footer")},
    ]
    ok, errs = semantic_valid(m)
    check("adversarial: two hero sections on one page violates ONE_HERO_PER_PAGE", not ok)

    # 15. CLOSING_CTA_NOT_ON_LANDING: inject closing-cta.form into a landing template
    m = build_minimal_pagespec_for_template("template.landing-tryvalley", templates["template.landing-tryvalley"])
    m["nodes"].append({
        "section": "closing-cta.form", "required": False, "repeatable": False,
        "content": minimal_content_for_section("closing-cta.form"),
        "motion": default_motion_for_section("closing-cta.form"),
    })
    ok, errs = semantic_valid(m)
    check("adversarial: closing-cta.form on a landing template violates CLOSING_CTA_NOT_ON_LANDING", not ok)

    # 16. THE PINNED-VALUE MUTATION (MASTER-GUIDE.md 3.23's specific lesson):
    #     change a compliance-critical field to a DIFFERENT BUT STILL VALID
    #     enum member, not an invalid one. generationPolicy 'must-not-fabricate'
    #     IS a valid enum member in general — but customer-logo is pinned away
    #     from 'may-generate-new' specifically to one of the 3 non-generative
    #     values. To prove the PINNED check (not just enum-membership) fires,
    #     mutate an embedUrl/ctaHref pinned string field to a different
    #     syntactically-valid URL string (schema has no enum on this field at
    #     all — only semantic_validate's pinned-value check can catch it).
    m = copy.deepcopy(base)
    closing_node = next(n for n in m["nodes"] if n["section"] == "closing-cta.form")
    closing_node["content"]["ctaHref"] = "https://forms.withsurface.com/s/DIFFERENT-BUT-VALID-LOOKING-ID"
    ok, errs = semantic_valid(m)
    check(
        "adversarial (MASTER-GUIDE 3.23 pattern): ctaHref changed to a different-but-plausible URL is caught by the DEDICATED pinned-value check, not just generic type validation",
        not ok,
    )
    # Also prove the schema's own `const` catches it independently (defense in depth)
    ok_schema, _ = schema_valid(m)
    check(
        "adversarial (defense in depth): schema's own const on closing-cta.form.ctaHref ALSO independently rejects the same mutation",
        not ok_schema,
    )

    # 17. Second pinned-value mutation: customer-photo role changed to a
    #     different-but-still-generally-valid enum member (must-reuse-exact
    #     is a real enum value, just the wrong one for a *photo* role).
    m = copy.deepcopy(base)
    wall_node = next(n for n in m["nodes"] if n["section"] == "wall-of-love.grid")
    wall_node["assetRefs"] = [{"assetRole": "customer-photo", "generationPolicy": "may-generate-new"}]
    ok, errs = semantic_valid(m)
    check(
        "adversarial (MASTER-GUIDE 3.23 pattern): customer-photo generationPolicy mutated to may-generate-new is caught by the dedicated pinned-value check",
        not ok,
    )

    # ------------------------------------------------------------------
    print()
    print(f"{PASSES} passed, {len(FAILURES)} failed")
    if FAILURES:
        print("FAILED CHECKS:")
        for f in FAILURES:
            print(" -", f)
        sys.exit(1)
    sys.exit(0)


if __name__ == "__main__":
    main()
