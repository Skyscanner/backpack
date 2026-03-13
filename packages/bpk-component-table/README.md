# bpk-component-table

> Backpack table component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import {
  BpkTable,
  BpkTableHead,
  BpkTableBody,
  BpkTableRow,
  BpkTableCell,
  BpkTableHeadCell,
} from '@skyscanner/backpack-web/bpk-component-table';

export default () => (
  <BpkTable>
    <BpkTableHead>
      <BpkTableRow>
        <BpkTableHeadCell>Heading 1</BpkTableHeadCell>
        <BpkTableHeadCell>Heading 2</BpkTableHeadCell>
        <BpkTableHeadCell>Heading 3</BpkTableHeadCell>
        <BpkTableHeadCell wordBreak={true}>Heading4wordBreakTrue</BpkTableHeadCell>
      </BpkTableRow>
    </BpkTableHead>
    <BpkTableBody>
      <BpkTableRow>
        <BpkTableCell>Row 1, Data 1</BpkTableCell>
        <BpkTableCell>Row 1, Data 2</BpkTableCell>
        <BpkTableCell>Row 1, Data 3</BpkTableCell>
        <BpkTableCell wordBreak={true}>Row1Data4wordBreakTrue</BpkTableCell>
      </BpkTableRow>
      <BpkTableRow>
        <BpkTableCell>Row 2, Data 1</BpkTableCell>
        <BpkTableCell>Row 2, Data 2</BpkTableCell>
        <BpkTableCell>Row 2, Data 3</BpkTableCell>
        <BpkTableCell>Row 2, Data 4</BpkTableCell>
      </BpkTableRow>
    </BpkTableBody>
  </BpkTable>
);
```

## TypeScript

This component is written in TypeScript and provides its own type definitions. TypeScript users benefit from autocomplete and type checking:

```typescript
import {
  BpkTable,
  BpkTableHead,
  BpkTableBody,
  BpkTableRow,
  BpkTableCell,
  BpkTableHeadCell,
  type BpkTableProps,
  type BpkTableCellProps,
} from '@skyscanner/backpack-web/bpk-component-table';
```

## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/table/web-0i0MzMkj#section-props-3d).

### Additional Props

`wordBreak` (boolean, default `false`)

Optional prop to add css `word-break: break-word;`, this allows long words and URLs to wrap onto multiple lines within the cell rather than overflowing. This prop is available on both `BpkTableCell` and `BpkTableHeadCell`. Set `wordBreak={true}` to add this behaviour.

By default the prop can be omitted.
