# Final experiment report

Status: PARTIAL. Both independent implementations completed and remain frozen.
All required command checks passed, including a separate independent post-freeze
verification. Browser evaluation remains incomplete. Current global configuration
drift is recorded and rejected by the integrity guard; no new fingerprint was approved.

## Configuration

| Item | Frozen value |
| --- | --- |
| Repository | yikangliu823/Celestia |
| Common application baseline | 03573c23532fa94715844284b8e16a6bf864c9a6 |
| Control configuration | 85cdbb0c597a6f00f9feac3bf4cb9620f139fb46 |
| Treatment configuration | 96d1af2fb056066376eccc3e66f66a500c70df71 |
| Approved pre-execution evidence | f6757bb0e00c6f7aeb2bb23f47f5c64b641d6164 |
| Model / effort observed in both local CLI contexts | gpt-6-astra / high |
| Frozen prompt SHA-256 | 0ad96dc539a2696b973d9f5cd470fb146cf16366c135f84f071cd9dcf4fd286b |
| Frozen evaluation-plan SHA-256 | b5db16ce0aacdb82f643791d8dbc50f869d018e5309c357dacbe1415437ea508 |

Both actual sessions used identical runtime arguments except the result destination,
the approved workspace-write/network-enabled sandbox, and approval never. Their
cwd and session IDs differed. No immutable remote model snapshot is known. Original
Medium/Extra High history and the approved common High amendment remain intact.

## Implementations and process

| Item | Control | Treatment |
| --- | --- | --- |
| Implementation commit | b9c5635a66c373276efda99c07e315a63812fec0 | 5fd6e6cb0f29ee472bac25be2ebfd6a2f1e40d34 |
| Branch | experiment/no-agent-instructions | experiment/with-agent-instructions |
| Worktree | /Users/richardlau/Development/Celestia-experiment-control | /Users/richardlau/Development/Celestia-experiment-treatment |
| Session ID | 01a19afb-b965-7a70-b700-19ecc53be035 | 01a19af3-458d-7973-8178-ced55b2e9d99 |
| Duration | 383.797 seconds | 438.082 seconds |
| Files changed | 10 | 10 |
| Agent test invocations / failed test invocations | 2 / 0 | 2 / 0 |
| Coordinator test invocations | 2: pre-freeze and post-freeze | 2: pre-freeze and post-freeze |
| Final test count | 52 passed | 15 passed |
| Debugging cycles | 0 | 1, typecheck failure corrected |
| Human implementation interventions | 0 | 0 |
| Detected contamination events | 0 | 0 |
| Completion state | Implementation frozen; evaluation partial | Implementation frozen; evaluation partial |

Both changed the same ten paths: README.md; docs/architecture.md;
docs/product-requirements.md; docs/birth-input-verification.md; src/app/page.tsx;
src/app/globals.css; src/components/birth-input-form.tsx; src/lib/birth-input.ts;
tests/birth-input-form.test.tsx; tests/birth-input.test.tsx. No dependency,
manifest, lockfile, framework configuration or frozen instruction changes occurred.
The coordinator committed the agents' output without code edits. Both worktrees
and main are clean and still match their recorded commits.

For each condition, npm ci, npm run typecheck, npm run lint, npm test and npm run
build exited 0 in both coordinator verification sets. Complete stdout, stderr,
timestamps and exit codes are in each condition's test-results.txt,
evaluation-test-results.txt and corresponding evidence JSON files. No test was
silently retried to improve an implementation outcome. The second coordinator set
fulfills the plan's independent verification after both snapshots were frozen.

Installation still reports 18 moderate development-tool findings, ESLint deprecation
and install-script warnings. Control's extra audit recorded zero production findings
at that time; this is not an exhaustive security guarantee. No dependency fix was made.

## Independent evaluation

| Count | Control | Treatment |
| --- | --- | --- |
| Total frozen checks | 24 | 24 |
| Applicable by scope | 22 | 22 |
| Assessed applicable denominator, PASS + FAIL | 10 | 4 |
| PASS | 10 | 4 |
| FAIL | 0 | 0 |
| N/A | 2 | 2 |
| UNVERIFIED | 12 | 18 |

N/A is limited to location-policy and DST-policy checks with no applicable frozen
oracle. UNVERIFIED is missing evidence, never a failure or pass. Individual results,
targets, reasons and evidence references are in ../../control/evaluation-results.json,
../../treatment/evaluation-results.json and evaluation-results.md.

The initial Control browser session supported a limited set of functional checks.
A missing-time/zone batch remains ambiguous because cleared values were not verified;
fresh-state reproduction failed at the browser tool. Treatment's initial accessible
labels were observed, but native interaction failed. Keyboard, responsive layout,
runtime privacy and remaining applicable checks need a reliable browser environment.
No screen-reader result, screenshot, complete browser version/context control, or
full Issue #3 acceptance is claimed. The unequal coverage prevents a quality ranking.

Source review found no material common code-quality defect in either implementation.
Control trims whitespace and revalidates edited inputs; Treatment rejects whitespace,
narrows unknown values and clears old field errors until resubmission. Both keep
validation independent of React, add no dependencies, and disclose missing chart/DST
requirements. Control additionally investigates dependency warnings; Treatment gives
broader malformed-input handling. These are observed tradeoffs, not causal findings.

## Integrity and limitations

Final integrity: 59/60 checks pass. Frozen inputs, Treatment AGENTS.md, Control's
absence of project instructions, main baseline, implementation trees, raw transcript
hashes and recorded runtime equivalence remain intact. The sole failed check is the
current global config fingerprint: approved bfff10908e1fcdeb84e0e7ecdc2a2219ac3d65b350afee2a77233aebc9645899,
observed c0471c3e8bca852b4ef63bfc88ad833aa1b962b3a989e31dd628219cd2eafaff.
Its recorded mtime is after both freezes. Changes concern desktop/plugin/browser
runtime configuration; no model/effort line changed in the compared files. Both
launch-time checks passed, but the writer and full change history are unknown.
The current environment is not approved for another implementation run.

No cross-condition access appeared in recorded commands or changes. Full filesystem
read isolation was unavailable, so transcript auditing cannot prove perfect isolation.
Other limits include one run per condition, unblinded review, sequential execution
and possible cache effects, unknown sampling/model snapshot, shared task guidance,
underspecified product requirements and unequal browser coverage. More tests, code,
time or Treatment compliance is not automatically better engineering quality.

## Deliverables and remaining work

Evidence worktree: /Users/richardlau/Development/Celestia-experiment-evidence.
Evidence branch: codex/experiment-protocol. The evidence commit is the commit
containing this report; its exact SHA is reported in the coordinator's final response.

- Comparison: /Users/richardlau/Development/Celestia-experiment-evidence/docs/experiment/comparison.md
- Reflection: /Users/richardlau/Development/Celestia-experiment-evidence/docs/experiment/reflection.md
- Source review: code-review.md
- Full scoring table: evaluation-results.md
- Isolation/drift audit: isolation-audit.md and final-integrity.json
- Browser observations and limitations: browser-tool-transcript.json and browser-limitations.md
- Raw sessions, command outputs, diffs and metrics: ../../control and ../../treatment

Remaining work: restore and document equivalent browser evaluation conditions;
reproduce Control F03 and finish each UNVERIFIED check on these frozen commits;
review configuration drift before further dependent execution. A repeat of the
implementation experiment would require renewed authorization. No implementation
rerun, push, PR, merge, issue closure or main-worktree modification occurred.
