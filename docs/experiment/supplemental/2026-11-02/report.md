# Celestia supplemental evaluation

Status: COMPLETE for the frozen evaluation suite. All 30 previously UNVERIFIED
condition/check pairs now have sufficient passing evidence. No implementation was
repeated or changed. This is additional evaluation evidence, not a replacement for
the original experiment snapshot or a claim that all possible product behavior is
implemented.

## Scope, provenance and environment

Original evidence commit: `1e2e0f198c7f113d2a4289000d80b3662b76c84b`.
Control: `b9c5635a66c373276efda99c07e315a63812fec0`.
Treatment: `5fd6e6cb0f29ee472bac25be2ebfd6a2f1e40d34`.
Evidence branch: `codex/experiment-protocol`.

The owner authorized supplemental evaluation, separate ports and isolated contexts,
then explicitly approved standalone Playwright after the CUA fallback timed out.
This changes the evaluation infrastructure only. The original criteria and scoring
oracles remain unchanged. The 18 target criteria and missing evidence were listed
in [matrix.md](matrix.md) before testing. Original results, metrics and final report
remain unchanged; [original-comparison.md](original-comparison.md) preserves the
previous comparison byte for byte.

| Setting | Both conditions |
| --- | --- |
| Browser | Installed Google Chrome 156.0.8078.74, headless |
| Automation | Existing Playwright 1.62.1; no installation or dependency changes |
| Node | v26.11.0 |
| Context isolation | Separate fresh nonpersistent BrowserContexts, no reused user profile |
| Locale / timezone | en-US / America/Los_Angeles |
| Viewports | 1280×800 and 390×844 CSS pixels |
| Device scale / visual viewport scale | 1 / 1, fresh-context default zoom |
| Color scheme | light |
| Control origin | http://127.0.0.1:3101/ |
| Treatment origin | http://127.0.0.1:3102/ |
| Server | npm start -- --hostname 127.0.0.1 --port PORT, from each frozen worktree |

Both servers ran concurrently on distinct ports; browser evaluation used Control
then Treatment with identical procedures and synthetic fixtures. Initial storage
was empty in both contexts. Contexts were closed and servers stopped afterward.
Browser profiles and temporary data stayed in the ignored evidence-private directory.
The harness did not use the user's Chrome profile or extensions.

[browser-probe.json](browser-probe.json) records successful navigation, input,
submission, error observation and reload in both applications, not merely HTTP 200.
The probe completed before the chat interruption; its persisted output was used on
resume without repeating it. The formal supplemental run started
2026-11-02T07:31:44.760Z and ended 2026-11-02T07:32:39.436Z
(November 1, 11:31:44–11:32:39 PM America/Los_Angeles).

The provided browser inventory and native Chrome acquisition failed to offer a
reliable isolated evaluation path; native acquisition timed out. After the owner's
explicit method approval, the standalone probe and full run completed without
infrastructure exceptions. See [infrastructure-events.json](infrastructure-events.json).
No repeated unchanged attempts against the known failing browser were made.

The previously recorded global Codex configuration drift was not repaired or
approved. Its current fingerprint is recorded separately in runtime-host.json.
No new Codex implementation session was launched, so this supplemental browser
exercise does not change the approved implementation runtime or its history.

## Results

| Outcome | Original Control | Original Treatment | Updated Control | Updated Treatment |
| --- | --- | --- | --- | --- |
| PASS | 10 | 4 | 22 | 22 |
| FAIL | 0 | 0 | 0 | 0 |
| N/A | 2 | 2 | 2 | 2 |
| UNVERIFIED | 12 | 18 | 0 | 0 |
| Assessed applicable, PASS + FAIL | 10 | 4 | 22 | 22 |

We executed all 18 target criteria in each condition: 36 condition/check executions.
Of these, 30 resolve previous UNVERIFIED results (12 Control, 18 Treatment), and six
confirm previously passing Control results using the same supplemental procedures.
A01, P03, V01 and Q01 retain their original passing evidence. E07 and E09 retain N/A
because location-mapping and DST-policy correctness have no applicable frozen oracle.
No N/A or UNVERIFIED result is counted as a pass or failure.

[results.md](results.md) maps every original and supplemental result; [results.json](results.json)
provides the updated totals and evidence references. Per-check actual actions,
observations and timestamps are in each condition's browser-results.json. The
unchanged original condition/evaluation-results.json files remain authoritative for
the original evaluation time point.

