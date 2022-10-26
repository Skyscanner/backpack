# bpk-component-dialog

> Backpack dialog component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import React, { Component } from 'react';
import BpkDialog from '@skyscanner/backpack-web/bpk-component-dialog';
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
      <div id="dialog-container">
        <div id="pagewrap">
          <BpkButton onClick={this.onOpen}>Open dialog</BpkButton>
        </div>
        <BpkDialog
          ariaLabel="example dialog to showcase component"
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
| ariaLabel             | string   | true     | -                |
| children              | node     | true     | -                |
| getApplicationElement | func     | true     | -                |
| id                    | string   | true     | -                |
| isOpen                | bool     | true     | -                |
| className             | string   | false    | null             |
| closeLabel            | string   | false    | null             |
| dismissible           | bool     | false    | true             |
| flare                 | bool     | false    | false            |
| flareClassName        | string   | false    | null             |
| headerIcon            | node     | false    | null             |
| headerIconType        | oneOf(HEADER_ICON_TYPES.primary, HEADER_ICON_TYPES.warning, HEADER_ICON_TYPES.destructive) | false    | HEADER_ICON_TYPES.primary |
| onClose               | func     | false    | See prop details |
| renderTarget          | func     | false    | null             |

### Prop Details

#### onClose

This is required unless `dismissible` is false.

#### flareClassName

This will change the style of the default flare view. Should you wish to apply an image to the flare you would pass the image using the CSS property `background-image`.

#### getApplicationElement

This is a function that should return the DOM node of the root of your application, the node returned will be hidden from screen readers when the dialog is displayed. Be careful to return the correct node from this, as on iPhone this element is actually hidden from view also.

## Theme Props

- `linkColor`
- `linkHoverColor`
- `linkActiveColor`
- `linkVisitedColor`
