# Implementation Plan: TypeScript Migration for BpkTable

**Package Branch**: `090-table-typescript` | **Date**: 2026-01-14 | **Spec**: [spec.md](./spec.md)

---

## Summary

Migrate `bpk-component-table` and its examples from Flow to TypeScript while preserving 100% API compatibility. All six table components (BpkTable, BpkTableHead, BpkTableBody, BpkTableRow, BpkTableCell, BpkTableHeadCell) will be converted with zero breaking changes. PropTypes retained for runtime validation per constitution. All test files migrated to `.tsx` extension with identical test logic. Styling unchanged.

---

## Technical Context

**Framework**: React 18.3.1 with TypeScript 5.9.2
**Styling**: CSS Modules + Sass (modern API with `@use`) - **NO CHANGES**
**Testing**: Jest 30 + Testing Library + jest-axe
**Build Tools**: Webpack 5, Babel 7
**Linting**: ESLint (@skyscanner/eslint-config-skyscanner), Stylelint
**Component Library**: Backpack Design System (Monorepo)
**Package Manager**: npm >=10.7.0
**Node Version**: >=18.20.4
**Target Browsers**: Chrome 109+, Edge 129+, Firefox 131+, Safari 15+, Samsung 26+
**Performance Goals**: Maintain test coverage (70% branches, 75% functions/lines/statements), bundle size within 1%
**Constraints**: Zero API changes, all tests pass without modification, snapshots identical
**Scale/Scope**: Migration of 6 components + examples in `packages/bpk-component-table/`

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Core Principles Compliance

- [x] **Component-First Architecture**: Package exists in `packages/bpk-component-table/`
- [x] **Naming Conventions**: Components use PascalCase, `.module.scss` for styles, `*-test.tsx` for tests (after migration)
- [x] **Modern Sass**: Already using `@use` syntax with granular imports from `bpk-mixins` - **NO CHANGES**
- [x] **Accessibility-First**: Includes `accessibility-test.js` (will migrate to `.tsx`)
- [ ] **TypeScript**: Will be migrated from Flow to TypeScript (**IN PROGRESS**)
- [x] **SemVer**: PATCH version (zero API changes, code quality improvement only)
- [x] **Deprecation Management**: N/A - no deprecations
- [x] **Test Coverage**: Currently meets 70% branches, 75% functions/lines/statements (will maintain)
- [x] **Documentation**: Includes README.md, Storybook story (minimal updates for TypeScript note)

### Technology Compliance

- [x] **React Version**: Using React 18.3.1
- [x] **TypeScript Version**: Will use TypeScript 5.9.2
- [x] **CSS Modules**: All styles use `.module.scss` extension - **NO CHANGES**
- [x] **rem Units**: All sizing values use `rem` - **NO CHANGES**
- [x] **Design Tokens**: Uses tokens from `@skyscanner/bpk-foundations-web` and `bpk-mixins` - **NO CHANGES**
- [x] **BEM Naming**: CSS classes follow BEM with `bpk-` prefix - **NO CHANGES**
- [x] **RTL Support**: Component supports right-to-left languages - **NO CHANGES**
- [x] **Browser Support**: Works on all supported browsers

### Testing Compliance

- [x] **Unit Tests**: Jest + Testing Library tests in `*-test.tsx` (will migrate from `.js`)
- [x] **Accessibility Tests**: jest-axe tests in `accessibility-test.tsx` (will migrate from `.js`)
- [ ] **Visual Tests**: N/A - table components don't use images
- [x] **Snapshot Tests**: Included for all components (must remain identical)
- [x] **Coverage Thresholds**: Meets required percentages

### Documentation Compliance

- [x] **British English**: Prose uses British English, code uses US English
- [x] **Sentence Case**: Titles use sentence case
- [x] **<100 Words**: Component description under 100 words
- [x] **Storybook**: Stories in `examples/bpk-component-table/stories.js` (will migrate to `.tsx`)
- [x] **JSDoc**: Public APIs documented
- [ ] **Figma Connect**: N/A - table components

---

## Project Structure

### Documentation (this component)

```text
specs/090-table-typescript/
├── spec.md              # Component specification ✅
├── plan.md              # This file ✅
├── research.md          # Phase 0 output ✅
├── api-design.md        # Phase 1 output ✅
├── styling-guide.md     # Phase 1 output ✅
├── checklists/
│   └── requirements.md  # Spec quality checklist ✅
└── tasks.md             # Phase 2 output (NOT created by /speckit.plan) ⏳
```

