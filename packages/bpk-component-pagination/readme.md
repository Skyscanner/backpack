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
    onPageChange={(pageIndex) => alert(`page ${pageIndex + 1}`)}}
    previousLabel="previous"
    nextLabel="next"
    visibleRange={3}
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
| onPageChange      | func                 | false    | null          |
| visibleRange      | number               | false    | 3             |
| className         | string               | false    | null          |
