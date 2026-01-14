# Phase 1: API Design - TypeScript Migration for BpkTable

**Date**: 2026-01-14
**Feature**: TypeScript Migration for bpk-component-table

---

## Overview

This document defines TypeScript type interfaces for all six table components. **The API is NOT changing** - these types represent the existing Flow types translated to TypeScript.

---

## Component 1: BpkTable

### TypeScript Interface

```typescript
export type BpkTableProps = {
  /** Table content (typically BpkTableHead and BpkTableBody) */
  children: React.ReactNode;

  /** Additional CSS class names */
  className?: string | null;

  /** Additional HTML attributes spread to table element */
  [rest: string]: any; // Inexact rest. See decisions/inexact-rest.md
};
```

### PropTypes (Retained)

```typescript
import PropTypes from 'prop-types';

BpkTable.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
```

### Default Values

- `className`: `null`

### Usage Example

```typescript
import { BpkTable, type BpkTableProps } from '@skyscanner/backpack-web/bpk-component-table';

<BpkTable className="custom-table">
  {/* table content */}
</BpkTable>
```

---

## Component 2: BpkTableHead

### TypeScript Interface

```typescript
export type BpkTableHeadProps = {
  /** Table header content (typically BpkTableRow) */
  children: React.ReactNode;

  /** Additional CSS class names */
  className?: string | null;

  /** Additional HTML attributes spread to thead element */
  [rest: string]: any; // Inexact rest. See decisions/inexact-rest.md
};
```

### PropTypes (Retained)

```typescript
BpkTableHead.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
```

### Default Values

- `className`: `null`

---

## Component 3: BpkTableBody

### TypeScript Interface

```typescript
export type BpkTableBodyProps = {
  /** Table body content (typically BpkTableRow components) */
  children: React.ReactNode;

  /** Additional CSS class names */
  className?: string | null;

  /** Additional HTML attributes spread to tbody element */
  [rest: string]: any; // Inexact rest. See decisions/inexact-rest.md
};
```

### PropTypes (Retained)

```typescript
BpkTableBody.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
```

### Default Values

- `className`: `null`

---

## Component 4: BpkTableRow

### TypeScript Interface

```typescript
export type BpkTableRowProps = {
  /** Row content (typically BpkTableCell or BpkTableHeadCell) */
  children: React.ReactNode;

  /** Additional CSS class names */
  className?: string | null;

  /** Additional HTML attributes spread to tr element */
  [rest: string]: any; // Inexact rest. See decisions/inexact-rest.md
};
```

### PropTypes (Retained)

```typescript
BpkTableRow.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
```

### Default Values

- `className`: `null`

---

## Component 5: BpkTableCell

### TypeScript Interface

```typescript
export type BpkTableCellProps = {
  /** Cell content */
  children: React.ReactNode;

  /** Additional CSS class names */
  className?: string | null;

  /**
   * Whether to apply word-break: break-word CSS.
   * Allows long words and URLs to wrap onto multiple lines.
   * @default false
   */
  wordBreak?: boolean;

  /** Additional HTML attributes spread to td element */
  [rest: string]: any; // Inexact rest. See decisions/inexact-rest.md
};
```

### PropTypes (Retained)

```typescript
BpkTableCell.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  wordBreak: PropTypes.bool,
};
```

### Default Values

- `className`: `null`
- `wordBreak`: `false`

### Usage Example

```typescript
<BpkTableCell wordBreak>
  VeryLongURLThatNeedsToWrapWithoutOverflowing
</BpkTableCell>
```

---

## Component 6: BpkTableHeadCell

### TypeScript Interface

```typescript
export type BpkTableHeadCellProps = {
  /** Header cell content */
  children: React.ReactNode;

  /** Additional CSS class names */
  className?: string | null;

  /**
   * Whether to apply word-break: break-word CSS.
   * Allows long words and URLs to wrap onto multiple lines.
   * @default false
   */
  wordBreak?: boolean;

  /** Additional HTML attributes spread to th element */
  [rest: string]: any; // Inexact rest. See decisions/inexact-rest.md
};
```

### PropTypes (Retained)

```typescript
BpkTableHeadCell.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  wordBreak: PropTypes.bool,
};
```

### Default Values

- `className`: `null`
- `wordBreak`: `false`

