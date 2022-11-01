# bpk-component-modal

> Backpack modal component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import React, { Component } from 'react';
import BpkModal from '@skyscanner/backpack-web/bpk-component-modal';
import BpkButton from '@skyscanner/backpack-web/bpk-component-button';
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
          <BpkButton onClick={this.onOpen}>Open modal</BpkButton>
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

> **Note:** In order to "hide" your application from screen readers whilst the modal is open you need to let it know what
> the root element for your application is by returning it's DOM node via the function passed to the
> `getApplicationElement` prop (see the example above). The `pagewrap` element id is a convention we use internally at Skyscanner. In most cases it should "just work".

> **Theming:** In order to theme the modal, a `renderTarget` needs to be supplied as a function which returns a DOM node
> in the scope of a `BpkThemeProvider`.

## Props

| Property              | PropType | Required | Default Value |
| --------------------- | -------- | -------- | ------------- |
| id                    | string   | true     | -             |
| children              | node     | true     | -             |
| isOpen                | bool     | true     | -             |
| onClose               | func     | true     | -             |
| getApplicationElement | func     | true     | -             |
| title                 | string   | true     | -             |
| accessoryView         | node     | false    | null          |
| className             | string   | false    | null          |
| contentClassName      | string   | false    | null          |
| closeLabel            | string   | false    | null          |
| closeText             | string   | false    | null          |
| renderTarget          | func     | false    | null          |
| wide                  | bool     | false    | false         |
| fullScreenOnMobile    | bool     | false    | true          |
| fullScreen            | bool     | false    | false         |
| closeOnScrimClick     | bool     | false    | true          |
| showHeader            | bool     | false    | true          |
| closeOnEscPressed     | bool     | false    | true          |
| padded                | bool     | false    | true          |

## `accessoryView`

The accessory view allows for icons and actions to be placed in front of the main title inside the modal header. To be used with `BpkNavigationBarButtonLink`

## Theme Props

- `linkColor`
- `linkHoverColor`
- `linkActiveColor`
- `linkVisitedColor`
