# bpk-component-pagination

> Backpack pagination component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import BpkPagination from '@skyscanner/backpack-web/bpk-component-pagination';

const Pagination = () => (
  <BpkPagination
    pageCount={20}
    selectedPageIndex={0}
    onPageChange={pageIndex => alert(`page ${pageIndex + 1}`)}
    previousLabel="previous"
    nextLabel="next"
    visibleRange={3}
    pageLabel={(page, isSelected) => `page ${page}`}
  />
);
```

## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/pagination/web-5nr2G0qU#section-props-c7).
