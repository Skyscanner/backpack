# API Design: TypeScript Migration for BpkTable

**Date**: 2026-01-19
**Feature**: TypeScript type definitions for bpk-component-table
**Objective**: Document TypeScript API that preserves 100% compatibility with Flow version

---

## Overview

This migration does NOT change the public API. All components maintain identical props, exports, defaults, and behavior. This document defines the TypeScript type signatures that replace Flow types.

---

## Component APIs

### 1. BpkTable

**Purpose**: Root table container component

**TypeScript Type Definition**:
```typescript
export type BpkTableProps = {
  children: ReactNode;
  className?: string | null;
} & Omit<HTMLAttributes<HTMLTableElement>, 'className'>;
```

**Props**:
- **`children`** (ReactNode, required): Table content - typically BpkTableHead and BpkTableBody
- **`className`** (string | null, optional, default: `null`): Additional CSS class names
- **`...rest`** (HTMLTableElement attributes): All native HTML table attributes (onClick, onMouseEnter, data-*, aria-*, etc.)

**Default Export**:
```typescript
const BpkTable: React.FC<BpkTableProps>;
export default BpkTable;
```

**Named Export**:
```typescript
export type BpkTableProps;
```

**PropTypes** (retained for runtime validation):
```typescript
BpkTable.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
```

**Usage Example**:
```typescript
import BpkTable, { type BpkTableProps } from '@skyscanner/backpack-web/bpk-component-table';

<BpkTable className="my-table">
  <thead>...</thead>
  <tbody>...</tbody>
</BpkTable>
```

---

### 2. BpkTableHead

**Purpose**: Table header container (`<thead>`)

**TypeScript Type Definition**:
```typescript
export type BpkTableHeadProps = {
  children: ReactNode;
  className?: string | null;
} & Omit<HTMLAttributes<HTMLTableSectionElement>, 'className'>;
```

**Props**:
- **`children`** (ReactNode, required): Table header content - typically BpkTableRow components
- **`className`** (string | null, optional, default: `null`): Additional CSS class names
- **`...rest`** (HTMLTableSectionElement attributes): All native HTML thead attributes

**Default Export**:
```typescript
const BpkTableHead: React.FC<BpkTableHeadProps>;
export default BpkTableHead;
```

**PropTypes**:
```typescript
BpkTableHead.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
```

---

### 3. BpkTableBody

**Purpose**: Table body container (`<tbody>`)

**TypeScript Type Definition**:
```typescript
export type BpkTableBodyProps = {
  children: ReactNode;
  className?: string | null;
} & Omit<HTMLAttributes<HTMLTableSectionElement>, 'className'>;
```

**Props**:
- **`children`** (ReactNode, required): Table body content - typically BpkTableRow components
- **`className`** (string | null, optional, default: `null`): Additional CSS class names
- **`...rest`** (HTMLTableSectionElement attributes): All native HTML tbody attributes

**Default Export**:
```typescript
const BpkTableBody: React.FC<BpkTableBodyProps>;
export default BpkTableBody;
```

**PropTypes**:
```typescript
BpkTableBody.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
```

---

### 4. BpkTableRow

**Purpose**: Table row (`<tr>`)

**TypeScript Type Definition**:
```typescript
export type BpkTableRowProps = {
  children: ReactNode;
  className?: string | null;
} & Omit<HTMLAttributes<HTMLTableRowElement>, 'className'>;
```

**Props**:
- **`children`** (ReactNode, required): Row content - typically BpkTableCell or BpkTableHeadCell components
- **`className`** (string | null, optional, default: `null`): Additional CSS class names
- **`...rest`** (HTMLTableRowElement attributes): All native HTML tr attributes

**Default Export**:
```typescript
const BpkTableRow: React.FC<BpkTableRowProps>;
export default BpkTableRow;
```

**PropTypes**:
```typescript
BpkTableRow.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
```

---

### 5. BpkTableCell

**Purpose**: Table data cell (`<td>`)

**TypeScript Type Definition**:
```typescript
export type BpkTableCellProps = {
  children: ReactNode;
  className?: string | null;
  wordBreak?: boolean;
} & Omit<HTMLAttributes<HTMLTableCellElement>, 'className'>;
```

**Props**:
- **`children`** (ReactNode, required): Cell content
- **`className`** (string | null, optional, default: `null`): Additional CSS class names
- **`wordBreak`** (boolean, optional, default: `false`): Whether to apply `word-break: break-word` CSS for long text
- **`...rest`** (HTMLTableCellElement attributes): All native HTML td attributes

**Default Export**:
```typescript
const BpkTableCell: React.FC<BpkTableCellProps>;
export default BpkTableCell;
```

**PropTypes**:
```typescript
BpkTableCell.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  wordBreak: PropTypes.bool,
};
```

**Usage Example**:
```typescript
<BpkTableCell wordBreak>
  Very long text that needs to wrap
</BpkTableCell>
```

---

### 6. BpkTableHeadCell

**Purpose**: Table header cell (`<th>`)

**TypeScript Type Definition**:
```typescript
export type BpkTableHeadCellProps = {
  children: ReactNode;
  className?: string | null;
  wordBreak?: boolean;
} & Omit<HTMLAttributes<HTMLTableCellElement>, 'className'>;
```

**Props**:
- **`children`** (ReactNode, required): Header cell content
- **`className`** (string | null, optional, default: `null`): Additional CSS class names
- **`wordBreak`** (boolean, optional, default: `false`): Whether to apply `word-break: break-word` CSS for long text
- **`...rest`** (HTMLTableCellElement attributes): All native HTML th attributes (scope, colSpan, rowSpan, etc.)

**Default Export**:
```typescript
const BpkTableHeadCell: React.FC<BpkTableHeadCellProps>;
export default BpkTableHeadCell;
```

