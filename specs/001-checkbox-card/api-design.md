# API Design: Checkbox Card Component

**Phase**: 1
**Date**: 2026-01-27 (updated 2026-03-04)
**Component**: BpkCheckboxCard
**Objective**: Define component API, TypeScript types, and usage patterns

---

## 1. Architecture: Compound Component Pattern

`BpkCheckboxCard` uses the **compound component** pattern. The root component is a `<div role="checkbox">` that manages state via React Context. All child components read shared state through `useCheckboxCardContext`.

```
BpkCheckboxCard
├── .Root          — State provider, handles click/keyboard, renders <div role="checkbox">
├── .Control       — Hidden <input type="checkbox"> for form submission (aria-hidden)
├── .Content       — Content wrapper with padding
├── .Label         — Primary text (id wired to aria-labelledby on Root)
├── .Description   — Secondary text (id wired to aria-describedby on Root)
└── .Indicator     — Visual check indicator (shown when checked)
```

A **Simple API** wrapper, `BpkCheckboxCardSimple`, is also provided for common use cases.

---

## 2. TypeScript Interfaces

```typescript
/**
 * Visual variant — matches the page background context
 */
export const CHECKBOX_CARD_VARIANTS = {
  onCanvasDefault:  'onCanvasDefault',   // Standard canvas (default)
  onCanvasContrast: 'onCanvasContrast',  // Contrast canvas
  onSurfaceContrast: 'onSurfaceContrast', // Dark surface
} as const;

export type CheckboxCardVariant = (typeof CHECKBOX_CARD_VARIANTS)[keyof typeof CHECKBOX_CARD_VARIANTS];

/**
 * Border radius style
 */
export const CHECKBOX_CARD_RADIUS = {
  rounded: 'rounded',
  square:  'square',
} as const;

export type CheckboxCardRadius = (typeof CHECKBOX_CARD_RADIUS)[keyof typeof CHECKBOX_CARD_RADIUS];

/**
 * Size variant — controls padding density
 */
export const CHECKBOX_CARD_SIZES = {
  sm: 'sm',
  md: 'md',
} as const;

export type CheckboxCardSize = (typeof CHECKBOX_CARD_SIZES)[keyof typeof CHECKBOX_CARD_SIZES];

/**
 * Props for BpkCheckboxCard.Root
 */
export type RootProps = {
  /** Child subcomponents */
  children: ReactNode;

  /** Controlled checked state */
  checked?: boolean;

  /** Default checked state for uncontrolled mode */
  defaultChecked?: boolean;

  /** Callback when checked state changes */
  onCheckedChange?: (checked: boolean) => void;

  /** @default false */
  disabled?: boolean;

  /** @default false */
  required?: boolean;

  /** Form name attribute */
  name?: string;

  /** Form value attribute */
  value?: string;

  /** @default 'onCanvasDefault' */
  variant?: CheckboxCardVariant;

  /** @default 'rounded' */
  radius?: CheckboxCardRadius;

  /** @default 'md' */
  size?: CheckboxCardSize;

  /** Custom width (CSS value or px number) */
  width?: string | number;

  /** Custom height (CSS value or px number) */
  height?: string | number;

  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
};

/**
 * Props for BpkCheckboxCardSimple (convenience wrapper)
 */
export type BpkCheckboxCardSimpleProps = {
  /** Controlled checked state — required */
  checked: boolean;

  /** Callback when checked state changes — required */
  onChange: (checked: boolean) => void;

  label?: string;
  description?: string;
  icon?: ReactElement;
  image?: string;

  /**
   * Pass <BpkPrice /> for correct styling.
   * A plain string renders as unstyled text.
   */
  price?: ReactNode;

  disabled?: boolean;
  variant?: CheckboxCardVariant;
  radius?: CheckboxCardRadius;
  ariaLabel?: string;
  name?: string;
  value?: string;
  width?: string | number;
  height?: string | number;
};
```

---

## 3. Usage Examples

### Compound API — basic

