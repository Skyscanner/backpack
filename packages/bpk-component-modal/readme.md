# bpk-component-modal

> Backpack modal component.

## Installation

```sh
npm install bpk-component-modal --save-dev
```

## Usage

```js
import React, { Component } from 'react';
import BpkModal from 'bpk-component-modal';
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
      <div id="modal-container">
        <div id="application-container">
          <BpkButton onClick={this.onOpen}>Open modal</BpkButton>
        </div>
        <BpkModal
          isOpen={this.state.isOpen}
          onClose={this.onClose}
          title="Modal title"
          closeLabel="Close modal"
          getApplicationElement={() =>
            document.getElementById('application-container')
          }
          renderTarget={() =>
            document.getElementById('modal-container')
          }
        >
          This is a modal. You can put anything you want in here.
        </BpkModal>
      </div>
    );
  }
}
```

> **Note:** In order to "hide" your application from screenreaders whilst the modal is open you need to let it know what
  the root element for your application is by returning it's DOM node via the function passed to the
  `getApplicationElement` prop (see the example above).

> **Theming:** In order to theme the modal, a `renderTarget` needs to be supplied as a function which returns a DOM node
  in the scope of a `BpkThemeProvider`.

## Props

| Property              | PropType | Required | Default Value |
| --------------------- | -------- | -------- | ------------- |
| id                    | string   | true     | -             |
| className             | string   | true     | -             |
| children              | node     | true     | -             |
| isOpen                | bool     | true     | -             |
| onClose               | func     | true     | -             |
| title                 | string   | true     | -             |
| getApplicationElement | func     | true     | -             |
| closeLabel            | string   | false    | null          |
| closeText             | string   | false    | null          |
| renderTarget          | func     | false    | null          |
| wide                  | bool     | false    | false         |

## Theme Props

* `linkColor`
* `linkHoverColor`
* `linkActiveColor`
* `linkVisitedColor`
* `closeButtonColor`
* `closeButtonHoverColor`
* `closeButtonActiveColor`
