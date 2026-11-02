# Issue #3: birth-input scope and verification

Implemented against the frozen issue requirements supplied for
`yikangliu823/Celestia#3`, using only this checkout and its product and architecture
documents. All test inputs are synthetic. No dependency versions were changed.

## Implemented behavior

- Required, explicitly labeled Gregorian date, local birth time, and birthplace
  time zone fields. Native text inputs allow malformed entries to receive specific
  format guidance rather than silently normalizing them.
- Pure validation rejects missing values, impossible dates (including Gregorian
  leap-year exceptions), malformed times, unknown time zones, bare abbreviations,
  and raw offsets. It trims surrounding whitespace without mutating its input.
- Keyboard-operable native controls, visible focus styles, linked error summary,
  errors associated with their inputs, focus on the first invalid field after
  submission, and a polite status message. Errors update as users correct fields;
  editing clears a previous success message.
- The action is **Check inputs**. Success describes format checks only and states
  that no chart was calculated and daylight-saving validity was not checked.
- Values remain in component memory. The application does not log, transmit, or
  persist them. Error messages do not interpolate entered values. Controls are
  disabled until hydration, require JavaScript, and omit HTML names so native form
  submission cannot serialize birth inputs. Autocomplete is disabled as a browser
  hint; browser extensions and browser-managed recovery are outside app control.

## Assumptions and unresolved requirements

The scaffold dependency is present. The calculation-interface dependency is not:
there is no engine, schema, or contract in this checkout. `BirthInputValues` is a
provisional UI type, not an implementation of that missing interface. Integration
and completeness of “other required chart inputs” cannot be established yet.

Neither source document defines the following choices. They need product and/or
calculation-interface decisions before chart-ready validation can be claimed:

| Gap | Current limited behavior |
| --- | --- |
| Calendar and lunar/leap-month rules | Gregorian dates only; no conversion. |
| Supported birth-year range, future dates, age constraints | Accepts real dates in years 0001–9999, including future dates; this is a format range, not engine support. |
| Time precision and unknown/approximate birth time | Requires exact minute-format HH:MM; no seconds or unknown-time mode. |
| Location meaning: city, coordinates, geocoding, solar-time corrections | Interprets “location/timezone” as the birthplace’s explicitly entered time zone. Does not collect a place name or coordinates. |
| Time-zone source, aliases, historical accuracy | Accepts UTC or slash-separated IANA identifiers recognized by the runtime’s `Intl` database; runtime versions may differ. No canonicalization or device-zone default. |
| Daylight-saving gaps/overlaps and instant conversion | Checks the date, time, and zone individually. Does not reject nonexistent local times or disambiguate repeated ones. |
| Additional chart inputs, including any sex/gender parameter | No unsupported fields or defaults invented. Required fields await the calculation contract. |
| Submission destination and downstream behavior | Local format-check feedback only; no API or calculation call. |

The product requirement for server-side validation remains applicable to a future
API. There is no server input endpoint in this change. Client validation must not
be treated as sufficient validation at a future server boundary. No chart
calculation, authentication, persistence, or AI services were added.

## Verification

Environment: Node.js `v26.11.0`, npm `11.20.0`.

| Command | Actual result |
| --- | --- |
| `npm ci` | Exit 0; added 349 packages, audited 350. |
| `npm run typecheck` | Exit 0; route generation and TypeScript passed. |
| `npm run lint` | Exit 0; no warnings or errors. |
| `npm test` | Exit 0; 52 passed, 0 failed, 0 skipped. |
| `npm run build` | Exit 0; optimized build and static generation of `/` and `/_not-found` succeeded. |
| `git diff --check` | Exit 0. |

No requested verification command failed, so no failure-driven implementation
fixes were required. The initial suite passed 51 tests; after adding the explicit
no-console test, tests, type checking, and lint passed again.

Installation warned that ESLint 9.39.5 is deprecated and that `esbuild` and
`fsevents` install scripts are not covered by `allowScripts`. No script approvals
or npm configuration changes were made. Installation also reported 18 moderate
vulnerabilities. Follow-up `npm audit --json` exited 1 with those 18 findings in
the lint tooling dependency tree, rooted in minimatch advisory
GHSA-g3hv-75wg-m249; the report marked fixes unavailable. These remain unresolved
maintenance issues. `npm audit --omit=dev` exited 0 with `found 0 vulnerabilities`.
The dependency manifest and lockfile are unchanged.

The automated suite covers missing/malformed values, leap years, date/time
boundaries, valid and invalid zones, trimming, nonmutation, multiple errors and
correction, non-echoing errors, no console calls during validation, and explicit
DST limitations. Static render tests check labels, required attributes, error
associations, status markup, the pre-hydration guard, and the homepage.

These tests do not execute browser interactions. Keyboard focus movement,
correction/success transitions, screen-reader announcements, and responsive
rendering have not been verified in a browser. There is no claim of end-to-end or
screen-reader test coverage.

Manual browser follow-up: use Tab/Shift+Tab and Enter to submit empty fields;
confirm focus on date and read each linked error; correct with synthetic values
`2000-01-15`, `14:30`, `Asia/Shanghai`; confirm format-only success; edit a value
and verify success clears; check error links, narrow layouts, and JavaScript-off
messaging. Confirm there are no birth values in requests, URLs, browser storage,
or console output during this flow.