### Package Structure (Backpack Monorepo)

```text
packages/bpk-component-table/
├── README.md                        # Minor update (TypeScript note)
├── package.json                     # No changes needed
├── index.js → index.ts              # Migrate entry point
└── src/
    ├── BpkTable.js → BpkTable.tsx               # Migrate component
    ├── BpkTable.module.scss                      # NO CHANGES
    ├── BpkTable-test.js → BpkTable-test.tsx     # Migrate test
    ├── BpkTableHead.js → BpkTableHead.tsx       # Migrate component
    ├── BpkTableHead.module.scss                  # NO CHANGES
    ├── BpkTableHead-test.js → BpkTableHead-test.tsx  # Migrate test
    ├── BpkTableBody.js → BpkTableBody.tsx       # Migrate component
    ├── BpkTableBody.module.scss                  # NO CHANGES
    ├── BpkTableBody-test.js → BpkTableBody-test.tsx  # Migrate test
    ├── BpkTableRow.js → BpkTableRow.tsx         # Migrate component
    ├── BpkTableRow.module.scss                   # NO CHANGES
    ├── BpkTableRow-test.js → BpkTableRow-test.tsx    # Migrate test
    ├── BpkTableCell.js → BpkTableCell.tsx       # Migrate component
    ├── BpkTableCell.module.scss                  # NO CHANGES
    ├── BpkTableCell-test.js → BpkTableCell-test.tsx  # Migrate test
    ├── BpkTableHeadCell.js → BpkTableHeadCell.tsx  # Migrate component
    ├── BpkTableHeadCell.module.scss              # NO CHANGES
    ├── BpkTableHeadCell-test.js → BpkTableHeadCell-test.tsx  # Migrate test
    ├── accessibility-test.js → accessibility-test.tsx  # Migrate test
    └── __snapshots__/                            # Must remain identical
```

### Storybook Examples

```text
examples/bpk-component-table/
├── examples.js → examples.tsx       # Migrate examples
└── stories.js → stories.tsx         # Migrate stories
```

---

## Complexity Tracking

**No constitution violations. Migration follows all Backpack standards.**

This is a straightforward Flow-to-TypeScript migration with:
- Zero API changes
- Zero style changes
- Zero behavior changes
- PropTypes retained per constitution
- Test logic preserved (file extensions changed)

---

## Phase 0: Research & Discovery ✅ COMPLETE

**Deliverable**: [`research.md`](./research.md)

### Key Research Findings

1. **Type Organization**: Inline types in component files (not separate common-types file)
2. **Rest Props Pattern**: `[rest: string]: any; // Inexact rest. See decisions/inexact-rest.md`
3. **Test File Extensions**: All tests use `.tsx` (not `.ts`)
4. **PropTypes Retention**: Keep PropTypes alongside TypeScript for runtime validation
5. **Type Exports**: Named exports (`export type BpkTableProps = {...}`)

### Flow to TypeScript Conversion Patterns

| Flow | TypeScript |
|------|------------|
| `Node` | `React.ReactNode` |
| `?string` | `string \| null` or `string \| undefined` |
| `?boolean` | `boolean \| undefined` |
| `...rest` | `[rest: string]: any` |
| `/* @flow strict */` | Remove entirely |

---

## Phase 1: Design & Planning ✅ COMPLETE

### API Design ✅

**Deliverable**: [`api-design.md`](./api-design.md)

All six components have TypeScript type interfaces defined:

1. **BpkTable**: `BpkTableProps`
2. **BpkTableHead**: `BpkTableHeadProps`
3. **BpkTableBody**: `BpkTableBodyProps`
4. **BpkTableRow**: `BpkTableRowProps`
5. **BpkTableCell**: `BpkTableCellProps` (includes `wordBreak?: boolean`)
6. **BpkTableHeadCell**: `BpkTableHeadCellProps` (includes `wordBreak?: boolean`)

**Common Props Pattern**:
```typescript
type BpkTableComponentProps = {
  children: React.ReactNode;
  className?: string | null;
  [rest: string]: any; // Inexact rest
};
```

**Type Export Pattern**:
```typescript
export type BpkTableProps = { /* ... */ };
export const BpkTable = (props: BpkTableProps) => { /* ... */ };
```

### Styling Design ✅

