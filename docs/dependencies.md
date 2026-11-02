# Scaffold dependencies

Issue #1 selects Next.js App Router with React and TypeScript. Versions are pinned
in `package.json`; `package-lock.json` records resolved transitive dependencies.
No source code was imported from another application repository.

| Dependency | Version | Purpose | License |
| --- | --- | --- | --- |
| next | 16.4.3 | App Router, development server, production build | MIT |
| react | 19.3.1 | UI components | MIT |
| react-dom | 19.3.1 | React rendering | MIT |
| typescript | 5.9.3 | Static type checking | Apache-2.0 |
| eslint | 9.39.5 | Lint runner | MIT |
| eslint-config-next | 16.4.3 | Next.js, React, and TypeScript lint rules | MIT |
| tsx | 4.23.15 | TypeScript execution for Node's test runner | MIT |
| @types/node | 26.6.6 | Node.js type definitions | MIT |
| @types/react | 19.3.0 | React type definitions | MIT |
| @types/react-dom | 19.3.0 | React DOM type definitions | MIT |

License metadata was checked in the npm registry before integration. MIT and
Apache-2.0 permit this use; retain dependency copyright and license notices when
redistributing third-party material, including any applicable Apache notices.
This repository has not selected its own distribution license. Review obligations
again before distributing a release.

TypeScript 5.9 is within the installed TypeScript lint tooling's supported range;
the registry's current TypeScript 7 release is outside that range. ESLint 9 avoids
the ESLint 10 peer-version gaps documented by Next.js, but npm marks ESLint 9.39.5
as unsupported. This is a tooling maintenance limitation; update once the included
React and accessibility plugins declare compatible peer ranges. See the
[verification record](scaffold-verification.md) for audit findings.

Setup references: [Next.js installation](https://nextjs.org/docs/app/getting-started/installation)
and [Next.js ESLint configuration](https://nextjs.org/docs/app/api-reference/config/eslint).
