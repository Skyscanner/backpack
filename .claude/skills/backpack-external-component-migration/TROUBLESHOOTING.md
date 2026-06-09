# Troubleshooting

Common acceptance failures and solutions for the Backpack external component migration workflow.

## Lint Errors in Generated Directories

**Symptom:** Lint fails with errors in `dist-sassdoc/`, `dist/`, or other generated directories

**Fix:** Ensure `.eslintignore` includes all generated directories:
```
node_modules
dist
dist-storybook
dist-sassdoc
coverage
```

## Undefined Sass Token Errors

**Symptom:** `Undefined variable: tokens.$bpk-border-radius-pill`

**Fix:**
1. Search existing components for similar usage
2. Use standard CSS values for unavailable tokens (e.g., `50%` for circles instead of `$bpk-border-radius-pill`)
3. For pixel values, convert to rem: `10px` → `0.625rem`

## Module Resolution Errors

**Symptom:** `Module not found: Can't resolve '../../bpk-component-*'`

**Fix:** Verify relative import paths:
- From component source: `../../bpk-component-text`
- From examples: `../../packages/bpk-component-text`
- From tests: Same as component source (tests are co-located)

## Token Import Errors

**Symptom:** `Error: Can't find module '@skyscanner/bpk-foundations-web'`

**Fix:**
```bash
npm install
npm run build  # Rebuild bpk-mixins package
```

## CSS Classes Not Applied

**Symptom:** Component renders but no styles visible

**Fix:**
1. `.module.scss` extension used (not just `.scss`)
2. Styles imported correctly: `import STYLES from './Component.module.scss'`
3. `cssModules(STYLES)` pattern used correctly
4. Class names follow BEM: `.bpk-[name]`

## Accessibility Test Failures

**Symptom:** `jest-axe` reports violations

**Fix:**
- Decorative elements have `aria-hidden="true"`
- Interactive elements have proper `role` attributes and labels
- Color contrast meets WCAG AA standards
- If visible text is the only identifier, no extra `aria-label` is needed

## Global Coverage Threshold Not Met

**Symptom:** `Jest: "global" coverage threshold for statements (75%) not met: 17.22%`

This is normal when testing a single component. Check that YOUR component has 100% coverage:
```
packages/bpk-component-[name]/src  | 100 | 100 | 100 | 100 |
Bpk[ComponentName].tsx             | 100 | 100 | 100 | 100 |
```

## Snapshot Mismatches

**Symptom:** `1 snapshot failed` or snapshot tests fail on first run

**Fix:** For new components, this is expected on first run:
```bash
npm run jest -- packages/bpk-component-[name] -u
```
