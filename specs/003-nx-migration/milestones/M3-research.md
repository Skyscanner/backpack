# M3: Storybook Colocation - Research

**Created**: 2026-01-27
**Phase**: Research & Discovery

## Current State Analysis

### Stories Structure

**Total example directories**: 92 in `examples/`

**Current structure** (`examples/bpk-component-button/`):
```
examples/bpk-component-button/
├── BpkButtonStory.module.css
├── BpkButtonStory.module.scss
├── examples.tsx
└── stories.tsx
```

**Current Storybook config** (`.storybook/main.ts`):
```typescript
stories: ['../examples/**/stories.@(ts|tsx|js|jsx)']
```

### File Types to Move

| File Type | Purpose | Count (approx) |
|-----------|---------|----------------|
| `stories.tsx` | Storybook story definitions | 92 |
| `examples.tsx` | Example implementations | 92 |
| `*.module.scss` | Story-specific styles | ~50 |
| `*.module.css` | Compiled styles | ~50 |

### Target Package Structure

Per the Backpack constitution, the target structure should be:

```
packages/bpk-component-button/
├── README.md
├── index.ts
├── docs/
└── src/
    ├── BpkButton/
    │   ├── BpkButton.tsx
    │   ├── BpkButton.module.scss
    │   ├── BpkButton-test.tsx
    │   └── accessibility-test.tsx
    ├── stories.tsx          ← NEW: moved from examples/
    ├── examples.tsx         ← NEW: moved from examples/
    └── BpkButtonStory.module.scss  ← NEW: moved from examples/
```

---

## Research Findings

### 1. Story File Location Decision

**Decision**: Move stories to `packages/bpk-component-*/src/` (not inside component subdirectory)

**Rationale**:
- Stories often test multiple exports from a package (e.g., `BpkButton`, `BpkButtonV2`)
- Placing at `src/` level allows stories to import from sibling directories
- Matches the pattern used in other large design systems

**Alternatives Considered**:
- Inside component directory (`src/BpkButton/stories.tsx`) - rejected because stories may cover multiple components
- At package root (`packages/bpk-component-button/stories.tsx`) - rejected because violates monorepo standard of keeping code in `src/`

### 2. Import Path Updates

**Decision**: Update relative imports to use new paths

**Current** (in examples/bpk-component-button/stories.tsx):
```typescript
import BpkButton from '../../packages/bpk-component-button';
```

**After** (in packages/bpk-component-button/src/stories.tsx):
```typescript
import BpkButton from './BpkButton';
// or
import BpkButton from '../index';
```

**Rationale**: Shorter, clearer import paths improve maintainability

### 3. Storybook Configuration Update

**Decision**: Update `main.ts` to find stories in new location

**New config**:
```typescript
stories: ['../packages/**/src/**/*.stories.@(ts|tsx|js|jsx)']
```

Or more specifically:
```typescript
stories: ['../packages/**/src/stories.@(ts|tsx|js|jsx)']
```

**Rationale**: Explicit path prevents accidentally picking up test files

### 4. Story Naming Convention

**Decision**: Keep `stories.tsx` and `examples.tsx` naming

**Rationale**:
- Consistent with existing codebase
- Clear separation of story definitions vs example components
- `stories.tsx` is recognized by Storybook tooling

### 5. Style File Handling

**Decision**: Move `*.module.scss` alongside stories

**Rationale**:
- Story-specific styles should stay with stories
- These are not component styles (those stay in component directory)
- Keeps story assets together

### 6. Migration Strategy

**Decision**: Batch migration with automation script

**Rationale**:
- 92 directories to move - manual is error-prone
- Script ensures consistent moves
- Can validate import path updates

**Script approach**:
```bash
# For each directory in examples/
# 1. Create target directory in packages/*/src/ if needed
# 2. Move stories.tsx, examples.tsx, *.module.scss
# 3. Update import paths in moved files
# 4. Verify no broken imports
```

---

## Compatibility Analysis

### Known Issues to Address

| Issue | Risk | Mitigation |
|-------|------|------------|
| Import paths break | High | Script to auto-update imports |
| Missing stories | Medium | Count stories before/after |
| Style imports break | Medium | Update relative paths in SCSS |
| Storybook build fails | High | Test locally before merge |

### Dependencies

- **M1 Required**: Nx must be initialized (for proper project analysis)
- **M2 Not Required**: Structure confirmation is about Nx projects, not story location

### Backwards Compatibility

- **Percy tests**: Will work - they snapshot rendered stories, not file locations
- **CI Storybook deploy**: Will work after config update
- **Developer workflow**: `npm run storybook` unchanged

---

## Implementation Recommendations

### Phase 1: Preparation

1. Count current stories: `find examples -name "stories.tsx" | wc -l`
2. Create migration script
3. Test script on 2-3 components manually

### Phase 2: Migration

1. Run migration script for all 92 directories
2. Update `.storybook/main.ts`
3. Update any shared imports in stories

### Phase 3: Verification

1. Run `npm run storybook` locally
2. Verify story count matches
3. Run `npm run storybook:dist` for production build
4. Visual check of Storybook UI

### Phase 4: Cleanup

1. Remove empty `examples/` directory
2. Update documentation references
3. Update any CI scripts referencing old paths

---

## Files to Update

### Configuration Files

| File | Change |
|------|--------|
| `.storybook/main.ts` | Update stories glob pattern |
| `.github/workflows/pr.yml` | Check for examples/ references |
| `README.md` | Update any examples/ references |

### Documentation

| File | Change |
|------|--------|
| `CONTRIBUTING.md` | Update story location instructions |
| `decisions/` | Consider adding storybook-colocation.md |

---

## References

- [Storybook CSF Documentation](https://storybook.js.org/docs/react/api/csf)
- [Nx React Storybook](https://nx.dev/recipes/storybook/overview-react)
- M3 Specification: `specs/003-nx-migration/milestones/M3-storybook-colocation.md`
