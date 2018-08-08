# bpk-component-infinite-scroll

> Backpack infinite scroll component.

## Installation

```sh
npm install bpk-component-infinite-scroll --save-dev
```

## <a name="Usage"></a>Usage
```js
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

## DataSource

`DataSource` is a class used by the InfiniteScroll component to fetch items
and listen for changes in the data and react to it by reloading the current items
in the list.

### Methods

`fetchItems(index, nElements)`

Called by the `InfiniteScroll` component every time new data is
requested (by scrolling down) and should return the data starting from `index` plus `nElements` (number of elements). It should return a promise object.

Example:
```js
fetchItems(0, 5) // should return 5 items starting from position 0
fetchItems(5, 5) // should return 5 items starting from position 5
```

*Calling this method directly in the `DataSource` class will result in an error, it should be implemented by the subclass extending `DataSource`.*

`onDataChange(cb)`

Adds a new change listener to this `DataSource`, to be called when data is updated. Returns true if added or false otherwise.

`removeListener(cb)`

Removes the callback from the list of change listeners. Returns true if removed or false otherwise.

`triggerListeners(...args)`

Triggers all listeners in response to data changes. This method should be
used by subclasses to tell the `InfiniteScroll` component it should refresh
its data.


```js
import React from 'react';
import PropTypes from 'prop-types';
import withInfiniteScroll, { DataSource } from 'bpk-component-infinite-scroll';

const SomeList = ({ elements }) => (
  <div id="list">
    {elements.map(element => (
      <div key={element} style={{ height: '50px' }}>
        {element}
      </div>
    ))}
  </div>
)

class RemoteFlightsDataSource extends DataSource {
  constructor() {
    super();
    myWebSocketConnection.on('dataChange', () => {
      // tell the `InfiniteScroll` component to refresh its data
      this.triggerListeners(); 
    })
  }

  fetchItems(index, nElements) {
    return fetch(`https://my-api/flights?start=${index}&count=${nElements}`);
  }
}

const InfiniteList = withInfiniteScroll(SomeList);

export default () => (
  <InfiniteList
    dataSource={new RemoteFlightsDataSource()}
  />
)
```

## ArrayDataSource

`ArrayDataSource` is a class that extends from `DataSource`. Accepts an array
as a parameter in the constructor and uses it as source for the infinite scroll.

> See [Usage](#Usage) for an example of this class in use.

### Methods
*refer to the `DataSource` methods section for a list of all methods*

`fetchItems(index, nElements)`

Returns a subset of the array data.

`updateData(newData)`

Updates the internal array and triggers all listeners.

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
