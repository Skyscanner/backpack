# Implementation Plan: Phase 3 - Stories Colocation

**Package Branch**: `001-cleanup-dependencies` | **Date**: 2026-01-28 | **Spec**: [Phase 3 Implementation Plan](../../docs/implementation-plans/phase-3-stories-colocation.md)
**Input**: Stories migration from `examples/` to component `src/` directories

## Summary

Migrate 33 Storybook stories from the centralized `examples/` directory to their corresponding component `src/` directories. This colocation pattern aligns with Nx best practices, keeping related code together (component + tests + stories) for better maintainability and discoverability.

## Technical Context

**Framework**: React 18.3.1 with TypeScript 5.9.2
**Styling**: CSS Modules + Sass (modern API with `@use`)
**Testing**: Jest 30 + Testing Library + jest-axe
**Build Tools**: Webpack 5, Babel 7, Storybook 10.1.11
**Linting**: ESLint (@skyscanner/eslint-config-skyscanner), Stylelint
**Component Library**: Backpack Design System (Monorepo)
**Package Manager**: npm >=10.7.0
**Node Version**: >=18.20.4

## Constitution Check

*This phase involves infrastructure changes, not component development. Applicable checks:*

### Core Principles Compliance

- [x] **Component-First Architecture**: Stories will be colocated with components
- [x] **Naming Conventions**: Files keep existing names (`stories.tsx`)
- [x] **License Headers**: No new files created, existing headers preserved
- [x] **Modern Sass**: No Sass changes required
- [x] **Accessibility-First**: No accessibility changes
- [x] **TypeScript**: All files remain TypeScript
- [x] **SemVer**: No version bump required (internal restructuring)
- [x] **Deprecation Management**: N/A
- [x] **Test Coverage**: No test changes
- [x] **Documentation**: Storybook configuration updated

**No constitution violations. This is an internal restructuring following Nx best practices.**

## Phase 3: Stories Colocation

### Objective

Migrate stories from centralized `examples/` directory to component-local `src/` directories, following the colocation pattern recommended by Nx.

### Current State

```text
examples/
├── bpk-component-accordion/
│   ├── stories.tsx
│   └── examples.tsx
├── bpk-component-button/
│   ├── stories.tsx
│   └── examples.tsx
└── ... (33 components)
```

### Target State

```text
packages/bpk-component-accordion/
└── src/
    ├── BpkAccordion/
    │   ├── BpkAccordion.tsx
    │   ├── BpkAccordion-test.tsx
    │   └── ... (existing files)
    ├── stories.tsx          # ← Migrated from examples/
    └── examples.tsx         # ← Migrated from examples/

examples/
└── (empty or removed)
```

### Components with Stories (33 total)

| Component | Stories Location |
|-----------|------------------|
| bpk-component-accordion | examples/bpk-component-accordion/ |
| bpk-component-aria-live | examples/bpk-component-aria-live/ |
| bpk-component-autosuggestV2 | examples/bpk-component-autosuggestV2/ |
| bpk-component-blockquote | examples/bpk-component-blockquote/ |
| bpk-component-breadcrumb | examples/bpk-component-breadcrumb/ |
| bpk-component-bubble | examples/bpk-component-bubble/ |
| bpk-component-button | examples/bpk-component-button/ |
| bpk-component-card-button | examples/bpk-component-card-button/ |
| bpk-component-checkbox | examples/bpk-component-checkbox/ |
| bpk-component-chip | examples/bpk-component-chip/ |
| bpk-component-code | examples/bpk-component-code/ |
| bpk-component-datatable | examples/bpk-component-datatable/ |
| bpk-component-fieldset | examples/bpk-component-fieldset/ |
| bpk-component-floating-notification | examples/bpk-component-floating-notification/ |
| bpk-component-journey-arrow | examples/bpk-component-journey-arrow/ |
| bpk-component-label | examples/bpk-component-label/ |
| bpk-component-link | examples/bpk-component-link/ |
| bpk-component-modal | examples/bpk-component-modal/ |
| bpk-component-modal-v2 | examples/bpk-component-modal-v2/ |
| bpk-component-navigation-tab-group | examples/bpk-component-navigation-tab-group/ |
| bpk-component-overlay | examples/bpk-component-overlay/ |
| bpk-component-page-indicator | examples/bpk-component-page-indicator/ |
| bpk-component-panel | examples/bpk-component-panel/ |
| bpk-component-price-range | examples/bpk-component-price-range/ |
| bpk-component-segmented-control | examples/bpk-component-segmented-control/ |
| bpk-component-snippet | examples/bpk-component-snippet/ |
| bpk-component-switch | examples/bpk-component-switch/ |
| bpk-component-textarea | examples/bpk-component-textarea/ |
| bpk-component-theme-toggle | examples/bpk-component-theme-toggle/ |
| bpk-component-tooltip | examples/bpk-component-tooltip/ |
| bpk-component-visually-hidden | examples/bpk-component-visually-hidden/ |
| bpk-scrim-utils | examples/bpk-scrim-utils/ |
| bpk-stylesheets-fonts | examples/bpk-stylesheets-fonts/ |

