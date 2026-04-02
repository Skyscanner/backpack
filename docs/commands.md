# Commands Reference

> **Load this doc when:** running builds, tests, lint, or any CLI operation against the repo.

---

## Development

```bash
# Install dependencies
npm install

# Run Storybook (component development environment)
npm run storybook

# Type check
npm run typecheck
```

## Build

```bash
# Build all packages
npm run build
```

## Testing

```bash
# Run full test suite
npm run jest

# Run tests for a specific component
npm run jest -- --testPathPattern=<component-name>

# Run all tests (alias)
npm test
```

## Verification (run in this order for a full check)

```bash
npm run lint
npm run check-react-versions
npm run check-bpk-dependencies
npm run jest
```

All four must pass with exit code 0 before a slice can be committed. See `docs/templates/verify.md` for the full verification protocol.

## Lint

```bash
npm run lint
```

## Dependency Checks

```bash
# Verify React version compatibility across packages
npm run check-react-versions

# Verify Backpack internal dependency rules are met
npm run check-bpk-dependencies
```
