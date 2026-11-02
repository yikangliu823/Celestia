# Experimental protocol

## Research question

Does providing project-specific AGENTS.md instructions improve Codex's
implementation of a validated birth-input form when both conditions start from
the same application scaffold?

## Conditions and baseline

Control removes the repository-level `AGENTS.md` and adds no replacement, hidden
task guidance, or implementation. Treatment replaces that file with concise
instructions grounded in the existing product requirements and architecture.
It contains no solution code or complete design for Issue #3. Both branches are
direct children of `03573c23532fa94715844284b8e16a6bf864c9a6`; all other tracked
files have identical Git blob IDs and contents. Commit IDs, branch names, worktree
paths, and the `.git` indirection differ by necessity.

PR #15 was already merged before this preparation. Its source tree matches the
reviewed scaffold commit `0c3331fd629725157be7c128da19a44cf8212631`. It added only
the scaffold, checks, and related documentation. Existing product requirements
remain; status statements reflect the scaffold. Main's `AGENTS.md` is unchanged.

## Controlled variables

| Variable | Frozen choice / evidence |
| --- | --- |
| Source baseline | `03573c23532fa94715844284b8e16a6bf864c9a6` |
| Model alias | `gpt-6-astra`; observed in user configuration and bundled CLI catalog |
| Reasoning | `medium`, explicitly overridden for both runs |
| Model snapshot, seed, temperature | Not available; null, not inferred |
| Client | `/Applications/ChatGPT.app/Contents/Resources/codex`, `codex-cli 0.153.4` |
| Prompt | Exact bytes of `implementation-prompt.md`; SHA-256 in manifest |
| Instructions | Treatment snapshot frozen now; never revised from Control outcomes |
| Dependencies | Baseline package.json and package-lock.json, independently installed with npm ci |
| Runtime | Same macOS host, Node 26.11.0, npm 11.20.0; actual platform in runtime.json |
| Tools and permissions | CLI shell/editor tools, workspace-write, approval never, shell network enabled for baseline tooling/IPC, web search disabled; shared overrides in runtime-settings.json |
| External integrations | Plugins/apps, configured MCP servers, hooks, memories, and shell snapshots disabled by shared overrides; diagnostic still exposes common generic skills |
| Sessions | New CLI exec session per condition; no resume, fork, previous transcript, or this preparation conversation |
| Verification | npm ci; npm run typecheck; npm run lint; npm test; npm run build |
| Evaluation | Same independent case suite and review rubric; implementation-authored tests reported separately |
| Intervention | No discretionary coaching or fixes; rules below |
| Execution order | Preselected once before outcomes in preparation/order.json |

`runtime-settings.json` is authoritative for launch arguments. The diagnostic
establishes rendered instruction input, not the full remote system prompt, actual
model weights, or every server-side tool decision. At execution record observed
metadata; never replace unavailable model information with guessed values.

## Human intervention and execution policy

Run sequentially, using the frozen order, with no concurrent development in any
worktree. Do not show either session the other output. Supply only the frozen
prompt on stdin, and ordinary Codex startup context. No treatment file is pasted
into Control, and no experimental labels are included in the prompt.

If the agent requests product clarification, do not supply an ad hoc answer to
one condition. Record it. The frozen task instructs reporting ambiguities; if a
clarification is necessary to proceed, pause both conditions and define a new
shared prompt/protocol version before restarting both from their configurations.
Do not silently repair code, dependencies, or failed tests. Record every human
message or environmental action with an actual timestamp and rationale.

No arbitrary wall-clock or token cutoff is imposed; usage/service failures end
that attempt and are reported as incomplete, not as a product failure. Do not
rerun an unfavorable result selectively. A genuinely invalid infrastructure run
requires a documented common restart policy and owner approval, retaining the
failed attempt. Never overwrite its logs.

## Confounders and controls

- **Global and parent instructions:** inspected; no AGENTS.md or AGENTS.override.md
  found above either worktree or in the Codex home. Current user config has no
  custom instruction string or instruction-file override. Record its hash and
  stop if it changes before either run. Generic built-in/user skills persist
  equally in the rendered inputs; this is not an instruction-free model.
- **Framework generation:** baseline `agentRules: false` prevents automatic
  Next.js instruction creation. Do not change it.
- **Conversation contamination:** this preparation session has seen all conditions.
  It must never execute either implementation. Fresh exec sessions are required.
- **Shared disk and Git:** worktrees isolate tracked working files, but share Git
  objects/refs and host read access. The frozen prompt forbids other worktrees,
  branches, history, and external application repositories. This is a behavioral
  control, not a filesystem read-isolation guarantee. Inspect command transcripts;
  cross-condition reads invalidate the comparison and must be reported.
- **Caches and local artifacts:** npm cache and host load are shared. Dependencies
  are installed independently, with equal resolved versions. Preparation build
  artifacts are removed symmetrically before the freeze. Do not treat duration
  differences as pure model effects; record cache and runtime context.
- **Configuration/tools:** fixed launch settings and identical generic prompt text
  were checked with a no-inference diagnostic. Execution-time context can still
  vary. Capture it; stop on model, CLI, permission, or instruction drift.
- **Services and order:** model service, network latency, load, quota, and alias
  updates remain uncertain. Preselect order and run close in time; record times.
  Shell network access is enabled because the unchanged tsx smoke test needs local
  IPC and the tested socket-only allowance failed. Native web search is disabled.
  Network availability and incidental external requests remain confounders;
  capture requests/commands and prohibit unsupported data transmission.
- **Task ambiguity:** the calculation interface dependency is absent. Exact chart
  inputs, calendars, date limits, location resolution, DST policy, submission route,
  and success behavior are unspecified. Do not invent scoring rules after seeing
  results. Score decidable requirements; mark unresolved behavior not scorable.
- **Evaluator bias:** use the frozen case IDs, test both with synthetic data, and
  review anonymized diffs if practical. Log any inability to blind condition identity.

## Limitations and readiness

This evaluates one implementation task. The scaffold was developed beforehand.
Codex retains system-level instructions in both conditions. A single run per
condition cannot establish a generalizable causal effect; generated code may
vary because of stochastic model behavior. This design does not eliminate all
confounding variables, and does not claim a stable model snapshot is available.

Preparation can be complete while execution still awaits owner approval. The
scoped comparison of explicit Issue #3 requirements can run with ambiguities
reported as outcomes. A definitive evaluation of every chart-input or submission
behavior is blocked until product requirements and the calculation contract are
specified. Do not claim those behaviors are verified.
