# Backpack Design System — Agent Guide

**Backpack** is Skyscanner's design system — TypeScript React components with SCSS (BEM) styling, published under `@skyscanner/` on npm.

## Constitution

Read `.specify/memory/constitution.md` before making changes. Key non-obvious rules:

- **NEW components MUST NOT accept `className` or `style` props** (Constitution XI). Use `Omit<ComponentPropsWithoutRef<'div'>, 'children' | 'className' | 'style'>` or a closed props interface.
- **All source files MUST have the Apache 2.0 license header** (Constitution II). Enforced by post-write hook — copy from any existing component file.
- **All sizing in `rem`, never `px`** — use design tokens for values, or `tokens.$bpk-one-pixel-rem * N` for custom sizes.
- **Modern Sass only** — `@use` never `@import`. Enforced by post-write hook. See `decisions/modern-sass-api.md`.
- **Accessibility tests required** — every component needs `accessibility-test.tsx` using `jest-axe`. See `decisions/accessibility-tests.md`.

Check `decisions/` for other architectural decisions when relevant.

## Structure

```
packages/bpk-component-{name}/
├── src/
│   ├── Bpk{Name}.tsx              # Component (PascalCase)
│   ├── Bpk{Name}.module.scss      # Styles (BEM: .bpk-{name}__element--modifier)
│   ├── Bpk{Name}-test.tsx         # Unit tests
│   └── accessibility-test.tsx     # jest-axe tests
├── index.ts                       # Public API
└── README.md

examples/bpk-component-{name}/
├── examples.tsx                   # Storybook examples
└── stories.tsx                    # Storybook stories
```

## Design Tokens and Typography

Tokens come from `@skyscanner/bpk-foundations-web` via `packages/bpk-mixins/_tokens.scss`. Always import at the top of SCSS files:

```scss
@use '../../bpk-mixins/tokens';
@use '../../bpk-mixins/typography';
```

### Spacing (functions, return rem)
```scss
tokens.bpk-spacing-none()    // 0
tokens.bpk-spacing-sm()      // 0.5rem (8px)
tokens.bpk-spacing-base()    // 1rem (16px)
tokens.bpk-spacing-md()      // 1.25rem (20px)
tokens.bpk-spacing-lg()      // 1.5rem (24px)
tokens.bpk-spacing-xl()      // 2rem (32px)
```

### Colors (variables, semantic names)
```scss
// Text
tokens.$bpk-text-primary-day
tokens.$bpk-text-secondary-day
tokens.$bpk-text-disabled-day
tokens.$bpk-text-on-dark-day

// Backgrounds
tokens.$bpk-canvas-day
tokens.$bpk-canvas-contrast-day
tokens.$bpk-surface-highlight-day
tokens.$bpk-core-primary-day
tokens.$bpk-core-accent-day

// Borders
tokens.$bpk-line-day
```

### Typography (mixins — prefer semantic over size-based)
```scss
// Semantic (preferred)
@include typography.bpk-heading-3;
@include typography.bpk-body-default;
@include typography.bpk-caption;
@include typography.bpk-link;

// Size-based
@include typography.bpk-text-xs;   // through bpk-text-xxxl
```

### Complete SCSS Example

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

  &__title {
    @include typography.bpk-heading-3;
    color: tokens.$bpk-text-primary-day;
    margin-bottom: tokens.bpk-spacing-sm();
  }

  &__body {
    @include typography.bpk-body-default;
    color: tokens.$bpk-text-secondary-day;
  }

  &--compact {
    padding: tokens.bpk-spacing-sm();
  }
}
```
