# bpk-component-pressable

> Backpack unstyled pressable primitive.

## Installation

Check the main [Backpack readme](https://github.com/Skyscanner/design-system/blob/main/README.md) for a complete installation guide.

## Usage

```tsx
import BpkPressable from '@skyscanner-internal/backpack-web/bpk-component-pressable';

// Button-like: fires an action, no navigation
<BpkPressable onClick={() => console.log('pressed')}>
  <SomeCustomContent />
</BpkPressable>

// Link-like: navigates to a URL
<BpkPressable as="a" href="/flights">
  <SomeCustomContent />
</BpkPressable>

// Open in new tab
<BpkPressable as="a" href="/flights" blank>
  <SomeCustomContent />
</BpkPressable>

// Disabled anchor — no navigation, aria-disabled="true", removed from tab order.
// Note: onClick is not called and the click does not bubble when disabled.
<BpkPressable as="a" href="/flights" disabled>
  <SomeCustomContent />
</BpkPressable>
```

## When to use

| Component | When |
|---|---|
| `BpkButton` | Styled button — primary, secondary, destructive actions |
| `BpkLink` | Styled anchor or button with link appearance |
| `BpkCard` | Surface card with elevation / padding that is itself pressable |
| **`BpkPressable`** | Any content needing button semantics *without* button styling |
| **`BpkPressable as="a"`** | Any content needing anchor semantics *without* link styling |
| `<button>` | Private implementation detail *inside* a Backpack component |
| `<a>` | Private implementation detail *inside* a Backpack component |
