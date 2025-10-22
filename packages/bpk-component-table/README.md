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
  <BpkTableHeadCell wrap={true}>Heading 4 (wrapped)</BpkTableHeadCell>
      </BpkTableRow>
    </BpkTableHead>
    <BpkTableBody>
      <BpkTableRow>
        <BpkTableCell>Row 1, Data 1</BpkTableCell>
        <BpkTableCell>Row 1, Data 2</BpkTableCell>
        <BpkTableCell>Row 1, Data 3</BpkTableCell>
  <BpkTableCell wrap={true}>Row 1, Data 4 (wrapped)</BpkTableCell>
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

`wrap` (boolean, default `false`)

Opt-in multi-line wrapping for cell content. By default (prop omitted or `false`) table cells render on a single line (nowrap). Set `wrap={true}` to apply the `bpk-table__cell--wrap` modifier class which sets `white-space: normal;` and allows long text to wrap onto multiple lines. Available on both `BpkTableCell` and `BpkTableHeadCell`.

Suggested complementary styles (if needed) when wrapping:
```css
/* Example: constrain column width with wrapping */
.my-narrow-column { max-width: 12rem; }
```

If you prefer truncation instead of wrapping, keep `wrap={false}` (or omit the prop) and add your own ellipsis styles:
```css
.my-truncated-cell { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
```
