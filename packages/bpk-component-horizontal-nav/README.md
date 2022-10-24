# bpk-component-horizontal-nav

> Backpack horizontal nav component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import React, { Component } from 'react';
import BpkHorizontalNav, { BpkHorizontalNavItem } from '@skyscanner/backpack-web/bpk-component-horizontal-nav';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      selected: 'flights',
    };
  }

  onClick = (e) => {
    this.setState({
      selected: e.target.name,
    });
  }

  render() {
    return (
      <BpkHorizontalNav>
        <BpkHorizontalNavItem
          name="flights"
          selected={this.state.selected === 'flights'}
          onClick={this.onClick}
        >
          Flights
        </BpkHorizontalNavItem>
        <BpkHorizontalNavItem
          name="hotels"
          selected={this.state.selected === 'hotels'}
          onClick={this.onClick}
        >
          Hotels
        </BpkHorizontalNavItem>
        <BpkHorizontalNavItem
          name="car-hire"
          selected={this.state.selected === 'car-hire'}
          onClick={this.onClick}
        >
          Car hire
        </BpkHorizontalNavItem>
      </BpkHorizontalNav>
    );
  }
};
```

## Props

### BpkHorizontalNav

| Property                          | PropType | Required | Default Value |
| --------------------------------- | -------- | -------- | ------------- |
| children                          | node     | true     | -             |
| autoScrollToSelected              | bool     | false    | false         |
| className                         | string   | false    | null          |
| leadingScrollIndicatorClassName   | string   | false    | null          |
| showUnderline                     | bool     | false    | true          |
| trailingScrollIndicatorClassName  | string   | false    | null          |
| type                              | oneOf('default', 'light') | false | 'default' |

#### `autoScrollToSelected`

Ensures that the selected item is within view when loaded on narrow-screened devices.

#### `showUnderline`

When set to `false`, the bottom border on the component isn't included. This refers
to the underline on the whole `BpkHorizontalNav`, not the line that appears under the selected item.

### BpkHorizontalNavItem

| Property    | PropType | Required | Default Value |
| ----------- | -------- | -------- | ------------- |
| children    | node     | true     | -             |
| className   | string   | false    | null          |
| spaceAround | bool     | false    | false         |
| selected    | bool     | false    | false         |
| disabled    | bool     | false    | false         |
| href        | string   | false    | null          |

**Note:** `disabled` and `selected` are mutually exclusive for true values, i.e. only one of them can be true for a given nav item.

## Theme Props

* `horizontalNavLinkColor`
* `horizontalNavLinkHoverColor`
* `horizontalNavLinkActiveColor`
* `horizontalNavLinkSelectedColor`
* `horizontalNavBarSelectedColor`
