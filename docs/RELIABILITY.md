# Reliability Practices

## CI/CD Pipeline (GitHub Actions)

### `pr.yml` — Pull Request checks
Triggered on every PR targeting `main`:
1. Installs and caches npm dependencies (keyed on `package-lock.json` hash)
2. Builds full package set and Storybook (`npm run build && npm run storybook:dist`)
3. Delegates to `_build.yml` reusable workflow for type checking, tests, and Danger CI
4. Deploys per-PR Storybook preview to `backpack.github.io/storybook-prs/{PR_NUMBER}`

### `main.yml` — Trunk build
Triggered on push to `main`:
- Same build/test pipeline as PRs
- Deploys Storybook to `backpack.github.io/storybook`
- Deploys Sass docs to `backpack.github.io/sassdoc`
- Drafts release notes via `release-drafter`

### `_build.yml` — Shared build steps (reusable)
Core steps used by both `pr.yml` and `main.yml`:
- `npm run build` — compiles all packages
- Pristine-state check: `./scripts/check-pristine-state package-lock.json`
- `npm run typecheck` — full `tsc` across the project
- `npm run test` — lint, React version checks, dependency checks, Jest with coverage
- Uploads compressed test logs as build artifacts
- Runs Danger CI for PR hygiene
- Runs Percy visual regression tests

### `release.yml` — Release pipeline
Triggered on GitHub Release publication:
- Rebuilds from release tag
- Transpiles and publishes `@skyscanner/backpack-web` to npm
- Requires `Publishing` environment approval
- Publishes updated docs to Supernova

### Security & permissions
- All workflows set `permissions: {}` at top level, grant minimum per job
- All third-party actions pinned to full commit SHAs
- `persist-credentials: false` on all checkout steps
- `zizmor.yml` runs static analysis on workflow files (SARIF output to GitHub security events)

---

## Visual Regression Testing (Percy)

Runs as `PercyTests` job in `_build.yml` after Danger CI passes:
- Command: `npm run percy-test` — runs against built Storybook dist
- Matches stories with names matching `/Visual\stest\s?([a-z]*)?/i`
- Config (`.percy.yml`): enables JS execution, custom `percy-backpack` user-agent, allows `content.skyscnr.com`, 9-second launch timeout
- Skipped components: `BpkImage`, `BpkContentCards` (image loading unreliable in CI — see `decisions/visual-tests.md`)
- Skipped for Dependabot PRs

---

## Type Safety

- TypeScript strict mode across all packages
- `npm run typecheck` runs `tsc` in CI on every PR and push
- `tsconfig.declaration.json` emits `.d.ts` files during transpilation
- `@ts-expect-error` suppressions self-destruct when upstream modules are typed (per `decisions/imports-ts-suppressions.md`)

---

## Automated Testing

- **Runner**: Jest with `TZ=Etc/UTC` for timezone-independent results
- **Component tests**: React Testing Library for interaction-level testing
- **Accessibility tests**: `jest-axe` in `accessibility-test.tsx` per package (see `decisions/accessibility-tests.md`)
- **Coverage**: Text reporter, thresholds configured in `package.json` (70% branches, 75% functions/lines/statements)
- **Isolation**: `jest:accessibility` script runs only a11y tests

---

## Lint Enforcement

- **JS/TS**: ESLint extending `@skyscanner/eslint-config-skyscanner` over `.js`, `.jsx`, `.ts`, `.tsx`
- **SCSS**: Stylelint with `@skyscanner/stylelint-config-skyscanner` and `@skyscanner/stylelint-plugin-backpack`
- **Formatting**: Prettier with `.prettierrc` config
- Lint runs as part of `npm run test` in CI — failures fail the test step

---

## Git Hooks (Husky + lint-staged)

- Husky v9 configured via `prepare` script and `.husky/pre-commit`
- Pre-commit runs `npm run lint-staged`:
  - ESLint with auto-fix on staged `.js`/`.jsx`/`.ts`/`.tsx`
  - Stylelint with auto-fix then final check on staged `.scss`
- Prevents lint regressions before they reach CI

---

## Danger CI

- Runs after main build via `Danger` job in `_build.yml`
- Uses `@skyscanner/danger-plugin-toolbox` for Skyscanner-specific rules
- Enforces PR hygiene (changelog requirements, description standards)
- Skipped on Dependabot PRs and forks
- `check-bpk-dependencies` and `check-react-versions` scripts run in `npm run test` to ensure cross-package consistency

---

## Release Process

Per `decisions/release-schedule.md` and `decisions/versioning-rules.md`:

- **Major**: Quarterly (end of Q1–Q4). Breaking changes introduced 3+ months ahead via `future`/`deprecated` flags
- **Minor**: On demand for new non-breaking features and deprecations
- **Patch**: On demand for bug fixes
- Release notes drafted automatically by `release-drafter` on every merge to `main`
- `release.yml` publishes to npm under `Publishing` environment (requires explicit approval)
