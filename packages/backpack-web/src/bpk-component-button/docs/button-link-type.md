# Button Link Type

The link button (`type="link"` or `type="linkOnDark"`) is styled like `BpkLink` with underline decoration, providing a clickable text appearance while maintaining button semantics.

## Variants

| Variant | Description |
|---------|-------------|
| `link` | Default link style for light backgrounds |
| `linkOnDark` | Link style optimized for dark backgrounds |

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `implicit` | `boolean` | `false` | When `true`, underline only appears on hover |
| `iconOnly` | `boolean` | `false` | When `true`, no underline is applied (icon-only mode) |

## Basic Usage

```jsx
import { BpkButton, BUTTON_TYPES } from '@skyscanner/backpack-web/bpk-component-button';

// Default link with underline
<BpkButton type={BUTTON_TYPES.link}>
  Link Button
</BpkButton>

// Implicit link - underline appears on hover
<BpkButton type={BUTTON_TYPES.link} implicit>
  Implicit Link
</BpkButton>

// Link on dark background
<BpkButton type={BUTTON_TYPES.linkOnDark}>
  Link on Dark
</BpkButton>

// Implicit link on dark
<BpkButton type={BUTTON_TYPES.linkOnDark} implicit>
  Implicit Link on Dark
</BpkButton>
```

## With Icons

### Leading and Trailing Icons

Use the `leadingIcon` and `trailingIcon` props to add icons before or after the button label. Icons are automatically aligned and spaced.

```jsx
import { BpkButton, BUTTON_TYPES } from '@skyscanner/backpack-web/bpk-component-button';
import SmallLightningIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/lightning';
import SmallLongArrowRightIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/long-arrow-right';

// Link with trailing icon
<BpkButton type={BUTTON_TYPES.link} trailingIcon={<SmallLongArrowRightIcon />}>
  Link Button
</BpkButton>

// Link with leading icon
<BpkButton type={BUTTON_TYPES.link} leadingIcon={<SmallLightningIcon />}>
  Link Button
</BpkButton>

// Link with both leading and trailing icons
<BpkButton
  type={BUTTON_TYPES.link}
  leadingIcon={<SmallLightningIcon />}
  trailingIcon={<SmallLongArrowRightIcon />}
>
  Link Button
</BpkButton>
```

### Text and Icon Together

> **Deprecated:** Placing icons as children siblings is no longer recommended. Use the `leadingIcon` or `trailingIcon` props instead — they provide explicit, predictable icon slots with automatic alignment and spacing.

```jsx
// ❌ Old approach — icon as children sibling
<BpkButton type={BUTTON_TYPES.link}>
  Link Button <SmallLongArrowRightIcon />
</BpkButton>

// ✅ New approach — use leadingIcon / trailingIcon props
<BpkButton type={BUTTON_TYPES.link} trailingIcon={<SmallLongArrowRightIcon />}>
  Link Button
</BpkButton>
```

### Custom Text Styling with BpkText

> **Note:** If you only need an icon before or after the label, prefer using the `leadingIcon` or `trailingIcon` props instead — they handle alignment and spacing automatically without needing `withButtonAlignment`.

When wrapping text and icon inside `BpkText` or `<span>`, there is **no automatic spacing** between them. To ensure proper vertical alignment, the icon should be wrapped with `withButtonAlignment`.

```jsx
import { BpkButton, BUTTON_TYPES } from '@skyscanner/backpack-web/bpk-component-button';
import BpkText, { TEXT_STYLES } from '@skyscanner/backpack-web/bpk-component-text';
import {
  withButtonAlignment,
  withRtlSupport,
} from '@skyscanner/backpack-web/bpk-component-icon';
import SmallLongArrowRightIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/long-arrow-right';

const AlignedSmallLongArrowRightIcon = withButtonAlignment(
  withRtlSupport(SmallLongArrowRightIcon),
);

// Text and icon wrapped together in BpkText or span
// No automatic spacing, use `withButtonAlignment` for proper icon alignment.
<BpkButton type={BUTTON_TYPES.link}>
  <BpkText textStyle={TEXT_STYLES.label1}>
    Button
    <AlignedSmallLongArrowRightIcon />
  </BpkText>
</BpkButton>
```

### Icon Only

Use `iconOnly` prop for buttons containing only an icon. Always provide `aria-label` for accessibility.

```jsx
// Icon-only link (no underline applied)
<BpkButton type={BUTTON_TYPES.link} iconOnly aria-label="Next">
  <SmallLongArrowRightIcon />
</BpkButton>
```

## Behavior Notes

- **Underline**: Applied by default to the label text
- **Implicit mode**: Underline appears only on hover
- **Icon-only mode**: No underline is applied
- **Disabled state**: Underline is removed when button is disabled
- **Spacing**: When `leadingIcon` or `trailingIcon` is used, an 8px gap is automatically applied between the icon and label

## Accessibility

- Use semantic button element (not anchor) when the action doesn't navigate to a new page
- It need provide `aria-label` for icon-only buttons
- Link buttons support keyboard navigation (Tab, Enter, Space)
