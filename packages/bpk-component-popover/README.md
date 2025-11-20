# bpk-component-popover

> Backpack popover component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import { createRef } from 'react';
import { BpkButtonV2 } from '@skyscanner/backpack-web/bpk-component-button';
import BpkPopover from '@skyscanner/backpack-web/bpk-component-popover';
import BpkText from '@skyscanner/backpack-web/bpk-component-text';

class App extends Component {
  constructor() {
    super();

    this.ref = createRef();
    this.state = {
      isOpen: false,
    };

  }

  openPopover = () => {
    this.setState({
      isOpen: true,
    });
  }

  closePopover = () => {
    this.setState({
      isOpen: false,
    });
  }

  const target = (
    <div ref={this.ref} className={'my-popover-target'}>
      <BpkButtonV2
        onClick={this.openPopover}>
          Open
      </BpkButtonV2>
    </div>
  )

  render() {
    return (
      <div id="popover-container">
        <BpkPopover
          id="my-popover"
          target={target}
          onClose={this.closePopover}
          isOpen={this.state.isOpen}
          label="My popover"
          closeButtonLabel="Close"
          closeButtonProps={{
            tabIndex: 0,
          }}
        >
          <BpkText>My popover content</BpkText>
        </BpkPopover>
      </div>
    );
  }
}
```

## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/popover/web-ViBRNHX6#section-props-e0).
