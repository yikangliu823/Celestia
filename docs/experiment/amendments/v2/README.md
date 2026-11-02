# Protocol 2.0 readiness: READY

Recorded at 2026-11-02T06:15:59.860594+00:00. No experimental implementation session has
started. This amendment requires fresh owner authorization before execution.
Use the version 2 entry points here; the original version 1 artifacts are
historical and remain unchanged, including their former BLOCKED report.

## Configuration and history

| Setting | Verified observation |
| --- | --- |
| Original experiment setting | `gpt-6-astra`, `medium`, explicit CLI overrides |
| Original global default | `gpt-6-astra`, `medium` in preparation audit |
| User-reported previous effort | Extra High; confirmed in preparation-task context records |
| Current preparation-task effort | High in task context records |
| Current global default | `gpt-6-astra`, `medium`; not rewritten |
| Approved common experiment setting | `gpt-6-astra`, `high` |
| Verified resolved client setting | `gpt-6-astra`, `high` for both, origin `sessionFlags` |

Original global configuration fingerprint:
`24edc21f3f5c8ba44bc9697e92923601f5bd68325e787c25cf4a5984f1ecbd11`.

Newly accepted global configuration fingerprint:
`bfff10908e1fcdeb84e0e7ecdc2a2219ac3d65b350afee2a77233aebc9645899`.

Protocol 2.0 SHA-256:
`70190846f2f6453258851bb3739f61444114552582d44c97137f1bec80a03edc`.

The task's Extra High-to-High change and the planned CLI's Medium setting are
different configuration scopes. An unrelated project-trust entry was added to the
global file; the reasoning-effort change alone does not explain its hash change.
No full original file exists in the retained evidence, so the complete historical
delta remains unknown. Current full resolved configurations are equal and audited;
there is no unresolved material difference between the two current conditions.

A newly observed global AGENTS.md is exactly zero bytes. The first renewed
preflight rejected its presence. The revised guard accepts only its exact empty
hash, and the actual startup-input audit shows no extra project instructions.
Neither the user's global config nor that file was edited.

## Verification evidence

- [Effective configuration](effective-config.json): strict app-server config/read
  and requirements queries from both worktrees; full equality, High, correct model,
  session-flag origins, identical sandbox and disabled integrations. No thread or
  model turn was started.
- [Instruction audit](input-audit.json): Control has zero Celestia blocks; Treatment
  has the exact frozen block. Normalized remaining role/text inputs are equal.
- [Worktree checks](worktree-verification.json): both configurations are direct
  children of baseline `03573c23532fa94715844284b8e16a6bf864c9a6`; tracked app/tests/
  manifests and installed dependency trees are identical; all three worktrees clean.
- [Preflight](preflight-results.json): version 2 passes, both runner no-approval
  guards block execution, and synthetic comment-only and material global changes
  are rejected. The historical version 1 still rejects the newer fingerprint.
- [Initial renewed failure](preflight-initial-failure.json): empty global AGENTS.md
  finding, retained rather than erased.
- [Final readiness snapshot](readiness.json): no changes to any original frozen
  input, shared prompt, 24 evaluation checks or scoring clarifications; no runs.

Integrity checks remain strict. Both harmless-looking and material byte changes
stop execution until classified and reverified. See [protocol](protocol.md) for
the renewal policy and [manifest](manifest.json) for all accepted input hashes.

## Relevant files added

All additions are under `docs/experiment/amendments/v2/`: this readiness report,
protocol and manifest, runtime settings, fingerprints/history/model records,
versioned isolation/input/runner procedures and the effective-configuration audit,
plus actual verification outputs. Original reports, scripts, runtime settings,
Treatment AGENTS.md, source branches and evaluation criteria are unchanged.

## Revalidate without implementation

From the evidence worktree:

```sh
python3 docs/experiment/amendments/v2/verify-isolation.py
python3 docs/experiment/amendments/v2/audit-inputs.py
python3 docs/experiment/amendments/v2/verify-effective-config.py
```

Do not invoke the implementation runner with approval until the owner separately
authorizes execution. Its version 2 copy selects these settings and reruns the
isolation, startup-input and resolved-config checks before any future model call.

Readiness verifies the local client's configuration, not future remote inference
availability or an immutable model snapshot. Shared Git/read access, generic
instructions, caches and the documented audit fallback remain experimental limits.
No strict filesystem isolation or implementation result is claimed.

## Resumed completion verification

The accepted zero-byte `~/.codex/AGENTS.md` SHA-256 is
`e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`.
The [guard test](global-instruction-guard-test.json) injects synthetic nonempty
bytes in memory and confirms rejection without editing the real global file.
[Resumed isolation](resumed-isolation.json),
[instruction loading](resumed-input-audit.json), and
[resolved configuration](resumed-effective-config.json) all exited 0.
The [final resumed snapshot](resumed-readiness.json) records clean original
worktrees, unchanged frozen inputs and zero implementation attempts.
