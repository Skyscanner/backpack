# React 19 Migration — `@skyscanner/backpack-web`

This repo is **Repo 1 of 5** in the Skyscanner shared-library React 19 pre-release codemod pass.

**Master plan**: [`/Users/SimonWard/Documents/Code/legal-pages/REACT_19_SHARED_LIBRARY_MIGRATION.md`](../legal-pages/REACT_19_SHARED_LIBRARY_MIGRATION.md) — see the **`Repo 1 — @skyscanner/backpack-web`** section.

## What this thread should do

1. Read the master plan's "Repo 1" section. It contains the full audit baseline, recipe checklist, and empty result fields to fill in.
2. Execute the recipe inside this directory.
3. As you progress, update the master plan's Repo 1 section with results (codemod diff summary, test outcomes, surprises).
4. When done, append a one-paragraph "Surprises / runbook insights" entry, and open follow-up PRs against `web-documentation` and `web-migration-scripts` if any reusable insights came out.

## Audit baseline (2026-05-05) — corrected after re-audit on 2026-05-05

The original baseline overstated several categories. Re-audit confirmed:

- Lerna-style monorepo, published from `packages/package.json`
- React peerDep: `17.0.2 - 18.3.1` (must widen to `^17.0.2 || ^18.3.1 || ^19.2.5`)
- `static defaultProps` / `defaultProps =`: **84 files** (manual sweep, no codemod)
- `forwardRef`: 14 files (none combined with `defaultProps`)
- `prop-types` imports: **67 files** (mostly `.js`; manual conversion — see runbook insight below)
- `act` from `react-dom/test-utils`: **0** (audit said 7; re-grep finds none)
- `ReactDOM.render` / `hydrate`: **0** (audit said 1; the only hit is example text inside a `<BpkCodeBlock>` JSX literal in `BpkCode.stories.tsx`, not a real call)
- String refs (`ref="..."`): **0**
- `findDOMNode`: **0**
- Legacy context API (`childContextTypes` / `getChildContext`): **0**
- `useFormState`: **0**
- Zero-arg `useRef()`: 0
- TS 5.9.2; `@types/react` 18.3.1
- Tests: Jest + `@testing-library/react` 16.3.0
- CI: `.github/workflows/{release,pr,main}.yml` — `npm publish` after transpile

### Runbook insight: `react/19/migration-recipe` is destructive on this codebase

Dry-running `react/19/migration-recipe` (codemod 1.9.1, which silently invokes legacy codemod 0.18.13) on backpack:

- **Strips Apache 2.0 license headers** from every modified file. Backpack requires these.
- Generates **wrong TypeScript interfaces** when files already have proper TS types (e.g. `BpkBasicMapMarker.tsx` keeps the existing `type Props = { children: ReactNode, position: LatLong }` orphaned and points the component at a new redundant `interface { ...; position: unknown }`).
- Only matched **6 of 67** prop-types files in this repo despite the recipe including `prop-types-typescript`.

We are skipping the bundled recipe. The four mechanical sub-codemods (`replace-act-import`, `replace-reactdom-render`, `replace-string-ref`, `replace-use-form-state`) all dry-run as 0-changes here, so they are also skipped. Only `types-react-codemod` (TS-types only, much narrower scope) is being run.

The `prop-types` and `defaultProps` migrations are being done with a custom jscodeshift transform tailored to backpack, preserving license headers and faithful types.

## Recipe summary — adapted for this repo

1. Pin `codemod` + `types-react-codemod` as devDeps with `--save-exact` (no `npx`/`pnpm dlx` — Skyscanner Security stance).
2. ~~`react/19/migration-recipe`~~ — **skipped** (destructive on this codebase; see runbook insight above).
3. ~~Individual mechanical codemods~~ — **skipped** (dry-runs as 0-changes for all four).
4. `./node_modules/.bin/types-react-codemod preset-19 .`
5. `./node_modules/.bin/types-react-codemod react-element-default-any-props .`
6. Apply custom jscodeshift transform for the 67 prop-types + 84 defaultProps files (preserves license headers; faithful types).
7. Manual review of any edge cases the transform missed.
8. `forwardRef` ref-callback implicit-return scan (14 files).
9. Widen `peerDependencies` in `packages/package.json` to `^17.0.2 || ^18.3.1 || ^19.2.5`.
10. Add CI matrix entry running tests against React 19.2.5.
11. Uninstall codemod packages.
12. Coordinate version bump with the Backpack team.

## Reference docs

- [`/Users/SimonWard/Documents/Code/legal-pages/REACT_19_UPGRADE_GUIDE.md`](../legal-pages/REACT_19_UPGRADE_GUIDE.md) — codemod commands, manual migration patterns, troubleshooting
- [`/Users/SimonWard/Documents/Code/legal-pages/REACT_19_MIGRATION_REQUIREMENTS.md`](../legal-pages/REACT_19_MIGRATION_REQUIREMENTS.md) — peer-dep audit and breaking-changes inventory
- `/Users/SimonWard/Documents/Code/web-migration-scripts/migrations/2024-04-react-18_3_1/` — structural template for the migration directory we'll build at `2026-05-react-19/`
