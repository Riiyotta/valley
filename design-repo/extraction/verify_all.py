#!/usr/bin/env python3
"""
verify_all.py — self-containment + schema + structural + maxWords + drift
checks, all in one, for the Valley design-repo.

Checks performed, in order:
  1. Schema validation of schema/example.pagespec.json against
     schema/pagespec.schema.json (Draft-07, zero errors required).
  2. Semantic validation of the same example via schema/semantic_validate.py.
  3. Allowlist parity: every id in tokens/llm/component-allowlist.json has a
     matching real file in primitives/, components/, or sections/, and every
     real file in those three folders has an allowlist entry. No phantom
     entries, no orphans.
  4. Citation-range validity: every `measuredFrom`/citation string found
     anywhere under tokens/, primitives/, components/, sections/,
     templates/, compatibility/ that names a `path:line` or `path:line-line`
     pattern is resolved against a real sibling source file (if present) and
     the check fails if a resolvable citation's line range exceeds the real
     file's length. Degrades to a WARNING (not a failure) when the sibling
     source tree isn't present, per BUILD-GUIDE.md 2.7's self-containment
     requirement — this design-repo must remain independently distributable.
  5. Manifest counts-recompute check: recomputes registry.manifest.json's
     `counts` block from the actual files on disk (tokens per category,
     primitives, components, sections, templates, routes) and fails on any
     drift, per MASTER-GUIDE.md 3.16.
  6. Asset-role registry parity: every assetRole referenced in any
     sections/*.json `assetRoles` block exists in
     tokens/llm/asset-role-registry.json, and vice versa (no orphaned or
     undocumented role). Plus the pinned-value rule: roles listed in
     pinnedGenerationPolicyRoles never carry 'may-generate-new' in the registry
     or in any section, and that list matches the schema's assetRef conditional.
  7. No absolute local machine paths anywhere in the repo (a grep-equivalent
     scan for the platform's home-directory path prefix).

Run: python3 extraction/verify_all.py
Exit 0 = every check passed. Exit 1 = at least one check failed.

Path portability: repo root is derived from this file's own location via
os.path.dirname(os.path.abspath(__file__)), never a hardcoded absolute path.
"""
import argparse
import json
import os
import re
import sys

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCHEMA_DIR = os.path.join(REPO_ROOT, "schema")


def load_json(path):
    with open(path) as f:
        return json.load(f)


class Report:
    def __init__(self):
        self.failures = []
        self.warnings = []
        self.passes = []

    def ok(self, msg):
        self.passes.append(msg)
        print(f"PASS: {msg}")

    def fail(self, msg):
        self.failures.append(msg)
        print(f"FAIL: {msg}")

    def warn(self, msg):
        self.warnings.append(msg)
        print(f"WARN: {msg}")

    @property
    def success(self):
        return len(self.failures) == 0


def check_schema_validation(report):
    sys.path.insert(0, SCHEMA_DIR)
    from jsonschema import Draft7Validator

    schema = load_json(os.path.join(SCHEMA_DIR, "pagespec.schema.json"))
    example = load_json(os.path.join(SCHEMA_DIR, "example.pagespec.json"))
    errors = list(Draft7Validator(schema).iter_errors(example))
    if errors:
        for e in errors:
            report.fail(f"schema validation error: {list(e.path)} {e.message}")
    else:
        report.ok("schema/example.pagespec.json validates against schema/pagespec.schema.json with zero errors")


def check_semantic_validation(report):
    sys.path.insert(0, SCHEMA_DIR)
    import semantic_validate

    example = load_json(os.path.join(SCHEMA_DIR, "example.pagespec.json"))
    result = semantic_validate.validate_pagespec(example)
    if result.ok:
        report.ok(f"schema/example.pagespec.json passes semantic_validate.py ({len(result.warnings)} warnings)")
    else:
        for e in result.errors:
            report.fail(f"semantic validation error: {e}")


