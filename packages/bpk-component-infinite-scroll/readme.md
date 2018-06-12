# bpk-component-infinite-scroll

> Backpack infinite scroll component.

## Installation

```sh
npm install bpk-component-infinite-scroll --save-dev
```

## Usage
```js
import React from 'react';
import PropTypes from 'prop-types';
import { withInfiniteScroll } from 'bpk-component-infinite-scroll';

const SomeList = ({elements}) => (
  <div id="list">
    {elements.map(element => (
      <div key={element} style={{ height: '50px' }}>
        {element}
      </div>
    ))}
  </div>
)

const elementsArray = [
  'element 1',
  'element 2',
  'element 3',
  'element 4',
  'element 5',
  'element 6',
  'element 7',
  'element 8',
  'element 9',
  'element 10',
]

const InfiniteList = withInfiniteScroll(SomeList);

export default () => (
  <InfiniteList
    onItemsFetch={
      (index, nElements) =>
        Promise.resolve(elementsArray.slice(index, index+nElements))
    }
  />
)
```

## Accompanying functions

onItemsFetch

`onItemsFetch` is a function that takes an array of elements
and returns another function. The returned function has two parameters
the current index (i) and the number of elements to load (n) and returns a
Promise that resolves to the sub-array between the indices i and i+n.

```js
import React from 'react';
import PropTypes from 'prop-types';
import { withInfiniteScroll, onItemsFetch} from 'bpk-component-infinite-scroll';

const SomeList = ({elements}) => (
  <div id="list">
    {elements.map(element => (
      <div key={element} style={{ height: '50px' }}>
        {element}
      </div>
    ))}
  </div>
)

const elementsArray = [
  'element 1',
  'element 2',
  'element 3',
  'element 4',
  'element 5',
  'element 6',
  'element 7',
  'element 8',
  'element 9',
  'element 10',
]

const InfiniteList = withInfiniteScroll(SomeList);

export default () => (
  <InfiniteList
    onItemsFetch={onItemsFetch(elementsArray)}
  />
)
```

## Props

| Property               | PropType | Required | Default Value |
| ---------------------- | -------- | -------- | ------------- |
| onItemsFetch           | func     | true     | -             |
| elementsPerScroll      | number   | false    | 5             |
| onScroll               | func     | false    | null          |
| onScrollFinished       | func     | false    | null          |
| renderLoadingComponent | func     | false    | null          |
| renderSeeMoreComponent | func     | false    | null          |
| seeMoreAfter           | number   | false    | null          |
