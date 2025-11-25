# bpk-component-modal

> ## 🧪 Experimental Component: `BpkModalV2`
>
> ### Why a version 2?
>
> The `BpkModalV2` introduce the HTML `<dialog>` element to the bpk-component-modal in Backpack.
>
> This is a powerful solution for accessibility within a modal:
> > *The native HTML `<dialog>` element should be used in creating modal dialogs as it provides usability and accessibility features that must be replicated if using other elements for a similar purpose* [Source: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog]
>
> ### Help and feedbacks
>
> As an experimental component and in order to improve it, we would like to hear about your issues/feedbacks.
>
> Contact: @Tony (Anthony Byledbal)

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import { Component } from 'react';
import BpkModalV2 from '@skyscanner/backpack-web/bpk-component-modal';
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
      <div id="modal-container">
        <div id="pagewrap">
          <BpkButtonV2 onClick={this.onOpen}>Open modal</BpkButtonV2>
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