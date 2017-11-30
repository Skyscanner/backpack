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
      <div>
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

> **Theming:** In order to theme the modal a `renderTarget` needs to be supplied as a DOM reference of a node in
  the scope of `BpkThemeProvider`, the modal will be rendered as child element of the given node.

## Props

| Property              | PropType             | Required | Default Value |
| --------------------- | -------------------- | -------- | ------------- |
| id                    | string               | true     | -             |
| className             | string               | true     | -             |
| children              | node                 | true     | -             |
| isOpen                | bool                 | true     | -             |
| onClose               | func                 | true     | -             |
| title                 | string               | true     | -             |
| getApplicationElement | func                 | true     | -             |
| closeLabel            | string               | false    | null          |
| closeText             | string               | false    | null          |
| renderTarget          | node     | false    | null          |
| wide                  | bool                 | false    | false         |

## Theme Props

Both all the props from [link](/components/web/typography#links) and

* `modalCloseButtonColor`
* `modalCloseButtonHoverColor`
