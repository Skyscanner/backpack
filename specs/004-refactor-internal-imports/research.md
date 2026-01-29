# Research: Refactor Internal Source Imports

**Feature**: `004-refactor-internal-imports`
**Date**: 2026-01-27
**Purpose**: Document research findings for module encapsulation refactoring

## Executive Summary

This research identifies all internal `src` import violations in the Backpack codebase and determines what exports need to be added to component index files to enable proper module encapsulation.

## Current State Analysis

### Import Violations Identified

**Total violations in packages directory**: 17 imports across 14 files

| File | Violation | Import Pattern |
|------|-----------|----------------|
| `bpk-component-datepicker/src/BpkDatepicker-test.tsx` | `format` | `../../bpk-component-calendar/src/date-utils` |
| `bpk-component-datepicker/src/form-test.tsx` | `format` | `../../bpk-component-calendar/src/date-utils` |
| `bpk-component-datepicker/src/accessibility-test.tsx` | `format` | `../../bpk-component-calendar/src/date-utils` |
| `bpk-component-snippet/src/BpkSnippet.tsx` | `BpkText`, `TEXT_STYLES` | `../../bpk-component-text/src/BpkText` |
| `bpk-component-snippet/src/accessibility-test.tsx` | `TEXT_STYLES` | `../../bpk-component-text/src/BpkText` |
| `bpk-component-chip-group/src/BpkMultiSelectChipGroup.tsx` | `BpkText`, `TEXT_STYLES` | `../../bpk-component-text/src/BpkText` |
| `bpk-component-bottom-sheet/src/BpkBottomSheet.tsx` | `TEXT_STYLES` | `../../bpk-component-text/src/BpkText` |
| `bpk-component-price-range/src/BpkPriceRange.tsx` | `BpkText`, `TEXT_STYLES` | `../../bpk-component-text/src/BpkText` |
| `bpk-component-price-range/src/BpkPriceMarker.tsx` | `BpkText`, `TEXT_STYLES` | `../../bpk-component-text/src/BpkText` |
| `bpk-component-navigation-bar/src/BpkNavigationBar.tsx` | `Tag`, `TextStyle` (types) | `../../bpk-component-text/src/BpkText` |
| `bpk-component-overlay/src/BpkOverlay.figma.tsx` | `BpkImage` | `../../bpk-component-image/src/BpkImage` |
| `bpk-component-navigation-tab-group/src/BpkNavigationTabGroup.tsx` | `BpkBubble` | `../../bpk-component-bubble/src/BpkBubble` |
| `bpk-component-inset-banner/src/BpkInsetBannerV2/BpkInsetBannerSponsored.tsx` | `PADDING_TYPE` | `../../../bpk-component-bottom-sheet/src/BpkBottomSheet` |
| `bpk-component-inset-banner/src/BpkInsetBannerV2/BpkInsetBannerSponsored.tsx` | `BpkText`, `TEXT_STYLES` | `../../../bpk-component-text/src/BpkText` |
| `bpk-component-inset-banner/src/BpkInsetBanner.tsx` | `BpkPopover` | `../../bpk-component-popover/src/BpkPopover` |
| `bpk-component-inset-banner/src/BpkInsetBanner.tsx` | `BpkText`, `TEXT_STYLES` | `../../bpk-component-text/src/BpkText` |

### Component Index Export Analysis

| Component | Currently Exported | Needs to Export |
|-----------|-------------------|-----------------|
| `bpk-component-text` | `TEXT_STYLES`, `TEXT_COLORS`, default (BpkText) | Add: `Tag`, `TextStyle` (types) |
| `bpk-component-calendar` | `CALENDAR_SELECTION_TYPE`, `composeCalendar`, `DateUtils`, etc. | Add: `format` from date-utils |
| `bpk-component-bottom-sheet` | `PADDING_TYPE`, `BpkBottomSheetProps`, default | None (already exported) |
| `bpk-component-bubble` | `BpkBubbleProps`, default | Add: `BpkBubble` (named export) |
| `bpk-component-popover` | `BpkPopoverProps`, `themeAttributes`, default | Add: `BpkPopover` (named export) |
| `bpk-component-image` | `BpkBackgroundImage`, `withLazyLoading`, etc., default | Add: `BpkImage` (named export) |

## Path Alias Configuration

The `@backpack/*` path aliases are already configured:

**Jest Configuration** (package.json):
```json
"moduleNameMapper": {
  "^@backpack/(.*)$": "<rootDir>/packages/$1"
}
```

**TypeScript Configuration**: Path aliases were set up in Phase 0.2.

## Decisions Made

### Decision 1: Export Strategy for Components

**Decision**: Add named exports alongside default exports for components that need to be imported by other packages.

**Rationale**: This allows importing either way:
- `import BpkText from '@backpack/bpk-component-text'` (default)
- `import { BpkText, TEXT_STYLES } from '@backpack/bpk-component-text'` (named)

**Alternatives Considered**:
- Only default exports: Would require separate import statements
- Re-export all internal modules: Would expose implementation details

### Decision 2: Type Export Strategy

**Decision**: Export types as `export type { Tag, TextStyle }` for type-only imports.

**Rationale**: Ensures proper tree-shaking and makes it clear these are type-only exports.

### Decision 3: Examples Directory

**Decision**: Examples will also be refactored to use public package imports.

**Rationale**: Examples serve as documentation and should model best practices. The 82+ examples directory files will be updated as part of this refactoring.

### Decision 4: ESLint Configuration

**Decision**: Add `no-restricted-imports` rule to prevent future violations.

**Rationale**: Prevents regression and enforces the module boundary pattern going forward.

**Note**: ESLint configuration is inherited from `@skyscanner/eslint-config-skyscanner`. The `no-restricted-imports` rule will need to be added to the project's ESLint configuration.

## Implementation Notes

### Order of Operations

1. **Phase 1**: Add exports to component index files
   - This must happen first so imports can be refactored

2. **Phase 2**: Update imports in package files
   - 14 files in packages directory

3. **Phase 3**: Update imports in examples directory
   - 82+ files

4. **Phase 4**: Add ESLint rule
   - Prevent future violations

### Circular Dependency Check

Reviewed dependency graph - no circular dependencies will be introduced by this refactoring:
- `bpk-component-text` is a leaf component (no Backpack dependencies)
- `bpk-component-calendar` depends only on foundations
- `bpk-component-bottom-sheet` depends on `bpk-component-text`
- `bpk-component-bubble` is a leaf component
- `bpk-component-popover` depends on `bpk-react-utils`
- `bpk-component-image` is a leaf component

### Testing Strategy

- Run existing tests after each phase to catch regressions
- TypeScript compilation will validate import correctness
- ESLint rule will catch any missed violations

## References

- **Implementation Plan**: `docs/implementation-plans/phase-0.3-refactor-internal-imports.md`
- **Path Aliases**: Phase 0.2 TypeScript path aliases
- **Constitution**: `.specify/memory/constitution.md` - API Encapsulation principle
