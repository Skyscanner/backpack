# bpk-component-dialog

> Backpack dialog component.

## Installation

```sh
npm install bpk-component-dialog --save-dev
```

## Usage

```js
import React, { Component } from 'react';
import BpkDialog from 'bpk-component-dialog';
import BpkButton from 'bpk-component-button';

class App extends Component {
  constructor() {
    super();

    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);

    this.state = {
      isOpen: false,
    };
  }

  onOpen() {
    this.setState({
      isOpen: true,
    });
  }

  onClose() {
    this.setState({
      isOpen: false,
    });
  }

  render() {
    return (
      <div>
        <div id="application-container">
          <BpkButton onClick={this.onOpen}>Open dialog</BpkButton>
        </div>
        <BpkDialog
          isOpen={this.state.isOpen}
          onClose={this.onClose}
          title="Dialog title"
          closeLabel="Close dialog"
          getApplicationElement={() =>
            document.getElementById('application-container')
          }
        >
          This is a dialog. You can put anything you want in here.
        </BpkDialog>
      </div>
    );
  }
}
```

> **Note:** In order to "hide" your application from screenreaders whilst the dialog is open you need to let it know what
  the root element for your application is by returning it's DOM node via the function passed to the
  `getApplicationElement` prop (see the example above).

## Props

| Property              | PropType             | Required | Default Value    |
| --------------------- | -------------------- | -------- | ---------------- |
| id                    | string               | true     | -                |
| className             | string               | true     | -                |
| children              | node                 | true     | -                |
| isOpen                | bool                 | true     | -                |
| onClose               | func                 | true     | -                |
| getApplicationElement | func                 | true     | -                |
| title                 | string               | false    | See prop details |
| closeLabel            | string               | false    | null             |
| renderTarget          | func                 | false    | null             |
| dismissible           | bool                 | false    | true             |

### Prop Details

title is required unless `dismissible` is false.
