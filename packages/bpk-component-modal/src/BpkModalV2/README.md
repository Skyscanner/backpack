# bpk-component-modal

> Backpack modal component version 2.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import { Component } from 'react';
import BpkModalV2 from '@skyscanner/backpack-web/bpk-component-modal';
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
      <div id="modal-container">
        <div id="pagewrap">
          <BpkButton onClick={this.onOpen}>Open modal</BpkButton>
        </div>
        <BpkModal
          id="bpk-modal"
          ariaLabelledby="bpk-modal-label-my-dialog"
          closeLabel="bpk-modal-button-close"
          isOpen={this.state.isOpen}
          onClose={this.onClose}
            >
              <div>
                Back to results
              </div>
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

| Property              | PropType | Required | Default Value |
| --------------------- | -------- | -------- | ------------- |
| id                    | string   | true     | -             |
| children              | node     | true     | -             |
| closeLabel            | string   | true     | -             |
| isOpen                | bool     | true     | -             |
| onClose               | func     | true     | -             |
| fullScreenOnMobile    | bool     | false    | false         |
| noFullScreenOnMobile  | bool     | false    | false         |
| padded                | bool     | false    | false         |
| title                 | string   | false    | ''            |
| wide                  | bool     | false    | false         |
