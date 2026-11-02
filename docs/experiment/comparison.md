# Celestia controlled experiment comparison

Status: PARTIAL. Both independent implementation runs completed and were frozen.
All five coordinator verification commands passed for each. Browser evaluation is
incomplete and unequal, and the final global configuration fingerprint has drifted.
No implementation was rerun or repaired after evaluation began.

## Setup and evidence

Common application baseline: `03573c23532fa94715844284b8e16a6bf864c9a6`.
Control configuration: `85cdbb0c597a6f00f9feac3bf4cb9620f139fb46`.
Treatment configuration: `96d1af2fb056066376eccc3e66f66a500c70df71`.
Approved evidence before execution: `f6757bb0e00c6f7aeb2bb23f47f5c64b641d6164`.
Both actual local CLI contexts recorded `gpt-6-astra`, reasoning `high`, approval
`never`, and the same network-enabled workspace sandbox. Original Medium/Extra
High history and the approved common High amendment remain intact in amendments/v2.
Only Treatment had the frozen repository AGENTS.md. Both received identical prompt
bytes and shared tooling. Read isolation used the approved transcript-audit fallback.

The exact launch records, effective-config checks, instruction audit and dependency
inventory are in [execution/approved-v2](execution/approved-v2). Raw agent events,
commands, outputs, freezes and observed contexts are in each condition's `evidence/`.
The coordinator performed no implementation code edits and provided no coaching.

## Implementation and engineering process

| Observation | Control | Treatment |
| --- | --- | --- |
| Frozen implementation | `b9c5635a66c373276efda99c07e315a63812fec0` | `5fd6e6cb0f29ee472bac25be2ebfd6a2f1e40d34` |
| Branch | experiment/no-agent-instructions | experiment/with-agent-instructions |
| Execution order | Second | First |
| Session duration, subprocess start to exit | 383.797 seconds | 438.082 seconds |
| Changed files | 10 | 10 |
| Agent test process invocations | 2 | 2 |
| Failed automated test invocations | 0 | 0 |
| Final implementation-authored test count | 52 | 15 |
| Coordinator test invocations (pre-freeze + independent post-freeze) | 2 | 2 |
| Failure/edit/recheck cycles | 0 | 1, TS2322 corrected |
| Human implementation messages / clarification answers | 0 / 0 | 0 / 0 |
| Observed contamination events | 0 | 0 |
| New dependencies | 0 | 0 |

Both changed README.md, docs/architecture.md, docs/product-requirements.md,
docs/birth-input-verification.md, src/app/page.tsx, src/app/globals.css,
src/components/birth-input-form.tsx, src/lib/birth-input.ts,
tests/birth-input-form.test.tsx and tests/birth-input.test.tsx. Application manifests,
lockfiles, framework configuration and the original smoke test were unchanged.
The coordinator committed the agents' output without repairs before evaluation.

Control's initial 51 tests and later 52 tests all passed. The additional test
checked validator console calls. Treatment's 15 tests passed on both attempts;
many group multiple fixture values within one test. Counts are not coverage scores.
Treatment's first typecheck failed, followed by an observed edit and passing
recheck (event lines 30:34:38). Control's nonzero commands were two no-match rg
searches and an npm audit finding report, not failed tests or code debugging cycles.
All raw failures remain visible in the execution logs and metrics.

## Functional quality and verification

| Independent evaluation count | Control | Treatment |
| --- | --- | --- |
| Total frozen checks | 24 | 24 |
| Applicable by scope, including unavailable evidence | 22 | 22 |
| Assessed applicable denominator, PASS + FAIL | 10 | 4 |
| PASS | 10 | 4 |
| FAIL | 0 | 0 |
| N/A: undefined location/DST policy | 2 | 2 |
| UNVERIFIED | 12 | 18 |

See [all 24 results](execution/approved-v2/evaluation-results.md),
[Control details](control/evaluation-results.json),
[Treatment details](treatment/evaluation-results.json), and
[browser limitations](execution/approved-v2/browser-limitations.md).
Unavailable evidence is not a failure or a pass. These unequal denominators do not
support a comparative pass-rate conclusion. Zero demonstrated failures does not
establish complete correctness or Issue #3 acceptance.