## Findings supported by new evidence

- F01–F05: both forms were usable and accepted complete synthetic inputs under
  their disclosed rules; empty and individually missing fields received actionable
  errors; correcting an impossible date cleared the error and permitted validation.
- F03 specifically: each required field was omitted in a freshly loaded form, then
  separately cleared after a previously accepted complete entry. The harness captured
  the actual empty DOM value before submission. All six scenarios passed in each
  condition. The earlier Control success anomaly was not reproduced. Its exact
  original cause remains unknown; the old observations were not deleted or reclassified.
- E01–E06 and E08: impossible dates, non-leap February 29, year 0000/10000, hour 24,
  minute 60 and Not/A_Zone were rejected. Valid leap day, disclosed format boundaries
  0001/9999, 00:00/23:59 and America/Los_Angeles were accepted. No silent time
  normalization occurred. These are consistency checks, not validation of an
  unspecified chart engine's calendar, date range or DST contract.
- A02–A04: keyboard-only Tab/Shift+Tab traversal, arrow movement, typing, Enter/Space
  submission, error correction and all summary links worked. Focus rings were
  visible. Error messages were associated with controls through aria-describedby,
  appeared in the browser accessibility descriptions and did not rely on color alone.
- A05: screenshot review and measured layouts at both specified viewports found
  readable labels/errors, usable controls and no horizontal clipping. The forms
  scroll vertically on narrow screens; full-page screenshots show the content, not
  an assertion that all controls fit into one screen.
- P01–P02: synthetic sentinel data did not appear in browser/server logs or URLs.
  Entry/submission produced no network requests or WebSocket traffic. Cookies,
  local/session storage, IndexedDB, Cache Storage and service-worker registrations
  stayed empty, and input fields cleared after reload. These runtime captures were
  combined with review of the unchanged input, validator, page and layout source;
  source inspection alone was not used to establish browser behavior.

No new defect against the frozen criteria was demonstrated. Both applications
returned 404 for the browser's automatic /favicon.ico request, producing one console
resource error each. This is a minor missing-asset observation, not a validation,
accessibility or privacy failure under this suite. The console messages contained
no birth values. No uncaught application runtime exception was captured. No repair
was made to either frozen implementation.

## Comparison and limitations

The supplemental evidence removes the original difference in evaluation coverage:
both now pass all 22 applicable frozen checks. It does not show Treatment outperforming
Control or establish a generalizable effect of repository instructions. The original
process differences, whitespace policies, unknown-input handling and dependency-audit
behavior remain descriptive observations. No new implementation sample was generated.

The original study still has one run per condition, unblinded coordinator review,
shared filesystem/Git exposure and uncertain model sampling. Supplemental testing
uses one headless Chrome version, synthetic inputs and specified viewports. It is
not cross-browser certification, physical-device testing, a full WCAG audit, an
actual screen-reader session or an exhaustive security guarantee. No additional
product requirements were invented to remove the two N/A cases. The global runtime
fingerprint remains unsuitable for a new implementation launch without review.

Remaining UNVERIFIED checks: none. The original comparison and original PARTIAL
report remain preserved as historical evidence. Updated coverage and conclusions
are explicitly labeled supplemental in comparison.md. No merge, push, PR, issue
closure or main-worktree modification was performed.

## Evidence and reproduction

- probe.cjs and browser-probe.json: prerequisite interaction and isolation probe.
- evaluate.cjs and run.json: exact supplemental harness and actual run record.
- control/ and treatment/: per-check DOM/AX observations, full accessibility trees,
  keyboard/focus records, screenshots, console/network/storage captures and Playwright traces.
- manual-review.json: screenshot and source/runtime privacy review.
- *-privacy-source.txt and privacy-source-review.json: numbered frozen source and search results.
- *-server.txt: captured application server output.
- final-integrity.json and artifact-sha256.json: frozen/original preservation checks and evidence hashes.

To reproduce on this machine, ensure ports 3101 and 3102 are free and the existing
production builds and recorded Playwright/Chrome versions are available. Run the
harness from a new evidence output directory while keeping both implementations
frozen; it writes results beside itself. Do not overwrite this completed snapshot.
No repeated build, unit-test suite or implementation run was needed because V01
already had passing frozen-commit evidence and source integrity was reconfirmed.