**PropTypes**:
```typescript
BpkTableHeadCell.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  wordBreak: PropTypes.bool,
};
```

---

## Package Exports

### Main Entry Point (`index.ts`)

```typescript
export { default } from './src/BpkTable';
export type { BpkTableProps } from './src/BpkTable';

export { default as BpkTableHead } from './src/BpkTableHead';
export type { BpkTableHeadProps } from './src/BpkTableHead';

export { default as BpkTableBody } from './src/BpkTableBody';
export type { BpkTableBodyProps } from './src/BpkTableBody';

export { default as BpkTableRow } from './src/BpkTableRow';
export type { BpkTableRowProps } from './src/BpkTableRow';

export { default as BpkTableCell } from './src/BpkTableCell';
export type { BpkTableCellProps } from './src/BpkTableCell';

export { default as BpkTableHeadCell } from './src/BpkTableHeadCell';
export type { BpkTableHeadCellProps } from './src/BpkTableHeadCell';
```

### Consumer Usage

**JavaScript (unchanged)**:
```javascript
import BpkTable, {
  BpkTableHead,
  BpkTableBody,
  BpkTableRow,
  BpkTableCell,
  BpkTableHeadCell,
} from '@skyscanner/backpack-web/bpk-component-table';
```

**TypeScript (new)**:
```typescript
import BpkTable, {
  BpkTableHead,
  BpkTableBody,
  BpkTableRow,
  BpkTableCell,
  BpkTableHeadCell,
  type BpkTableProps,
  type BpkTableHeadProps,
  type BpkTableBodyProps,
  type BpkTableRowProps,
  type BpkTableCellProps,
  type BpkTableHeadCellProps,
} from '@skyscanner/backpack-web/bpk-component-table';

// Type-safe component composition
const MyTable: React.FC<BpkTableProps> = (props) => (
  <BpkTable {...props} />
);
```

---

## Type Inheritance Rationale

### Why `Omit<HTMLAttributes<T>, 'className'>`?

**Problem**: React's HTMLAttributes defines `className?: string`, but Backpack uses `className?: string | null`.

**Solution**: Use `Omit` to remove React's definition, then add our own:
```typescript
type Props = {
  className?: string | null;  // Allow null explicitly
} & Omit<HTMLAttributes<T>, 'className'>;
```

**Benefits**:
1. Consumers get autocomplete for all HTML attributes
2. TypeScript validates attribute names and types
3. No `any` types polluting the public API
4. Explicit about which props are being overridden

**Example**:
```typescript
// ✅ Valid - all HTML attributes available
<BpkTable 
  id="my-table"
  data-testid="table"
  aria-label="Data table"
  onMouseEnter={() => {}}
>
  ...
</BpkTable>

// ❌ Invalid - TypeScript catches typos
<BpkTable
  ariaLabel="Data table"  // Error: should be aria-label
  onClick="invalid"       // Error: should be function
>
```

---

## API Compatibility Matrix

| Aspect | Flow Version | TypeScript Version | Compatible? |
|--------|--------------|-------------------|-------------|
| **Props** | Same | Same | ✅ Yes |
| **Defaults** | Same | Same | ✅ Yes |
| **Exports** | 6 components | 6 components + 6 types | ✅ Yes (additive) |
| **PropTypes** | Present | Present | ✅ Yes |
| **Behavior** | Same | Same | ✅ Yes |
| **HTML Attributes** | `...rest` spread | `...rest` spread (typed) | ✅ Yes |

**Conclusion**: 100% backward compatible. TypeScript consumers get additional type safety; JavaScript consumers experience zero changes.

---

## Accessibility Considerations

### ARIA Attributes Support

All components inherit HTML attributes, including ARIA:

```typescript
<BpkTable aria-label="User data table" role="table">
  <BpkTableHead>
    <BpkTableRow>
      <BpkTableHeadCell scope="col" aria-sort="ascending">
        Name
      </BpkTableHeadCell>
    </BpkTableRow>
  </BpkTableHead>
</BpkTable>
```

### Keyboard Navigation

Components pass through all keyboard event handlers:

```typescript
<BpkTableRow
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      // Handle activation
    }
  }}
  tabIndex={0}
>
  ...
</BpkTableRow>
```

---

## Testing Interface

### Test Utilities Type Safety

```typescript
import { render } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';
import BpkTable, { type BpkTableProps } from './BpkTable';

// Type-safe test helpers
const renderTable = (props: Partial<BpkTableProps> = {}): RenderResult => {
  const defaultProps: BpkTableProps = {
    children: <tbody />,
  };
  
  return render(<BpkTable {...defaultProps} {...props} />);
};

describe('BpkTable', () => {
  it('should render with typed props', () => {
    const { container } = renderTable({
      className: 'custom-class',
      'data-testid': 'my-table',  // TypeScript validates this
    });
    
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
```

---

## Migration Impact

### For Component Maintainers

**Changes Required**:
1. Update type definitions in 6 component files
2. Export types alongside components
3. No logic changes
4. No test changes (except file extensions)

**Verification**:
- TypeScript compiles without errors
- All tests pass
- Snapshots remain identical
- `.d.ts` files generated correctly

### For TypeScript Consumers

**Benefits**:
- Autocomplete for all HTML attributes
- Type checking for prop values
- Type inference for event handlers
- No manual type assertions needed

**No Breaking Changes**:
- Existing code compiles without changes
- All props remain compatible

### For JavaScript Consumers

**Impact**: Zero changes required. Components work identically.

---

## References

- **Spec**: [spec.md](./spec.md)
- **Research**: [research.md](./research.md)
- **Architecture Decision**: `decisions/inexact-rest.md`
- **TypeScript Handbook**: [Utility Types - Omit](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)
