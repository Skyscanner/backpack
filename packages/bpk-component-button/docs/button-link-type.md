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
import { BpkButtonV2, BUTTON_TYPES } from '@skyscanner/backpack-web/bpk-component-button';

// Default link with underline
<BpkButtonV2 type={BUTTON_TYPES.link}>
  Link Button
</BpkButtonV2>

// Implicit link - underline appears on hover
<BpkButtonV2 type={BUTTON_TYPES.link} implicit>
  Implicit Link
</BpkButtonV2>

// Link on dark background
<BpkButtonV2 type={BUTTON_TYPES.linkOnDark}>
  Link on Dark
</BpkButtonV2>

// Implicit link on dark
<BpkButtonV2 type={BUTTON_TYPES.linkOnDark} implicit>
  Implicit Link on Dark
</BpkButtonV2>
```

## With Icons

### Text and Icon Together

When combining text with an icon, place them as siblings. The component provides automatic spacing (8px gap) and vertical alignment.

```jsx
import { BpkButtonV2, BUTTON_TYPES } from '@skyscanner/backpack-web/bpk-component-button';
import SmallLongArrowRightIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/long-arrow-right';

// Text with trailing icon - automatic 8px gap
<BpkButtonV2 type={BUTTON_TYPES.link}>
  Link Button <SmallLongArrowRightIcon />
</BpkButtonV2>
```

### Icon Only

Use `iconOnly` prop for buttons containing only an icon. Always provide `aria-label` for accessibility.

```jsx
// Icon-only link (no underline applied)
<BpkButtonV2 type={BUTTON_TYPES.link} iconOnly aria-label="Next">
  <SmallLongArrowRightIcon />
</BpkButtonV2>
```

### Custom Text Styling with BpkText

When wrapping text and icon inside `BpkText` or `<span>`, there is **no automatic spacing** between them. And to ensure proper vertical alignment, the icon should be wrapped with `withButtonAlignment`.

```jsx
import { BpkButtonV2, BUTTON_TYPES } from '@skyscanner/backpack-web/bpk-component-button';
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
<BpkButtonV2 type={BUTTON_TYPES.link}>
  <BpkText textStyle={TEXT_STYLES.label1}>
    Button
    <AlignedSmallLongArrowRightIcon />
  </BpkText>
</BpkButtonV2>
```

### Text and Icon as Siblings with Custom Styling

When text (wrapped in `BpkText`) and icon are siblings, there is an **8px gap** between them by default, remove extra padding space eg `&nbsp;` or `className`.

```jsx
// Text and icon as siblings - 8px gap applied
<BpkButtonV2 type={BUTTON_TYPES.link}>
  <BpkText textStyle={TEXT_STYLES.label1}>Button</BpkText>
  <SmallLongArrowRightIcon />
</BpkButtonV2>
```

**Note:** If you don't need custom text styling, the simpler approach is to use plain text without `BpkText` or `span`:

```jsx
// Simpler approach - no BpkText needed
<BpkButtonV2 type={BUTTON_TYPES.link}>
  Link Button <SmallLongArrowRightIcon />
</BpkButtonV2>
```

## Behavior Notes

- **Underline**: Applied by default, both on text and icons
- **Implicit mode**: Underline appears only on hover
- **Icon-only mode**: No underline is applied
- **Disabled state**: Underline is removed when button is disabled
- **Spacing**: When text and icon are siblings, an 8px gap is automatically applied

## Accessibility

- Use semantic button element (not anchor) when the action doesn't navigate to a new page
- It need provide `aria-label` for icon-only buttons
- Link buttons support keyboard navigation (Tab, Enter, Space)
