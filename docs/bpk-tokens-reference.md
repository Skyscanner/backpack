# BPK Design Token Reference

**IMPORTANT FOR CODE GENERATION**: When writing SCSS for Backpack components, you MUST use these tokens instead of hardcoded values. Always `@use '../../bpk-mixins/tokens'` and `@use '../../bpk-mixins/typography'` at the top of every SCSS file.

---

## Import Pattern

```scss
@use '../../bpk-mixins/tokens';
@use '../../bpk-mixins/typography';
```

---

## Spacing (FUNCTIONS — call with parentheses)

```scss
tokens.bpk-spacing-none()     // 0
tokens.bpk-spacing-sm()       // 0.25rem  (4px)
tokens.bpk-spacing-md()       // 0.5rem   (8px)
tokens.bpk-spacing-base()     // 1rem     (16px)
tokens.bpk-spacing-lg()       // 1.5rem   (24px)
tokens.bpk-spacing-xl()       // 2rem     (32px)
tokens.bpk-spacing-xxl()      // 2.5rem   (40px)
tokens.bpk-spacing-xxxl()     // 4rem     (64px)
tokens.bpk-spacing-xxxxl()    // 6rem     (96px)
```

---

## Color / Canvas & Surface (VARIABLES — use with `$` prefix via `tokens.`)

```scss
// Canvas (page backgrounds)
tokens.$bpk-canvas-day                // #ffffff
tokens.$bpk-canvas-night              // #010913
tokens.$bpk-canvas-contrast-day      // #eff3f8
tokens.$bpk-canvas-contrast-night    // #010913

// Surface (component backgrounds)
tokens.$bpk-surface-default-day      // #ffffff
tokens.$bpk-surface-default-night    // #131d2b
tokens.$bpk-surface-elevated-day     // #ffffff
tokens.$bpk-surface-elevated-night   // #243346
tokens.$bpk-surface-hero-day         // #0062e3
tokens.$bpk-surface-hero-night       // #010913
tokens.$bpk-surface-contrast-day     // #05203c
tokens.$bpk-surface-contrast-night   // #010913
tokens.$bpk-surface-highlight-day    // #e0e4e9
tokens.$bpk-surface-highlight-night  // #243346
tokens.$bpk-surface-subtle-day       // #e3f0ff
tokens.$bpk-surface-subtle-night     // #243346
tokens.$bpk-surface-low-contrast-day    // #f5f7fa
tokens.$bpk-surface-low-contrast-night  // #243346
tokens.$bpk-surface-tint-day         // rgba(255,255,255,0.1)
tokens.$bpk-surface-tint-night       // rgba(255,255,255,0.1)
```

---

## Color / Text

```scss
tokens.$bpk-text-primary-day         // #161616  ← main body text
tokens.$bpk-text-primary-night       // #ffffff
tokens.$bpk-text-secondary-day       // #626971  ← secondary/caption text
tokens.$bpk-text-secondary-night     // #bdc4cb
tokens.$bpk-text-on-dark-day         // #ffffff  ← text on dark backgrounds
tokens.$bpk-text-on-dark-night       // #ffffff
tokens.$bpk-text-on-light-day        // #161616
tokens.$bpk-text-on-light-night      // #010913
tokens.$bpk-text-primary-inverse-day   // #ffffff
tokens.$bpk-text-primary-inverse-night // #010913
tokens.$bpk-text-disabled-day        // rgba(0,0,0,0.2)
tokens.$bpk-text-disabled-night      // rgba(255,255,255,0.2)
tokens.$bpk-text-disabled-on-dark-day  // rgba(255,255,255,0.5)
tokens.$bpk-text-link-day            // #0062e3
tokens.$bpk-text-link-night          // #84e9ff
tokens.$bpk-text-hero-day            // #0062e3
tokens.$bpk-text-hero-night          // #010913
tokens.$bpk-text-success-day         // #0c838a
tokens.$bpk-text-success-night       // #62f1c6
tokens.$bpk-text-error-day           // #e70866
tokens.$bpk-text-error-night         // #ff649c
```

