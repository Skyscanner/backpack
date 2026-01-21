# Research Report: BpkCheckbox Ark UI Implementation

**Date**: 2026-01-21
**Component**: BpkCheckbox (Ark UI Rebase)
**Phase**: 0 - Research & Discovery

## Executive Summary

This research investigates the Backpack codebase to understand patterns for implementing BpkCheckbox with Ark UI. The findings reveal well-established patterns across similar form components, a mature theming system, and specific accessibility practices.

---

## 1. Similar Components Analysis

### BpkButton (V2) - Reference Implementation
**Location**: `packages/bpk-component-button/src/BpkButtonV2/`

**Structure**:
- Main Component: `BpkButton.tsx` - Functional component with conditional rendering
- Types: `common-types.tsx` - Comprehensive type definitions using `as const` pattern
- Theming: `themeAttributes.ts` - Exports arrays of theme attribute names
- Tests: `BpkButton-test.tsx`, `accessibility-test.tsx`
- Styling: `BpkButton.module.scss` - CSS Modules with modern Sass

**Key Patterns**:
- Uses `cssModules` utility from `bpk-react-utils` for class name management
- Props split into logical groups: size types, button types, layout options
- Conditional rendering based on `href` prop (link vs button)
- Support for custom classes through flexible className handling

### Current BpkCheckbox Implementation
**Location**: `packages/bpk-component-checkbox/src/`

**Current Structure**:
```
BpkCheckbox.tsx          # Functional component ~110 lines
BpkCheckbox.module.scss  # CSS Modules styling
BpkCheckbox-test.tsx     # Comprehensive snapshot tests
accessibility-test.tsx   # jest-axe accessibility tests
themeAttributes.ts       # Exports ['checkboxCheckedColor']
```

**Current API**:
```typescript
type Props = Omit<NativeInputProps, 'type' | 'className'> & {
  name: string;                // Required
  label: ReactNode;            // Required
  required?: boolean;
  disabled?: boolean;
  white?: boolean;
  className?: string | null;
  smallLabel?: boolean;
  valid?: boolean | null;
  indeterminate?: boolean;
};
```

**Current Implementation Details**:
- Wraps native `<input type="checkbox">` in a `<label>` for accessibility
- Uses ref to set `indeterminate` property on checkbox input element
- Generates class names using `cssModules` utility
- Handles visual variations: white background, disabled state, validation state

**Decision**: We will maintain 100% backward compatibility with this API while adding composable sub-components.

---

## 2. Ark UI Integration Patterns

### Ark UI Availability
**Package Status**: `@ark-ui/react` (version ^5.29.1) is installed in the monorepo

### Ark UI Checkbox Primitive Structure
The package includes complete Checkbox primitives:
- `Checkbox.Root` / `CheckboxRoot` - Root wrapper with state management
- `Checkbox.Control` / `CheckboxControl` - Checkbox box element
- `Checkbox.Label` / `CheckboxLabel` - Label element
- `Checkbox.Indicator` / `CheckboxIndicator` - Checkmark/dash icon
- `Checkbox.HiddenInput` / `CheckboxHiddenInput` - Native input for forms
- `Checkbox.Group` - For checkbox groups
- Context hooks: `useCheckboxContext`, `useCheckboxGroupContext`

### Current Ark UI Usage in Backpack
**Status**: No direct Ark UI usage found in existing component code, but:
- Ark UI package is available and ready for use
- This will be the first Backpack component to adopt Ark UI primitives
- Patterns established here will guide future component migrations

**Decision**: We will import Ark UI primitives and wrap them with Backpack styling and conventions.

---

## 3. Testing Patterns - jest-axe Integration

### Accessibility Testing Standard Pattern
**File Pattern**: `accessibility-test.tsx` (standard location in all components)