### Implementation Steps

#### Step 1: Audit Stories Files

For each component in `examples/`:
1. List all files in the directory (stories.tsx, examples.tsx, *.module.scss)
2. Identify the corresponding package in `packages/`
3. Verify the target `src/` directory exists
4. Create migration mapping

#### Step 2: Migrate Stories Files

For each component:
```bash
# Use git mv to preserve history
git mv examples/bpk-component-{name}/stories.tsx packages/bpk-component-{name}/src/
git mv examples/bpk-component-{name}/examples.tsx packages/bpk-component-{name}/src/
git mv examples/bpk-component-{name}/*.module.scss packages/bpk-component-{name}/src/  # if exists
```

**Import Path Updates**: After moving, update any relative imports in stories files:
- `../../packages/bpk-component-{name}` → `.` or `./BpkComponentName`
- Component imports may need adjustment based on new location

#### Step 3: Update Storybook Configuration

Update `.storybook/main.ts`:

**Before**:
```typescript
const config: StorybookConfig = {
  stories: [
    '../examples/**/stories.@(ts|tsx|js|jsx)',
  ],
  // ...
};
```

**After**:
```typescript
const config: StorybookConfig = {
  stories: [
    '../packages/**/src/stories.@(ts|tsx|js|jsx)',
  ],
  // ...
};
```

#### Step 4: Update Percy Configuration

Check `.percy.yml` or Percy-related configuration for story path patterns:
- Update any patterns that reference `examples/`
- Ensure visual tests can find stories in new location

Percy test command in `package.json`:
```json
"percy-test": "percy storybook ./dist-storybook -i '/Visual\\stest\\s?([a-z]*)?/i'"
```
This should continue to work as it operates on the built storybook.

#### Step 5: Cleanup examples/ Directory

After successful migration and verification:
1. Remove empty directories from `examples/`
2. If `examples/` is completely empty, remove the directory
3. Update any documentation referencing `examples/` location

### Configuration Changes Summary

| File | Change |
|------|--------|
| `.storybook/main.ts` | Update `stories` array to `../packages/**/src/stories.@(ts|tsx|js|jsx)` |
| `.percy.yml` | Update if stories path is referenced |
| `examples/` | Delete after migration |

### Import Path Migration Pattern

Stories typically import components like:
```typescript
// Before (from examples/)
import BpkButton from '../../packages/bpk-component-button';

// After (from packages/bpk-component-button/src/)
import BpkButton from './BpkButton';
// or
import BpkButton from '../index';
```

Each stories file will need individual review to update imports correctly.

## Verification Checklist

- [ ] All 33 stories files migrated to `packages/*/src/`
- [ ] All import paths updated correctly
- [ ] Storybook configuration updated
- [ ] `npm run storybook` starts successfully
- [ ] All stories render correctly
- [ ] Percy visual tests run successfully
- [ ] `examples/` directory cleaned up
- [ ] No broken imports or references

## Rollback Plan

If issues occur:
```bash
git checkout HEAD -- examples/ packages/ .storybook/main.ts
```

## Dependencies

- **Depends on**: Phase 2 (Project Structure Consolidation) - Completed
- **Can run parallel to**: Phase 4 (to be planned)

## Notes

### Key Benefits of Colocation

1. **Discoverability**: Stories are found alongside components
2. **Maintainability**: Related code is in one place
3. **Nx Compatibility**: Follows Nx project boundary conventions
4. **Refactoring**: Easier to move/rename components with all related files

### Edge Cases

- **bpk-scrim-utils**: Utility package, not a component - may need special handling
- **bpk-stylesheets-fonts**: Stylesheet package - verify src/ directory exists
- **bpk-component-autosuggestV2**: Name includes version suffix - map correctly to package

### Files to Migrate per Component

Typical contents of `examples/bpk-component-{name}/`:
- `stories.tsx` - Storybook story definitions
- `examples.tsx` - Example component implementations
- `*.module.scss` - Story-specific styles (not all components have this)
