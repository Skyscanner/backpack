# React 19 Migration — `@skyscanner/backpack-web`

This repo is **Repo 1 of 5** in the Skyscanner shared-library React 19 pre-release codemod pass.

**Master plan**: [`/Users/SimonWard/Documents/Code/legal-pages/REACT_19_SHARED_LIBRARY_MIGRATION.md`](../legal-pages/REACT_19_SHARED_LIBRARY_MIGRATION.md) — see the **`Repo 1 — @skyscanner/backpack-web`** section.

## What this thread should do

1. Read the master plan's "Repo 1" section. It contains the full audit baseline, recipe checklist, and empty result fields to fill in.
2. Execute the recipe inside this directory.
3. As you progress, update the master plan's Repo 1 section with results (codemod diff summary, test outcomes, surprises).
4. When done, append a one-paragraph "Surprises / runbook insights" entry, and open follow-up PRs against `web-documentation` and `web-migration-scripts` if any reusable insights came out.

## Audit baseline (2026-05-05)

This is the **largest surface** of the 5 libraries. Approach incrementally.

- Lerna-style monorepo, published from `packages/package.json`
- React peerDep: `17.0.2 - 18.3.1` (must widen to `^17.0.2 || ^18.3.1 || ^19.2.5`)
- `static defaultProps` / `defaultProps =`: **84 files** (manual sweep, no codemod)
- `forwardRef`: 14 files (none combined with `defaultProps`)
- `act` from `react-dom/test-utils`: 7 test files
- `prop-types` imports: **67 files** (codemod converts to TS types)
- `ReactDOM.render` / `hydrate`: 1 file
- String refs / `findDOMNode` / legacy context: 1 file (manual review)
- Zero-arg `useRef()`: 0
- TS 5.9.2; `@types/react` 18.3.1
- Tests: Jest + `@testing-library/react` 16.3.0
- CI: `.github/workflows/{release,pr,main}.yml` — `npm publish` after transpile

## Recipe summary (full detail in master plan)

1. Pin `codemod` + `types-react-codemod` as devDeps with `--save-exact` (no `npx`/`pnpm dlx` — Skyscanner Security stance).
2. `./node_modules/.bin/codemod react/19/migration-recipe`
3. `./node_modules/.bin/types-react-codemod preset-19 .`
4. `./node_modules/.bin/types-react-codemod react-element-default-any-props .`
5. Manual `defaultProps` sweep (84 files — track per-file in PR description).
6. Manual review of the 1 string-ref/findDOMNode/legacy-context site and the 1 `ReactDOM.render` site.
7. `forwardRef` ref-callback implicit-return scan.
8. Widen `peerDependencies` in `packages/package.json` to `^17.0.2 || ^18.3.1 || ^19.2.5`.
9. Add CI matrix entry running tests against React 19.2.5.
10. Uninstall codemod packages.
11. Coordinate version bump with the Backpack team.

## Reference docs

- [`/Users/SimonWard/Documents/Code/legal-pages/REACT_19_UPGRADE_GUIDE.md`](../legal-pages/REACT_19_UPGRADE_GUIDE.md) — codemod commands, manual migration patterns, troubleshooting
- [`/Users/SimonWard/Documents/Code/legal-pages/REACT_19_MIGRATION_REQUIREMENTS.md`](../legal-pages/REACT_19_MIGRATION_REQUIREMENTS.md) — peer-dep audit and breaking-changes inventory
- `/Users/SimonWard/Documents/Code/web-migration-scripts/migrations/2024-04-react-18_3_1/` — structural template for the migration directory we'll build at `2026-05-react-19/`
