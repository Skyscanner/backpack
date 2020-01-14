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
          <BpkButton onClick={this.onOpen}>Open dialog</BpkButton>
        </div>
        <BpkDialog
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

> **Note:** In order to "hide" your application from screen readers whilst the dialog is open you need to let it know what
> the root element for your application is by returning it's DOM node via the function passed to the
> `getApplicationElement` prop (see the example above). The `pagewrap` element id is a convention we use internally at Skyscanner. In most cases it should "just work".

## Props

| Property              | PropType | Required | Default Value    |
| --------------------- | -------- | -------- | ---------------- |
| id                    | string   | true     | -                |
| className             | string   | true     | -                |
| children              | node     | true     | -                |
| isOpen                | bool     | true     | -                |
| getApplicationElement | func     | true     | -                |
| onClose               | func     | false    | See prop details |
| closeLabel            | string   | false    | null             |
| renderTarget          | func     | false    | null             |
| dismissible           | bool     | false    | true             |

### Prop Details

#### onClose

This is required unless `dismissible` is false.

## Theme Props

- `linkColor`
- `linkHoverColor`
- `linkActiveColor`
- `linkVisitedColor`