def check_allowlist_parity(report):
    allowlist = load_json(os.path.join(REPO_ROOT, "tokens", "llm", "component-allowlist.json"))
    real = {
        "primitives": {f[:-5] for f in os.listdir(os.path.join(REPO_ROOT, "primitives")) if f.endswith(".json")},
        "components": {f[:-5] for f in os.listdir(os.path.join(REPO_ROOT, "components")) if f.endswith(".json")},
        "sections": {f[:-5] for f in os.listdir(os.path.join(REPO_ROOT, "sections")) if f.endswith(".json")},
    }
    ok = True
    for category in ("primitives", "components", "sections"):
        listed = set(allowlist.get(category, []))
        actual = real[category]
        phantom = listed - actual
        orphan = actual - listed
        if phantom:
            report.fail(f"allowlist parity ({category}): phantom entries with no matching file: {sorted(phantom)}")
            ok = False
        if orphan:
            report.fail(f"allowlist parity ({category}): real files with no allowlist entry: {sorted(orphan)}")
            ok = False
    if ok:
        report.ok("tokens/llm/component-allowlist.json has 1:1 parity with real primitives/, components/, sections/ files")


CITATION_PATTERN = re.compile(r'([A-Za-z0-9_./-]+\.(?:md|json|css|cjs|js|jsx)):(\d+)(?:-(\d+))?')


def _iter_measured_from_strings(obj):
    """Recursively yield every string value found under any key that looks
    like a citation field (measuredFrom, citation, definedIn) anywhere in a
    loaded JSON structure."""
    if isinstance(obj, dict):
        for k, v in obj.items():
            if k in ("measuredFrom", "citation", "definedIn") and isinstance(v, str):
                yield v
            else:
                yield from _iter_measured_from_strings(v)
    elif isinstance(obj, list):
        for item in obj:
            yield from _iter_measured_from_strings(item)


def check_citation_validity(report, source_root):
    dirs_to_scan = ["tokens", "primitives", "components", "sections", "templates", "compatibility", "extraction"]
    citations_checked = 0
    citations_resolved = 0
    citations_out_of_range = 0
    # A source-root directory existing isn't enough (e.g. a design-repo's own
    # parent folder always exists) — require at least one of the real,
    # specific sibling evidence files/dirs this repo was built from to be
    # present before treating the sibling tree as usable.
    sibling_markers = ["CLONE_SPEC.md", "tailwind.config.cjs", "spec", "src"]
    sibling_present = bool(source_root) and os.path.isdir(source_root) and any(
        os.path.exists(os.path.join(source_root, marker)) for marker in sibling_markers
    )

    for d in dirs_to_scan:
        full_dir = os.path.join(REPO_ROOT, d)
        if not os.path.isdir(full_dir):
            continue
        for root, _, files in os.walk(full_dir):
            for fname in files:
                if not fname.endswith(".json"):
                    continue
                fpath = os.path.join(root, fname)
                try:
                    data = load_json(fpath)
                except Exception:
                    continue
                for s in _iter_measured_from_strings(data):
                    for m in CITATION_PATTERN.finditer(s):
                        citations_checked += 1
                        rel_path, start, end = m.group(1), int(m.group(2)), m.group(3)
                        end = int(end) if end else start
                        if not sibling_present:
                            continue
                        candidate = os.path.join(source_root, rel_path)
                        if not os.path.isfile(candidate):
                            continue
                        citations_resolved += 1
                        try:
                            with open(candidate, "r", errors="ignore") as f:
                                line_count = sum(1 for _ in f)
                        except Exception:
                            continue
                        if end > line_count:
                            citations_out_of_range += 1
                            report.fail(
                                f"citation out of range: '{s}' in {os.path.relpath(fpath, REPO_ROOT)} "
                                f"cites lines up to {end} but {rel_path} only has {line_count} lines"
                            )

    if not sibling_present:
        report.warn(
            f"citation-range-validity: sibling source root '{source_root}' not present — "
            f"{citations_checked} citation strings found but NONE could be resolved/verified. "
            f"This is the expected DEGRADE-GRACEFULLY behavior for a standalone design-repo "
            f"copy with no sibling project tree (BUILD-GUIDE.md 2.7)."
        )
    else:
        if citations_out_of_range == 0:
            report.ok(
                f"citation-range-validity: {citations_resolved}/{citations_checked} citations resolved "
                f"against real sibling files, 0 out of range"
            )


