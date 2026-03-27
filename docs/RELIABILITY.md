# Reliability

## CI/CD Pipeline

GitHub Actions workflows in `.github/workflows/`:

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `main.yml` | Push to main | Full build, test, lint |
| `pr.yml` | Pull requests | PR validation (build, test, lint, Percy) |
| `release.yml` | Release tags | Publish packages to npm |
| `_build.yml` | Reusable | Shared build workflow |
| `sync-figma-code-connect.yml` | Schedule/manual | Sync Figma Code Connect mappings |
| `label-check.yml` | PR labels | Validate PR labels for release notes |
| `zizmor.yml` | PR/push | Security scanning |

## Type Safety

- **TypeScript strict mode** across all packages
- Declaration files generated via `tsconfig.declaration.json`
- Props interfaces enforce correct component usage at compile time
- `ts-migrate` available for remaining JS -> TS conversions

## Testing Layers

```
Layer 1: Unit Tests (Jest + RTL)
  → Component rendering, props, interactions
  → Coverage: 70% branches, 75% functions/lines/statements

Layer 2: Accessibility Tests (jest-axe)
  → Automated WCAG checks on every component
  → Zero violations policy

Layer 3: Visual Regression (Percy)
  → Screenshot comparison for UI changes
  → Stories prefixed "VisualTest" are captured
  → Requires manual approval for intentional changes

Layer 4: Lint + Format
  → ESLint (@skyscanner/eslint-config-skyscanner)
  → Stylelint (@skyscanner/stylelint-config-skyscanner)
  → Prettier for consistent formatting
```

## Pre-commit Hooks

Husky (v9) + lint-staged ensure quality before code reaches CI:
- Staged files are linted and formatted on commit
- Prevents broken code from entering the repository

## Danger CI

`dangerfile.ts` runs automated PR checks:
- Uses `@skyscanner/danger-plugin-toolbox` for Skyscanner-specific rules
- Validates PR structure, labels, and content

## Dependency Management

- `package-lock.json` for deterministic installs
- `scripts/npm/` contains dependency checking utilities
- Dependabot/Renovate for automated dependency updates
- npm audit for vulnerability scanning

## Release Process

1. Changes merged to main via PR (all CI checks must pass)
2. Version bump following semantic versioning rules
3. Release workflow publishes to npm under `@skyscanner/` scope
4. Quarterly major releases for coordinated breaking changes
