# bpk-component-input

> Backpack input component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import React from 'react';
import BpkInput, { INPUT_TYPES, CLEAR_BUTTON_MODES } from '@skyscanner/backpack-web/bpk-component-input';

export default () => (
  <BpkInput
    id="origin"
    type={INPUT_TYPES.text}
    name="origin"
    value="Edinburgh"
    onChange={() => console.log('input changed!')}
    placeholder="Country, city or airport"
    clearButtonMode={CLEAR_BUTTON_MODES.whileEditing}
    clearButtonLabel="Clear"
    onClear={() => console.log('input cleared!')}
  />
);
```

## Props

| Property         | PropType             | Required                  | Default Value            |
| ---------------- | -------------------------- | ------------------- | ------------------------ |
| id               | string                     | true                | -                        |
| name             | string                     | true                | -                        |
| type             | INPUT_TYPES (one of)       | false               | INPUT_TYPES.text         |
| value            | string                     | true                | -                        |
| clearButtonMode  | CLEAR_BUTTON_MODES (one of)| false               | CLEAR_BUTTON_MODES.never |
| clearButtonLabel | string                     | if clearable={true} | null                     |
| dockedFirst      | bool                       | false               | false                    |
| dockedLast       | bool                       | false               | false                    |
| dockedMiddle     | bool                       | false               | false                    |
| inputRef         | func                       | false               | null                     |
| large            | bool                       | false               | false                    |
| onClear          | func                       | if clearable={true} | null                     |
| valid            | bool                       | false               | null                     |

Additionally, all native `<input />` attributes such as `placeholder` and `onChange` are supported.

**Note:** When `clearButtonMode` is set to `always`, validity icons will not appear.

### withOpenEvents

The `withOpenEvents` higher-order component encapsulates input event handlers for opening popovers or modals.

The `onOpen` callback is called on the following events:

* click
* focus
* touchend
* keydown (Enter key)
* keyup (Space key)

You can still attach custom handlers for these events as they will still be called. All other key events are prevented.

> It is important you pass the `isOpen` prop, as it is necessary to work around an IE bug.

| Property        | PropType             | Required  | Default Value       |
| --------------- | -------------------- | --------- | ------------------- |
| isOpen          | bool                 | false     | false               |
| onOpen          | func                 | false     | null                |
| hasTouchSupport | bool                 | false     | (feature detection) |

```js
import React from 'react';
import BpkInput, { withOpenEvents } from '@skyscanner/backpack-web/bpk-component-input';
import BpkPopover from '@skyscanner/backpack-web/bpk-component-popover';

const EnhancedInput = withOpenEvents(BpkInput);

export default () => {
  constructor() {
    super();

    this.state = { isOpen: false };
  }

  onOpen = () => {
    this.setState({ isOpen: true });
  }

  onClose = () => {
    this.setState({ isOpen: false });
  }

  render() {
    return (
      <BpkPopover
        id="popover"
        target={
          <EnhancedInput
            id="input"
            value="An input?"
            isOpen={this.state.isOpen}
            onOpen={this.onOpen}
            onChange={() => null}
          />
        }
        onClose={this.onClose}
        isOpen={this.state.isOpen}
        label="Popover"
        closeButtonText="Close"
      >
        A popover!
      </BpkPopover>
    );
  }
}
```
