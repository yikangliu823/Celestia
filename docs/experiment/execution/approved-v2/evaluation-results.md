# Independent evaluation results

Criteria are unchanged. PASS/FAIL counts cover only assessed cases; unavailable evidence is UNVERIFIED. See browser-limitations.md and each condition’s evaluation-results.json for full reasons and artifact references.

| ID | Target | Control | Treatment |
| --- | --- | --- | --- |
| F01 | Open the form through public UI. Inventory visible date, time, and location/timezone input concepts. | PASS | UNVERIFIED |
| F02 | Start with an empty form and attempt submission. | PASS | UNVERIFIED |
| F03 | Omit each field the implementation declares required, one at a time, keeping the others synthetically valid. | UNVERIFIED | UNVERIFIED |
| F04 | Correct an invalid field and retry. | PASS | UNVERIFIED |
| F05 | Supply a complete synthetic valid input under the implementation's disclosed rules; observe submission. | PASS | UNVERIFIED |
| E01 | Attempt an impossible date such as 2024-02-30 using the available controls. | PASS | UNVERIFIED |
| E02 | Attempt 2023-02-29 in a Gregorian input mode. | UNVERIFIED | UNVERIFIED |
| E03 | Enter 2024-02-29 in a Gregorian input mode. | PASS | UNVERIFIED |
| E04 | Review and exercise declared lower/upper date boundaries, if any, and adjacent values. | UNVERIFIED | UNVERIFIED |
| E05 | Attempt hour 24 or minute 60, using the applicable time representation. | UNVERIFIED | UNVERIFIED |
| E06 | Try 00:00 and 23:59 in a 24-hour mode, or their equivalent in the chosen representation. | UNVERIFIED | UNVERIFIED |
| E07 | If a location field is available, enter an unsupported or nonsensical location; record any declared supported set. | N/A | N/A |
| E08 | If an IANA timezone input is provided, try Not/A_Zone, then America/Los_Angeles. | UNVERIFIED | UNVERIFIED |
| E09 | Inspect handling of 2024-03-10 02:30 and 2024-11-03 01:30 in America/Los_Angeles if timezone resolution is implemented. | N/A | N/A |
| A01 | Inspect accessible names for every required control using the browser accessibility tree. | PASS | PASS |
| A02 | Complete and submit using Tab, Shift+Tab, arrow keys as appropriate, and Enter/Space without a pointer. | UNVERIFIED | UNVERIFIED |
| A03 | Trigger errors; inspect control association, accessible descriptions, and feedback discoverability. | UNVERIFIED | UNVERIFIED |
| A04 | Trigger submission errors and observe focus order and the next keyboard action. | UNVERIFIED | UNVERIFIED |
| A05 | Inspect semantic markup and reflow at 1280x800 and 390x844. | UNVERIFIED | UNVERIFIED |
| P01 | Use synthetic sentinel values; inspect browser console, captured server output, source logging calls, and URLs. | UNVERIFIED | UNVERIFIED |
| P02 | Inspect cookies, local/session storage, network activity, and persistence code before and after entry/submission. | UNVERIFIED | UNVERIFIED |
| P03 | Review fields collected and changed files. | PASS | PASS |
| V01 | Run the five frozen npm commands; inspect implementation-authored validation tests and their discovered file set. | PASS | PASS |
| Q01 | Review diff for TypeScript safety, focused components, validation separation, maintainability, unnecessary complexity, and architecture consistency. | PASS | PASS |
