# BpkButton Component Specification

> This spec is detailed enough for a coding agent to recreate BpkButton from scratch.

## Overview

A polymorphic button component that renders as `<button>` or `<a>` depending on props. Supports 9 visual variants, 2 sizes, icons, loading state, full-width mode, and link-style underline behavior.

---

## Props Interface

```typescript
import type { MouseEvent, ReactNode } from 'react';

export const BUTTON_TYPES = {
  primary: 'primary',
  primaryOnDark: 'primary-on-dark',
  primaryOnLight: 'primary-on-light',
  secondary: 'secondary',
  secondaryOnDark: 'secondary-on-dark',
  destructive: 'destructive',
  featured: 'featured',
  link: 'link',
  linkOnDark: 'link-on-dark',
} as const;

export const SIZE_TYPES = {
  small: 'small',
  large: 'large',
} as const;

export type ButtonType = (typeof BUTTON_TYPES)[keyof typeof BUTTON_TYPES];
export type SizeType = (typeof SIZE_TYPES)[keyof typeof SIZE_TYPES];

export type Props = {
  children: string | ReactNode;
  type?: ButtonType;            // default: 'primary'
  size?: SizeType;              // default: 'small'
  className?: string | null;    // default: null
  disabled?: boolean;           // default: false
  fullWidth?: boolean;          // default: false
  iconOnly?: boolean;           // default: false
  implicit?: boolean;           // default: false (link underline behavior)
  onClick?: (event: MouseEvent<HTMLButtonElement & HTMLAnchorElement>) => void;
  rel?: string | undefined;
  submit?: boolean;             // default: false
  href?: string | null;         // default: null
  blank?: boolean;              // default: false
  leadingIcon?: ReactNode;      // default: null
  trailingIcon?: ReactNode;     // default: null
  loading?: boolean;            // default: false
  [rest: string]: any;          // Inexact rest - all other props spread to root element
};
```

---

## Rendering Logic

### Element Selection

The component renders as `<a>` or `<button>`:

| Condition | Element | Attributes |
|-----------|---------|------------|
| `href` is truthy AND `isDisabled` is false | `<a>` | `href`, `target`, `rel`, `onClick`, `...rest` |
| All other cases | `<button>` | `type="submit"` or `type="button"`, `disabled`, `aria-busy`, `onClick`, `...rest` |

**Key rule**: `isDisabled = disabled || loading`. When disabled or loading, ALWAYS render `<button>` even if `href` is provided.

### Data Attribute

Both `<a>` and `<button>` receive: `data-backpack-ds-component="Button"` (via `getDataComponentAttribute('Button')` from `bpk-react-utils`).

### Link Target & Rel

```typescript
const target = blank ? '_blank' : '';
const rel = blank ? (propRel || 'noopener noreferrer') : propRel;
```

- `blank` sets `target="_blank"` and defaults `rel` to `"noopener noreferrer"`
- Custom `rel` overrides the default even when `blank` is true
- `<a>` does NOT receive `disabled`, `aria-busy`, or HTML `type` attributes

### Submit

- `submit` prop: renders `type="submit"` on `<button>`, otherwise `type="button"`
- Has no effect when rendering as `<a>`

---

## CSS Class Composition

All classes use BEM with the `bpk-button` block. Classes are applied via `cssModules()` from `bpk-react-utils`.

### Root Element Classes

```typescript
const classNames = getCommonClassName(
  'bpk-button',                                           // always
  size === 'large' && 'bpk-button--large',                // large size
  iconOnly && 'bpk-button--icon-only',                    // icon-only mode
  iconOnly && size === 'large' && 'bpk-button--large-icon-only',
  `bpk-button--${type}`,                                  // variant (e.g. bpk-button--primary)
  loading && 'bpk-button--loading',                       // loading state
  fullWidth && 'bpk-button--full-width',                  // full width
  hasIcons && 'bpk-button--has-icon',                     // any icon present
  isLinkType && iconOnly && 'bpk-button--link--icon-only',
  isLinkType && implicit && 'bpk-button--link--implicit',
  className,                                              // consumer className
);
```

