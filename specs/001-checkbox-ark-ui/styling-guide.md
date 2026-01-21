# Styling Guide: BpkCheckbox (Ark UI Rebase)

**Date**: 2026-01-21
**Component**: BpkCheckbox
**Phase**: 1 - Design & Planning

## Overview

This document defines the Sass/CSS implementation for BpkCheckbox built on Ark UI primitives. The styling must:
- Maintain visual consistency with current BpkCheckbox
- Use modern Sass API (`@use`, not `@import`)
- Follow BEM naming convention with `bpk-` prefix
- Use design tokens from `@skyscanner/bpk-foundations-web`
- Support runtime theming via CSS custom properties
- Support RTL languages
- Use `rem` units for all sizing

---

## File Structure

**File**: `packages/bpk-component-checkbox/src/BpkCheckbox/BpkCheckbox.module.scss`

All styles for the component and its sub-components are consolidated in a single CSS Modules file.

---

## Sass Imports (Granular from bpk-mixins)

```scss
@use '../../../bpk-mixins/tokens';
@use '../../../bpk-mixins/forms';
@use '../../../bpk-mixins/utils';
@use '../../../bpk-mixins/typography';
```

**Import Strategy**:
- `tokens`: Design tokens (colors, spacing, borders, etc.)
- `forms`: Existing checkbox mixins (reuse for consistency)
- `utils`: RTL support, theming utilities
- `typography`: Text styling (if needed for labels)

---

## CSS Class Structure (BEM)

### Base Classes

```scss
// Root wrapper (Ark UI Root)
.bpk-checkbox { }

// Control box (Ark UI Control)
.bpk-checkbox__control { }

// Label text (Ark UI Label)
.bpk-checkbox__label { }

// Checkmark/dash indicator (Ark UI Indicator)
.bpk-checkbox__indicator { }

// Hidden native input (Ark UI HiddenInput)
.bpk-checkbox__input { }

// Required asterisk (custom Backpack element)
.bpk-checkbox__asterisk { }
```

### Modifier Classes (State Variations)

```scss
// White variant (for dark backgrounds)
.bpk-checkbox--white { }

// Disabled state
.bpk-checkbox--disabled { }

// Invalid state
.bpk-checkbox--invalid { }

// Small label text
.bpk-checkbox__label--small { }

// Indeterminate state
.bpk-checkbox__control--indeterminate { }

// Checked state
.bpk-checkbox__control--checked { }
```

---

## Base Styles

### Root Wrapper

```scss
.bpk-checkbox {
  // Inherit existing checkbox base styles from forms mixin
  @include forms.bpk-checkbox;

  // Ensure proper display for composition
  display: inline-flex;
  align-items: flex-start;
  gap: tokens.bpk-spacing-md();
  position: relative;

  // Ensure clickable area is large enough
  cursor: pointer;

  // RTL support (if needed)
  @include utils.bpk-rtl {
    // Mirroring handled by flex-direction or logical properties
  }
}
```

### Control Box

```scss
.bpk-checkbox__control {
  // Visual checkbox box
  @include forms.bpk-checkbox__input;

  // Sizing
  width: tokens.bpk-spacing-lg() + tokens.bpk-spacing-sm(); // 20px equivalent in rem
  height: tokens.bpk-spacing-lg() + tokens.bpk-spacing-sm();
  min-width: tokens.bpk-spacing-lg() + tokens.bpk-spacing-sm();
  min-height: tokens.bpk-spacing-lg() + tokens.bpk-spacing-sm();

  // Positioning for indicator
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  // Border and background
  border: tokens.$bpk-border-size-lg solid tokens.$bpk-line-day;
  border-radius: tokens.$bpk-border-radius-xs;
  background-color: tokens.$bpk-surface-default-day;

  // Transition for smooth state changes
  transition: background-color 200ms ease-in-out, border-color 200ms ease-in-out;

  // Focus state
  &:focus-visible {
    outline: tokens.$bpk-border-size-lg solid tokens.$bpk-core-accent-day;
    outline-offset: tokens.bpk-spacing-sm();
  }

  // Hover state
  &:hover:not(&--disabled) {
    border-color: tokens.$bpk-line-on-dark-day;
  }

  // Checked state (using theme-able property)
  &--checked {
    @include utils.bpk-themeable-property(
      background-color,
      --bpk-checkbox-checked-color,
      tokens.$bpk-core-accent-day
    );
    @include utils.bpk-themeable-property(
      border-color,
      --bpk-checkbox-checked-color,
      tokens.$bpk-core-accent-day
    );
  }

  // Indeterminate state
  &--indeterminate {
    @include utils.bpk-themeable-property(
      background-color,
      --bpk-checkbox-checked-color,
      tokens.$bpk-core-accent-day
    );
    @include utils.bpk-themeable-property(
      border-color,
      --bpk-checkbox-checked-color,
      tokens.$bpk-core-accent-day
    );
  }

  // Disabled state
  &--disabled {
    cursor: not-allowed;
    opacity: 0.4;
    background-color: tokens.$bpk-canvas-contrast-day;
  }
}
```

