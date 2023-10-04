# bpk-component-drawer

> Backpack drawer component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import { Component } from 'react';
import BpkDrawer from '@skyscanner/backpack-web/bpk-component-drawer';
import BpkButton from '@skyscanner/backpack-web/bpk-component-button';

class App extends Component {
  constructor() {
    super();

    this.state = {
      isOpen: false,
    };
  }

  onOpen = () => {
    this.setState({
      isOpen: true,
    });
  };

  onClose = () => {
    this.setState({
      isOpen: false,
    });
  };

  render() {
    return (
      <div>
        <div id="pagewrap">
          <BpkButton onClick={this.onOpen}>Open drawer</BpkButton>
        </div>
        <BpkDrawer
          id="my-drawer"
          isOpen={this.state.isOpen}
          onClose={this.onClose}
          title="Drawer title"
          closeLabel="Close drawer"
          getApplicationElement={() => document.getElementById('pagewrap')}
        >
          This is a drawer. You can put anything you want in here.
        </BpkDrawer>
      </div>
    );
  }
}
```

## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/drawer/web-QAxL5e0N#section-props-a2).
