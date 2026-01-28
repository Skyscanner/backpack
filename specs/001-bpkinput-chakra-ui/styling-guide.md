# Styling Guide: BpkInputV2 with Chakra UI

**Feature**: BpkInputV2 Chakra UI Reimplementation
**Spec**: [spec.md](./spec.md)
**Date**: 2026-01-27

## Overview

This guide defines how to style BpkInputV2 and BpkInputGroup using Chakra UI components whilst maintaining Backpack's visual identity through comprehensive SCSS overrides.

## Style Architecture

### Principle: Backpack Design Tokens Override Chakra Defaults

- **Foundation**: Chakra UI provides component structure and accessibility
- **Visual Identity**: 100% Backpack design tokens and mixins
- **Override Strategy**: Use `!important` flags to ensure Backpack styles take precedence
- **Testing**: Percy visual regression ensures pixel-perfect parity

## BpkInputV2 Styling

### File: `BpkInputV2.module.scss`

**Imports** (Modern Sass with `@use`):
```scss
@use '../../../bpk-mixins/tokens';
@use '../../../bpk-mixins/forms';
@use '../../../bpk-mixins/utils';
```

**Base Input Styles**:
```scss
.bpk-input-v2 {
  @include forms.bpk-input;  // Inherit all Backpack input styles

  // Override Chakra Input defaults
  &[data-chakra-input] {
    // Reset dimensions
    height: auto !important;
    min-height: tokens.$bpk-input-height !important;
    width: 100% !important;

    // Reset spacing
    padding: tokens.bpk-input-padding-y() tokens.bpk-input-padding-x() !important;
    margin: 0 !important;

    // Reset border
    border: tokens.$bpk-input-border !important;
    border-radius: tokens.$bpk-input-border-radius !important;

    // Reset colors
    background: tokens.$bpk-input-background !important;
    color: tokens.$bpk-text-primary-day !important;

    // Reset typography
    font-family: tokens.$bpk-font-family-base !important;
    font-size: tokens.$bpk-font-size-base !important;
    line-height: tokens.$bpk-line-height-base !important;
    font-weight: tokens.$bpk-font-weight-regular !important;

    // Reset effects
    box-shadow: none !important;
    outline: none !important;
    transition: none !important;

    // Hover state
    &:hover {
      border-color: tokens.$bpk-line-on-dark-day !important;
    }

    // Focus state
    &:focus,
    &:focus-visible {
      border-color: tokens.$bpk-core-accent-day !important;
      outline: tokens.$bpk-focus-outline !important;
      outline-offset: tokens.$bpk-focus-outline-offset !important;
      box-shadow: none !important;
    }

    // Disabled state
    &:disabled {
      cursor: not-allowed !important;
      opacity: 0.5 !important;
      background: tokens.$bpk-canvas-contrast-day !important;
    }

    // Placeholder
    &::placeholder {
      color: tokens.$bpk-text-secondary-day !important;
      opacity: 1 !important;
    }
  }

  // Validation states
  &--valid {
    @include forms.bpk-input--valid;
  }

  &--invalid {
    @include forms.bpk-input--invalid;
  }

  // Size variants
  &--large {
    @include forms.bpk-input--large;

    &[data-chakra-input] {
      min-height: tokens.$bpk-input-large-height !important;
    }
  }

  // Clear button styles (unchanged)
  &__container {
    @include forms.bpk-input__container;
  }

  &__clear-button {
    display: none;
    @include forms.bpk-input__clear-button;

    &--persistent {
      display: inherit;
    }

    &--large {
      // Large variant clear button
    }
  }

  &--clearable {
    @include forms.bpk-input--clearable;

    &:focus + .bpk-input-v2__clear-button {
      display: inherit;
    }
  }

  &--persistent-clearable {
    background: tokens.$bpk-input-background !important;
  }

  // Docked layouts
  &--docked {
    @include forms.bpk-input--docked;
  }

  &--docked-first {
    @include forms.bpk-input--docked-first-child;
  }

  &--docked-middle {
    @include forms.bpk-input--docked-middle-child;
  }

  &--docked-last {
    @include forms.bpk-input--docked-last-child;
  }

  // RTL support
  @include utils.bpk-rtl {
    // RTL-specific overrides if needed
  }
}
```

## BpkInputGroup Styling

### File: `BpkInputGroup.module.scss`

**Imports**:
```scss
@use '../../../bpk-mixins/tokens';
@use '../../../bpk-mixins/typography';
@use '../../../bpk-mixins/utils';
```

