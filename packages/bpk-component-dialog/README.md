# bpk-component-dialog

> Backpack dialog component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import { Component } from 'react';
import BpkDialog from '@skyscanner/backpack-web/bpk-component-dialog';
import { BpkButtonV2 } from '@skyscanner/backpack-web/bpk-component-button';

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
      <div id="dialog-container">
        <div id="pagewrap">
          <BpkButtonV2 onClick={this.onOpen}>Open dialog</BpkButtonV2>
        </div>
        <BpkDialog
          ariaLabel="example dialog to showcase component"
          closeLabel="Close dialog"
          id="my-dialog"
          className="my-classname"
          isOpen={this.state.isOpen}
          onClose={this.onClose}
          getApplicationElement={() => document.getElementById('pagewrap')}
          renderTarget={() => document.getElementById('dialog-container')}
        >
          This is a dialog. You can put anything you want in here.
        </BpkDialog>
      </div>
    );
  }
}
```

## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/dialog/web-V9liMfg8#section-props-9b).