---

## Color / Core & Brand

```scss
tokens.$bpk-core-primary-day         // #05203c  ← Skyscanner navy
tokens.$bpk-core-primary-night       // #054184
tokens.$bpk-core-accent-day          // #0062e3  ← Skyscanner blue
tokens.$bpk-core-accent-night        // #84e9ff
tokens.$bpk-core-eco-day             // #0fa1a9
tokens.$bpk-core-eco-night           // #0fa1a9
```

---

## Color / Status

```scss
// Success
tokens.$bpk-status-success-spot-day  // #0c838a
tokens.$bpk-status-success-spot-night // #62f1c6
tokens.$bpk-status-success-fill-day  // #d4fff2
tokens.$bpk-status-success-fill-night // #b1ffe7

// Warning
tokens.$bpk-status-warning-spot-day  // #f55d42
tokens.$bpk-status-warning-spot-night // #feeb87
tokens.$bpk-status-warning-fill-day  // #fff7cf
tokens.$bpk-status-warning-fill-night // #fbf1bb

// Danger/Error
tokens.$bpk-status-danger-spot-day   // #e70866
tokens.$bpk-status-danger-spot-night // #ff649c
tokens.$bpk-status-danger-fill-day   // #ffe9f9
tokens.$bpk-status-danger-fill-night // #ffcadd
```

---

## Color / Line & Overlay

```scss
tokens.$bpk-line-day                 // #c1c7cf  ← borders/dividers
tokens.$bpk-line-night               // #44505f
tokens.$bpk-line-on-dark-day         // rgba(255,255,255,0.5)
tokens.$bpk-line-on-dark-night       // #44505f
tokens.$bpk-scrim-day                // rgba(0,0,0,0.7)
tokens.$bpk-scrim-night              // rgba(0,0,0,0.7)
tokens.$bpk-overlay-day              // rgba(0,0,0,0.2)
tokens.$bpk-overlay-night            // rgba(255,255,255,0.8)
```

---

## Border Radius

```scss
tokens.$bpk-border-radius-xs         // 0.25rem
tokens.$bpk-border-radius-sm         // 0.5rem   ← buttons, inputs
tokens.$bpk-border-radius-md         // 0.75rem  ← cards, panels
tokens.$bpk-border-radius-lg         // 1.5rem
tokens.$bpk-border-radius-xl         // 2.5rem
tokens.$bpk-border-radius-full       // 100%     ← pills, avatars
tokens.$bpk-border-radius-nav-tabs   // 1.125rem
```

---

## Border Size & Box Shadow

```scss
tokens.$bpk-border-size-sm           // 1px
tokens.$bpk-border-size-lg           // 2px
tokens.$bpk-border-size-xl           // 3px
tokens.$bpk-box-shadow-sm            // 0px 1px 3px 0px rgba(37,32,31,.3)
tokens.$bpk-box-shadow-lg            // 0px 4px 14px 0px rgba(37,32,31,.25)
tokens.$bpk-box-shadow-xl            // 0px 12px 50px 0px rgba(37,32,31,.25)
```

---

## Icon Sizes

```scss
tokens.$bpk-icon-size-sm             // 1rem    (16px)
tokens.$bpk-icon-size-lg             // 1.5rem  (24px)
tokens.$bpk-icon-size-xl             // 2rem    (32px)
tokens.$bpk-icon-size-xxl            // 2.5rem  (40px)
tokens.$bpk-icon-size-xxxl           // 3rem    (48px)
```

---

## Typography Mixins (from `@use '../../bpk-mixins/typography'`)

Use **semantic mixins** whenever possible. Never set `font-size`, `line-height`, `font-weight` manually.

