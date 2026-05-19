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
    accessibilityLabel="Save Amsterdam hostel"
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

When the related item has a unique title, you can use this as a unique name.

**Example:** `Save Amsterdam hostel`

If the title of your related item is not
unique, you can fall back to a more generic 'option' identifier,
as long as this identifier is part of the item title as well.

**Example:** `Save option 1`

> [!TIP]
> Avoid adding punctuation to the label, this causes the screen reader to pause unnecessarily.

> [!CAUTION]
> Do not adjust the accessibility label based on the state of the button. This can be disruptive or
> cause confusion for people using a screen reader.
> The button will announce 'selected' or 'toggle button' based on the state on its own.

## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/card-button/web-l3E1ixIN#section-props-6c).