```tsx
import { BpkCheckboxCard } from '@skyscanner/backpack-web/bpk-component-checkbox-card';
import { BpkVStack } from '@skyscanner/backpack-web/bpk-component-layout';
import { useState } from 'react';

const MyComponent = () => {
  const [selected, setSelected] = useState(false);

  return (
    <BpkCheckboxCard.Root
      checked={selected}
      onCheckedChange={setSelected}
    >
      <BpkCheckboxCard.Control />
      <BpkCheckboxCard.Content>
        <BpkVStack gap="bpk-spacing-md" align="center" width="100%">
          <BpkCheckboxCard.Label>City Centre</BpkCheckboxCard.Label>
          <BpkCheckboxCard.Description>0.5 km from centre</BpkCheckboxCard.Description>
        </BpkVStack>
      </BpkCheckboxCard.Content>
    </BpkCheckboxCard.Root>
  );
};
```

### Compound API — with icon and price (Hotels)

```tsx
import { LandmarkIconLg } from '@skyscanner/backpack-web/bpk-component-icon';
import { BpkPrice } from '@skyscanner/backpack-web/bpk-component-price';

const HotelsExample = () => {
  const [selected, setSelected] = useState(false);

  return (
    <BpkCheckboxCard.Root checked={selected} onCheckedChange={setSelected} width={140}>
      <BpkCheckboxCard.Control />
      <BpkCheckboxCard.Content>
        <BpkVStack gap="bpk-spacing-md" align="center" width="100%">
          <LandmarkIconLg />
          <BpkCheckboxCard.Label>City Centre</BpkCheckboxCard.Label>
          <BpkPrice price="£85" leadingText="avg." />
        </BpkVStack>
      </BpkCheckboxCard.Content>
    </BpkCheckboxCard.Root>
  );
};
```

### Compound API — inline layout (Car Hire / Flights)

```tsx
const InlineExample = () => {
  const [selected, setSelected] = useState(false);

  return (
    <BpkCheckboxCard.Root checked={selected} onCheckedChange={setSelected}>
      <BpkCheckboxCard.Control />
      <BpkCheckboxCard.Content>
        <BpkHStack gap="bpk-spacing-md" align="center" width="100%">
          <BpkCheckboxCard.Indicator />
          <BpkVStack gap="bpk-spacing-xs" width="100%">
            <BpkCheckboxCard.Label>Economy</BpkCheckboxCard.Label>
            <BpkCheckboxCard.Description>5 seats, 2 bags</BpkCheckboxCard.Description>
          </BpkVStack>
          <BpkPrice price="£60" />
        </BpkHStack>
      </BpkCheckboxCard.Content>
    </BpkCheckboxCard.Root>
  );
};
```

### Simple API

```tsx
import { BpkCheckboxCardSimple } from '@skyscanner/backpack-web/bpk-component-checkbox-card';

const SimpleExample = () => {
  const [selected, setSelected] = useState(false);

  return (
    <BpkCheckboxCardSimple
      checked={selected}
      onChange={setSelected}
      label="City Centre"
      description="0.5 km from centre"
      icon={<LandmarkIconLg />}
      price={<BpkPrice price="£85" leadingText="avg." />}
    />
  );
};
```

### Variants

```tsx
// On canvas default (default)
<BpkCheckboxCard.Root variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault} ...>

// On canvas contrast
<BpkCheckboxCard.Root variant={CHECKBOX_CARD_VARIANTS.onCanvasContrast} ...>

// On dark surface
<BpkCheckboxCard.Root variant={CHECKBOX_CARD_VARIANTS.onSurfaceContrast} ...>
```

### Multi-selection pattern

```tsx
const MultiSelectionExample = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  return (
    <>
      {options.map((opt) => (
        <BpkCheckboxCardSimple
          key={opt.id}
          name="neighbourhood"
          value={opt.id}
          checked={selected.includes(opt.id)}
          onChange={() => toggle(opt.id)}
          label={opt.label}
          price={<BpkPrice price={opt.price} />}
        />
      ))}
    </>
  );
};
```

### Uncontrolled mode

```tsx
// Use defaultChecked when parent doesn't need to track state
<BpkCheckboxCard.Root defaultChecked={false}>
  <BpkCheckboxCard.Control />
  <BpkCheckboxCard.Content>
    <BpkCheckboxCard.Label>Option</BpkCheckboxCard.Label>
  </BpkCheckboxCard.Content>
</BpkCheckboxCard.Root>
```

---

## 4. Component Structure

### DOM output

