# Phase 0: Research & Discovery - TypeScript Migration for BpkTable

**Date**: 2026-01-14
**Feature**: TypeScript Migration for bpk-component-table
**Objective**: Document Flow to TypeScript migration patterns from existing Backpack components

---

## Research Summary

This is a **migration project** converting existing Flow-typed components to TypeScript while preserving 100% API compatibility. Research focused on examining TypeScript patterns in BpkButton and BpkCalendar.

---

## Key Decisions

### 1. Type Organization Pattern

**Decision**: Define types inline within each component file (not in separate common-types file)

**Rationale**:
- Clarification from spec: "Define types inline within each component file (like BpkCalendar does)"
- Table components have simple, independent prop structures
- No shared types between components (each has distinct props)
- Inline types reduce file complexity for straightforward migrations

**Architecture Decision Reference**: Spec clarifications session 2026-01-14

**Implementation**:
```typescript
// BpkTable.tsx
export type BpkTableProps = {
  children: React.ReactNode;
  className?: string | null;
  [rest: string]: any;
};

export const BpkTable = ({ children, className = null, ...rest }: BpkTableProps) => {
  // implementation
};
```

**Alternatives Considered**:
- **Centralized common-types.tsx**: Rejected - adds unnecessary file for simple migration; used in BpkButton for complex enums
- **No type exports**: Rejected - consumers need access to types for composition

---

### 2. Rest Props Typing

**Decision**: Use `[rest: string]: any; // Inexact rest. See decisions/inexact-rest.md`

**Rationale**:
- Per `decisions/inexact-rest.md` and spec clarifications
- Matches existing BpkButton pattern
- Allows spreading HTML attributes to underlying elements
- **Fallback strategy**: If Storybook's react-docgen fails, switch to intersection type

**Architecture Decision Reference**: `decisions/inexact-rest.md`

**Implementation**:
```typescript
type BpkTableProps = {
  children: React.ReactNode;
  className?: string | null;
  [rest: string]: any; // Inexact rest. See decisions/inexact-rest.md
};
```

**Fallback** (if Storybook breaks):
```typescript
type BpkTableProps = {
  children: React.ReactNode;
  className?: string | null;
} & React.HTMLAttributes<HTMLTableElement>;
```

---

### 3. Test File Extensions

**Decision**: Use `.tsx` extension for ALL test files

**Rationale**:
- Clarification from spec: "Use `.tsx` extension for all test files (matches BpkButton pattern)"
- All table tests render React components using Testing Library
- Consistent with BpkButton: `BpkButton-test.tsx`, `accessibility-test.tsx`

**Implementation**:
- `BpkTable-test.tsx` (was `BpkTable-test.js`)
- `BpkTableHead-test.tsx` (was `BpkTableHead-test.js`)
- `BpkTableBody-test.tsx` (was `BpkTableBody-test.js`)
- `BpkTableRow-test.tsx` (was `BpkTableRow-test.js`)
- `BpkTableCell-test.tsx` (was `BpkTableCell-test.js`)
- `BpkTableHeadCell-test.tsx` (was `BpkTableHeadCell-test.js`)
- `accessibility-test.tsx` (was `accessibility-test.js`)

---

### 4. PropTypes Strategy

**Decision**: Retain PropTypes for runtime validation

**Rationale**:
- **Constitution Principle V**: "Maintain both TypeScript types and prop-types during migration"
- **Spec requirement MIG-004**: "PropTypes MUST be retained for runtime validation"
- Provides runtime safety for JavaScript consumers
- Gradual migration strategy across Backpack

**Implementation**:
```typescript
import PropTypes from 'prop-types';

export type BpkTableProps = {
  children: React.ReactNode;
  className?: string | null;
  [rest: string]: any;
};

export const BpkTable = ({ children, className = null, ...rest }: BpkTableProps) => {
  // implementation
};

BpkTable.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
```

**Note**: Keep existing PropTypes declarations unchanged

---

### 5. Type Export Pattern

**Decision**: Export types alongside component exports using named exports

**Rationale**:
- Clarification from spec: "Export types alongside component exports in each file"
- Enables consumers to import types for composition
- Matches TypeScript best practices

**Implementation**:
```typescript
// BpkTable.tsx
export type BpkTableProps = { /* ... */ };
export const BpkTable = (props: BpkTableProps) => { /* ... */ };

// Consumer usage
import { BpkTable, type BpkTableProps } from '@skyscanner/backpack-web/bpk-component-table';
```

---

## Flow to TypeScript Conversion Patterns

### Type Mapping Reference

| Flow Type | TypeScript Type | Example |
|-----------|----------------|---------|
| `Node` | `React.ReactNode` | children prop |
| `?string` | `string \| null` or `string \| undefined` | className (nullable) |
| `?boolean` | `boolean \| undefined` | wordBreak (optional) |
| `...rest` | `[rest: string]: any` | HTML attributes |
| `/* @flow strict */` | Remove entirely | File header |
| `// $FlowFixMe` | Remove or fix properly | Comments |

