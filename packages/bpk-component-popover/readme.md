# bpk-component-popover

> Backpack popover component.

## Installation

```sh
npm install bpk-component-popover --save-dev
```

## Usage

```js
import React, { Component } from 'react';
import BpkButton from 'bpk-component-button';
import BpkPopover from 'bpk-component-popover';
import BpkText from 'bpk-component-text';

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
        id="my-popover"
        target={
          <BpkButton onClick={this.openPopover}>Open</BpkButton>
        }
        onClose={this.closePopover}
        isOpen={this.state.isOpen}
        label="My popover"
        closeButtonText="Close"
      >
        <BpkText>My popover content</BpkText>
      </BpkPopover>
    );
  }
}
```

## Props

| Property              | PropType                      | Required | Default Value |
| --------------------- | ----------------------------- | -------- | ------------- |
| id                    | string                        | true     | -             |
| children              | node                          | true     | -             |
| target                | element or func               | true     | -             |
| isOpen                | bool                          | true     | -             |
| onClose               | func                          | true     | -             |
| label                 | string                        | true     | -             |
| closeButtonText       | string                        | true     | -             |
| tetherOptions         | See http://tether.io/#options | false    | { attachment: 'top center', constraints: [ { to: 'window', attachment: 'together', pin: true, }, ], } |
| padded                | bool                          | false    | true          |
| labelAsTitle          | bool                          | false    | false         |
| closeButtonIcon       | bool                          | false    | true          |
| portalStyle           | object                        | false    | null          |
| portalClassName       | string                        | false    | null          |

In order to attach the popover to a regular DOM element, provide a function which returns it to `target`:

```js
<BpkPopover
  id="my-popover"
  target={() => document.getElementById('mydiv')}
  onClose={this.closePopover}
  isOpen={this.state.isOpen}
  label="My popover"
  closeButtonText="Close"
>
  <BpkText>My popover content</BpkText>
</BpkPopover>
```

### onClose

```js
const onClose = (event, {
  source: <string>, // One of `DOCUMENT_CLICK`, `CLOSE_BUTTON`, `CLOSE_LINK`, `ESCAPE`
}) => {
  ...
}
```
