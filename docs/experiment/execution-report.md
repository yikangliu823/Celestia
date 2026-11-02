# Execution report: BLOCKED

The owner authorized both runs. Neither run started. The final preflight at
2026-11-02T06:00:08.739780+00:00 exited 1 with
`AssertionError: User config changed`. Per the owner's material-preflight stop
rule, execution stopped before either fresh implementation session was launched.

## Frozen configuration

- Baseline: `03573c23532fa94715844284b8e16a6bf864c9a6`.
- Control configuration: `85cdbb0c597a6f00f9feac3bf4cb9620f139fb46`.
- Treatment configuration: `96d1af2fb056066376eccc3e66f66a500c70df71`.
- Model: `gpt-6-astra`; reasoning: `medium`; CLI: `codex-cli 0.153.4`.
- Prompt SHA-256: `0ad96dc539a2696b973d9f5cd470fb146cf16366c135f84f071cd9dcf4fd286b`.
- Evaluation-plan SHA-256: `b5db16ce0aacdb82f643791d8dbc50f869d018e5309c357dacbe1415437ea508`.
- Frozen execution order: Treatment, then Control. No run was executed.
- Sandbox: original workspace-write configuration, network enabled, approvals
  never, integrations and web search disabled. It was not changed.

## Blocker and evidence

`~/.codex/config.toml` no longer matches the frozen fingerprint:

- Expected: `24edc21f3f5c8ba44bc9697e92923601f5bd68325e787c25cf4a5984f1ecbd11`.
- Observed: `bfff10908e1fcdeb84e0e7ecdc2a2219ac3d65b350afee2a77233aebc9645899`.

The current model and reasoning keys still read `gpt-6-astra` and `medium`.
The exact changed keys and cause are not established: the preparation archive
contains a fingerprint and audit, not a complete historical configuration copy.
The config was not edited or silently accepted by this task. See
[raw verifier output](execution/preflight-isolation.json) and
[final status](execution/blocked-status.json).

All original frozen repository artifacts and the supplemental scoring freeze
still match their hashes. Main and both experimental worktrees are clean and
remain at their original SHAs. No Issue #3 implementation or implementation commit
exists; no GitHub issue state, merge, or push was performed during this attempt.

## Completed preparation

All 24 existing evaluation checks were audited before any implementation. Their
IDs, categories and original criteria remain unchanged. A supplemental
[scoring audit](evaluation/scoring-audit.json) defines observable pass/fail rules
and evidence for each check; [clarifications](evaluation/scoring-clarifications.md)
explain undefined behavior, blocked prerequisites, unverified evidence and the
applicable denominator. Their hashes were frozen in
[evaluation-freeze.json](execution/evaluation-freeze.json).

A startup-input diagnostic performed earlier in this attempt showed no
Celestia-specific instruction block in Control, the frozen block in Treatment,
and equal normalized remaining role/text input. This was a no-inference
preflight observation, not proof that the later drift is harmless. Its private
raw outputs remain under `private/input-audit-20261102T055400626195Z/`.

An additional outer sandbox denied prohibited reads, but failed to compose with
the approved Codex sandbox in both conditions. Full read isolation is therefore
not established. See [probe outputs](execution/sandbox-probes.json) and
[limitations](execution/isolation-limitations.md). These are setup probes, not
implementation checks or evidence of application failures.

## Outcomes and remaining work

| Measurement | Control | Treatment |
| --- | --- | --- |
| Implementation SHA | Not created | Not created |
| Application files changed | 0 | 0 |
| Execution duration | Not available; not started | Not available; not started |
| Implementation test attempts | 0 | 0 |
| Implementation debugging iterations | 0 | 0 |
| Implementation human interventions | 0 | 0 |
| Independent checks executed | 0 of 24 | 0 of 24 |
| Unverified checks | 24 | 24 |
| PASS / FAIL | 0 / 0 | 0 / 0 |
| Applicable-check count | Not assessed | Not assessed |
| Pass rate | Not calculated | Not calculated |

No contamination event was observed because neither implementation session ran.
There are no functional or engineering outcomes to compare, and no evidence for
an advantage of either condition. Preparation checks recorded earlier remain
historical scaffold results; they are not Issue #3 implementation verification.

Resolve the global configuration drift before proceeding: restore the verified
original environment, or explicitly approve and record a revised common protocol
with a newly audited configuration for both conditions. Then repeat preflight.
Both implementations, their verification/commits, browser evaluation, and the
outcome comparison remain unperformed. No condition was silently rerun.