**Implementation Pattern**:
```typescript
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

describe('BpkCheckbox accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues', async () => {
    const { container } = render(
      <BpkCheckbox name="checkbox" label="Prefer directs" />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

**Key Points**:
- Test runs `axe()` from `jest-axe` library on rendered container
- Assertion uses custom matcher: `expect(results).toHaveNoViolations()`
- Simple baseline test - no complex scenarios needed
- Pattern is consistent across all Backpack components

### Unit Test Pattern
**File**: `BpkCheckbox-test.tsx`

**Structure**:
- Snapshot tests for each variant (checked, disabled, indeterminate, white, valid, invalid, required)
- Event handler testing with mocked callbacks
- Prop combination testing
- Props passed through to input element verification
- Typically 20-30 test cases per component

### Test Coverage Requirements
From `package.json` (root):
- **70% branches**
- **75% functions**
- **75% lines**
- **75% statements**

**Decision**: We will maintain these coverage levels and test both legacy and composable APIs.

---

## 4. Theming Patterns - BpkThemeProvider Integration

### BpkButton Theming Reference
**File**: `packages/bpk-component-button/src/themeAttributes.ts`

**Structure** - Multiple theme attribute arrays:
```typescript
export const buttonThemeAttributes = ['buttonFontSize'];

