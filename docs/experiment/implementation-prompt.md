Implement GitHub Issue #3, "Implement validated birth-input form", in yikangliu823/Celestia using the current checkout.

Frozen issue requirements:
- Build a keyboard-accessible form with date, time, location/timezone, and other required chart inputs.
- Required fields have accessible labels.
- Invalid and missing values show actionable errors.
- No birth information is logged.
- Unit tests cover input validation.
- Dependencies stated by the issue: application scaffold and calculation interface.

Use the existing product requirements and architecture documents for scope. Identify requirements that those sources do not define and report the ambiguity; do not claim unsupported product behavior. Work only in this checkout. Do not inspect other worktrees, other branches, repository history, or external application repositories. Use synthetic inputs only. Do not add chart calculation, authentication, persistence, or AI services.

Run and report the actual results of:
npm ci
npm run typecheck
npm run lint
npm test
npm run build

Deliver the implementation and validation tests, a concise list of changed files, verification results including failures and fixes, and any assumptions, unresolved requirements, or limitations. Keep changes on the current branch and leave them available for review. Do not push, create a pull request, merge, or mark the issue complete.
