# bpk-component-horizontal-nav

> Backpack horizontal nav component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import { Component } from 'react';
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

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/horizontal-navigation/web-xkQUB1Vp#section-props-eb).
