# bpk-component-checkbox

> Backpack checkbox component built on Ark UI primitives. Supports both simple and composable APIs for flexible checkbox layouts.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

### Simple API (Legacy)

The simple API provides a quick way to create a checkbox with a label:

```js
import BpkCheckbox from '@skyscanner/backpack-web/bpk-component-checkbox';

export default () => (
  <BpkCheckbox
    name="prefer-directs"
    label="Prefer directs"
    checked
    onChange={() => console.log('prefer directs changed!')}
  />
);
```

### Composable API

The composable API allows for custom layouts using sub-components:

```js
import BpkCheckbox from '@skyscanner/backpack-web/bpk-component-checkbox';

export default () => (
  <BpkCheckbox name="accept" checked onChange={() => console.log('changed!')}>
    <BpkCheckbox.Control>
      <BpkCheckbox.Indicator />
    </BpkCheckbox.Control>
    <BpkCheckbox.Label>
      I accept the terms and conditions
    </BpkCheckbox.Label>
    <BpkCheckbox.HiddenInput />
  </BpkCheckbox>
);
```

### With Description (Composable API)

```js
import BpkCheckbox from '@skyscanner/backpack-web/bpk-component-checkbox';

export default () => (
  <BpkCheckbox name="newsletter" checked={false} onChange={() => {}}>
    <BpkCheckbox.Control>
      <BpkCheckbox.Indicator />
    </BpkCheckbox.Control>
    <div>
      <BpkCheckbox.Label>Subscribe to newsletter</BpkCheckbox.Label>
      <p style={{ margin: 0, fontSize: '0.875rem', color: '#666' }}>
        Get the latest travel deals and updates
      </p>
    </div>
    <BpkCheckbox.HiddenInput />
  </BpkCheckbox>
);
```

### Theming

Checkboxes can be themed using `BpkThemeProvider`:

```js
import BpkCheckbox from '@skyscanner/backpack-web/bpk-component-checkbox';
import BpkThemeProvider from '@skyscanner/backpack-web/bpk-theming';
import { themeAttributes } from '@skyscanner/backpack-web/bpk-component-checkbox';

const theme = {
  checkboxCheckedColor: '#ff0000',
};

export default () => (
  <BpkThemeProvider theme={theme} themeAttributes={themeAttributes}>
    <BpkCheckbox
      name="themed"
      label="Themed checkbox"
      checked
      onChange={() => {}}
    />
  </BpkThemeProvider>
);
```

### States

```js
// Disabled state
<BpkCheckbox name="disabled" label="Disabled" disabled />

// Indeterminate state
<BpkCheckbox name="partial" label="Partial selection" indeterminate />

// Invalid state
<BpkCheckbox name="invalid" label="Required field" valid={false} />

// Required field
<BpkCheckbox name="required" label="Required" required />

// White variant (for dark backgrounds)
<BpkCheckbox name="white" label="White checkbox" white />

// Small label variant
<BpkCheckbox name="small" label="Small label" smallLabel />
```

## Props

### BpkCheckbox (Main Component)

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| name | string | true | - | Form input name attribute |
| label | ReactNode | conditional | - | Label text (required when not using composable children) |
| children | ReactNode | conditional | - | Composable child elements (required when not using label) |
| checked | boolean | false | - | Controlled checked state |
| defaultChecked | boolean | false | - | Initial checked state (uncontrolled) |
| onChange | function | false | - | Legacy change handler: `(event) => void` |
| onCheckedChange | function | false | - | Ark UI change handler: `({ checked }) => void` |
| disabled | boolean | false | false | Disables interaction |
| indeterminate | boolean | false | false | Shows indeterminate state (dash icon) |
| valid | boolean \| null | false | null | Validation state (false shows error styling) |
| required | boolean | false | false | Shows asterisk when true |
| white | boolean | false | false | White variant for dark backgrounds |
| smallLabel | boolean | false | false | Renders label with small text style |
| className | string \| null | false | null | Additional CSS class for root element |

### BpkCheckbox.Root

Same as BpkCheckbox when using composable API.

### BpkCheckbox.Control

The visual checkbox box element.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| children | ReactNode | false | - | Custom content (typically BpkCheckbox.Indicator) |
| className | string | false | - | Additional CSS class |

### BpkCheckbox.Label

The label element associated with the checkbox.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| children | ReactNode | true | - | Label text or content |
| className | string | false | - | Additional CSS class |

### BpkCheckbox.Indicator

The checkmark or dash icon inside the control.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| children | ReactNode | false | - | Custom indicator content |
| className | string | false | - | Additional CSS class |

### BpkCheckbox.HiddenInput

The hidden native input element for form submission.

Accepts all standard HTML input attributes.

## Theme Attributes

The following theme attributes can be customised using `BpkThemeProvider`:

- `checkboxCheckedColor` - Background and border colour when checked

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/checkbox/web-iTrW8zds#section-props-73).
