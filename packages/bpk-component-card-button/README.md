# bpk-component-card-button

> Backpack card button component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

### BpkSaveButton

```js
import {
  BpkSaveButton,
  SIZE_TYPES,
  STYLE_TYPES
} from '@skyscanner/backpack-web/bpk-component-card-button';

export default () =>
  <BpkSaveButton
    checked={false}
    accessibilityLabel="Save flight option 1"
    onCheckedChange={() => {
      console.log('save status changed!');
    }}
    size={SIZE_TYPES.small}
    style={STYLE_TYPES.contained}
  />;
```

#### Accessibility
When someone with a screen reader navigates the page by buttons, they will see a list of all the button names available
on the page. we need to ensure there is enough context to understand what the button will do without being overly wordy.

Therefore, the accessibility label of the button should be short and unique.
Usually it will take the form of `{verb} {unique name}`.

**Example:** `Save flight option 1`

> [!TIP]
> Avoid adding punctuation to the label, this causes the screen reader to pause unnecessarily.

> [!CAUTION]
> Do not adjust the accesibility label based on the state of the button. This can be disruptive or
> cause confusion for people using a screen reader.
> The button will anounced 'selected' or 'toggle button' based on the state on its own.

## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/card-button/web-l3E1ixIN#section-props-6c).
