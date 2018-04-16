# bpk-component-horizontal-nav

> Backpack horizontal nav component.

## Installation

```sh
npm install bpk-component-horizontal-nav --save-dev
```

## Usage

```js
import React, { Component } from 'react';
import BpkHorizontalNav, { BpkHorizontalNavItem } from 'bpk-component-horizontal-nav';

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

| Property    | PropType | Required | Default Value |
| ----------- | -------- | -------- | ------------- |
| children    | node     | true     | -             |
| className   | string   | false    | null          |

### BpkHorizontalNavItem

| Property    | PropType | Required | Default Value |
| ----------- | -------- | -------- | ------------- |
| children    | node     | true     | -             |
| className   | string   | false    | null          |
| spaceAround | bool     | false    | false         |
| selected    | bool     | false    | false         |
| href        | string   | false    | null          |

## Theme Props

* `horizontalNavLinkColor`
* `horizontalNavLinkHoverColor`
* `horizontalNavLinkActiveColor`
* `horizontalNavLinkSelectedColor`
* `horizontalNavBarSelectedColor`