**Deliverable**: [`styling-guide.md`](./styling-guide.md)

**NO STYLING CHANGES** - All Sass files remain identical.

Verified constitution compliance:
- ✅ Modern Sass API (`@use` syntax)
- ✅ CSS Modules (`.module.scss`)
- ✅ rem units for sizing
- ✅ Design tokens from `@skyscanner/bpk-foundations-web`
- ✅ BEM naming with `bpk-` prefix
- ✅ RTL support

### Code Examples

**No separate example files created** - Migration patterns documented in research.md and api-design.md

---

## Phase 2: Task Breakdown ⏳

**Objective**: Create detailed implementation tasks

**Note**: This phase is executed by `/speckit.tasks` command, NOT by `/speckit.plan`

**Deliverable**: `tasks.md` with sequenced tasks for:
1. Component file migrations (`.js` → `.tsx`)
2. Test file migrations (`.js` → `.tsx`)
3. Example file migrations (`.js` → `.tsx`)
4. Entry point migration (`index.js` → `index.ts`)
5. README updates (TypeScript note)
6. Build verification
7. Test execution (all tests must pass)
8. Bundle size verification

---

## Dependencies

### Internal Backpack Dependencies (UNCHANGED)

**Design Foundations**:
- `@skyscanner/bpk-foundations-web`: Design tokens
- `packages/bpk-mixins/`: Sass mixins

**React Utilities**:
- `bpk-react-utils`: cssModules utility

**No new dependencies added**

### External Dependencies (UNCHANGED)

**Peer Dependencies**:
- `react: ^18.3.1`
- `react-dom: ^18.3.1`

**Runtime Dependencies**:
- `prop-types`: Retained for runtime validation

**Development Dependencies**:
- TypeScript, Jest, Testing Library, jest-axe (already in project)
- `@types/react`, `@types/prop-types` (may already exist)

---

## Testing Strategy

### Unit Tests (Migrated to `.tsx`)

**Framework**: Jest 30 + Testing Library

**Critical Requirement**: All test logic MUST remain identical. Only file extension changes.

**Files**:
- `BpkTable-test.tsx` (was `.js`)
- `BpkTableHead-test.tsx` (was `.js`)
- `BpkTableBody-test.tsx` (was `.js`)
- `BpkTableRow-test.tsx` (was `.js`)
- `BpkTableCell-test.tsx` (was `.js`)
- `BpkTableHeadCell-test.tsx` (was `.js`)

**Test Coverage** (must maintain):
- 70% branches
- 75% functions/lines/statements

**Snapshot Tests**: Must produce byte-identical snapshots

### Accessibility Tests (Migrated to `.tsx`)

**Framework**: jest-axe

**File**: `accessibility-test.tsx` (was `.js`)

**Critical Requirement**: Test logic identical, all tests pass

### Build Verification

1. TypeScript compilation succeeds without errors
2. `.d.ts` declaration files generated
3. Bundle size within 1% of original
4. All linting passes (ESLint, Stylelint)

### Migration Verification Checklist

- [ ] All `.js` files renamed to `.tsx`/`.ts`
- [ ] All Flow annotations removed (`/* @flow strict */`, `// $FlowFixMe`)
- [ ] All TypeScript types defined inline
- [ ] All types exported with components
- [ ] PropTypes retained alongside TypeScript
- [ ] All tests pass without modification
- [ ] All snapshots identical
- [ ] No TypeScript compilation errors
- [ ] Bundle size unchanged (within 1%)
- [ ] Examples work in Storybook
- [ ] README updated with TypeScript note

---

## Documentation Requirements

### README.md (Minor Update)

**Changes**: Add TypeScript support note (~5 lines)

**Example Addition**:
```markdown
## TypeScript

This component is written in TypeScript and provides its own type definitions. TypeScript users benefit from autocomplete and type checking:

\`\`\`typescript
import { BpkTable, type BpkTableProps } from '@skyscanner/backpack-web/bpk-component-table';
\`\`\`
```

**NO other README changes needed**

### Storybook Stories (Migrated to `.tsx`)

**Files**:
- `examples/bpk-component-table/examples.tsx` (was `.js`)
- `examples/bpk-component-table/stories.tsx` (was `.js`)

**Changes**:
- File extension to `.tsx`
- TypeScript type annotations where helpful
- Story logic unchanged

**Visual output must be pixel-perfect identical**

### JSDoc Comments (Preserved)