export const primaryThemeAttributes = [
  'buttonPrimaryTextColor',
  'buttonPrimaryHoverTextColor',
  'buttonPrimaryActiveTextColor',
  'buttonPrimaryGradientStartColor',
  'buttonPrimaryGradientEndColor',
  'buttonPrimaryBackgroundColor',
  'buttonPrimaryHoverBackgroundColor',
  'buttonPrimaryActiveBackgroundColor',
];
```

**Export Pattern**: Separate exported arrays for each variant, allowing consumers to pick specific theme attributes.

### Current BpkCheckbox Theming
**File**: `packages/bpk-component-checkbox/src/themeAttributes.ts`

```typescript
export default ['checkboxCheckedColor'];
```

**Decision**: We will preserve this single attribute for backward compatibility. Future MINOR versions can add more attributes without breaking changes.

### Theming Integration with SCSS
**Key Mixin**: From `bpk-mixins/_forms.scss`:
```scss
@mixin bpk-checkbox__input {
  &:checked,
  &:indeterminate {
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
}
```

**Pattern Explained**:
- `bpk-themeable-property` mixin from `bpk-mixins/utils`
- First parameter: CSS property (e.g., `background-color`)
- Second parameter: CSS custom property name (e.g., `--bpk-checkbox-checked-color`)
- Third parameter: Default fallback token (e.g., `tokens.$bpk-core-accent-day`)

**How it Works**:
1. BpkThemeProvider converts theme object keys to CSS custom properties
2. Attribute name `checkboxCheckedColor` becomes `--bpk-checkbox-checked-color`
3. SCSS uses `var(--bpk-checkbox-checked-color, fallback)` pattern
4. When no theme is provided, fallback tokens are used

**Decision**: We will continue using this proven pattern with existing `checkboxCheckedColor` attribute.

---

## 5. Sass/SCSS Patterns - Modern @use Syntax

### Current Usage in BpkButton
**Example**: `packages/bpk-component-button/src/BpkButtonV2/BpkButton.module.scss`

```scss
@use '../../../bpk-mixins/tokens';
@use '../../../bpk-mixins/buttons';
@use '../../../bpk-mixins/typography';

.bpk-button {
  @include buttons.bpk-button;

  &--large {
    @include buttons.bpk-button--large;
  }

  &--destructive {
    @include buttons.bpk-button--secondary;
    @include buttons.bpk-button--destructive;
  }
}
```

**Key Patterns**:
- Uses `@use` (not `@import`) - modern Sass syntax
- Imports are relative paths to `bpk-mixins/` subdirectories
- Namespaced usage: `buttons.bpk-button`, `tokens.$variable`
- BEM naming convention: `.bpk-button`, `.bpk-button--large`, `.bpk-button--modifier`

### Current BpkCheckbox Styling
**File**: `packages/bpk-component-checkbox/src/BpkCheckbox.module.scss`

```scss
@use '../../bpk-mixins/tokens';
@use '../../bpk-mixins/forms';

.bpk-checkbox {
  @include forms.bpk-checkbox;

  &__label {
    @include forms.bpk-checkbox__label;

    &--small {
      @include forms.bpk-checkbox__label--small;
    }
  }

  &--white {
    @include forms.bpk-checkbox--white;
  }

  &--invalid {
    @include forms.bpk-checkbox--invalid;
  }

  &__input {
    @include forms.bpk-checkbox__input;

    &-indeterminate {
      &::before {
        position: absolute;
        top: tokens.bpk-spacing-sm() + tokens.$bpk-one-pixel-rem;
        left: tokens.bpk-spacing-sm() * 0.5;
        // indeterminate dash styling
      }
    }
  }

  &__asterisk {
    color: tokens.$bpk-status-danger-spot-day;
  }
}
```

### Available Mixin Modules
**Location**: `packages/bpk-mixins/`

Core modules available:
- `_tokens.scss` - Design token forwarding from `@skyscanner/bpk-foundations-web`
- `_forms.scss` - Form element mixins (input, checkbox, radio, etc.)
- `_buttons.scss` - Button styling mixins
- `_typography.scss` - Typography mixins
- `_utils.scss` - Utility mixins (RTL support, theming)
- `_radii.scss`, `_shadows.scss`, `_borders.scss` - Other styling utilities

### Checkbox-Specific Mixins
From `bpk-mixins/_forms.scss`:
```scss
@mixin bpk-checkbox { ... }
@mixin bpk-checkbox__label { ... }
@mixin bpk-checkbox__label--small { ... }
@mixin bpk-checkbox--white { ... }
@mixin bpk-checkbox--disabled { ... }
@mixin bpk-checkbox--invalid { ... }
@mixin bpk-checkbox__input { ... }
@mixin bpk-checkbox__input-indeterminate { ... }
@mixin bpk-checkbox__checkmark { ... }
```

**Decision**: We will continue using these existing mixins to maintain visual consistency.

### RTL Support Pattern
**Pattern** (from `bpk-mixins/_utils.scss`):
```scss
@include utils.bpk-rtl {
  padding-right: tokens.bpk-spacing-lg();
  padding-left: 0;
}
```

Handles automatic layout mirroring for right-to-left languages.

---

## 6. File Structure Conventions

### Component Package Structure Pattern
**Reference**: `packages/bpk-component-checkbox/`

**Current Structure**:
```
bpk-component-checkbox/
├── README.md                          # Component documentation
├── index.ts                           # Public exports
├── src/
│   ├── BpkCheckbox.tsx               # Main component (functional)
│   ├── BpkCheckbox.module.scss       # Component styles (CSS Modules)
│   ├── BpkCheckbox-test.tsx          # Unit tests with snapshots
│   ├── accessibility-test.tsx        # jest-axe accessibility tests
│   ├── BpkCheckbox.figma.tsx         # Figma Code Connect
│   ├── form-test.tsx                 # Form integration tests
│   ├── themeAttributes.ts            # Theme attribute definitions
│   ├── themeAttributes-test.ts       # Theme attribute unit tests
│   └── __snapshots__/                # Snapshot files (auto-generated)
└── docs/                              # Screenshots, design assets (optional)
```

**Proposed Structure for Ark UI Implementation**:
```
bpk-component-checkbox/
├── README.md
├── index.ts
├── src/
│   ├── BpkCheckbox/
│   │   ├── BpkCheckbox.tsx                 # Main component with mode detection
│   │   ├── BpkCheckboxRoot.tsx             # Ark UI Root wrapper
│   │   ├── BpkCheckboxControl.tsx          # Ark UI Control wrapper
│   │   ├── BpkCheckboxLabel.tsx            # Ark UI Label wrapper
│   │   ├── BpkCheckboxIndicator.tsx        # Ark UI Indicator wrapper
│   │   ├── BpkCheckboxHiddenInput.tsx      # Ark UI HiddenInput wrapper
│   │   ├── BpkCheckbox.module.scss         # All component styles
│   │   ├── BpkCheckbox-test.tsx            # Unit tests
│   │   ├── accessibility-test.tsx          # Accessibility tests
│   │   ├── BpkCheckbox.figma.tsx           # Figma Code Connect
│   │   ├── form-test.tsx                   # Form integration tests
│   │   ├── common-types.ts                 # Shared TypeScript types
│   │   └── __snapshots__/
│   └── themeAttributes.ts
```

### Index File Pattern
**File**: `packages/bpk-component-checkbox/index.ts`

**Current**:
```typescript
import BpkCheckbox, { type Props as BpkCheckboxProps } from './src/BpkCheckbox';
import themeAttributes from './src/themeAttributes';

export type { BpkCheckboxProps };
export default BpkCheckbox;
export { themeAttributes };
```

**Proposed for Ark UI**:
```typescript
import BpkCheckbox from './src/BpkCheckbox/BpkCheckbox';
import type { BpkCheckboxProps, BpkCheckboxRootProps, BpkCheckboxControlProps, BpkCheckboxLabelProps } from './src/BpkCheckbox/common-types';
import themeAttributes from './src/themeAttributes';

// Default export for simple usage
export default BpkCheckbox;

// Sub-components for composable API
export {
  BpkCheckboxRoot,
  BpkCheckboxControl,
  BpkCheckboxLabel,
  BpkCheckboxIndicator,
  BpkCheckboxHiddenInput,
} from './src/BpkCheckbox/BpkCheckbox';

// Types
export type {
  BpkCheckboxProps,
  BpkCheckboxRootProps,
  BpkCheckboxControlProps,
  BpkCheckboxLabelProps,
};

// Theme
export { themeAttributes };
```

**Decision**: We will use the proposed structure with sub-component exports.

---

## 7. Utility Patterns

### cssModules Helper
**Location**: `packages/bpk-react-utils/src/cssModules.ts`

```typescript
export default (styles: { [key: string]: any } = {}) =>
  (...classNames: Array<string | boolean | number | {} | null | undefined>) =>
    classNames.reduce((className: string, currentClass) => {
      if (currentClass && typeof currentClass === 'string') {
        const realName = styles[currentClass] || currentClass;
        return className ? `${className} ${realName}` : realName;
      }
      return className;
    }, '');
```

**Usage Pattern**:
```typescript
const getClassName = cssModules(STYLES);

const classNames = getClassName(
  'bpk-checkbox',
  disabled && 'bpk-checkbox--disabled',
  isInvalid && 'bpk-checkbox--invalid',
  className,
);
```

**Benefits**:
- Maps CSS Module class names to actual hashed names
- Allows conditional class application with boolean operators
- Ignores falsy values and null
- Falls back to raw class name if not found in styles object

**Decision**: We will continue using this utility for class name management.

---

## 8. Design Tokens & Dependencies

### Internal Packages Used
- `bpk-react-utils` - cssModules, isRTL utilities
- `bpk-mixins` - Sass mixins for styling
- `bpk-theming` - BpkThemeProvider for runtime theming
- `@skyscanner/bpk-foundations-web` - Design tokens (colors, spacing, etc.)

### Design Tokens Available
**Color Tokens**:
- `tokens.$bpk-core-accent-day` - Primary accent color
- `tokens.$bpk-text-primary-day` - Primary text
- `tokens.$bpk-text-disabled-day` - Disabled state
- `tokens.$bpk-surface-default-day` - Default surface
- `tokens.$bpk-status-danger-spot-day` - Error/danger color

**Spacing Tokens** (return rem values):
- `tokens.bpk-spacing-xs()`, `tokens.bpk-spacing-sm()`, `tokens.bpk-spacing-md()`, `tokens.bpk-spacing-lg()`, `tokens.bpk-spacing-xl()`

**Border/Radius**:
- `tokens.$bpk-border-size-lg` - Border width
- `tokens.$bpk-border-radius-lg` - Border radius

### External Dependencies
- `@ark-ui/react` (^5.29.1) - Available in monorepo
- `react` - Peer dependency (18.3.1+)

---

## 9. Architecture Decisions

### Naming Conventions
- **Component**: `BpkCheckbox` (PascalCase)
- **Sub-components**: `BpkCheckboxRoot`, `BpkCheckboxControl`, `BpkCheckboxLabel`, etc.
- **Exports**: `BpkCheckboxProps`, `BpkCheckboxRootProps` etc.
- **CSS Classes**: `bpk-checkbox`, `bpk-checkbox--white`, `bpk-checkbox__label` (BEM)
- **CSS Variables**: `--bpk-checkbox-checked-color` (kebab-case for theme attributes)
- **Theme Attributes**: `checkboxCheckedColor` (camelCase in TypeScript)

### Constitution Compliance
All Backpack components must:
- [x] Use `@use` syntax for Sass (not `@import`)
- [x] Include Apache 2.0 license header in all source files
- [x] Provide `accessibility-test.tsx` with jest-axe
- [x] Support TypeScript with proper typing
- [x] Meet coverage: 70% branches, 75% functions/lines/statements
- [x] Include README.md and JSDoc comments
- [x] Follow MINOR version bumps for backward-compatible changes
- [x] Use BEM naming convention with `bpk-` prefix

---

## Implementation Recommendations

### 1. Component Structure Strategy
- Start with modular sub-components: Root, Control, Label, Indicator, HiddenInput
- Implement smart defaults in Root component to auto-render sub-components when using legacy API
- Use React Context (from Ark UI) to manage state across sub-components
- Detect which mode (legacy vs composable) based on presence of `label` prop vs `children`

### 2. Theming Approach
- Use existing `bpk-themeable-property` mixin pattern (proven in bpk-mixins)
- Start with single attribute: `checkboxCheckedColor` (already working)
- Design for future extensibility without breaking changes (document in comments)

### 3. Accessibility Implementation
- Leverage Ark UI's built-in ARIA handling
- Add `aria-invalid`, `aria-required`, `aria-disabled` as needed
- Verify all ARIA attributes with jest-axe in accessibility tests
- Test with keyboard-only navigation (Space to toggle, Tab to focus)

### 4. Backward Compatibility Strategy
- Wrap Ark UI primitives with Backpack conventions
- Detect props to choose between simple or composable rendering
- Keep visual output identical for non-themed usage
- Provide migration guide in README for future Ark UI feature adoption

### 5. Test Coverage Priority
1. Core functionality (checked/unchecked states)
2. User interactions (click, keyboard)
3. Props variations (disabled, indeterminate, validation)
4. Accessibility (jest-axe, ARIA attributes)
5. Theming (CSS custom properties)
6. Form integration (name, value, submission)
7. Both legacy and composable APIs

---

## Research Completion Status

All six research areas have been thoroughly investigated:

1. **Similar Components** ✓ - BpkButton and existing BpkCheckbox analyzed
2. **Ark UI Usage** ✓ - Package availability confirmed, primitives documented
3. **Testing Patterns** ✓ - jest-axe implementation and coverage requirements detailed
4. **Theming Patterns** ✓ - BpkThemeProvider integration and SCSS mixin patterns documented
5. **Sass Patterns** ✓ - Modern @use syntax and available mixins catalogued
6. **File Structure** ✓ - Component organization and naming conventions established

The codebase is well-structured and ready for the Ark UI rebase implementation. All patterns and conventions are clearly documented in existing components.

---

## Next Steps

Phase 1 will use this research to:
1. Design component API (api-design.md)
2. Design styling structure (styling-guide.md)
3. Create code examples (examples/)
4. Update agent context
