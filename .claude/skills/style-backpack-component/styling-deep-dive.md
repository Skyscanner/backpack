# Complete Styling Reference Guide

Detailed reference material for the `/style-backpack-component` skill.

## BEM Deep Dive

### Block (Base Component)
```scss
// .bpk-component is the block
.bpk-card {
  display: flex;
  padding: 1rem;
  background-color: var(--bpk-surface-default);
  border-radius: 0.5rem;
}
```

### Modifier (Variant/State)
```scss
// .bpk-component--modifier changes appearance
.bpk-card--elevated {
  box-shadow: var(--bpk-shadow-md);
}

.bpk-card--interactive {
  cursor: pointer;

  &:hover {
    background-color: var(--bpk-surface-hover);
  }

  &:active {
    background-color: var(--bpk-surface-active);
  }
}

.bpk-card--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
```

### Avoid Elements (Use Block Modifiers Instead)
```scss
// ❌ Don't: Element selector
.bpk-card__header {
  font-weight: bold;
}

// ✅ Do: Modifier on block or separate block
.bpk-card--with-header {
  // Styles for card with header
}

// Or separate component:
.bpk-card-header {
  font-weight: bold;
}
```

## Modern SCSS API

### @use Instead of @import
```scss
// ✅ Correct (Modern SCSS)
@use '../../bpk-mixins/cards';
@use 'sass:math';

// ❌ Wrong (Old SCSS)
@import '../../bpk-mixins/cards';
```

### math Module
```scss
@use 'sass:math';

// Calculations
.bpk-component {
  margin: math.div(2rem, 3);
  width: math.percentage(1/3);
}
```

### Selective Imports
```scss
// Import only what you need
@use '../../bpk-mixins/cards';  // Not everything from bpk-mixins
@use 'sass:math';               // Math utilities

.bpk-card {
  @include cards.bpk-card;
}
```

## Design Tokens

### Colors
```scss
--bpk-surface-default          // Primary background
--bpk-surface-hover            // Hover state
--bpk-surface-active           // Active/pressed state
--bpk-text-primary             // Primary text
--bpk-text-secondary           // Secondary text
--bpk-text-tertiary            // Tertiary text
--bpk-focus-color              // Focus outline
```

### Spacing (All rem)
```scss
--bpk-spacing-xs       // 0.25rem (4px)
--bpk-spacing-sm       // 0.5rem  (8px)
--bpk-spacing-md       // 1rem    (16px)
--bpk-spacing-lg       // 1.5rem  (24px)
--bpk-spacing-xl       // 2rem    (32px)
--bpk-spacing-xxl      // 3rem    (48px)
```

### Shadows
```scss
--bpk-shadow-sm        // Subtle shadow
--bpk-shadow-md        // Medium shadow
--bpk-shadow-lg        // Large shadow
```

### Border Radius
```scss
--bpk-border-radius-sm // Small (4px)
--bpk-border-radius-md // Medium (8px)
--bpk-border-radius-lg // Large (12px)
```

## RTL Support

### Using Media Query
```scss
.bpk-component {
  padding-left: 1rem;

  [dir='rtl'] & {
    padding-left: 0;
    padding-right: 1rem;
  }
}
```

### At Root Level
```scss
.bpk-button {
  margin-right: 0.5rem;
}

[dir='rtl'] .bpk-button {
  margin-right: 0;
  margin-left: 0.5rem;
}
```

## Mixin Usage

### Base Mixin
```scss
@use '../../bpk-mixins/badges';

.bpk-badge {
  @include badges.bpk-badge;
}
```

### Modifier Mixin
```scss
.bpk-badge {
  @include badges.bpk-badge;

  &--warning {
    @include badges.bpk-badge--warning;
  }

  &--success {
    @include badges.bpk-badge--success;
  }
}
```

## Available Mixins

Located in `packages/bpk-mixins/src/`:

- **badges.scss** - Badge component mixins
- **buttons.scss** - Button component mixins
- **cards.scss** - Card component mixins
- **forms.scss** - Form inputs, labels, etc.
- **elevation.scss** - Box-shadow variants
- **focus.scss** - Focus indicators
- **reset.scss** - CSS resets
- **text.scss** - Typography mixins
- **borders.scss** - Border utilities

## CSS Modules in TypeScript

### Import and Use
```typescript
import { cssModules } from '../../bpk-react-utils';
import STYLES from './BpkComponent.module.scss';

const getClassName = cssModules(STYLES);

const classNames = getClassName(
  'bpk-component',                          // Base
  type === 'elevated' && 'bpk-component--elevated',  // Modifier
  disabled && 'bpk-component--disabled',
  className,                                 // Custom
);

return <div className={classNames}>{children}</div>;
```

## Linting & Validation

### Stylelint Rules
- BEM naming enforced
- Modern SCSS API required
- No px units (except box-shadow)
- No color functions without checking
- Consistent selector naming

### Running Linter
```bash
npm run lint:css              # Check styles
npm run lint                  # Full lint (ESLint + Stylelint)
```

## Common Mistakes

### ❌ px Units
```scss
// Wrong
.bpk-component {
  padding: 16px;
  margin: 8px;
}

// Correct
.bpk-component {
  padding: 1rem;
  margin: 0.5rem;
}
```

### ❌ @import
```scss
// Wrong
@import '../../bpk-mixins/buttons';

// Correct
@use '../../bpk-mixins/buttons';
```

### ❌ CamelCase Selectors
```scss
// Wrong
.bpkButtonPrimary { }

// Correct
.bpk-button--primary { }
```

### ❌ Direct Color Values
```scss
// Wrong
.bpk-component {
  color: #333;
  background: #fff;
}

// Correct
.bpk-component {
  color: var(--bpk-text-primary);
  background: var(--bpk-surface-default);
}
```

## Testing Styles

Styles are validated by:
1. **Visual regression** - Percy screenshots
2. **Component snapshots** - Jest tests
3. **Accessibility** - Color contrast checks
4. **Linting** - Stylelint validation

No separate CSS testing needed - covered by visual + unit tests.