Observed: Control's early browser session displayed usable fields, actionable
empty-submit errors, rejection of an impossible date, correction to a valid leap
day, and acceptance of a complete synthetic entry. Both initial accessibility
trees named required controls. A Control missing-time/zone batch produced ambiguous
success observations without independently verified cleared values; F03 remains
UNVERIFIED. The attempted fresh-form repeat was blocked by browser failure. This
anomaly must be resolved, not explained away as definitely an automation issue.

Observed from source/tests: both use Gregorian date, minute-precision local time
and an explicitly entered runtime-supported IANA zone or UTC. Neither calculates
an instant, chart or DST disambiguation. Both disclose the missing calculation
contract and avoid inventing demographic inputs or unsupported product year limits.
Control trims whitespace and revalidates after editing once submission has been
attempted. Treatment rejects whitespace and clears an edited field's old error
until resubmission. Those unspecified policy choices do not determine a winner.

Both passed npm ci, npm run typecheck, npm run lint, npm test and npm run build
under coordinator verification. Their complete outputs are in control/test-results.txt
and treatment/test-results.txt; the separate independent post-freeze runs are in
each condition’s evaluation-test-results.txt and also passed all five commands. Browser keyboard, responsive layout, focus correction,
runtime privacy and most edge cases remain unverified; static tests are not substitutes.

## Engineering quality, privacy and instruction compliance

The [independent source review](execution/approved-v2/code-review.md) documents every
preregistered rubric dimension. Both separate validation from a focused client form,
use typed results, avoid new dependencies and speculative services, and retain the
existing architecture boundaries. No material code-quality defect was demonstrated.
Control's stale architecture sentence about experimental branches and its README's
unverified keyboard-accessibility wording are documentation caveats. Treatment's
broader unknown-input guard is useful if reused at an untyped boundary, but no such
server boundary exists here; it does not prove superior current behavior.

Both collect only the provisional required fields and use synthetic fixtures.
Source review found no input logging, network or persistence calls. P03 passed;
P01/P02 remain UNVERIFIED because complete runtime console/storage/network evidence
was unavailable. There is no exhaustive privacy or accessibility guarantee.

Both retained the frozen instruction configuration, stayed in scope, documented
assumptions and verification limits, and used English without CLAUDE.md or imported
application code. Treatment read its AGENTS.md; Control had no Celestia project
instruction file. These are instruction-loading/compliance observations, separate
from independent quality outcomes. Shared prompt and product documents already
carried substantial guidance, so Control was not an unguided condition.

Both installations reported 18 moderate development dependency findings, ESLint
deprecation and allowScripts warnings. Control additionally audited the unchanged
dependency graph and recorded zero production findings at that time. Treatment
recorded the warnings without that extra audit. Neither applied dependency fixes.
The extra investigation is observed process behavior, not proof of a causal effect.

## Uncertainty and supported conclusions

Observed: final frozen inputs, application baseline, both implementation trees and
raw execution artifact hashes remain intact. Main and both implementation worktrees
are clean. The global config fingerprint now differs from the approved value; its
mtime is after both freezes. [Final integrity](execution/approved-v2/final-integrity.json)
preserves the failed guard, and [isolation audit](execution/approved-v2/isolation-audit.md)
records its interpretation. It was not silently repaired or approved.

Inference: both agents independently converged on a modest, locally validated
form with similar architecture and clear scope limitations. Treatment's defensive
input narrowing and Control's extra dependency audit offer different engineering
tradeoffs. Neither's advantage in user-facing behavior is established.

Hypotheses only: repository instructions may influence validation defensiveness or
documentation detail; model sampling, the shared prompt, existing documents and
run order could explain the same differences. This experiment cannot separate them.

Limitations: one run per condition; no fixed seed or immutable remote model snapshot;
unblinded review; sequential execution with possible warm caches; shared Git objects
and filesystem reads not fully blocked; no exhaustive OS read trace; unstable
browser tools, incomplete metadata/context control and unequal evaluation coverage;
post-freeze desktop/global configuration drift; ambiguous product requirements.
Duration, test counts and instruction compliance do not establish causal quality gains.

Supported conclusion: both sessions produced buildable, scoped implementations,
but the evidence does not establish that Treatment outperformed Control or that
either satisfies every acceptance criterion. Complete the remaining browser checks
against these frozen commits after restoring a documented evaluation environment.
Any new implementation run requires renewed configuration review and authorization.
No branch was pushed or merged, no PR created, and no issue status was changed.
