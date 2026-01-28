# Nx Integration

Backpack uses Nx for task orchestration and caching.

## Quick Start

```bash
# View dependency graph
npx nx graph

# All existing npm scripts continue to work
npm run build
npm run test
npm run lint
```

## Why Nx?

- Faster CI with computation caching
- Dependency graph visualization
- Future: affected-based test execution (M5)

## Current Status

- [x] M1: Nx Initialization (this milestone)
- [ ] M2: Project Structure Confirmation
- [ ] M3: Storybook Colocation
- [ ] M4: Components as Nx Projects
- [ ] M5: Static Checks via Nx
- [ ] M6: Module Boundaries

## More Information

- [Nx Documentation](https://nx.dev/docs)
- [Adding Nx to Existing Project](https://nx.dev/docs/getting-started/start-with-existing-project)
- [Backpack Migration Spec](../specs/003-nx-migration/spec.md)
