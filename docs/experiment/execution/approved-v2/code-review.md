# Independent source and verification review

Reviewed after both freezes, without editing implementation code. Review was not
blinded: paths and branch identities were visible. References below are relative
to each frozen implementation SHA; the full diffs are control/git-diff.patch and treatment/git-diff.patch relative
to docs/experiment. Judgments are limited source-review findings, not proof
of browser operation or an exhaustive defect search.

| Rubric dimension | Control | Treatment |
| --- | --- | --- |
| Type safety | Meets: typed three-string input, typed field errors and discriminated result in src/lib/birth-input.ts. Call site supplies typed React state. Strict typecheck passed. | Meets: unknown input narrowed by object/property/type checks, typed errors and discriminated result in src/lib/birth-input.ts. Strict typecheck passed after the documented TS2322 repair. |
| Focused components | Meets: src/components/birth-input-form.tsx owns local state, validation feedback and focus; BirthInputFields extracts field markup for reuse in static tests. | Meets: one focused form component owns local state, feedback and refs; a small field metadata array avoids repeated markup. |
| Independently testable validation | Meets: React-independent Gregorian/time/Intl timezone validator; executed fixed synthetic assertions in tests/birth-input.test.tsx. | Meets: same separation and testable calendar/time/zone policies, including malformed unknown values and no coercion. |
| Maintainability | Partly meets: explicit field metadata and correction logic; inherited docs/architecture.md still incorrectly says no experimental branches exist. README describes keyboard accessibility although runtime keyboard checks were not performed; detailed verification document discloses that limitation. These are documentation caveats, not demonstrated material feature defects. | Meets: documented provisional contract, clear errors, explicit format limits and validation narrowing; updateField removes an edited field's error until next submit. That timing choice is permitted by the criteria but needs browser validation. |
| Unnecessary complexity/dependencies | Meets: no new packages or configuration changes, no speculative service layer. Hydration gate prevents native pre-handler submission; an effect schedules Control error focus. | Meets: no new packages or service layers. Same hydration guard; refs focus first error directly during submit. Neither focus implementation is assumed to work solely from inspection. |
| Architecture consistency | Meets: page integrates a client form; no chart engine, server input API, authentication, persistence or AI. Validation remains separate from UI. | Meets: same boundaries; explicit distinction between browser validation and future server trust boundaries. |
| Unsupported assumptions | Meets: Gregorian 0001–9999 format, minute time, explicit supported IANA zone/UTC; no invented engine range, extra demographic fields or DST resolution. Choices disclosed in UI/docs. | Meets: same provisional scope, no implicit timezone, documented lack of calculation contract and DST resolution. Product documents also list these open decisions. |

Q01: PASS for both under the preregistered no-material-defect rubric. This is a
qualitative judgment; it does not award points for conforming to Treatment wording.
No material violation of the common code-quality expectations was demonstrated.

P03: PASS for both. Reviewed all ten changed paths, including tests, README,
product/architecture documents and verification notes. Only date/time/timezone
are collected; fixtures are synthetic. No real personal data, credential, extra
personal field, third-party application copy, chart calculation or scientific
predictive claim was introduced. No CLAUDE.md or external-repository changes are
present. Source has no input-bearing network, persistence or logging operations.
That source observation does not complete P01/P02, which require runtime evidence.

V01: PASS for both. coordinator-verification.json and test-results.txt preserve
the pre-freeze five-command verification. Independent post-freeze repeats are in
evaluation-verification.json and evaluation-test-results.txt; all five exit 0 in
both sets. Control discovered 52 tests: parameterized calendar,
time and timezone cases, missing fields, correction/nonmutation, non-echoing errors,
no-console validator checks, three static form checks and baseline smoke test.
Treatment discovered 15 tests, many with multiple fixture loops: malformed unknown
input, dates/century leap rules, strict whitespace formats, time and timezone limits,
nonmutation/non-echoing errors, two static form checks and baseline smoke test.
Counts reflect different grouping, not comparative coverage or quality. Neither
suite exercises hydration, live focus, keyboard navigation, reflow, live region
announcements, browser storage or network traffic.

Both npm ci outputs report 18 moderate vulnerabilities and the existing ESLint
9.39.5 deprecation, plus allowScripts warnings for esbuild/fsevents. Control's
additional audit attributes findings to development lint tooling and reports zero
production dependency findings at that time. These are captured command results,
not a comprehensive current security guarantee. No fix was applied; manifests and
lockfiles remain identical. Treatment documents the warnings without extra audit.