---

## Package Exports (index.ts)

```typescript
export { BpkTable, type BpkTableProps } from './src/BpkTable';
export { BpkTableHead, type BpkTableHeadProps } from './src/BpkTableHead';
export { BpkTableBody, type BpkTableBodyProps } from './src/BpkTableBody';
export { BpkTableRow, type BpkTableRowProps } from './src/BpkTableRow';
export { BpkTableCell, type BpkTableCellProps } from './src/BpkTableCell';
export { BpkTableHeadCell, type BpkTableHeadCellProps } from './src/BpkTableHeadCell';
```

---

## Consumer Import Patterns

### JavaScript Consumers (unchanged)

```javascript
import {
  BpkTable,
  BpkTableHead,
  BpkTableBody,
  BpkTableRow,
  BpkTableCell,
  BpkTableHeadCell,
} from '@skyscanner/backpack-web/bpk-component-table';
```

### TypeScript Consumers (with types)

```typescript
import {
  BpkTable,
  type BpkTableProps,
  BpkTableHead,
  type BpkTableHeadProps,
  BpkTableBody,
  type BpkTableBodyProps,
  BpkTableRow,
  type BpkTableRowProps,
  BpkTableCell,
  type BpkTableCellProps,
  BpkTableHeadCell,
  type BpkTableHeadCellProps,
} from '@skyscanner/backpack-web/bpk-component-table';

// Use types for custom wrappers
const CustomTable = (props: BpkTableProps) => (
  <BpkTable {...props} className="custom" />
);
```

---

## Type Safety Matrix

| Prop | Required | Type | Default | Runtime Check (PropTypes) |
|------|----------|------|---------|---------------------------|
| `children` | ✅ Yes | `React.ReactNode` | N/A | PropTypes.node.isRequired |
| `className` | ❌ No | `string \| null \| undefined` | `null` | PropTypes.string |
| `wordBreak` | ❌ No | `boolean \| undefined` | `false` | PropTypes.bool |
| `...rest` | ❌ No | `any` | N/A | Not validated |

---

## Accessibility Considerations

### ARIA Attributes (via rest props)

All components accept standard HTML table attributes:

```typescript
<BpkTable role="table" aria-label="Data comparison">
  <BpkTableHead>
    <BpkTableRow>
      <BpkTableHeadCell scope="col">Column 1</BpkTableHeadCell>
    </BpkTableRow>
  </BpkTableHead>
</BpkTable>
```

### Semantic HTML

- `BpkTable` → `<table>` element
- `BpkTableHead` → `<thead>` element
- `BpkTableBody` → `<tbody>` element
- `BpkTableRow` → `<tr>` element
- `BpkTableCell` → `<td>` element
- `BpkTableHeadCell` → `<th>` element

Semantic structure ensures screen reader compatibility.

---

## Migration Notes

### No API Changes

**Critical**: This migration changes ONLY the type system, not the API:
- All props remain the same
- All default values remain the same
- All behavior remains the same
- PropTypes are retained for runtime validation

### Type Inference

TypeScript will infer types automatically:

```typescript
// Type inferred as BpkTableProps
const tableProps = {
  children: <div>content</div>,
  className: 'my-table',
};

<BpkTable {...tableProps} />
```

### Event Handlers (via rest props)

```typescript
<BpkTableRow onClick={(e: React.MouseEvent<HTMLTableRowElement>) => console.log(e)}>
  <BpkTableCell>Clickable row</BpkTableCell>
</BpkTableRow>
```

---

## Validation Strategy

### Compile-Time (TypeScript)

```typescript
// ✅ Valid
<BpkTable><BpkTableBody>content</BpkTableBody></BpkTable>

// ❌ TypeScript Error: missing required 'children'
<BpkTable />

// ❌ TypeScript Error: wrong type
<BpkTable className={123} />
```

### Runtime (PropTypes)

```javascript
// ⚠️ PropTypes Warning in console
<BpkTable className={123}>content</BpkTable>
```

---

## References

- **Spec**: `/specs/090-table-typescript/spec.md`
- **Research**: `/specs/090-table-typescript/research.md`
- **Current Implementation**: `/packages/bpk-component-table/src/`
- **Decisions**: `decisions/inexact-rest.md`