### Label Text

```scss
.bpk-checkbox__label {
  // Inherit label styles from forms mixin
  @include forms.bpk-checkbox__label;

  // Typography
  font-size: tokens.$bpk-font-size-body-default;
  line-height: tokens.$bpk-line-height-base;
  color: tokens.$bpk-text-primary-day;

  // Cursor
  cursor: pointer;

  // Flexible layout
  flex: 1;

  // Small variant
  &--small {
    @include forms.bpk-checkbox__label--small;
    font-size: tokens.$bpk-font-size-caption;
  }

  // Disabled state
  .bpk-checkbox--disabled & {
    cursor: not-allowed;
    color: tokens.$bpk-text-disabled-day;
  }
}
```

### Indicator (Checkmark / Dash)

```scss
.bpk-checkbox__indicator {
  // Default checkmark icon
  width: tokens.bpk-spacing-base();
  height: tokens.bpk-spacing-base();
  color: tokens.$bpk-text-on-dark-day; // White checkmark on colored background

  // SVG icon styling
  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }

  // Indeterminate dash (alternative to checkmark)
  .bpk-checkbox__control--indeterminate & {
    // Render dash instead of checkmark
    // This is typically handled by Ark UI Context, but can be styled
  }

  // Hidden when unchecked (Ark UI handles this via CSS or data attributes)
  .bpk-checkbox__control:not(.bpk-checkbox__control--checked):not(.bpk-checkbox__control--indeterminate) & {
    opacity: 0;
  }
}
```

### Hidden Input

