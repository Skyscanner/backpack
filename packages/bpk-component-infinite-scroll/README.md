# bpk-component-infinite-scroll

> Backpack infinite scroll component.

## Installation

```sh
npm install bpk-component-infinite-scroll --save-dev
```

## <a name="Usage"></a>Usage
```js
/* @flow */

import React from 'react';
import PropTypes from 'prop-types';
import BpkButton from 'bpk-component-button';
import BpkSpinner, { SPINNER_TYPES } from 'bpk-component-spinner';
import withInfiniteScroll, { ArrayDataSource } from 'bpk-component-infinite-scroll';

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

const CustomLoading = () => (
  <div>
    <BpkSpinner type={SPINNER_TYPES.primary} />
  </div>
);

const CustomSeeMore = ({ onSeeMoreClick }) => (
  <div>
    <BpkButton onClick={onSeeMoreClick}>See More</BpkButton>
  </div>
);

const InfiniteList = withInfiniteScroll(SomeList);
const dataSource = new ArrayDataSource(elementsArray);

export default () => (
  <InfiniteList
    dataSource={dataSource}
    renderLoadingComponent={CustomLoading}
    renderSeeMoreComponent={CustomSeeMore}
    seeMoreAfter={1}
  />
)
```

## Accompanying classes

DataSource

`DataSource` is a class used by the InfiniteScroll component to listen
for changes in the data and react to it by reloading the current items
in the list.

```js
/* @flow */
import React from 'react';
import PropTypes from 'prop-types';
import withInfiniteScroll, { DataSource } from 'bpk-component-infinite-scroll';

const SomeList = ({elements}) => (
  <div id="list">
    {elements.map(element => (
      <div key={element} style={{ height: '50px' }}>
        {element}
      </div>
    ))}
  </div>
)

class InfiniteDataSource extends DataSource {
  constructor() {
    super();
    this.elements = [];
  }

  fetchItems(index, nElements) {
    return new Promise(resolve => {
      for (let i = 0; i < nElements; i += 1) {
        this.elements.push(`Item ${index + i}`);
      }
      resolve(this.elements);
    });
  }
}

const InfiniteList = withInfiniteScroll(SomeList);

export default () => (
  <InfiniteList
    dataSource={new InfiniteDataSource()}
  />
)
```

ArrayDataSource

`ArrayDataSource` is a class that extends from `DataSource`. Accepts an array
as a parameter in the constructor and uses it as source for the infinite scroll.
To see and example of this class [Usage](#Usage) .

## Props

| Property               | PropType                | Required | Default Value |
| ---------------------- | ----------------------- | -------- | ------------- |
| dataSource             | instanceOf(DataSource)  | true     | -             |
| elementsPerScroll      | number                  | false    | 5             |
| onScroll               | func                    | false    | null          |
| onScrollFinished       | func                    | false    | null          |
| renderLoadingComponent | func                    | false    | null          |
| renderSeeMoreComponent | func                    | false    | null          |
| seeMoreAfter           | number                  | false    | null          |