### Internal Element Classes

| Element | Class | When |
|---------|-------|------|
| Leading icon wrapper `<span>` | `bpk-button__leading-icon` | `leadingIcon` provided AND not `iconOnly` |
| Trailing icon wrapper `<span>` | `bpk-button__trailing-icon` | `trailingIcon` provided AND not `iconOnly` |
| Loading container `<div>` | `bpk-button__loading-container` | `loading` is true |
| Spinner wrapper `<span>` | `bpk-button__loading-icon` | `loading` is true (has `aria-hidden="true"`) |
| Hidden content `<div>` | `bpk-button__content--hidden` | `loading` is true (opacity: 0) |

### Underline Classes (link types only)

Applied to a `<span>` wrapping `children` text. Only rendered when `isLinkType && !iconOnly && !isDisabled`:

| Condition | Class |
|-----------|-------|
| Default link | `bpk-button--link-underlined` |
| Implicit, not alternate | `bpk-button--link-underlined--implicit` |
| Alternate (linkOnDark), not implicit | `bpk-button--link-underlined--alternate` |
| Both implicit and alternate | `bpk-button--link-underlined--implicit--alternate` |

---

## HTML Output Structure

### Standard Button
```html
<button type="button" class="bpk-button bpk-button--primary" data-backpack-ds-component="Button">
  Button text
</button>
```

### With Icons
```html
<button type="button" class="bpk-button bpk-button--primary bpk-button--has-icon" data-backpack-ds-component="Button">
  <span class="bpk-button__leading-icon"><svg>...</svg></span>
  Button text
  <span class="bpk-button__trailing-icon"><svg>...</svg></span>
</button>
```

### Icon Only
```html
<button type="button" class="bpk-button bpk-button--primary bpk-button--icon-only" data-backpack-ds-component="Button">
  <svg>...</svg>  <!-- children rendered directly, no icon wrappers -->
</button>
```

### Loading State
```html
<button type="button" disabled class="bpk-button bpk-button--primary bpk-button--loading" aria-busy="true" data-backpack-ds-component="Button">
  <div class="bpk-button__loading-container">
    <span class="bpk-button__loading-icon" aria-hidden="true">
      <BpkSpinner type="light" alignToButton />
    </span>
    <div class="bpk-button__content--hidden">
      Button text
    </div>
  </div>
</button>
```

### Link Type
```html
<button type="button" class="bpk-button bpk-button--link" data-backpack-ds-component="Button">
  <span class="bpk-button--link-underlined">Link text</span>
</button>
```

### As Anchor
```html
<a href="/path" class="bpk-button bpk-button--primary" data-backpack-ds-component="Button" target="" rel="">
  Link text
</a>
```

---

## Loading State Behavior

1. `isDisabled` becomes true (button is `disabled`, `aria-busy="true"`)
2. Content wrapped in `bpk-button__loading-container` (position: relative, inline-flex, centered)
3. Spinner absolutely positioned over content via `bpk-button__loading-icon`
4. Original content hidden with `opacity: 0` (NOT `display: none`) to **preserve button dimensions**
5. When `loading` + `href`, renders as `<button>` not `<a>`
6. Link type underlines suppressed during loading

### Spinner Type Selection

```typescript
const getSpinnerType = (buttonType: ButtonType) => {
  switch (buttonType) {
    case 'secondary':
    case 'destructive':
    case 'link':
    case 'primary-on-dark':
      return 'dark';    // dark spinner on light backgrounds
    default:
      return 'light';   // light spinner on dark backgrounds
  }
};
```

- Small size: `<BpkSpinner type={...} alignToButton />`
- Large size: `<BpkLargeSpinner type={...} alignToButton />`

---

## SCSS Architecture

### Imports

```scss
@use '../../bpk-mixins/buttons';
@use '../../bpk-mixins/tokens';
@use '../../bpk-mixins/typography';
```

### Base Styles

```scss
.bpk-button {
  @include buttons.bpk-button;  // Base button mixin from bpk-mixins
}
```

