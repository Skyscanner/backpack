# Complete Component Creation Pattern

This is detailed reference material for the `/create-backpack-component` skill.

## Full Implementation Guide

### Step 1: Component Structure
```typescript
// src/BpkComponent.tsx
export const COMPONENT_TYPES = {
  variant1: 'variant1',
  variant2: 'variant2',
} as const;

type ComponentType = (typeof COMPONENT_TYPES)[keyof typeof COMPONENT_TYPES];

type Props = {
  type?: ComponentType;
  disabled?: boolean;
  className?: string;
  [rest: string]: any;
};

export default function BpkComponent(props: Props) {
  const { type = 'variant1', disabled = false, className, ...rest } = props;
  // Implementation
}

export { COMPONENT_TYPES };
export type { Props };
```

### Step 2: Module Exports
```typescript
// index.ts
export { default, COMPONENT_TYPES } from './src/BpkComponent';
export type { Props } from './src/BpkComponent';
export { default as themeAttributes } from './src/themeAttributes';
```

### Step 3: Test Files Structure
```
src/
├── BpkComponent.tsx
├── BpkComponent.module.scss
├── BpkComponent-test.tsx        (snapshots)
├── accessibility-test.tsx       (jest-axe)
├── themeAttributes.tsx
└── themeAttributes-test.tsx     (theme validation)
```

### Step 4: Storybook Stories
```
examples/bpk-component-name/
├── stories.tsx
├── examples.tsx
└── index.js
```

## File Checklist

When creating a new component, ensure:

- [ ] TypeScript component with enum variants
- [ ] CSS Module styles with BEM naming
- [ ] Unit test file with snapshots
- [ ] Accessibility test file with jest-axe
- [ ] Theme attributes file and tests
- [ ] Storybook stories with VisualTest*
- [ ] Figma Code Connect (optional)
- [ ] Public API exports in index.ts
- [ ] README with usage instructions
- [ ] Type exports for consumers

## Common Patterns

### Enum with Multiple Variants
```typescript
export const BUTTON_TYPES = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
} as const;

export const BUTTON_SIZES = {
  small: 'small',
  large: 'large',
} as const;

type ButtonType = (typeof BUTTON_TYPES)[keyof typeof BUTTON_TYPES];
type ButtonSize = (typeof BUTTON_SIZES)[keyof typeof BUTTON_SIZES];
```

### Optional Props Pattern
```typescript
type Props = {
  type?: ButtonType;           // Optional with default
  size?: ButtonSize;           // Optional with default
  onClick?: () => void;        // Optional callback
  className?: string;          // Custom styling
  [rest: string]: any;         // Inexact rest
};
```

### Theme Attributes
```typescript
// src/themeAttributes.tsx
const themeAttributes = {
  buttonPrimaryBackgroundColor: 'bpk-button-primary-background-color',
  buttonPrimaryTextColor: 'bpk-button-primary-text-color',
  buttonSecondaryBackgroundColor: 'bpk-button-secondary-background-color',
  buttonSecondaryTextColor: 'bpk-button-secondary-text-color',
} as const;

export default themeAttributes;
```

## Reference Examples

See these components for complete examples:
- `packages/bpk-component-button/`
- `packages/bpk-component-badge/`
- `packages/bpk-component-card/`

All follow the same structure documented here.
