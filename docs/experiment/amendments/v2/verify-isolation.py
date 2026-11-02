#!/usr/bin/env python3
"""Verify frozen preparation artifacts without running an implementation."""
import argparse
import hashlib
import json
from pathlib import Path
import subprocess

ROOT = Path(__file__).resolve().parents[2]
VERSION = Path(__file__).resolve().parent


def git(worktree, *args):
    return subprocess.check_output(["git", "-C", str(worktree), *args])


def tree(worktree, revision):
    result = {}
    for entry in git(worktree, "ls-tree", "-rz", revision).split(b"\0"):
        if not entry:
            continue
        metadata, path = entry.split(b"\t", 1)
        mode, kind, oid = metadata.decode().split()
        result[path.decode()] = {"mode": mode, "kind": kind, "oid": oid}
    return result


def verify(condition=None):
    settings = json.loads((VERSION / "runtime-settings.json").read_text())
    manifest = json.loads((ROOT / "preparation/manifest.json").read_text())
    amended = json.loads((VERSION / "manifest.json").read_text())
    assert hashlib.sha256((ROOT / "preparation/manifest.json").read_bytes()).hexdigest() == amended["historicalManifestSha256"], "Historical manifest changed"
    for name, expected in amended["filesSha256"].items():
        assert hashlib.sha256((ROOT / name).read_bytes()).hexdigest() == expected, "Amendment drift: " + name
    for name, expected in manifest["frozenFilesSha256"].items():
        assert hashlib.sha256((ROOT / name).read_bytes()).hexdigest() == expected, name
    for name, expected in manifest.get("sharedLocalSourcesSha256", {}).items():
        assert hashlib.sha256(Path(name).read_bytes()).hexdigest() == expected, "Shared skill or policy changed: " + name
    assert hashlib.sha256((Path.home() / ".codex/config.toml").read_bytes()).hexdigest() == settings["userConfigSha256"], "User config changed"
    assert subprocess.check_output([settings["codexBinary"], "--version"], text=True).strip() == settings["cliVersion"], "CLI version changed"
    assert hashlib.sha256(Path(settings["codexBinary"]).read_bytes()).hexdigest() == manifest["codexBinarySha256"], "CLI binary changed"
    for command, expected in [("node", "v26.11.0"), ("npm", "11.20.0")]:
        assert subprocess.check_output([command, "--version"], text=True).strip() == expected, command
    trees = {}
    for name, value in settings["conditions"].items():
        worktree = Path(value["worktree"])
        commit = value["configurationCommit"]
        assert git(worktree, "rev-parse", commit + "^").decode().strip() == settings["baseline"], name
        base = tree(worktree, settings["baseline"])
        configured = tree(worktree, commit)
        changed = sorted(p for p in base.keys() | configured.keys() if base.get(p) != configured.get(p))
        assert changed == ["AGENTS.md"], (name, changed)
        if name == "control":
            assert "AGENTS.md" not in configured
        else:
            assert git(worktree, "show", commit + ":AGENTS.md") == (ROOT / "preparation/treatment-agents.md").read_bytes()
        trees[name] = configured
        if condition is None or name == condition:
            assert git(worktree, "rev-parse", "HEAD").decode().strip() == commit, name
            assert git(worktree, "branch", "--show-current").decode().strip() == value["branch"], name
            assert not git(worktree, "status", "--porcelain"), name + " worktree dirty"
            for parent in [worktree, *worktree.parents]:
                for filename in ["AGENTS.md", "AGENTS.override.md", "CLAUDE.md"]:
                    path = parent / filename
                    if name == "treatment" and parent == worktree and filename == "AGENTS.md":
                        continue
                    assert not path.exists(), "Unexpected instruction file: " + str(path)
            for filename in ["AGENTS.md", "AGENTS.override.md"]:
                global_file = Path.home() / ".codex" / filename
                accepted = amended.get("acceptedGlobalInstructionFiles", {}).get(str(global_file))
                if accepted is not None:
                    assert global_file.is_file() and hashlib.sha256(global_file.read_bytes()).hexdigest() == accepted, "Global instructions changed: " + str(global_file)
                    assert global_file.read_bytes() == b"", "Only the audited empty global file is allowed"
                else:
                    assert not global_file.exists(), filename
    a, b = trees["control"], trees["treatment"]
    differences = [p for p in sorted(a.keys() | b.keys()) if a.get(p) != b.get(p)]
    assert differences == ["AGENTS.md"], differences
    return {"baseline": settings["baseline"], "differences": differences, "checkedPristineCondition": condition or "both", "verified": True, "protocolVersion": "2.0", "model": settings["model"], "reasoningEffort": settings["reasoningEffort"]}


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--condition", choices=["control", "treatment"], help="Check only this worktree is pristine; frozen configuration trees are always compared")
    args = parser.parse_args()
    print(json.dumps(verify(args.condition), indent=2))