```html
<!-- BpkCheckboxCard.Root — <div role="checkbox"> manages all interactions -->
<div
  role="checkbox"
  aria-checked="false"
  aria-labelledby=":r0:"
  aria-describedby=":r1:"
  tabindex="0"
  class="bpk-checkbox-card-root bpk-checkbox-card-root--onCanvasDefault ..."
>
  <!-- BpkCheckboxCard.Control — form input, invisible to AT -->
  <input type="checkbox" aria-hidden tabindex="-1" class="bpk-checkbox-card-control" />

  <!-- BpkCheckboxCard.Content -->
  <div class="bpk-checkbox-card-content">
    <!-- BpkCheckboxCard.Label — id wired to Root's aria-labelledby -->
    <span id=":r0:" class="bpk-checkbox-card-label">City Centre</span>
    <!-- BpkCheckboxCard.Description — id wired to Root's aria-describedby -->
    <span id=":r1:" class="bpk-checkbox-card-description">0.5 km from centre</span>
  </div>

  <!-- BpkCheckboxCard.Indicator — decorative, aria-hidden -->
  <div aria-hidden class="bpk-checkbox-card-indicator" />
</div>
```

---

## 5. Accessibility

### WAI-ARIA Pattern

Root renders as `<div role="checkbox">` following the [WAI-ARIA checkbox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/):
- `aria-checked` — reflects current state
- `aria-disabled` — set when disabled (card is still in DOM, skipped by AT)
- `aria-required` — set when required
- `aria-labelledby` — points to `BpkCheckboxCard.Label` id
- `aria-describedby` — points to `BpkCheckboxCard.Description` id
- `tabIndex={0}` when enabled, `tabIndex={-1}` when disabled

`BpkCheckboxCard.Control` (the hidden `<input>`) has `aria-hidden` and `tabIndex={-1}` — it exists purely for native form submission.

### Keyboard Navigation

| Key | Action |
|-----|--------|
| `Tab` | Move focus to card |
| `Space` | Toggle selection |
| `Enter` | Toggle selection |
| `Shift+Tab` | Move focus to previous element |

### Without visible label

```tsx
// Pass aria-label on Root — labelledby is suppressed automatically
<BpkCheckboxCard.Root aria-label="City Centre, £85 per night" ...>
```

---

## 6. Form Integration

`BpkCheckboxCard.Control` (the hidden input) handles form submission:

```tsx
<form onSubmit={handleSubmit}>
  <BpkCheckboxCard.Root
    checked={checked}
    onCheckedChange={setChecked}
    name="neighbourhood"
    value="city-centre"
    required
  >
    <BpkCheckboxCard.Control />
    <BpkCheckboxCard.Content>
      <BpkCheckboxCard.Label>City Centre</BpkCheckboxCard.Label>
    </BpkCheckboxCard.Content>
  </BpkCheckboxCard.Root>
  <button type="submit">Search</button>
</form>

// When checked and submitted: FormData includes { neighbourhood: 'city-centre' }
```

---

## 7. Context API

Internal context allows advanced consumers to build custom subcomponents:

```tsx
import { useCheckboxCardContext } from '@skyscanner/backpack-web/bpk-component-checkbox-card';

function MyCustomIndicator() {
  const { checked, disabled } = useCheckboxCardContext();
  return checked ? <MyIcon color={disabled ? 'grey' : 'blue'} /> : null;
}
```

Must be used within `BpkCheckboxCard.Root`.

---

## 8. Testing Guidance

```typescript
// V2: Root is <div role="checkbox"> — use aria-checked, not .toBeChecked()
const card = screen.getByRole('checkbox');
expect(card).toHaveAttribute('aria-checked', 'false');

// Toggle by clicking Root (not the hidden input)
await userEvent.click(card);
expect(card).toHaveAttribute('aria-checked', 'true');

// Keyboard toggle
await userEvent.keyboard(' ');
expect(card).toHaveAttribute('aria-checked', 'false');

// Disabled — aria-disabled attribute, not disabled property
expect(card).toHaveAttribute('aria-disabled', 'true');
```

---

## References

- **Specification**: `specs/001-checkbox-card/spec.md`
- **Research**: `specs/001-checkbox-card/research.md`
- **Implementation**: `packages/bpk-component-checkbox-card/`
- **WAI-ARIA Checkbox Pattern**: https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/
- **Figma**: https://www.figma.com/design/ITvypOGdga42nM2ipBM4uk/Bpk-2.0?node-id=90-7627&m=dev