The `buttons.bpk-button` mixin provides: `bpk-label-2` typography, padding (`bpk-spacing-sm() 0` for link, `bpk-spacing-sm() tokens.bpk-spacing-base()` for others), border-radius (`$bpk-button-border-radius`), cursor, transitions, disabled styles (50% opacity, not-allowed cursor, no pointer-events).

### Variant Mixins

| CSS Class | Mixin(s) | Notes |
|-----------|----------|-------|
| `--primary` | (default from base) | |
| `--primary-on-dark` | `buttons.bpk-button--primary-on-dark` | |
| `--primary-on-light` | `buttons.bpk-button--primary-on-light` | |
| `--secondary` | `buttons.bpk-button--secondary` | |
| `--secondary-on-dark` | `buttons.bpk-button--secondary-on-dark` | |
| `--destructive` | `buttons.bpk-button--secondary` + `buttons.bpk-button--destructive` | **Inherits secondary base** |
| `--featured` | `buttons.bpk-button--featured` | |
| `--link` | `buttons.bpk-button--link` + `typography.bpk-link` | + SVG overrides |
| `--link-on-dark` | `buttons.bpk-button--link-on-dark` + `typography.bpk-link--alternate` | + SVG overrides |

### Size Modifiers

| CSS Class | Mixin | Details |
|-----------|-------|---------|
| `--large` | `buttons.bpk-button--large` | `bpk-label-1` typography, larger padding |
| `--icon-only` | `buttons.bpk-button--icon-only` | Square button, no text padding |
| `--large-icon-only` | `buttons.bpk-button--large-icon-only` | Large square button |
| `--full-width` | `buttons.bpk-button--full-width` | `width: 100%` |

### Icon Layout

```scss
&--has-icon {
  display: inline-flex;
  align-items: center;
  gap: tokens.bpk-spacing-md();  // 1.25rem
}

&--full-width#{&}--has-icon {
  display: flex;
  justify-content: center;
}

&__leading-icon,
&__trailing-icon {
  display: inline-flex;
  flex-shrink: 0;
  text-decoration: none;
}
```

### Loading Layout

```scss
&__loading-container {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

&__loading-icon {
  position: absolute;
  display: inline-flex;
  --bpk-button-svg-display: block;          // Reset link overrides
  --bpk-button-svg-vertical-align: baseline;
}

&__content--hidden {
  opacity: 0;  // Preserves dimensions
}
```

### SVG Handling

```scss
span > svg {
  display: var(--bpk-button-svg-display, block);
  vertical-align: var(--bpk-button-svg-vertical-align, baseline);
}

svg {
  fill: currentcolor;
}
```

Link variants override: `--bpk-button-svg-display: inline-block; --bpk-button-svg-vertical-align: middle;`

### Underline Animation (hover)

```scss
@media (hover: hover) {
  // Default link: underline visible, hides on hover
  &--link:hover:not(:active):not(:disabled) &--link-underlined {
    background-size: 0 tokens.$bpk-border-size-sm;
  }
  // Implicit link: underline hidden, appears on hover
  &--link:hover:not(:active):not(:disabled) &--link-underlined--implicit {
    background-size: 100% tokens.$bpk-border-size-sm;
  }
}
```

Underlines are implemented via `background-image` gradient technique (from typography mixins), NOT `text-decoration`. The `background-size` animates between `0` and `100%` width.

---

## CSS Custom Properties (Theming)

Each variant exposes CSS custom properties for theme overrides. Pattern:

```
--bpk-button-{variant}-text-color
--bpk-button-{variant}-background-color
--bpk-button-{variant}-hover-text-color
--bpk-button-{variant}-hover-background-color
--bpk-button-{variant}-active-text-color
--bpk-button-{variant}-active-background-color
```

Fallback tokens follow the pattern: `$bpk-private-button-{variant}-{state}-{property}-day`

Example for primary:
```scss
--bpk-button-primary-text-color: $bpk-text-on-dark-day
--bpk-button-primary-background-color: $bpk-private-button-primary-normal-background-day
--bpk-button-primary-hover-background-color: $bpk-private-button-primary-pressed-background-day
```

