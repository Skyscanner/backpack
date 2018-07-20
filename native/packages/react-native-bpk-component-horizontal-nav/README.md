# react-native-bpk-component-horizontal nav

> Backpack React Native horizontal navigation component.

## Installation

```sh
npm install react-native-bpk-component-horizontal-nav --save-dev
```

## Usage

```js
import React, { Component } from 'react';
import BpkHorizontalNav, { BpkHorizontalNavItem } from 'react-native-bpk-component-horizontal-nav';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedId: 'flights',
    };
  }

  render() {
    return (
      <BpkHorizontalNav selectedId={this.state.selectedId}>
        <BpkHorizontalNavItem
          id="flights"
          title="Flights"
          onPress={() => {
            this.setState({ selectedId: 'flights' });
          }}
        />
        <BpkHorizontalNavItem
          id="hotels"
          title="Hotels"
          onPress={() => {
            this.setState({ selectedId: 'hotels' });
          }}
        />
        <BpkHorizontalNavItem
          id="car-hire"
          title="Car hire"
          onPress={() => {
            this.setState({ selectedId: 'car-hire' });
          }}
        />
      </BpkHorizontalNav>
    );
  }
};
```

## Props

### BpkHorizontalNav

| Property            | PropType                                                    | Required | Default Value |
| -----------         | ----------------------------------------------------------- | -------- | ------------- |
| children            | node                                                        | true     | -             |
| selectedId          | string (matching `id` prop of `BpkHorizontalNavItem` child) | true     | -             |
| spaceAround         | bool                                                        | false    | false         |

### BpkHorizontalNavItem

| Property            | PropType                              | Required | Default Value |
| -----------         | ------------------------------------- | -------- | ------------- |
| id                  | string                                | true     | -             |
| onPress             | func                                  | true     | -             |
| title               | string                                | true     | -             |
| accessibilityLabel  | string                                | false    | props.title   |
| small               | bool                                  | false    | false         |
| disabled            | bool                                  | false    | false         |
| theme               | See [Theme Props](#theme-props) below | false    | null          |


## Theme Props

### BpkHorizontalNav

* `horizontalNavSelectedTextColor`

### BpkHorizontalNavItem

* `horizontalNavSelectedTextColor`
