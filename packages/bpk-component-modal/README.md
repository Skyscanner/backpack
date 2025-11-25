# bpk-component-modal

> Backpack modal component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import { Component } from 'react';
import BpkModal from '@skyscanner/backpack-web/bpk-component-modal';
import { BpkButtonV2 } from '@skyscanner/backpack-web/bpk-component-button';
import { BpkNavigationBarButtonLink } from '@skyscanner/backpack-web/bpk-component-navigation-bar';

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
      <div id="modal-container">
        <div id="pagewrap">
          <BpkButtonV2 onClick={this.onOpen}>Open modal</BpkButtonV2>
        </div>
        <BpkModal
          id="my-modal"
          isOpen={this.state.isOpen}
          onClose={this.onClose}
          title="Modal title"
          closeLabel="Close modal"
          getApplicationElement={() => document.getElementById('pagewrap')}
          renderTarget={() => document.getElementById('modal-container')}
          accessoryView={
            <BpkNavigationBarButtonLink
              label="Close"
              onClick={this.onClose}
              className={getClassName('bpk-modal__leading-button')}
            >
              <div>
                Back to results
              </div>
            </BpkNavigationBarButtonLink>
          }
        >
          This is a modal. You can put anything you want in here.
        </BpkModal>
      </div>
    );
  }
}
```

## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/modal/web-T4Oa73RC#section-props-82).