```scss
// Body text
@include typography.bpk-body-default;    // standard body text
@include typography.bpk-body-longform;   // longform reading text
@include typography.bpk-caption;         // small supporting text

// Headings
@include typography.bpk-heading-1;
@include typography.bpk-heading-2;
@include typography.bpk-heading-3;
@include typography.bpk-heading-4;
@include typography.bpk-heading-5;

// Links
@include typography.bpk-link;
@include typography.bpk-link-underlined;

// Label (use bpk-label-1/2/3 — bpk-label-default does NOT exist)
@include typography.bpk-label-1;
@include typography.bpk-label-2;
@include typography.bpk-label-3;

// Size-only mixins (prefer semantic above, use these as fallback)
@include typography.bpk-text-xs;    // 0.75rem
@include typography.bpk-text-sm;    // 0.875rem
@include typography.bpk-text-base;  // 1rem
@include typography.bpk-text-lg;    // 1.25rem
@include typography.bpk-text-xl;    // 1.5rem
@include typography.bpk-text-xxl;   // 2rem
@include typography.bpk-text-xxxl;  // 2.5rem

// Margin reset only — NOT a typography style mixin
// @include typography.bpk-text;  // only sets margin: 0 — pair with a size mixin above
```

---

## Animation Duration

```scss
tokens.$bpk-duration-xs             // 50ms
tokens.$bpk-duration-sm             // 200ms
tokens.$bpk-duration-base           // 400ms
```

---

## Breakpoints

```scss
// Breakpoint values
tokens.$bpk-breakpoint-mobile        // 32rem   (512px)
tokens.$bpk-breakpoint-small-tablet  // 48rem   (768px)
tokens.$bpk-breakpoint-tablet        // 64rem   (1024px)
tokens.$bpk-breakpoint-desktop       // 80rem   (1280px)

// Media query strings (use in @media)
tokens.$bpk-breakpoint-query-mobile         // "(max-width: 32rem)"
tokens.$bpk-breakpoint-query-above-mobile   // "(min-width: 32.0625rem)"
tokens.$bpk-breakpoint-query-small-tablet   // "(max-width: 48rem)"
tokens.$bpk-breakpoint-query-tablet         // "(max-width: 64rem)"
tokens.$bpk-breakpoint-query-above-tablet   // "(min-width: 64.0625rem)"
tokens.$bpk-breakpoint-query-desktop-only   // "(min-width: 64.0625rem) and (max-width: 80rem)"
tokens.$bpk-breakpoint-query-above-desktop  // "(min-width: 80.0625rem)"

// Usage
@media #{tokens.$bpk-breakpoint-query-mobile} { ... }
```

---

## Z-index

```scss
tokens.$bpk-zindex-autosuggest       // 900
tokens.$bpk-zindex-popover           // 900
tokens.$bpk-zindex-tooltip           // 900
tokens.$bpk-zindex-scrim             // 1000
tokens.$bpk-zindex-modal             // 1100
tokens.$bpk-zindex-drawer            // 1100
```

---

## Quick Reference: Common Patterns

```scss
// Card/panel
background-color: tokens.$bpk-surface-default-day;
border: tokens.$bpk-border-size-sm solid tokens.$bpk-line-day;
border-radius: tokens.$bpk-border-radius-md;
padding: tokens.bpk-spacing-base();
box-shadow: tokens.$bpk-box-shadow-sm;

// Primary button background
background-color: tokens.$bpk-core-primary-day;
color: tokens.$bpk-text-on-dark-day;

// Accent/CTA button
background-color: tokens.$bpk-core-accent-day;
color: tokens.$bpk-text-on-dark-day;

// Body text
color: tokens.$bpk-text-primary-day;
@include typography.bpk-body-default;

// Secondary/caption text
color: tokens.$bpk-text-secondary-day;
@include typography.bpk-caption;

// Disabled state
color: tokens.$bpk-text-disabled-day;
border-color: tokens.$bpk-line-day;
```
