# Tokens and Typography Reference

> **Load this doc when:** any task involves a visual property — colour, spacing, typography,
> borders, shadows, or elevation. This applies whether you are writing SCSS, modifying a component,
> reviewing a design decision, or defining any value that affects how something looks.
> **This doc is mandatory whenever a visual property is in scope — there are no exceptions.**
> All visual values must come from tokens. Hardcoded colours, spacing, font sizes, or any
> design value not sourced from this system is a defect.

**Deep references** (load when you need specific values or a full lookup table):
- Token values, spacing scale, all colour tokens → `docs/references/tokens.md`
- `BpkText` props, `textStyle` values, `color` prop values → `docs/references/typography.md`

---

## Design Token Architecture

Design tokens are centralised in `packages/bpk-mixins/_tokens.scss`, which forwards all tokens from the foundations package:

```scss
@forward '@skyscanner/bpk-foundations-web/tokens/base.default';
```

---

## Critical: Modern Sass API only

**`@import` is deprecated and will cause build errors.** Always use `@use`/`@forward`.

Backpack uses `sass-embedded` (Dart Sass). The `@import` rule is not supported.

---

## Importing Tokens and Typography

Always import both at the top of every SCSS file:

```scss
@use '../../bpk-mixins/tokens';
@use '../../bpk-mixins/typography';
```

---

## Typography Mixins

Use these instead of setting font properties manually. More options are available in `bpk-mixins/typography`.

---

## CSS Modules usage in TypeScript

```tsx
import styles from './BpkComponent.module.scss';

// Access class names via bracket notation (BEM names are preserved)
<div className={styles['bpk-component-name']} />
<div className={styles['bpk-component-name--modifier']} />
```

CSS Modules locally scope class names at build time. The SCSS still uses BEM naming but collisions are prevented.

---

## Typography Mixins

### Semantic Mixins (preferred)

```scss
@include typography.bpk-heading-1;
@include typography.bpk-heading-2;
@include typography.bpk-heading-3;
@include typography.bpk-heading-4;
@include typography.bpk-heading-5;
@include typography.bpk-body-default;
@include typography.bpk-body-long-form;
@include typography.bpk-subheading;
@include typography.bpk-caption;
@include typography.bpk-footnote;
@include typography.bpk-label-1;
@include typography.bpk-label-2;
@include typography.bpk-link;
@include typography.bpk-link-underlined;
```

### Size-based Mixins

```scss
@include typography.bpk-text-xs;    // Extra small
@include typography.bpk-text-sm;    // Small
@include typography.bpk-text-base;  // Base/default
@include typography.bpk-text-lg;    // Large
@include typography.bpk-text-xl;    // Extra large
@include typography.bpk-text-xxl;   // 2x large
@include typography.bpk-text-xxxl;  // 3x large
```

> Prefer semantic mixins over size-based ones wherever possible.

---

## Colour Tokens

```scss
// Text
color: tokens.$bpk-text-primary-day;
color: tokens.$bpk-text-secondary-day;
color: tokens.$bpk-text-disabled-day;
color: tokens.$bpk-text-on-dark-day;

// Backgrounds
background-color: tokens.$bpk-canvas-day;
background-color: tokens.$bpk-canvas-contrast-day;
background-color: tokens.$bpk-surface-highlight-day;

// Brand
background-color: tokens.$bpk-core-primary-day;
background-color: tokens.$bpk-core-accent-day;

// Borders
border-color: tokens.$bpk-line-day;
border-color: tokens.$bpk-line-on-dark-day;
```

---

## Spacing Tokens (function-based)

```scss
padding: tokens.bpk-spacing-none();    // 0
padding: tokens.bpk-spacing-sm();      // 0.5rem  (8px)
padding: tokens.bpk-spacing-base();    // 1rem    (16px)
padding: tokens.bpk-spacing-md();      // 1.25rem (20px)
padding: tokens.bpk-spacing-lg();      // 1.5rem  (24px)
padding: tokens.bpk-spacing-xl();      // 2rem    (32px)
```

---

## Other Token Functions

```scss
border-radius: tokens.bpk-border-radius-md();
border: tokens.$bpk-border-size-sm solid tokens.$bpk-line-day;
box-shadow: tokens.bpk-box-shadow-sm();
```

---

## Complete Component Example

```scss
@use '../../bpk-mixins/tokens';
@use '../../bpk-mixins/typography';

.bpk-my-component {
  display: flex;
  flex-direction: column;
  padding: tokens.bpk-spacing-base();
  background-color: tokens.$bpk-canvas-day;
  border-radius: tokens.bpk-border-radius-md();
  border: tokens.$bpk-border-size-sm solid tokens.$bpk-line-day;
  box-shadow: tokens.bpk-box-shadow-sm();

  &__title {
    @include typography.bpk-heading-3;
    color: tokens.$bpk-text-primary-day;
    margin-bottom: tokens.bpk-spacing-sm();
  }

  &__body {
    @include typography.bpk-body-default;
    color: tokens.$bpk-text-secondary-day;
    margin-bottom: tokens.bpk-spacing-base();
  }

  &__link {
    @include typography.bpk-link;
    @include typography.bpk-link-underlined;
  }

  &--compact {
    padding: tokens.bpk-spacing-sm();

    .bpk-my-component__title {
      @include typography.bpk-heading-4;
    }

    .bpk-my-component__body {
      @include typography.bpk-caption;
    }
  }
}
```