### Default Values Pattern

Flow:
```javascript
const BpkTable = ({children, className = null, ...rest}: Props) => {
```

TypeScript (unchanged):
```typescript
const BpkTable = ({children, className = null, ...rest}: BpkTableProps) => {
```

**Key**: Default values remain identical to preserve behavior

---

## Component-Specific Patterns

### All Six Components Follow Same Pattern

1. **BpkTable**: Container, renders `<table>`
2. **BpkTableHead**: Renders `<thead>`
3. **BpkTableBody**: Renders `<tbody>`
4. **BpkTableRow**: Renders `<tr>`
5. **BpkTableCell**: Renders `<td>`, has optional `wordBreak` prop
6. **BpkTableHeadCell**: Renders `<th>`, has optional `wordBreak` prop

**Common Props** (all 6):
- `children: React.ReactNode` (required)
- `className?: string | null` (optional, default: `null`)
- `[rest: string]: any` (rest props)

**Unique Props**:
- `BpkTableCell.wordBreak?: boolean` (default: `false`)
- `BpkTableHeadCell.wordBreak?: boolean` (default: `false`)

---

## File Migration Checklist

### Source Files (`.js` → `.tsx`)
- [x] `index.js` → `index.ts` (no JSX)
- [x] `src/BpkTable.js` → `src/BpkTable.tsx`
- [x] `src/BpkTableHead.js` → `src/BpkTableHead.tsx`
- [x] `src/BpkTableBody.js` → `src/BpkTableBody.tsx`
- [x] `src/BpkTableRow.js` → `src/BpkTableRow.tsx`
- [x] `src/BpkTableCell.js` → `src/BpkTableCell.tsx`
- [x] `src/BpkTableHeadCell.js` → `src/BpkTableHeadCell.tsx`

### Test Files (`.js` → `.tsx`)
- [x] `src/BpkTable-test.js` → `src/BpkTable-test.tsx`
- [x] `src/BpkTableHead-test.js` → `src/BpkTableHead-test.tsx`
- [x] `src/BpkTableBody-test.js` → `src/BpkTableBody-test.tsx`
- [x] `src/BpkTableRow-test.js` → `src/BpkTableRow-test.tsx`
- [x] `src/BpkTableCell-test.js` → `src/BpkTableCell-test.tsx`
- [x] `src/BpkTableHeadCell-test.js` → `src/BpkTableHeadCell-test.tsx`
- [x] `src/accessibility-test.js` → `src/accessibility-test.tsx`

### Example Files (`.js` → `.tsx`)
- [x] `examples/bpk-component-table/examples.js` → `examples.tsx`
- [x] `examples/bpk-component-table/stories.js` → `stories.tsx`

### Unchanged Files
- [ ] `src/*.module.scss` (Sass files unchanged)
- [ ] `src/__snapshots__/*` (Snapshots must remain identical)

---

## Testing Strategy Preserved

### Test Logic Requirements
- All test assertions remain identical
- Test coverage thresholds unchanged (70% branches, 75% functions/lines/statements)
- Snapshot files must be byte-identical after migration
- jest-axe accessibility tests unchanged

### Type Safety Additions (Optional)
```typescript
import { render } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';

describe('BpkTable', () => {
  it('should render correctly', () => {
    const { asFragment }: RenderResult = render(<BpkTable>content</BpkTable>);
    expect(asFragment()).toMatchSnapshot();
  });
});
```

---

## Build Configuration

### No Changes Required
- TypeScript already configured in project
- Build tools support `.tsx` files
- `.d.ts` generation automatic

### Verification Points
1. `npm run build` completes without errors
2. `packages/bpk-component-table/dist/*.d.ts` files generated
3. Bundle size within 1% of original
4. No new dependencies added

---

## Risk Mitigation

### Known Risks
1. **Storybook react-docgen failure** with `[rest: string]: any`
   - **Mitigation**: Fallback to intersection type documented
   - **Detection**: Storybook build errors

2. **Test snapshot mismatches**
   - **Mitigation**: Tests must remain `.js` logic, only file extension changes
   - **Detection**: Jest snapshot comparison

3. **Type inference issues for consumers**
   - **Mitigation**: Export all types explicitly
   - **Detection**: Consumer TypeScript projects report errors

---

## Success Criteria Verification

From spec:
- ✅ API unchanged (checked via exports comparison)
- ✅ Types match Flow semantics (verified via inline mapping)
- ✅ Tests pass without modification (logic preserved)
- ✅ Build succeeds (TypeScript compilation + `.d.ts` generation)
- ✅ Bundle size stable (within 1%)

---

## References

- **Backpack Constitution**: Principle V (TypeScript Migration & Type Safety)
- **Architecture Decisions**: `decisions/inexact-rest.md`
- **Similar Components**: `packages/bpk-component-button/`, `packages/bpk-component-calendar/`
- **Spec Clarifications**: Session 2026-01-14 (4 questions answered)
