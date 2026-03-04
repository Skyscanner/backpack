# bpk-component-checkbox-card

> Backpack checkbox card component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

This component provides two APIs:

### Compound component API (recommended)

Compose subcomponents for full layout control.

```tsx
import { BpkCheckboxCard, CHECKBOX_CARD_VARIANTS } from '@skyscanner/backpack-web/bpk-component-checkbox-card';

export default () => (
  <BpkCheckboxCard.Root
    checked={false}
    onCheckedChange={(checked) => console.log(checked)}
    variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
  >
    <BpkCheckboxCard.Control />
    <BpkCheckboxCard.Content>
      <BpkCheckboxCard.Label>City Centre</BpkCheckboxCard.Label>
      <BpkCheckboxCard.Description>0.5 km from centre</BpkCheckboxCard.Description>
    </BpkCheckboxCard.Content>
  </BpkCheckboxCard.Root>
);
```

### Simple API

Props-based wrapper for common use cases.

```tsx
import { BpkCheckboxCardSimple } from '@skyscanner/backpack-web/bpk-component-checkbox-card';

export default () => (
  <BpkCheckboxCardSimple
    checked={false}
    onChange={(checked) => console.log(checked)}
    label="City Centre"
    description="0.5 km from centre"
  />
);
```

## Props

### `BpkCheckboxCard.Root`

| Property | PropType | Required | Default Value |
| -------- | -------- | -------- | ------------- |
| children | node | true | - |
| checked | boolean | false | - |
| defaultChecked | boolean | false | false |
| onCheckedChange | func | false | - |
| disabled | boolean | false | false |
| required | boolean | false | false |
| variant | string | false | `onCanvasDefault` |
| radius | string | false | `rounded` |
| size | string | false | `md` |
| width | string or number | false | - |
| height | string or number | false | - |
| name | string | false | - |
| value | string | false | - |
| aria-label | string | false | - |
| aria-labelledby | string | false | - |
| aria-describedby | string | false | - |

### `BpkCheckboxCardSimple`

| Property | PropType | Required | Default Value |
| -------- | -------- | -------- | ------------- |
| checked | boolean | true | - |
| onChange | func | true | - |
| label | string | false | - |
| description | string | false | - |
| icon | element | false | - |
| image | string | false | - |
| price | node | false | - |
| disabled | boolean | false | false |
| variant | string | false | `onCanvasDefault` |
| radius | string | false | `rounded` |
| ariaLabel | string | false | - |
| name | string | false | - |
| value | string | false | - |
| width | string or number | false | - |
| height | string or number | false | - |

## Variants

| Value | Description |
| ----- | ----------- |
| `onCanvasDefault` | On a default canvas background (default) |
| `onCanvasContrast` | On a contrasting canvas background |
| `onSurfaceContrast` | On a high-contrast surface |

## Sizes

| Value | Description |
| ----- | ----------- |
| `sm` | Small — reduced padding |
| `md` | Medium (default) |

## Radius

| Value | Description |
| ----- | ----------- |
| `rounded` | Rounded corners (default) |
| `square` | No border radius |
