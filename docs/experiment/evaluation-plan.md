# Preregistered evaluation plan

## Sources and scope

Use the frozen Issue #3 snapshot, baseline product requirements, and architecture.
The independent suite is `evaluation/cases.json`; it is prepared before either
implementation and kept outside both implementation branches. It is a reproducible
manual black-box and source-review suite, not an executable browser harness.
No test results have been collected. Do not claim automated independent coverage.

Baseline `npm test` currently contains one render smoke test. Tests subsequently
written by Codex are implementation-authored evidence and must be reported
separately from this independent suite. They cannot establish correctness alone.

## Requirements that are not specified

Issue #3 names date, time, location/timezone, and other required chart inputs, but
neither it nor the product documents define the calculation interface, calendar
system, additional demographic fields, year limits, supported location set,
location-to-timezone mapping, ambiguous/nonexistent local times, default timezone,
route, submit destination, or success UI. There is no backend in the baseline.

Evaluate required-field labeling, errors, calendar/time validity where applicable,
privacy, keyboard use, tests, and consistency with the documented scope. Do not
award or deduct product correctness points for a choice among unspecified policies.
Record assumptions and whether they were disclosed. Cases needing an undefined
oracle are `not_scorable`, with a reason, not pass/fail. If requirements are later
clarified, freeze a new common suite before restarting both conditions.

## Common procedure

1. Keep this suite unavailable to implementation sessions. After both complete,
   record final commit/tree IDs and preserve diffs from each configuration commit.
2. In each worktree run the same five package commands. Preserve full stdout,
   stderr, exit codes, and timestamps separately from the agent's own test runs.
3. Start each app on localhost:3000 sequentially. Use the same browser version,
   viewport (1280x800 and 390x844), zoom, locale, timezone, and fresh browser context.
   Record actual versions; never invent a browser or assistive-technology version.
4. Locate the form via public UI. Record its path and map visible labels to logical
   date/time/location/timezone fields without inspecting treatment identity. The
   suite imposes no input widget or component structure. If there is no form, mark
   presence failed and dependent interactions blocked rather than silently skip.
5. Apply every case in cases.json in order, with synthetic data only. Use a fresh
   form state where stated. Capture the action, observation, status, and artifact
   reference for each case. Native browser validation is acceptable when actionable
   and accessible; an error need not use a prescribed sentence or visual style.
6. Review source, server output, browser console, network requests, storage, and
   accessibility tree. Record exact supporting file/line or artifact references.
   Distinguish observed absence of leakage from an exhaustive privacy guarantee.
7. Review diffs using the rubric below. Prefer anonymized A/B identifiers; disclose
   whether full blinding was possible. Do not change criteria after seeing code.

## Outcomes and rubric

For each independent case use `pass`, `fail`, `blocked`, `not_scorable`, or
`not_run`. Aggregate only decidable cases and show the denominator. No fabricated
percentages, coverage, or combined causal score. Keep functional, accessibility,
privacy, and code-review outcomes separate.

Code review uses `meets`, `partly_meets`, `does_not_meet`, or `not_assessable`, each
with evidence: type safety; focused components; independently testable validation;
maintainability; absence of unnecessary abstractions/dependencies; architecture
consistency; explicit treatment of unsupported assumptions. Do not score conformity
to treatment wording itself; judge common engineering outcomes.

Privacy/security failures include observed logging of synthetic birth values,
unauthorized persistence or external transmission, committed real data/secrets,
and unsafe handling that violates the common requirements. No scientific predictive
claims should be introduced. Framework asset traffic alone is not personal-data
transmission.

## Process metrics

Use actual raw events and command logs to count test invocations, failures, and
human interventions. An invocation is a test process started, not each assertion.
Report evaluator test runs separately. A debugging iteration is an observable
failure-to-edit-to-recheck cycle; document the exact grouping or leave it null.
Duration runs from subprocess start to exit, with pauses recorded separately.
File/line counts compare configuration commit to final implementation, excluding
external evidence. Failed/skipped/blocked checks remain visible. Unknown metrics
stay null; do not infer effort or reasoning quality from transcript length.