**Group Container Styles**:
```scss
.bpk-input-group {
  position: relative;
  display: inline-flex;
  width: 100%;
  align-items: center;

  // Override Chakra InputGroup
  &[data-chakra-input-group] {
    position: relative !important;
    display: inline-flex !important;
    width: 100% !important;
    align-items: center !important;
    isolation: auto !important;
  }

  // Start/end element base styles
  &__start,
  &__end {
    position: absolute;
    top: 0;
    display: flex;
    height: 100%;
    align-items: center;
    padding: 0 tokens.bpk-spacing-md();
    color: tokens.$bpk-text-secondary-day;
    pointer-events: none;
    z-index: 1;

    @include typography.bpk-label-2;
  }

  &__start {
    left: 0;

    @include utils.bpk-rtl {
      right: 0;
      left: auto;
    }
  }

  &__end {
    right: 0;

    @include utils.bpk-rtl {
      right: auto;
      left: 0;
    }
  }

  // Override Chakra InputLeftElement
  [data-chakra-input-left-element] {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    display: flex !important;
    height: 100% !important;
    align-items: center !important;
    padding: 0 tokens.bpk-spacing-md() !important;
    color: tokens.$bpk-text-secondary-day !important;
    pointer-events: none !important;
    z-index: 1 !important;

    @include typography.bpk-label-2;
  }

  // Override Chakra InputRightElement
  [data-chakra-input-right-element] {
    position: absolute !important;
    top: 0 !important;
    right: 0 !important;
    display: flex !important;
    height: 100% !important;
    align-items: center !important;
    padding: 0 tokens.bpk-spacing-md() !important;
    color: tokens.$bpk-text-secondary-day !important;
    pointer-events: none !important;
    z-index: 1 !important;

    @include typography.bpk-label-2;
  }

  // Input padding adjustments when elements present
  &--with-start {
    .bpk-input-v2,
    [data-chakra-input] {
      padding-left: tokens.bpk-spacing-xxl() !important;

      @include utils.bpk-rtl {
        padding-right: tokens.bpk-spacing-xxl() !important;
        padding-left: tokens.bpk-input-padding-x() !important;
      }
    }
  }

  &--with-end {
    .bpk-input-v2,
    [data-chakra-input] {
      padding-right: tokens.bpk-spacing-xxl() !important;

      @include utils.bpk-rtl {
        padding-right: tokens.bpk-input-padding-x() !important;
        padding-left: tokens.bpk-spacing-xxl() !important;
      }
    }
  }
}
```

## Design Token Mapping

### Spacing Tokens

| Usage | Token | Value (rem) |
|-------|-------|-------------|
| Input padding (vertical) | `tokens.bpk-input-padding-y()` | `0.75rem` |
| Input padding (horizontal) | `tokens.bpk-input-padding-x()` | `1rem` |
| Start/end element padding | `tokens.bpk-spacing-md()` | `1rem` |
| Input padding with start/end | `tokens.bpk-spacing-xxl()` | `2.5rem` |

### Color Tokens

| Usage | Token | Purpose |
|-------|-------|---------|
| Input background | `tokens.$bpk-input-background` | Default surface color |
| Input text | `tokens.$bpk-text-primary-day` | Primary text color |
| Input border | `tokens.$bpk-line-day` | Border color |
| Input border (hover) | `tokens.$bpk-line-on-dark-day` | Hover state |
| Input border (focus) | `tokens.$bpk-core-accent-day` | Focus/active state |
| Placeholder text | `tokens.$bpk-text-secondary-day` | Secondary text |
| Start/end element text | `tokens.$bpk-text-secondary-day` | Decorative text |
| Disabled background | `tokens.$bpk-canvas-contrast-day` | Disabled state |

### Typography Tokens

| Usage | Token/Mixin | Purpose |
|-------|-------------|---------|
| Input text | `tokens.$bpk-font-family-base` | Base font |
| Input font size | `tokens.$bpk-font-size-base` | Default size |
| Start/end elements | `@include typography.bpk-label-2` | Label typography |

### Sizing Tokens

| Usage | Token | Value (rem) |
|-------|-------|-------------|
| Input height (default) | `tokens.$bpk-input-height` | `3rem` (48px) |
| Input height (large) | `tokens.$bpk-input-large-height` | `4rem` (64px) |
| Border radius | `tokens.$bpk-input-border-radius` | `0.5rem` |
| Border width | (from border token) | `1px` |

## BEM Class Structure

### BpkInputV2 Classes

- `.bpk-input-v2` - Base class
- `.bpk-input-v2--valid` - Valid state
- `.bpk-input-v2--invalid` - Invalid state
- `.bpk-input-v2--large` - Large size variant
- `.bpk-input-v2--clearable` - Clearable input (shows clear button on focus)
- `.bpk-input-v2--persistent-clearable` - Always shows clear button
- `.bpk-input-v2--docked` - Generic docked state
- `.bpk-input-v2--docked-first` - First in docked group
- `.bpk-input-v2--docked-middle` - Middle in docked group
- `.bpk-input-v2--docked-last` - Last in docked group
- `.bpk-input-v2__container` - Container div (when clearable)
- `.bpk-input-v2__clear-button` - Clear button
- `.bpk-input-v2__clear-button--persistent` - Persistent clear button
- `.bpk-input-v2__clear-button--large` - Large clear button