---

## Dependencies

| Package | Usage |
|---------|-------|
| `bpk-component-spinner` | `BpkSpinner`, `BpkLargeSpinner`, `SPINNER_TYPES` for loading state |
| `bpk-react-utils` | `cssModules` (CSS module class name helper), `getDataComponentAttribute` |
| `bpk-mixins/buttons` | All button SCSS mixins |
| `bpk-mixins/tokens` | Design tokens |
| `bpk-mixins/typography` | Link typography mixins |

---

## Exports

```typescript
// packages/bpk-component-button/index.ts
export { default } from './src/BpkButton';
export { BUTTON_TYPES, SIZE_TYPES } from './src/common-types';
export type { ButtonType, SizeType, Props } from './src/common-types';
```

---

## Accessibility Requirements

1. **`aria-busy="true"`** on `<button>` when `loading` is true (not on `<a>`)
2. **`aria-hidden="true"`** on the spinner wrapper so screen readers ignore the visual spinner
3. **`disabled`** attribute on `<button>` when `disabled` or `loading`
4. **`iconOnly` buttons** must have an `aria-label` provided by the consumer
5. **`rel="noopener noreferrer"`** auto-applied when `blank` is true (security)
6. **Semantic elements**: native `<button>` and `<a>`, not `<div>` with `role="button"`
7. **`type="button"`** default prevents accidental form submission
8. Hidden content during loading keeps screen reader text accessible (opacity: 0, not display: none)

### Accessibility Test Pattern

```typescript
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import BpkButton from './BpkButton';

it('should not have programmatically detectable accessibility issues', async () => {
  const { container } = render(<BpkButton>Click me</BpkButton>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

---

## Test Coverage Requirements

Tests must cover:

### Element rendering
- Renders `<button>` by default with `type="button"`
- Renders `<a>` when `href` is provided and not disabled
- Renders `<button>` when `href` + `disabled` (suppresses anchor)
- Renders `<button>` when `href` + `loading` (suppresses anchor)
- Applies `data-backpack-ds-component="Button"` on both elements

### All 9 variants
- Each variant applies correct class: `bpk-button--{variant}`

### Size
- Default (small): no `--large` class
- Large: applies `bpk-button--large`

### Icon handling
- `leadingIcon` renders `bpk-button__leading-icon` wrapper
- `trailingIcon` renders `bpk-button__trailing-icon` wrapper
- Both together render both wrappers
- `bpk-button--has-icon` applied when any icon present
- Icon wrappers NOT rendered when `iconOnly` is true
- Works with `fullWidth`, `disabled`, `href`

### Loading state
- Shows spinner, hides content with opacity
- Button is `disabled` and has `aria-busy="true"`
- No `onClick` fires when loading
- Uses `BpkLargeSpinner` for `size="large"`
- Correct spinner type per variant (dark for secondary/destructive/link/primaryOnDark, light for others)
- No underline wrapper for link types when loading

### Link types
- Underline `<span>` wrapper rendered for link/linkOnDark
- `implicit` prop adds implicit underline class
- `linkOnDark` + `implicit` adds `--implicit--alternate` class
- No underline for `iconOnly` or `disabled` link buttons

### Blank & rel
- `blank` sets `target="_blank"` and `rel="noopener noreferrer"`
- Custom `rel` overrides default
- `blank` + custom `rel` uses custom rel

### className
- Consumer `className` appended to class list
- Empty string `className` doesn't add extra classes

---

## Figma Code Connect

The component has a Figma mapping in `BpkButton.figma.tsx` that connects Figma component variants to code props.

---

## File Structure

```
packages/bpk-component-button/
├── index.ts                          # Public exports
└── src/
    ├── BpkButton.tsx                 # Main component (161 lines)
    ├── BpkButton.module.scss         # Styles (175 lines)
    ├── BpkButton-test.tsx            # Unit tests (537 lines)
    ├── BpkButton.figma.tsx           # Figma Code Connect mapping
    ├── common-types.tsx              # Types, constants, Props interface
    └── accessibility-test.tsx        # jest-axe tests
```
