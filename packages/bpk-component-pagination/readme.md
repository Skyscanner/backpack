# bpk-component-autosuggest

> Backpack pagination component.

## Installation

```sh
npm install bpk-component-pagination --save-dev
```

## Usage

```js
import React from 'react';
import BpkPagination from 'bpk-component-paginaton';

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