### BpkInputGroup Classes

- `.bpk-input-group` - Base class
- `.bpk-input-group--with-start` - Has startElement
- `.bpk-input-group--with-end` - Has endElement
- `.bpk-input-group__start` - Start element container
- `.bpk-input-group__end` - End element container

## RTL Support

### Strategy

Use `@include utils.bpk-rtl` mixin for all directional properties:

**Example**:
```scss
.bpk-input-group__start {
  left: 0;

  @include utils.bpk-rtl {
    right: 0;
    left: auto;
  }
}

.bpk-input-group__end {
  right: 0;

  @include utils.bpk-rtl {
    right: auto;
    left: 0;
  }
}
```

### Input Padding in RTL

When start/end elements present, padding must flip:

```scss
&--with-start {
  [data-chakra-input] {
    padding-left: tokens.bpk-spacing-xxl() !important;

    @include utils.bpk-rtl {
      padding-right: tokens.bpk-spacing-xxl() !important;
      padding-left: tokens.bpk-input-padding-x() !important;
    }
  }
}
```

## Chakra Style Override Targets

### Chakra Data Attributes

Chakra UI adds these data attributes for targeting:

- `[data-chakra-input]` - Chakra Input component
- `[data-chakra-input-group]` - Chakra InputGroup component
- `[data-chakra-input-left-element]` - Chakra InputLeftElement component
- `[data-chakra-input-right-element]` - Chakra InputRightElement component

**All Chakra selectors must use `!important`** to override Chakra's internal styles.

### Override Checklist

For BpkInputV2 Chakra Input:
- [ ] Height and dimensions
- [ ] Padding and spacing
- [ ] Border (width, color, radius)
- [ ] Background color
- [ ] Text color
- [ ] Font properties (family, size, weight, line-height)
- [ ] Box shadow (reset to none)
- [ ] Outline (reset to none, use Backpack focus)
- [ ] Transition (reset to none)
- [ ] Hover state
- [ ] Focus state
- [ ] Disabled state
- [ ] Placeholder styling

For BpkInputGroup Chakra Components:
- [ ] Container positioning
- [ ] Container display
- [ ] Container width
- [ ] Element positioning (absolute)
- [ ] Element alignment
- [ ] Element padding
- [ ] Element color
- [ ] Element typography
- [ ] Element z-index
- [ ] RTL positioning

## Visual States Reference

### Default State
- Border: `tokens.$bpk-line-day`
- Background: `tokens.$bpk-input-background`
- Text: `tokens.$bpk-text-primary-day`

### Hover State
- Border: `tokens.$bpk-line-on-dark-day`
- Background: unchanged
- Text: unchanged

### Focus State
- Border: `tokens.$bpk-core-accent-day`
- Outline: `tokens.$bpk-focus-outline`
- Outline offset: `tokens.$bpk-focus-outline-offset`

### Disabled State
- Opacity: `0.5`
- Cursor: `not-allowed`
- Background: `tokens.$bpk-canvas-contrast-day`

### Valid State
- Right padding: increased for checkmark icon
- Background: SVG checkmark via `forms.bpk-input--valid` mixin

### Invalid State
- Right padding: increased for error icon
- Background: SVG error icon via `forms.bpk-input--invalid` mixin
- Border: error color from mixin

### Large Variant
- Height: `tokens.$bpk-input-large-height` (4rem)
- Padding: increased proportionally

### Clearable State
- Right padding: increased for clear button space
- Clear button: absolutely positioned

## Testing Visual Parity

### Percy Visual Regression Tests

**Required Stories**:
1. Default input (compare to original)
2. Input with placeholder
3. Valid state
4. Invalid state
5. Large size
6. Disabled state
7. InputGroup with startElement
8. InputGroup with endElement
9. InputGroup with both elements
10. Clear button (all modes)
11. Docked inputs

**Pass Criteria**: 0 pixel differences in Percy comparison (pixel-perfect match)

## References

- Specification: [spec.md](./spec.md)
- Research: [research.md](./research.md)
- API Design: [api-design.md](./api-design.md)
- Sass Mixins: `packages/bpk-mixins/_forms.scss`
- Design Tokens: `@skyscanner/bpk-foundations-web`
- Backpack Constitution: `.specify/memory/constitution.md`
- Chakra UI Input Styling: https://chakra-ui.com/docs/components/input#styling