**Changes**: Ensure existing JSDoc compatible with TSDoc

```typescript
/**
 * BpkTable is a table component for displaying tabular data.
 *
 * @example
 * <BpkTable>
 *   <BpkTableHead>...</BpkTableHead>
 *   <BpkTableBody>...</BpkTableBody>
 * </BpkTable>
 */
export type BpkTableProps = { /* ... */ };
```

---

## Migration & Versioning

### Version Determination

**This migration is**: **PATCH** version bump

**Rationale** (per `decisions/versioning-rules.md`):
- ✅ NO API changes (props, exports, defaults identical)
- ✅ NO new features
- ✅ NO visual changes
- ✅ NO behavior changes
- ✅ Code quality improvement only (Flow → TypeScript)

**Version bump for**: `@skyscanner/backpack-web` (PATCH)

### Breaking Changes

**None** - This is a non-breaking migration

### Deprecations

**None** - No APIs deprecated

### Migration Guide

**Not needed** - Consumers require zero code changes

JavaScript consumers: No changes
TypeScript consumers: Automatically get improved types

---

## Release Checklist

Before releasing this migration:

- [ ] All constitution checks pass
- [ ] All 6 components migrated to TypeScript
- [ ] All 6 component test files migrated to `.tsx`
- [ ] Accessibility test migrated to `.tsx`
- [ ] Examples migrated to `.tsx`
- [ ] Entry point migrated to `.ts`
- [ ] All tests pass (100% pass rate)
- [ ] All snapshots identical
- [ ] Test coverage maintained (70% branches, 75% functions/lines/statements)
- [ ] TypeScript compiles without errors/warnings
- [ ] ESLint and Stylelint pass
- [ ] `.d.ts` files generated correctly
- [ ] Bundle size within 1% of original
- [ ] README updated with TypeScript note
- [ ] Storybook stories work correctly
- [ ] PropTypes retained
- [ ] No new dependencies added
- [ ] Version bump is PATCH
- [ ] Changelog updated
- [ ] PR approved and merged

---

## Notes

### Key Migration Principles

1. **API Preservation**: Zero changes to props, exports, or behavior
2. **Type Accuracy**: TypeScript types match Flow types semantically
3. **Test Preservation**: All test logic identical, only extensions change
4. **Zero Breaking Changes**: Consumers require zero code changes
5. **Bundle Size**: Maintain same bundle size (within 1%)
6. **PropTypes Retention**: Keep prop-types per constitution principle V
7. **Inline Types**: Define types in component files, not separate files

### Migration Steps (High-Level)

1. **Remove Flow**: Delete `/* @flow strict */` and `// $FlowFixMe` comments
2. **Rename Files**: `.js` → `.tsx` for components/tests, `.js` → `.ts` for index
3. **Convert Types**: Flow types → TypeScript types (inline in files)
4. **Export Types**: Add `export type` for all component prop types
5. **Retain PropTypes**: Keep all existing PropTypes unchanged
6. **Update Imports**: `type { Node } from 'react'` → `React.ReactNode`
7. **Verify Tests**: Run all tests, ensure 100% pass rate
8. **Check Snapshots**: Ensure byte-identical snapshots
9. **Verify Build**: TypeScript compilation + `.d.ts` generation
10. **Measure Bundle**: Confirm within 1% of original

### Common Pitfalls to Avoid

1. ❌ Changing test logic → ✅ Only change file extension
2. ❌ Modifying snapshots → ✅ Snapshots must be identical
3. ❌ Removing PropTypes → ✅ Retain PropTypes per constitution
4. ❌ Separate type files → ✅ Inline types in components
5. ❌ Using `any` without comment → ✅ Add `// Inexact rest` comment
6. ❌ Changing API → ✅ Zero API changes allowed
7. ❌ Modifying styles → ✅ Zero style changes
8. ❌ Adding dependencies → ✅ No new dependencies

---

## References

- **Spec**: [`spec.md`](./spec.md)
- **Research**: [`research.md`](./research.md)
- **API Design**: [`api-design.md`](./api-design.md)
- **Styling Guide**: [`styling-guide.md`](./styling-guide.md)
- **Constitution**: `.specify/memory/constitution.md` (Principle V)
- **Decisions**: `decisions/inexact-rest.md`
- **Current Implementation**: `packages/bpk-component-table/`
- **Similar Migrations**: `packages/bpk-component-button/`, `packages/bpk-component-calendar/`