```scss
.bpk-checkbox__input {
  // Visually hidden but accessible
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

### Required Asterisk

```scss
.bpk-checkbox__asterisk {
  color: tokens.$bpk-status-danger-spot-day;
  margin-left: tokens.bpk-spacing-sm();

  // RTL support
  @include utils.bpk-rtl {
    margin-left: 0;
    margin-right: tokens.bpk-spacing-sm();
  }
}
```

---

## Variant Styles

### White Variant (for Dark Backgrounds)

```scss
.bpk-checkbox--white {
  .bpk-checkbox__control {
    border-color: tokens.$bpk-text-on-dark-day;
    background-color: transparent;

    &:hover:not(.bpk-checkbox__control--disabled) {
      border-color: tokens.$bpk-surface-default-day;
    }

    &--checked,
    &--indeterminate {
      background-color: tokens.$bpk-surface-default-day;
      border-color: tokens.$bpk-surface-default-day;

      .bpk-checkbox__indicator {
        color: tokens.$bpk-core-accent-day;
      }
    }
  }

  .bpk-checkbox__label {
    color: tokens.$bpk-text-on-dark-day;
  }

  .bpk-checkbox__asterisk {
    color: tokens.$bpk-status-danger-on-dark-day;
  }
}
```

### Invalid State

```scss
.bpk-checkbox--invalid {
  .bpk-checkbox__control {
    border-color: tokens.$bpk-status-danger-spot-day;

    &--checked,
    &--indeterminate {
      @include utils.bpk-themeable-property(
        background-color,
        --bpk-checkbox-checked-color,
        tokens.$bpk-status-danger-spot-day
      );
      @include utils.bpk-themeable-property(
        border-color,
        --bpk-checkbox-checked-color,
        tokens.$bpk-status-danger-spot-day
      );
    }
  }

  .bpk-checkbox__label {
    color: tokens.$bpk-status-danger-spot-day;
  }
}
```

### Disabled State

```scss
.bpk-checkbox--disabled {
  cursor: not-allowed;

  .bpk-checkbox__control {
    cursor: not-allowed;
    opacity: 0.4;
    background-color: tokens.$bpk-canvas-contrast-day;
    pointer-events: none;
  }

  .bpk-checkbox__label {
    cursor: not-allowed;
    color: tokens.$bpk-text-disabled-day;
  }
}
```

---

## Design Token Mapping

### Colors

| Element | Token | Value (Day Mode) | Purpose |
|---------|-------|------------------|---------|
| Control Border (default) | `tokens.$bpk-line-day` | #DDDDE5 | Unchecked border |
| Control Border (hover) | `tokens.$bpk-line-on-dark-day` | #68697F | Hover feedback |
| Control Background (checked) | `tokens.$bpk-core-accent-day` | #0062E3 | Checked background |
| Control Background (disabled) | `tokens.$bpk-canvas-contrast-day` | #F1F2F8 | Disabled background |
| Indicator | `tokens.$bpk-text-on-dark-day` | #FFFFFF | Checkmark color |
| Label Text | `tokens.$bpk-text-primary-day` | #161616 | Primary text |
| Label Text (disabled) | `tokens.$bpk-text-disabled-day` | #B2B2BF | Disabled text |
| Asterisk | `tokens.$bpk-status-danger-spot-day` | #E70866 | Required indicator |
| Invalid Border | `tokens.$bpk-status-danger-spot-day` | #E70866 | Error state |

### Spacing

| Element | Token | Value | Purpose |
|---------|-------|-------|---------|
| Control Size | `tokens.bpk-spacing-lg() + tokens.bpk-spacing-sm()` | 1.25rem (20px) | Checkbox box size |
| Gap (control to label) | `tokens.bpk-spacing-md()` | 0.5rem (8px) | Space between box and label |
| Focus Outline Offset | `tokens.bpk-spacing-sm()` | 0.25rem (4px) | Focus indicator spacing |
| Asterisk Margin | `tokens.bpk-spacing-sm()` | 0.25rem (4px) | Space before asterisk |

### Borders

| Element | Token | Value | Purpose |
|---------|-------|-------|---------|
| Control Border Width | `tokens.$bpk-border-size-lg` | 2px | Checkbox border thickness |
| Control Border Radius | `tokens.$bpk-border-radius-xs` | 0.25rem (4px) | Rounded corners |
| Focus Outline Width | `tokens.$bpk-border-size-lg` | 2px | Focus indicator thickness |

### Typography

| Element | Token | Value | Purpose |
|---------|-------|-------|---------|
| Label Font Size | `tokens.$bpk-font-size-body-default` | 1rem (16px) | Standard label text |
| Small Label Font Size | `tokens.$bpk-font-size-caption` | 0.875rem (14px) | Small variant label |
| Line Height | `tokens.$bpk-line-height-base` | 1.5 | Text line height |

---

## Theming Support

### CSS Custom Properties

The component supports theming via CSS custom properties generated by BpkThemeProvider.

**Theme Attribute**: `checkboxCheckedColor`
**CSS Variable**: `--bpk-checkbox-checked-color`

**Usage in SCSS**:
```scss
.bpk-checkbox__control--checked {
  @include utils.bpk-themeable-property(
    background-color,
    --bpk-checkbox-checked-color,
    tokens.$bpk-core-accent-day
  );
  @include utils.bpk-themeable-property(
    border-color,
    --bpk-checkbox-checked-color,
    tokens.$bpk-core-accent-day
  );
}
```

**Compiled CSS**:
```css
.bpk-checkbox__control--checked {
  background-color: var(--bpk-checkbox-checked-color, #0062E3);
  border-color: var(--bpk-checkbox-checked-color, #0062E3);
}
```

**How it Works**:
1. BpkThemeProvider converts theme object `{ checkboxCheckedColor: '#ff0000' }` to CSS variable `--bpk-checkbox-checked-color: #ff0000`
2. CSS uses `var(--bpk-checkbox-checked-color, fallback)` pattern
3. When theme is not provided, fallback token `tokens.$bpk-core-accent-day` is used

### Future Extensibility

Future MINOR versions can add more theme attributes without breaking changes:

```scss
// Future: Hover state theming
.bpk-checkbox__control:hover {
  @include utils.bpk-themeable-property(
    border-color,
    --bpk-checkbox-hover-color,
    tokens.$bpk-line-on-dark-day
  );
}

// Future: Active state theming
.bpk-checkbox__control:active {
  @include utils.bpk-themeable-property(
    background-color,
    --bpk-checkbox-active-color,
    tokens.$bpk-core-accent-day
  );
}
```

These can be added to `themeAttributes.ts` in a MINOR version release:
```typescript
export default [
  'checkboxCheckedColor',    // Existing
  'checkboxHoverColor',      // New in v11.1.0
  'checkboxActiveColor',     // New in v11.1.0
];
```

---

## RTL Support

### Automatic Mirroring

Most RTL support is handled automatically by CSS logical properties and flexbox:

```scss
.bpk-checkbox {
  // Flexbox automatically handles RTL direction
  display: inline-flex;
  gap: tokens.bpk-spacing-md(); // Gap is direction-aware
}
```

### Manual RTL Adjustments

For specific elements that need explicit RTL handling:

```scss
.bpk-checkbox__asterisk {
  margin-left: tokens.bpk-spacing-sm();

  @include utils.bpk-rtl {
    margin-left: 0;
    margin-right: tokens.bpk-spacing-sm();
  }
}
```

**Test RTL**:
```html
<div dir="rtl">
  <BpkCheckbox name="terms" label="قبول الشروط والأحكام" />
</div>
```

---

## Responsive Behavior

### Mobile Touch Targets

**Minimum Touch Target**: 44x44 pixels (WCAG 2.2 AA)

```scss
.bpk-checkbox {
  // Ensure clickable area is large enough
  min-height: tokens.bpk-spacing-xl(); // 2.75rem = 44px
  padding: tokens.bpk-spacing-sm();

  @media (pointer: coarse) {
    // Increase padding for touch devices
    padding: tokens.bpk-spacing-md();
  }
}

.bpk-checkbox__control {
  // Control itself is 20x20px, but clickable area includes padding
  // Total clickable area should be 44x44px minimum
}
```

### Breakpoint Behavior

No specific breakpoint changes required - checkbox scales proportionally with font size.

**Font Scaling Support**:
- All sizing uses `rem` units
- When user increases browser font size, checkbox scales proportionally
- Label text wraps naturally for narrow viewports

---

## Interactive States

### Default (Unchecked)

```scss
.bpk-checkbox__control {
  border: tokens.$bpk-border-size-lg solid tokens.$bpk-line-day;
  background-color: tokens.$bpk-surface-default-day;
}
```

### Hover

```scss
.bpk-checkbox__control:hover:not(.bpk-checkbox__control--disabled) {
  border-color: tokens.$bpk-line-on-dark-day;
}
```

### Focus

```scss
.bpk-checkbox__control:focus-visible {
  outline: tokens.$bpk-border-size-lg solid tokens.$bpk-core-accent-day;
  outline-offset: tokens.bpk-spacing-sm();
}
```

### Active (Pressed)

```scss
.bpk-checkbox__control:active:not(.bpk-checkbox__control--disabled) {
  transform: scale(0.95);
  transition: transform 100ms ease-in-out;
}
```

### Checked

```scss
.bpk-checkbox__control--checked {
  background-color: var(--bpk-checkbox-checked-color, tokens.$bpk-core-accent-day);
  border-color: var(--bpk-checkbox-checked-color, tokens.$bpk-core-accent-day);

  .bpk-checkbox__indicator {
    opacity: 1;
  }
}
```

### Indeterminate

```scss
.bpk-checkbox__control--indeterminate {
  background-color: var(--bpk-checkbox-checked-color, tokens.$bpk-core-accent-day);
  border-color: var(--bpk-checkbox-checked-color, tokens.$bpk-core-accent-day);

  // Dash icon instead of checkmark
  .bpk-checkbox__indicator {
    opacity: 1;
    // Icon SVG will be different (dash instead of check)
  }
}
```

### Disabled

```scss
.bpk-checkbox--disabled {
  cursor: not-allowed;

  .bpk-checkbox__control {
    opacity: 0.4;
    background-color: tokens.$bpk-canvas-contrast-day;
    pointer-events: none;
  }

  .bpk-checkbox__label {
    color: tokens.$bpk-text-disabled-day;
  }
}
```

### Invalid

```scss
.bpk-checkbox--invalid {
  .bpk-checkbox__control {
    border-color: tokens.$bpk-status-danger-spot-day;

    &--checked,
    &--indeterminate {
      background-color: var(--bpk-checkbox-checked-color, tokens.$bpk-status-danger-spot-day);
      border-color: var(--bpk-checkbox-checked-color, tokens.$bpk-status-danger-spot-day);
    }
  }

  .bpk-checkbox__label {
    color: tokens.$bpk-status-danger-spot-day;
  }
}
```

---

## Accessibility Styling

### Focus Indicators

**WCAG 2.2 AA Requirement**: Focus indicators must have 3:1 contrast ratio

```scss
.bpk-checkbox__control:focus-visible {
  outline: tokens.$bpk-border-size-lg solid tokens.$bpk-core-accent-day;
  outline-offset: tokens.bpk-spacing-sm();
  border-radius: tokens.$bpk-border-radius-xs;
}
```

### Color Contrast

**WCAG 2.2 AA Requirements**:
- Text: 4.5:1 contrast ratio (normal text)
- UI Components: 3:1 contrast ratio (borders, icons)

All Backpack design tokens meet these requirements.

### High Contrast Mode Support

```scss
@media (prefers-contrast: high) {
  .bpk-checkbox__control {
    border-width: tokens.$bpk-border-size-lg * 1.5;

    &--checked {
      outline: tokens.$bpk-border-size-lg solid tokens.$bpk-text-primary-day;
      outline-offset: -#{tokens.$bpk-border-size-lg};
    }
  }
}
```

---

## Animation & Transitions

### Smooth State Changes

```scss
.bpk-checkbox__control {
  transition:
    background-color 200ms ease-in-out,
    border-color 200ms ease-in-out,
    transform 100ms ease-in-out;
}

.bpk-checkbox__indicator {
  transition: opacity 150ms ease-in-out;
}
```

### Reduced Motion Support

```scss
@media (prefers-reduced-motion: reduce) {
  .bpk-checkbox__control,
  .bpk-checkbox__indicator {
    transition: none;
  }
}
```

---

## Complete SCSS File Structure

```scss
// Imports
@use '../../../bpk-mixins/tokens';
@use '../../../bpk-mixins/forms';
@use '../../../bpk-mixins/utils';

// Root
.bpk-checkbox { /* ... */ }

// Sub-components
.bpk-checkbox__control { /* ... */ }
.bpk-checkbox__label { /* ... */ }
.bpk-checkbox__indicator { /* ... */ }
.bpk-checkbox__input { /* ... */ }
.bpk-checkbox__asterisk { /* ... */ }

// Modifiers
.bpk-checkbox--white { /* ... */ }
.bpk-checkbox--disabled { /* ... */ }
.bpk-checkbox--invalid { /* ... */ }
.bpk-checkbox__label--small { /* ... */ }
.bpk-checkbox__control--checked { /* ... */ }
.bpk-checkbox__control--indeterminate { /* ... */ }

// States (nested within modifiers or pseudo-classes)
// :hover, :focus-visible, :active, :disabled

// Media queries
@media (pointer: coarse) { /* Touch device adjustments */ }
@media (prefers-contrast: high) { /* High contrast mode */ }
@media (prefers-reduced-motion: reduce) { /* Reduced motion */ }
```

---

## Visual Consistency Verification

### Comparison with Current BpkCheckbox

**Goal**: Ark UI implementation must look identical to current implementation (without themes).

**Verification Points**:
1. **Checkbox size**: 20x20px (1.25rem)
2. **Border width**: 2px
3. **Border radius**: 4px (0.25rem)
4. **Border color**: #DDDDE5 (unchecked), #0062E3 (checked)
5. **Background color**: #FFFFFF (unchecked), #0062E3 (checked)
6. **Checkmark color**: #FFFFFF
7. **Label spacing**: 8px (0.5rem) gap
8. **Label font size**: 16px (1rem)
9. **Focus outline**: 2px solid #0062E3, 4px offset

**Test**: Side-by-side visual comparison in Storybook (current vs Ark UI).

---

## Next Steps

Phase 1 continues with:
1. ✅ API Design (`api-design.md`)
2. ✅ Styling Guide (this document)
3. Next: Code Examples (`examples/`)
4. Next: Update agent context
