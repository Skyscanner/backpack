# bpk-component-input

> Backpack input component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import BpkInput, {
  INPUT_TYPES,
  CLEAR_BUTTON_MODES,
} from '@skyscanner/backpack-web/bpk-component-input';

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

### withOpenEvents

The `withOpenEvents` higher-order component encapsulates input event handlers for opening popovers or modals.

```js
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
        closeButtonIcon={false}
      >
        A popover!
      </BpkPopover>
    );
  }
}
```

## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/text-input/web-nRg9O75F#section-input-props-51).
