# bpk-component-popover

> Backpack popover component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import React, { Component } from 'react';
import BpkButton from '@skyscanner/backpack-web/bpk-component-button';
import BpkPopover from '@skyscanner/backpack-web/bpk-component-popover';
import BpkText from '@skyscanner/backpack-web/bpk-component-text';

class App extends Component {
  constructor() {
    super();

    this.ref = React.createRef();
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
      <BpkButton
        onClick={this.openPopover}>
          Open
      </BpkButton>
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
          closeButtonText="Close"
          renderTarget={() =>
            document.getElementById('popover-container')
          }
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

> **Theming:** In order to theme the modal, a `renderTarget` needs to be supplied as a function which returns a DOM node
  in the scope of a `BpkThemeProvider`.

## Props

| Property              | PropType                                  | Required | Default Value |
| --------------------- | ----------------------------------------- | -------- | ------------- |
| children              | node                                      | true     | -             |
| closeButtonText       | string                                    | true     | -             |
| id                    | string                                    | true     | -             |
| isOpen                | bool                                      | true     | -             |
| label                 | string                                    | true     | -             |
| onClose               | func                                      | true     | -             |
| target                | element or func                           | true     | -             |
| closeButtonIcon       | bool                                      | false    | true          |
| closeButtonProps      | object                                    | false    | null          |
| labelAsTitle          | bool                                      | false    | false         |
| padded                | bool                                      | false    | true          |
| placement             | oneOf(['top', 'right', 'bottom', 'left']) | false    | 'bottom'      |
| popperModifiers       | arrayOf(object)                           | false    | null          |
| portalClassName       | string                                    | false    | null          |
| portalStyle           | object                                    | false    | null          |
| renderTarget          | func                                      | false    | null          |

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

### Prop Details

#### onClose

```js
const onClose = (event, {
  source: <string>, // One of `DOCUMENT_CLICK`, `CLOSE_BUTTON`, `CLOSE_LINK`, `ESCAPE`
}) => {
  ...
}
```

#### popperModifiers

Please refer to the [documentation](https://popper.js.org/docs/v2/modifiers/) for the underlying positioning library "Popper.js". You can achieve various behaviours such as allowing the popover to overflow the viewport etc.

#### target

`target` can be a DOM element with a `ref` attached to it or a function that returns a DOM element.

## Theme Props

* `linkColor`
* `linkHoverColor`
* `linkActiveColor`
* `linkVisitedColor`
