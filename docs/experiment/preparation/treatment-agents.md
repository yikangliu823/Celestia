# Celestia: Codex Project Instructions

## Context and current scope

Celestia explores deterministic Zi Wei Dou Shu charts and cultural interpretation.
The repository currently implements only a Next.js homepage and scaffold checks.
Birth-input forms, calculation, authentication, persistence, and AI services are
not implemented at this baseline. Inspect the tree before claiming otherwise.
Read `docs/product-requirements.md` for scope, `docs/architecture.md` for boundaries,
and the assigned GitHub issue for acceptance criteria. Record ambiguities; do not
invent chart requirements or silently make irreversible data or security decisions.

## Stack and structure

- Next.js 16.4.3 App Router, React 19.3.1, TypeScript 5.9.3, and plain CSS.
- `src/app`: root layout, route components, metadata, and global styles.
- `tests`: Node test runner tests executed with `tsx`; currently one render smoke test.
- `docs`: requirements, architecture, dependency licenses, and verification records.
- `package.json` and `package-lock.json`: pinned dependencies and npm scripts.
- `next.config.ts` disables automatic instruction generation; preserve that setting.

Keep calculation, UI, application services, persistence, and AI interpretation
separate as they are introduced. Calculation must be deterministic and testable;
never ask an LLM to compute or silently change star or palace positions.

## Development conventions

- Use strict TypeScript, explicit domain types, and narrow untrusted inputs before use.
  Avoid `any`, suppressed type errors, and disabled lint rules as shortcuts.
- Use PascalCase for components and types, camelCase for variables and functions,
  and kebab-case for general filenames. Preserve Next.js reserved filenames.
- Keep React components focused. Use client components only where interaction needs
  them; keep validation logic testable independently of rendering.
- Prefer existing platform APIs and dependencies over new abstractions or UI libraries.
- Validate at trust boundaries; handle empty, malformed, and unsupported input with
  actionable errors. Do not silently coerce invalid input into a successful result.
- Do not add unrelated features or claim a proposed service already exists.

## Privacy, security, and accessibility

- Use synthetic fixtures. Never commit credentials or real birth records, log
  sensitive birth inputs, or put them in URLs, analytics, or AI prompts.
- Do not add persistence or external transmission without an explicit requirement.
  Keep future provider credentials and AI requests on the server; authorize private
  resource operations server-side when those services are introduced.
- Use semantic HTML, accessible names, keyboard operation, visible focus, readable
  errors associated with controls, and responsive layouts. Do not rely on color alone.
- Present interpretations as cultural content, without scientific predictive claims.

## Verification and dependencies

- Run `npm ci`, `npm run typecheck`, `npm run lint`, `npm test`, and `npm run build`.
  Start locally with `npm run dev`; serve a completed production build with `npm start`.
- Add meaningful tests for validation changes and explicit expected outputs for
  deterministic logic. Preserve existing tests. Do not weaken checks to get a pass.
- Report commands, exit outcomes, failures, fixes, and skipped checks accurately.
  Distinguish render tests from browser checks; do not claim unverified behavior,
  accessibility conformance, test coverage, or completed acceptance criteria.
- Keep dependencies minimal. Review licenses before adding packages or importing
  code; record versions and compatibility in `docs/dependencies.md`, retaining notices.
  Update the lockfile with intentional dependency changes. Do not silently apply
  breaking audit fixes or change dependencies to hide warnings.

## Git workflow and constraints

- Work on the assigned branch for the existing issue; create an issue before a new
  feature. Use focused Conventional Commit subjects and keep changes reviewable.
- Link pull requests to the issue and include verification results and known risks.
  Do not modify, merge into, or push `main` without explicit owner approval.
- Write new code comments, documentation, and UI copy in English, retaining Chinese
  only for necessary domain terms, proper nouns, quotations, or legal notices.
- Do not modify external repositories, copy third-party application code without
  approval and license review, or copy another project's branding or agent rules.
- Do not create `CLAUDE.md`. Avoid decorative emojis and unnecessary separators.
