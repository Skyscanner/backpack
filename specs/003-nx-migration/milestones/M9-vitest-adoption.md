# M9: Vitest Adoption

**Priority**: P4
**Est. Effort**: Low
**Complexity**: Small
**Status**: ⚠️ OPTIONAL - Future Stage

> **Note**: This milestone is optional and recommended for a future stage. It should be done after M8 (Vite Adoption) as Vitest is designed to work with Vite.

## Overview

Replace Jest with Vitest for faster test execution with zero-config Jest API compatibility.

## Why This Milestone?

### Strategic Context

Vitest is a Vite-native testing framework that:

- **Shares Vite config**: Same transforms, resolvers, and plugins
- **Jest-compatible API**: Most tests work unchanged
- **Faster execution**: Leverages Vite's speed benefits
- **Modern**: ESM-native, TypeScript-first

### Why We Need Each Step

| Step | Why It's Needed |
|------|-----------------|
| Create `vitest.config.ts` | Configures test runner, coverage, and environment |
| Install dependencies | `vitest`, coverage providers, DOM environment |
| Run existing tests | Verifies Jest compatibility - most tests should pass unchanged |
| Verify coverage | Ensures thresholds are still met (70% branches, 75% functions/lines) |
| Remove Jest | Eliminates duplicate test frameworks |

### What Happens If We Skip This?

Without Vitest adoption:
- Jest continues working fine
- Slightly slower test execution
- Two different configurations for build (Vite) and test (Jest)
- Less streamlined developer experience

### Why It's Optional

This milestone is marked optional because:
- Jest works well currently
- Requires M8 (Vite) first
- Marginal improvement for effort required
- Can be deferred indefinitely

### Dependency on M8

Vitest is designed to work with Vite. While it can work standalone, the primary benefit comes from sharing configuration:

```ts
// vitest.config.ts
import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(viteConfig, defineConfig({
  test: {
    // test-specific config
  }
}))
```

---

## User Story

As a Backpack developer, I want tests to run with Vitest so that I get faster test execution with zero-config Jest compatibility.

---

## Acceptance Scenarios

1. **Given** `vitest.config.ts` is created, **When** Vitest dependencies are installed, **Then** test runner is configured

2. **Given** Vitest is configured, **When** `vitest run` is executed, **Then** all existing tests pass

3. **Given** tests pass, **When** coverage is calculated, **Then** thresholds are met (70% branches, 75% functions/lines/statements)

4. **Given** Vitest is working, **When** Jest is removed, **Then** all CI tests use Vitest

---

## Verification Criteria

- [ ] `vitest.config.ts` exists
- [ ] All tests pass with Vitest
- [ ] Coverage thresholds met
- [ ] Jest configuration removed
- [ ] CI updated to use `vitest run`
- [ ] Documentation updated

---

## Migration Compatibility

### What Works Automatically

| Jest Feature | Vitest Support |
|--------------|----------------|
| `describe`, `it`, `test` | ✅ Same API |
| `expect` assertions | ✅ Same API (chai-based) |
| `beforeEach`, `afterEach` | ✅ Same API |
| `jest.fn()`, `jest.mock()` | ✅ `vi.fn()`, `vi.mock()` |
| Snapshot testing | ✅ Same API |

### What May Need Changes

| Jest Feature | Vitest Equivalent |
|--------------|-------------------|
| `jest.` globals | `vi.` globals or import from `vitest` |
| Manual mocks (`__mocks__/`) | Same, but may need config |
| `moduleNameMapper` | Vite's `resolve.alias` |
| `setupFilesAfterEnv` | `setupFiles` in vitest config |

### Example Migration

**Jest**:
```ts
jest.mock('./api')
const mockFn = jest.fn()
```

**Vitest**:
```ts
vi.mock('./api')
const mockFn = vi.fn()
```

Or with auto-import (no changes needed):
```ts
// vitest.config.ts
export default defineConfig({
  test: {
    globals: true
  }
})
```

---

## Configuration Example

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      thresholds: {
        branches: 70,
        functions: 75,
        lines: 75,
        statements: 75
      }
    },
    setupFiles: ['./scripts/vitest/setup.ts']
  }
})
```

---

## Risks to Monitor

| Risk | Impact | Mitigation |
|------|--------|------------|
| Incompatible test patterns | Some tests fail | Review failures individually; most are minor syntax |
| Coverage provider differences | Different numbers | Verify equivalence; adjust thresholds if needed |
| Missing Jest plugin | Feature X unavailable | Research Vitest ecosystem |

---

## Rollback Plan

If issues arise:
1. Keep Jest as primary test runner
2. Remove Vitest config
3. Continue using Jest indefinitely

---

## Dependencies

- M8: Vite Adoption (Vitest should share Vite config)

## Blocks

- None (this is a leaf milestone)
