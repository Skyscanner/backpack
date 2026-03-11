# BpkCheckboxV2

A composable checkbox built on [Ark UI](https://ark-ui.com/react/docs/components/checkbox). Exposes a namespace of slot components so you can compose any label layout without extra props.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import { BpkCheckboxV2 as BpkCheckbox } from '@skyscanner/backpack-web/bpk-component-checkbox';
```

### Simple label

```jsx
<BpkCheckbox.Root>
  <BpkCheckbox.Control>
    <BpkCheckbox.Indicator />
  </BpkCheckbox.Control>
  <BpkCheckbox.Label>Send me deals</BpkCheckbox.Label>
  <BpkCheckbox.HiddenInput />
</BpkCheckbox.Root>
```

### Title + subtitle

```jsx
<BpkCheckbox.Root>
  <BpkCheckbox.Control>
    <BpkCheckbox.Indicator />
  </BpkCheckbox.Control>
  <div>
    <BpkCheckbox.Label>Price alerts</BpkCheckbox.Label>
    <BpkCheckbox.Description>
      We'll email you about price drops. Unsubscribe anytime.
    </BpkCheckbox.Description>
  </div>
  <BpkCheckbox.HiddenInput />
</BpkCheckbox.Root>
```

### Inline link inside label

```jsx
<BpkCheckbox.Root>
  <BpkCheckbox.Control>
    <BpkCheckbox.Indicator />
  </BpkCheckbox.Control>
  <BpkCheckbox.Label>
    I agree to the <a href="/terms">terms and conditions</a>
  </BpkCheckbox.Label>
  <BpkCheckbox.HiddenInput />
</BpkCheckbox.Root>
```

### States

```jsx
// Pre-checked
<BpkCheckbox.Root defaultChecked>…</BpkCheckbox.Root>

// Indeterminate
<BpkCheckbox.Root defaultChecked="indeterminate">…</BpkCheckbox.Root>

// Disabled
<BpkCheckbox.Root disabled>…</BpkCheckbox.Root>

// Invalid
<BpkCheckbox.Root invalid>…</BpkCheckbox.Root>
```

### Controlled usage

```jsx
const [checked, setChecked] = useState(false);

<BpkCheckbox.Root
  checked={checked}
  onCheckedChange={({ checked: next }) => setChecked(next)}
>
  <BpkCheckbox.Control>
    <BpkCheckbox.Indicator />
  </BpkCheckbox.Control>
  <BpkCheckbox.Label>Controlled checkbox</BpkCheckbox.Label>
  <BpkCheckbox.HiddenInput />
</BpkCheckbox.Root>
```

## Theming

Use `BpkThemeProvider` to customise fill colour and border-radius. Each property has its own `themeAttributes` export so you can theme them independently.

```js
import {
  BpkCheckboxV2 as BpkCheckbox,
  checkboxSelectedColorThemeAttributes,
  checkboxBorderRadiusThemeAttributes,
} from '@skyscanner/backpack-web/bpk-component-checkbox';
import BpkThemeProvider from '@skyscanner/backpack-web/bpk-theming';

// Theme colour only
<BpkThemeProvider
  theme={{ checkboxSelectedColor: '#8B1A1A' }}
  themeAttributes={checkboxSelectedColorThemeAttributes}
>
  <BpkCheckbox.Root defaultChecked>…</BpkCheckbox.Root>
</BpkThemeProvider>

// Theme colour + border-radius together
<BpkThemeProvider
  theme={{ checkboxSelectedColor: '#8B1A1A', checkboxBorderRadius: '50%' }}
  themeAttributes={[...checkboxSelectedColorThemeAttributes, ...checkboxBorderRadiusThemeAttributes]}
>
  <BpkCheckbox.Root defaultChecked>…</BpkCheckbox.Root>
</BpkThemeProvider>
```

## Slots

| Slot | Renders as | Required | Description |
|---|---|---|---|
| `Root` | `<label>` | ✓ | Wrapper; accepts `defaultChecked`, `checked`, `onCheckedChange`, `disabled`, `invalid` |
| `Control` | `<div>` | ✓ | The visual 20×20 checkbox box |
| `Indicator` | `null` | ✓ | Checkmark/dash rendered via CSS — no children needed |
| `Label` | `<span>` | ✓ | Primary label text; clicking toggles the checkbox |
| `Description` | `<span>` | — | Secondary/subtitle text below the label |
| `HiddenInput` | `<input type="hidden">` | ✓ | Native input for form submission |