def check_manifest_counts(report):
    manifest_path = os.path.join(REPO_ROOT, "registry.manifest.json")
    manifest = load_json(manifest_path)

    real_counts = {
        "tokenFiles": sum(
            len([f for f in os.listdir(os.path.join(REPO_ROOT, "tokens", sub)) if f.endswith(".json")])
            for sub in ("00-foundation", "10-semantic", "20-component", "30-layout", "themes", "llm")
            if os.path.isdir(os.path.join(REPO_ROOT, "tokens", sub))
        ),
        "primitives": len([f for f in os.listdir(os.path.join(REPO_ROOT, "primitives")) if f.endswith(".json")]),
        "components": len([f for f in os.listdir(os.path.join(REPO_ROOT, "components")) if f.endswith(".json")]),
        "sections": len([f for f in os.listdir(os.path.join(REPO_ROOT, "sections")) if f.endswith(".json")]),
        "templates": len(load_json(os.path.join(REPO_ROOT, "templates", "templates.json"))["templates"]),
    }
    real_counts["routes"] = sum(
        t.get("routeCount", len(t["routes"]))
        for t in load_json(os.path.join(REPO_ROOT, "templates", "templates.json"))["templates"].values()
    )

    claimed = manifest.get("counts", {})
    ok = True
    for key, real_value in real_counts.items():
        claimed_value = claimed.get(key)
        if claimed_value != real_value:
            report.fail(f"manifest counts drift: counts.{key} claims {claimed_value} but real count on disk is {real_value}")
            ok = False
    if ok:
        report.ok(f"registry.manifest.json counts block matches real files on disk exactly: {real_counts}")


def check_asset_role_parity(report):
    """Parity in both directions, plus the pinned-value rule (MASTER-GUIDE.md 3.23).

    Membership in the role enum is not enough for the compliance roles: each one in
    pinnedGenerationPolicyRoles must never carry 'may-generate-new', in the registry or in
    any section contract that uses it, and the pinned list must be the same list the
    schema's assetRef conditional enforces.
    """
    registry = load_json(os.path.join(REPO_ROOT, "tokens", "llm", "asset-role-registry.json"))
    roles = registry["roles"]
    registered_roles = set(roles.keys())
    pinned = set(registry.get("pinnedGenerationPolicyRoles", []))
    used_roles = set()
    weakened_uses = []
    sections_dir = os.path.join(REPO_ROOT, "sections")
    for fname in sorted(os.listdir(sections_dir)):
        if not fname.endswith(".json"):
            continue
        data = load_json(os.path.join(sections_dir, fname))
        for role_key, role_def in data.get("assetRoles", {}).items():
            if isinstance(role_def, dict) and "enum" in role_def:
                used_roles.add(role_def["enum"])
                if role_def["enum"] in pinned and role_def.get("generationPolicy") == "may-generate-new":
                    weakened_uses.append(f"{fname}:{role_key}")

    undocumented = used_roles - registered_roles
    orphaned = registered_roles - used_roles
    if undocumented:
        report.fail(f"asset-role parity: roles used in sections/*.json but missing from asset-role-registry.json: {sorted(undocumented)}")
    elif orphaned:
        report.fail(f"asset-role parity: roles in asset-role-registry.json that no section uses: {sorted(orphaned)}")
    else:
        report.ok(f"asset-role parity: {len(used_roles)} roles, 1:1 between sections/*.json and asset-role-registry.json")

    weakened_registry = sorted(r for r in pinned if roles.get(r, {}).get("generationPolicy") == "may-generate-new")
    schema = load_json(os.path.join(REPO_ROOT, "schema", "pagespec.schema.json"))
    try:
        schema_pinned = set(schema["definitions"]["assetRef"]["allOf"][0]["if"]["properties"]["assetRole"]["enum"])
    except (KeyError, IndexError, TypeError):
        schema_pinned = None
    if pinned - registered_roles:
        report.fail(f"pinned asset roles missing from the registry: {sorted(pinned - registered_roles)}")
    elif weakened_registry:
        report.fail(f"pinned asset roles set to 'may-generate-new' in asset-role-registry.json: {weakened_registry}")
    elif weakened_uses:
        report.fail(f"pinned asset roles set to 'may-generate-new' in section contracts: {weakened_uses}")
    elif schema_pinned != pinned:
        report.fail(f"pinned asset-role list disagrees with the schema's assetRef conditional: registry {sorted(pinned)} vs schema {sorted(schema_pinned or [])}")
    else:
        report.ok(f"pinned asset roles ({len(pinned)}) never allow 'may-generate-new' in the registry or any section, and match the schema's conditional")


