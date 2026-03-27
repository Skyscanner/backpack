# Quality Score

## Test Coverage Thresholds

Configured in `package.json` Jest settings:

| Metric | Threshold |
|--------|-----------|
| Branches | 70% |
| Functions | 75% |
| Lines | 75% |
| Statements | 75% |

## Quality Gates

### Automated (CI)
- **Unit tests**: Jest + React Testing Library (must pass)
- **Accessibility tests**: jest-axe (must pass, zero violations)
- **Visual regression**: Percy snapshot comparison (must be approved)
- **Type checking**: TypeScript strict mode (zero errors)
- **Linting**: ESLint with `@skyscanner/eslint-config-skyscanner` (zero errors)
- **Style linting**: Stylelint with `@skyscanner/stylelint-config-skyscanner` (zero errors)
- **Formatting**: Prettier (must match)
- **Danger CI**: Automated PR checks via `dangerfile.ts`

### Manual (Code Review)
- Design anchoring against Figma specs (see [CODE_REVIEW_GUIDELINES.md](../CODE_REVIEW_GUIDELINES.md))
- Accessibility DoD checklist
- API consistency with existing components
- Performance impact assessment

## Component Quality Checklist

A component is considered production-ready when:

- [ ] TypeScript strict mode compliant
- [ ] Unit tests meeting coverage thresholds
- [ ] `accessibility-test.tsx` with jest-axe
- [ ] Storybook stories covering all variants
- [ ] Percy visual test stories (prefixed "VisualTest")
- [ ] Figma Code Connect mapping (`.figma.tsx`)
- [ ] README with usage examples
- [ ] Keyboard navigation support
- [ ] RTL language support
- [ ] `data-backpack-ds-component` attribute

## Monitoring

| Tool | Purpose |
|------|---------|
| GitHub Actions | CI pipeline (build, test, lint) |
| Percy | Visual regression detection |
| Danger | PR automation and checks |
| npm audit | Dependency vulnerability scanning |
| zizmor | Security scanning workflow |
