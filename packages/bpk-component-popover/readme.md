# bpk-component-popover

> Backpack popover component.

## Installation

```sh
npm install bpk-component-popover --save
```

## Usage

```js
import React, { Component } from 'react';
import BpkButton from 'bpk-component-button';
import BpkPopover from 'bpk-component-popover';
import BpkParagraph from 'bpk-component-paragraph';

class App extends Component {
  constructor() {
    super();

    this.state = {
      isOpen: false,
    };

    this.openPopover = this.openPopover.bind(this);
    this.closePopover = this.closePopover.bind(this);
  }

  openPopover() {
    this.setState({
      isOpen: true,
    });
  }

  closePopover() {
    this.setState({
      isOpen: false,
    });
  }

  render() {
    return (
      <BpkPopover
        target={
          <BpkButton onClick={this.openPopover}>Open</BpkButton>
        }
        onClose={this.closePopover}
        isOpen={this.state.isOpen}
        closeButtonText="Close"
        title="My popover"
      >
        <BpkParagraph>My popover content</BpkParagraph>
      </BpkPopover>
    );
  }
}
```

### Props

| Property              | PropType                      | Required | Default Value |
| --------------------- | ----------------------------- | -------- | ------------- |
| children              | node                          | true     | -             |
| target                | element                       | true     | -             |
| isOpen                | bool                          | true     | -             |
| onClose               | func                          | true     | -             |
| closeButtonText       | string                        | true     | -             |
| tetherOptions         | See http://tether.io/#options | false    | { attachment: 'top center', constraints: [ { to: 'window', attachment: 'together', pin: true, }, ], } |
| padded                | bool                          | false    | true          |
| title                 | string                        | false    | null          |
| closeButtonIcon       | bool                          | false    | true          |
