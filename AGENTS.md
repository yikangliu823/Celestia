# Celestia Engineering Rules

## Purpose and scope

These rules govern contributions to the independent Celestia repository. Review the current repository tree before making implementation claims. At initialization, the repository contains planning documents only.

## Product and requirements

Use `docs/product-requirements.md` for the current product scope. Do not treat features marked planned as implemented. When a requirement is underspecified, record the decision or ask for clarification before introducing irreversible data models or security behavior.

## Architecture

- Use a deterministic, testable calculation module for chart computation.
- Separate calculation results, application services, persistence, and AI interpretation.
- Do not ask a language model to calculate or silently alter star or palace positions.
- Keep provider credentials and AI requests on the server.
- Minimize the personal information included in model requests.
- Authorize each chart, conversation, share, and consultation operation on the server.
- Validate input at trust boundaries; handle malformed requests and partial streams.
- Record external dependencies and license compatibility before integration.

## Implementation conventions

- Write new documentation, code comments, issue titles, and UI copy in English.
- Preserve Chinese text only where required for domain data, proper nouns, quotations, or legal notices.
- Use `PascalCase` for React components and TypeScript types.
- Use `camelCase` for variables and functions.
- Use `kebab-case` for general filenames, documentation, and URL segments.
- Follow existing framework conventions for reserved filenames such as `page.tsx` and `route.ts`.
- Prefer descriptive names over abbreviations; avoid redundant words and invented synonyms.
- Use focused, imperative commit subjects with Conventional Commit prefixes.
- Keep writing factual and concise. Avoid promotional language, decorative emoji, ornamental separators, and formulaic rhetorical contrasts.

These are project conventions informed by widely used engineering practices; do not represent them as an official universal Google naming policy.

## Task workflow

- Create an issue before implementing a feature.
- Write the issue title as an action with one observable outcome.
- Include context, scope, dependencies, acceptance criteria, and a verification plan.
- Keep pull requests reviewable and link each change to its issue.
- Do not claim an acceptance criterion is met without verification evidence.
- Separate documentation-only changes from behavior changes when practical.

## Testing and quality

- Establish baseline tests before modifying any imported or newly written chart engine.
- Use fixed fixtures and explicit expected outputs for calculation regression tests.
- Add unit tests for validation, authorization, and serialization logic.
- Add integration tests for authenticated endpoints and streaming contracts.
- Add end-to-end tests for critical user journeys after the application exists.
- Run available type checks, tests, and builds; report failures and skipped checks.
- Do not claim a coverage percentage without an actual coverage report.

## Privacy and accessibility

- Never commit credentials or real users' birth records.
- Do not expose sensitive birth information in application logs or AI prompts.
- Design for keyboard navigation, labeled controls, visible focus, readable errors, and responsive layouts.
- Treat chart interpretations as cultural content; avoid assertions of scientific predictive validity.

## External projects

External codebases are read-only references unless the repository owner explicitly approves a specific import. Do not copy another project's branding, contributor list, README, or agent rules. Retain legally required notices for any approved third-party material.

## Agent-specific configuration

Do not create `CLAUDE.md` without a separate explicit request.
