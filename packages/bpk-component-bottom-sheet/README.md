# bpk-component-bottom-sheet

> Backpack bottom sheet component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import { Component } from 'react';
import BpkBottomSheet from '@skyscanner/backpack-web/bpk-component-bottom-sheet';
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
      <div id="bottom-sheet-container">
        <div id="pagewrap">
          <BpkButton onClick={this.onOpen}>Open bottom sheet</BpkButton>
        </div>
        <BpkBottomSheet
          id="my-bottom-sheet"
          isOpen={this.state.isOpen}
          onClose={this.onClose}
          title="Bottom sheet title"
          closeLabel="Close bottom sheet"
          getApplicationElement={() => document.getElementById('pagewrap')}
          renderTarget={() => document.getElementById('bottom-sheet-container')}
        >
          This is a bottom sheet. You can put anything you want in here.
        </BpkBottomSheet>
      </div>
    );
  }
}
```

Ensure your body/children is accessible via Voice Over. You may need to specify the tabIndex of the elements.
