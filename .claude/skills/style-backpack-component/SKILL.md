---
name: style-backpack-component
description: Applies CSS Modules styling with BEM naming, Modern SCSS API, and design tokens to Backpack components
user-invocable: true
allowed-tools: Read, Write, Grep
---

# Style Backpack Component

Creates or updates CSS Module styles following Backpack conventions: BEM naming, Modern SCSS API, rem units, and design tokens.

## What Gets Styled

✅ `.module.scss` files with CSS Modules
✅ BEM naming: `.bpk-componentname--modifier`
✅ Modern SCSS API (`@use`, math, etc.)
✅ Design tokens from bpk-foundations-web
✅ Mixins from bpk-mixins
✅ Rem units (no px except box-shadow)
✅ RTL support

## How to Ask

```
Style the BpkCard component:
- Base: 1rem padding, 8px radius, light background
- elevated modifier: stronger shadow
- interactive modifier: hover effects
- disabled modifier: reduced opacity

Use rem units and design tokens from bpk-foundations-web.
Include RTL support.
```

## BEM Pattern

### Block (Base)
```scss
.bpk-card {
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: var(--bpk-surface-default);
}
```

### Modifier
```scss
.bpk-card--elevated {
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.15);
}

.bpk-card--interactive {
  cursor: pointer;

  &:hover {
    background-color: var(--bpk-surface-hover);
  }
}

.bpk-card--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

## Modern SCSS API

### Use @use (not @import)
```scss
@use '../../bpk-mixins/cards';
@use 'sass:math';

.bpk-card {
  @include cards.bpk-card;
  margin: math.div(1rem, 2); // For calculations
}
```

### Design Tokens
```scss
.bpk-component {
  // Colors
  color: var(--bpk-text-primary);
  background: var(--bpk-surface-default);

  // Spacing (always rem)
  padding: var(--bpk-spacing-md);  // 1rem
  margin: var(--bpk-spacing-lg);   // 1.5rem

  // Shadows
  box-shadow: var(--bpk-shadow-md);
}
```

## CSS Modules Usage

### In SCSS
```scss
// src/BpkComponent.module.scss
@use '../../bpk-mixins/components';

.bpk-component {
  @include components.base;

  &--modifier {
    @include components.modifier;
  }
}
```

### In TypeScript
```typescript
import { cssModules } from '../../bpk-react-utils';
import STYLES from './BpkComponent.module.scss';

const getClassName = cssModules(STYLES);

export const BpkComponent = ({ modifier, className, ...rest }) => {
  const classNames = getClassName(
    'bpk-component',
    modifier && 'bpk-component--modifier',
    className,
  );

  return <div className={classNames} {...rest} />;
};
```

## Available Design Tokens

```scss
// Colors
--bpk-surface-default
--bpk-surface-hover
--bpk-text-primary
--bpk-text-secondary

// Spacing (rem)
--bpk-spacing-xs  // 0.25rem
--bpk-spacing-sm  // 0.5rem
--bpk-spacing-md  // 1rem
--bpk-spacing-lg  // 1.5rem
--bpk-spacing-xl  // 2rem
--bpk-spacing-xxl // 3rem

// Shadows
--bpk-shadow-sm
--bpk-shadow-md
--bpk-shadow-lg

// Border radius
--bpk-border-radius-sm
--bpk-border-radius-md
```

## Mixin Locations

Import from `packages/bpk-mixins/src/`:
```scss
@use '../../bpk-mixins/badges';
@use '../../bpk-mixins/buttons';
@use '../../bpk-mixins/cards';
@use '../../bpk-mixins/forms';
@use '../../bpk-mixins/elevation';
@use '../../bpk-mixins/focus';
```

## RTL Support

```scss
.bpk-component {
  padding-left: 1rem;

  [dir='rtl'] & {
    padding-left: 0;
    padding-right: 1rem;
  }
}

// Or at block level
[dir='rtl'] .bpk-component {
  padding-left: 0;
  padding-right: 1rem;
}
```

## Reference

For detailed styling guide: [css-modules-bem-guide.md](./css-modules-bem-guide.md)

See stylelint configuration in root `stylelintrc`

See SCSS guidelines in `CONTRIBUTING.md`

## Key Rules

✅ **DO:**
- Use `.module.scss` extension
- Use `@use` Modern SCSS API
- BEM naming: `.bpk-name--modifier`
- Rem units (use var(--bpk-spacing-*))
- Import mixins from bpk-mixins
- Use design tokens (not hardcoded)
- Include RTL support
- Use cssModules helper in TypeScript

❌ **DON'T:**
- Use `@import` (use `@use`)
- Use px units (except box-shadow)
- Use CamelCase selectors
- Hardcode colors/spacing
- Create global styles
- Use element selectors (.bpk-card .header ❌)
- Forget compiled .module.css file
- Skip linting (npm run lint:css)
