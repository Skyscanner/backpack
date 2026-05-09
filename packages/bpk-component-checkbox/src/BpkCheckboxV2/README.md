# BpkCheckboxV2

A composable checkbox built on [Ark UI](https://ark-ui.com/react/docs/components/checkbox). Exposes a namespace of slot components so you can compose any label layout without extra props.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import BpkCheckboxV2 from '@skyscanner/backpack-web/bpk-component-checkbox';
```

### Simple label

```jsx
<BpkCheckboxV2.Root>
  <BpkCheckboxV2.Control>
    <BpkCheckboxV2.Indicator />
  </BpkCheckboxV2.Control>
  <BpkCheckboxV2.Label>Send me deals</BpkCheckboxV2.Label>
  <BpkCheckboxV2.HiddenInput />
</BpkCheckboxV2.Root>
```

### Title + subtitle

```jsx
<BpkCheckboxV2.Root>
  <BpkCheckboxV2.Control>
    <BpkCheckboxV2.Indicator />
  </BpkCheckboxV2.Control>
  <div>
    <BpkCheckboxV2.Label>Price alerts</BpkCheckboxV2.Label>
    <BpkCheckboxV2.Description>
      We'll email you about price drops. Unsubscribe anytime.
    </BpkCheckboxV2.Description>
  </div>
  <BpkCheckboxV2.HiddenInput />
</BpkCheckboxV2.Root>
```

### Inline link inside label

```jsx
<BpkCheckboxV2.Root>
  <BpkCheckboxV2.Control>
    <BpkCheckboxV2.Indicator />
  </BpkCheckboxV2.Control>
  <BpkCheckboxV2.Label>
    I agree to the <a href="/terms">terms and conditions</a>
  </BpkCheckboxV2.Label>
  <BpkCheckboxV2.HiddenInput />
</BpkCheckboxV2.Root>
```

### States

```jsx
// Pre-checked
<BpkCheckboxV2.Root defaultChecked>…</BpkCheckboxV2.Root>

// Indeterminate
<BpkCheckboxV2.Root defaultChecked="indeterminate">…</BpkCheckboxV2.Root>

// Disabled
<BpkCheckboxV2.Root disabled>…</BpkCheckboxV2.Root>

// Invalid
<BpkCheckboxV2.Root invalid>…</BpkCheckboxV2.Root>
```

### Controlled usage

```jsx
const [checked, setChecked] = useState(false);

<BpkCheckboxV2.Root
  checked={checked}
  onCheckedChange={(next) => setChecked(next)}
>
  <BpkCheckboxV2.Control>
    <BpkCheckboxV2.Indicator />
  </BpkCheckboxV2.Control>
  <BpkCheckboxV2.Label>Controlled checkbox</BpkCheckboxV2.Label>
  <BpkCheckboxV2.HiddenInput />
</BpkCheckboxV2.Root>
```

## Theming

Use `BpkThemeProvider` to customise fill colour and border-radius. Each property has its own `themeAttributes` export so you can theme them independently.

```js
import {
  statusDangerSpotDay,
  borderRadiusFull,
} from '@skyscanner/bpk-foundations-web/tokens/base.es6';
import {
  BpkCheckboxV2,
  checkboxSelectedColorThemeAttributes,
  checkboxBorderRadiusThemeAttributes,
} from '@skyscanner/backpack-web/bpk-component-checkbox';
import BpkThemeProvider from '@skyscanner/backpack-web/bpk-theming';

// Theme colour only
<BpkThemeProvider
  theme={{ checkboxSelectedColor: statusDangerSpotDay }}
  themeAttributes={checkboxSelectedColorThemeAttributes}
>
  <BpkCheckboxV2.Root defaultChecked>…</BpkCheckboxV2.Root>
</BpkThemeProvider>

// Theme colour + border-radius together
<BpkThemeProvider
  theme={{ checkboxSelectedColor: statusDangerSpotDay, checkboxBorderRadius: borderRadiusFull }}
  themeAttributes={[...checkboxSelectedColorThemeAttributes, ...checkboxBorderRadiusThemeAttributes]}
>
  <BpkCheckboxV2.Root defaultChecked>…</BpkCheckboxV2.Root>
</BpkThemeProvider>
```

## Migrating from V1

> ⚠️ **Breaking change: `valid` → `invalid`**
>
> V1 used `valid={false}` to indicate an invalid state. V2 **inverts this** — use `invalid` instead.
>
> ```jsx
> // V1
> <BpkCheckbox valid={false} label="Accept terms" />
>
> // V2 — invert the logic
> <BpkCheckboxV2.Root invalid>
>   <BpkCheckboxV2.Control><BpkCheckboxV2.Indicator /></BpkCheckboxV2.Control>
>   <BpkCheckboxV2.Label>Accept terms</BpkCheckboxV2.Label>
>   <BpkCheckboxV2.HiddenInput />
> </BpkCheckboxV2.Root>
> ```
>
> If you were reading `valid` from state, negate it:
>
> ```jsx
> // V1
> <BpkCheckbox valid={isValid} label="Accept terms" />
>
> // V2
> <BpkCheckboxV2.Root invalid={!isValid}>…</BpkCheckboxV2.Root>
> ```

## Slots

| Slot | Renders as | Required | Description |
|---|---|---|---|
| `Root` | `<label>` | ✓ | Wrapper; accepts `defaultChecked`, `checked`, `onCheckedChange`, `disabled`, `invalid` |
| `Control` | `<div>` | ✓ | The visual 20×20 checkbox box |
| `Indicator` | `null` | ✓ | Checkmark/dash rendered via CSS — no children needed |
| `Label` | `<span>` | ✓ | Primary label text; clicking toggles the checkbox |
| `Description` | `<span>` | — | Secondary/subtitle text below the label |
| `HiddenInput` | `<input type="checkbox">` | ✓ | Visually hidden native input for form submission and accessibility |