ABS_PATH_MARKER = "/" + "Users" + "/"  # built at runtime so this very check script never
# self-triggers as a false positive on its own source describing the pattern it looks for.
ABS_PATH_RE = re.compile(re.escape(ABS_PATH_MARKER) + r"[A-Za-z0-9_.-]+")


def check_no_absolute_paths(report):
    hits = []
    self_path = os.path.abspath(__file__)
    for root, dirs, files in os.walk(REPO_ROOT):
        for fname in files:
            fpath = os.path.join(root, fname)
            try:
                with open(fpath, "r", errors="ignore") as f:
                    for i, line in enumerate(f, 1):
                        if ABS_PATH_RE.search(line):
                            hits.append(f"{os.path.relpath(fpath, REPO_ROOT)}:{i}")
            except Exception:
                continue
    if hits:
        report.fail(f"absolute local machine paths found ({len(hits)}): {hits[:10]}{'...' if len(hits) > 10 else ''}")
    else:
        report.ok("no absolute local machine paths found anywhere in the design-repo")


def check_entrypoints_self_contained(report):
    manifest_path = os.path.join(REPO_ROOT, "registry.manifest.json")
    manifest = load_json(manifest_path)
    entry_points = manifest.get("entryPoints", {})
    flat = []
    if isinstance(entry_points, dict):
        flat = list(entry_points.values())
    elif isinstance(entry_points, list):
        flat = entry_points
    bad = [e for e in flat if isinstance(e, str) and (e.startswith("../") or e.startswith("/"))]
    if bad:
        report.fail(f"registry.manifest.json entryPoints contains paths outside design-repo/: {bad}")
    else:
        report.ok(f"registry.manifest.json's {len(flat)} entryPoints all point inside design-repo/ (no '../' or absolute paths)")


def check_allowlist_version_parity(report):
    manifest = load_json(os.path.join(REPO_ROOT, "registry.manifest.json"))
    allowlist = load_json(os.path.join(REPO_ROOT, "tokens", "llm", "component-allowlist.json"))
    if manifest.get("allowlistVersion") != allowlist.get("allowlistVersion"):
        report.fail(
            f"allowlistVersion drift: manifest says '{manifest.get('allowlistVersion')}' but "
            f"component-allowlist.json says '{allowlist.get('allowlistVersion')}'"
        )
    else:
        report.ok(f"registry.manifest.json's allowlistVersion matches component-allowlist.json's own version ('{manifest.get('allowlistVersion')}')")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--source-root",
        default=os.path.join(os.path.dirname(REPO_ROOT)),
        help="Sibling source project root used to resolve citations (default: design-repo's parent directory). "
             "If absent, citation checks degrade to warnings.",
    )
    args = parser.parse_args()

    report = Report()
    print("=== 1. Schema validation ===")
    check_schema_validation(report)
    print("\n=== 2. Semantic validation ===")
    check_semantic_validation(report)
    print("\n=== 3. Allowlist parity (drift-proofed) ===")
    check_allowlist_parity(report)
    print("\n=== 4. Citation-range validity (drift-proofed, degrades gracefully) ===")
    check_citation_validity(report, args.source_root)
    print("\n=== 5. Manifest counts-recompute (drift-proofed) ===")
    check_manifest_counts(report)
    print("\n=== 6. Asset-role registry parity ===")
    check_asset_role_parity(report)
    print("\n=== 7. No absolute local machine paths ===")
    check_no_absolute_paths(report)
    print("\n=== 8. Manifest entryPoints self-containment ===")
    check_entrypoints_self_contained(report)
    print("\n=== 9. Allowlist version parity ===")
    check_allowlist_version_parity(report)

    print(f"\n{len(report.passes)} passed, {len(report.warnings)} warnings, {len(report.failures)} failed")
    sys.exit(0 if report.success else 1)


if __name__ == "__main__":
    main()
