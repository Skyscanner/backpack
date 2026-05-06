# React 19 Migration — `@skyscanner/backpack-web`

(This repo is **Repo 1 of 5** in the Skyscanner shared-library React 19 pre-release codemod pass.)

## What this thread should do

1. Read the master plan's "Repo 1" section. It contains the full audit baseline, recipe checklist, and empty result fields to fill in.
2. Execute the recipe inside this directory.
3. As you progress, update the master plan's Repo 1 section with results (codemod diff summary, test outcomes, surprises).
4. When done, append a one-paragraph "Surprises / runbook insights" entry, and open follow-up PRs against `web-documentation` and `web-migration-scripts` if any reusable insights came out.

## Audit baseline (2026-05-05) — corrected after re-audit on 2026-05-05

The original baseline overstated several categories. Re-audit confirmed:

- Lerna-style monorepo, published from `packages/package.json`
- React peerDep: `17.0.2 - 18.3.1` → narrowed-and-shifted to `18.3.1 - 19.2.5` (We shouldn't have any consumers below 18)
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

### Runbook insight: peerDep range narrowed instead of widened

Our intention is to **drop React 17 support** as part of this PR, to `18.3.1 - 19.2.5`. React 17 is unsupported upstream, no consumer is still on it, and dropping it shrinks the test/CI matrix surface.

## Recipe summary — adapted for this repo

1. [x] Pin `codemod` + `types-react-codemod` as devDeps with `--save-exact` (no `npx`/`pnpm dlx` — Skyscanner Security stance).
2. [x] ~~`react/19/migration-recipe`~~ — **skipped** (destructive on this codebase; see runbook insight above).
3. [x] ~~Individual mechanical codemods~~ — **skipped** (dry-runs as 0-changes for all four).
4. [x] `types-react-codemod preset-19` — applied with `refobject-defaults` and `useRef-required-initial` excluded (those two only typecheck against `@types/react@19`; deferred to the future `@types/react` bump PR).
5. [x] `types-react-codemod react-element-default-any-props` — confirmed no-op (already covered by preset-19).
6. [x] Custom jscodeshift transform applied (`scripts/react-19/transforms/strip-proptypes.js`, see scripts/react-19/README.md). Touched 27 files: removed prop-types from `.tsx`, migrated function-component `.defaultProps` to ES6 destructure defaults across `.js` and `.tsx`. License headers preserved.
7. [x] Manual cleanup of edge cases the transform left (1 eslint-disable + 2 dead-import removals).
8. [x] `forwardRef` ref-callback implicit-return scan — 0 issues, all 14 sites use block-body callbacks.
9. [x] Update `peerDependencies` in `packages/package.json` to `18.3.1 - 19.2.5` (drops React 17, adds 19; range syntax matching the existing peerDep style).
10. [x] Add CI matrix entry running tests against React 19.2.5 (`continue-on-error: true` initially).
11. [x] Uninstall codemod packages.
12. [ ] Coordinate version bump with the Backpack team.

## Deferred to follow-up PRs

The current PR establishes the scaffolding (peerDep range, CI matrix, codemod tooling, `.tsx` prop-types/defaultProps cleanup). The following items land in separate PRs:

- **35 class components with `static defaultProps`** (27 `.tsx` + 8 `.js`) — React 19 makes these no-ops, so defaults silently stop applying. Each needs either conversion to a functional component (preferred) or destructure-with-defaults inside `render()` (quick fix). See the React19 CI matrix output for the failure surface; group by package to keep PRs reviewable.
- **13 `.js` story/HOC files with leftover `Component.defaultProps = ...`** — Phase B of the transform couldn't merge defaults because the function bodies are implicit-return arrows or otherwise ineligible. React 19 silently ignores these.
- **`.js` (Flow) prop-types removal** — intentionally skipped by the transform because the project's `react/prop-types` lint rule treats removed prop-types as missing prop validation on `.js` files. Full removal happens during the parallel TS migration; React 19 ignores `propTypes` silently in the meantime.
- **`@types/react@19` bump** — running `types-react-codemod preset-19`'s `refobject-defaults` and `useRef-required-initial` sub-transforms together with bumping `@types/react` to 19. These were skipped here because they emit code that only typechecks against `@types/react@19`.
- **Track and fix the React19 CI matrix failures** — typecheck has 8 known errors (the deferred sub-transforms above plus a missing `@types/prop-types`), and jest has 326 suite failures (mostly transitive deps still using removed React 18 internals like `ReactCurrentDispatcher`). Once green, flip the matrix from `continue-on-error: true` to required.
- **Move the custom transform to `web-migration-scripts/migrations/2026-05-react-19/transforms/`** when that migration directory is set up.

