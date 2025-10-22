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
        <BpkTableHeadCell wrap={false}>Heading 4 (no wrap)</BpkTableHeadCell>
      </BpkTableRow>
    </BpkTableHead>
    <BpkTableBody>
      <BpkTableRow>
        <BpkTableCell>Row 1, Data 1</BpkTableCell>
        <BpkTableCell>Row 1, Data 2</BpkTableCell>
        <BpkTableCell>Row 1, Data 3</BpkTableCell>
        <BpkTableCell wrap={false}>Row 1, Data 4 (no wrap)</BpkTableCell>
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

## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/table/web-0i0MzMkj#section-props-3d).

### Additional Props

`wrap` (boolean, default `true`)

Controls text wrapping within a cell. By default (`wrap={true}`) table cell text is allowed to wrap onto multiple lines. Set `wrap={false}` to apply the `bpk-table__cell--no-wrap` modifier class which sets `white-space: nowrap`, preventing the content from wrapping. This applies to both `BpkTableCell` and `BpkTableHeadCell`.

Note: When using `wrap={false}`, you may wish to add your own truncation styles (`overflow: hidden; text-overflow: ellipsis;`) depending on layout constraints.
