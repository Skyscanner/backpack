# bpk-component-pagination

> Backpack pagination component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import React from 'react';
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

| Property          | PropType             | Required | Default Value |
| ----------------- | -------------------- | -------- | ------------- |
| pageCount         | number               | true     | -             |
| selectedPageIndex | number               | true     | -             |
| previousLabel     | string               | true     | -             |
| nextLabel         | string               | true     | -             |
| paginationLabel   | string               | true     | -             |
| pageLabel         | func                 | true     | -             |
| onPageChange      | func                 | false    | null          |
| visibleRange      | number               | false    | 3             |
| className         | string               | false    | null          |

## Theme Props

* `buttonSecondaryTextColor`
* `buttonSecondaryHoverTextColor`
* `buttonSecondaryActiveTextColor`
* `buttonSecondaryBorderColor`
* `buttonSecondaryHoverBorderColor`
* `buttonSecondaryActiveBorderColor`
* `buttonSecondaryBackgroundColor`
* `buttonSecondaryHoverBackgroundColor`
* `buttonSecondaryActiveBackgroundColor`
* `paginationNudgerActiveColor`
* `paginationNudgerColor`
* `paginationNudgerHoverColor`
* `paginationSelectedBackgroundColor`
