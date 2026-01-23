---
name: create-backpack-component
description: Creates a complete Backpack component with types, styles, tests, and documentation following all design system conventions
user-invocable: true
allowed-tools: Read, Write, Bash
context: fork
argument-hint: [component-name] [props]
---

# Create Backpack Component

Creates a complete, production-ready Backpack component following all architectural patterns and conventions.

## What Gets Created

✅ TypeScript component with type-safe enums
✅ CSS Modules with BEM naming and Modern SCSS API
✅ Comprehensive test triad (snapshots, accessibility, theme tests)
✅ Storybook stories with visual regression support
✅ Theme attributes export
✅ Full public API exports

## How to Ask

```
Create a BpkTabs component with:
- mode: 'tabs' | 'underline' variants
- animated: boolean prop
- disabled: boolean prop

Include full test coverage, keyboard navigation, and Figma integration.
```

## Key Patterns Applied

### 1. Type-Safe Props
- Const enum with `as const`
- Type derivation using `[keyof typeof ENUM]`
- Props with inexact rest: `[rest: string]: any`
- Full TypeScript inference

### 2. Component Structure
```typescript
export const COMPONENT_TYPES = {
  variant1: 'variant1',
  variant2: 'variant2',
} as const;

type ComponentType = (typeof COMPONENT_TYPES)[keyof typeof COMPONENT_TYPES];

type Props = {
  type?: ComponentType;
  [rest: string]: any; // Inexact rest. See decisions/inexact-rest.md
};

export default function BpkComponent(props: Props) {
  // Component implementation
}

export { COMPONENT_TYPES };
export type { Props };
```

### 3. File Structure
```
packages/bpk-component-name/
├── src/
│   ├── BpkComponent.tsx          # Main component
│   ├── BpkComponent.module.scss  # Styles (CSS Modules)
│   ├── BpkComponent-test.tsx     # Unit tests
│   ├── accessibility-test.tsx    # jest-axe tests
│   ├── themeAttributes.tsx       # Theme tokens
│   └── BpkComponent.figma.tsx    # Figma Code Connect (optional)
├── examples/
│   ├── stories.tsx               # Storybook stories
│   └── examples.tsx              # Example components
└── index.ts                      # Public API
```

### 4. Styling Conventions
- `.module.scss` files with CSS Modules
- BEM naming: `.bpk-componentname--modifier`
- Modern SCSS API: `@use` (not `@import`)
- Rem units only (except box-shadow)
- Design tokens from `@skyscanner/bpk-foundations-web`
- Mixins from `packages/bpk-mixins/src/`

### 5. Testing Pattern (Test Triad)
**Snapshots** (Component-test.tsx):
- Parameterized tests over enum variants
- One test per significant prop combination

**Accessibility** (accessibility-test.tsx):
- jest-axe for WCAG compliance
- Role, aria-* attribute verification

**Theme** (themeAttributes-test.tsx):
- Verify theme attributes export structure
- Test design token availability

### 6. Storybook Stories
```typescript
// examples/bpk-component-name/stories.tsx
export const DefaultVariant = () => <DefaultExample />;
export const AlternateVariant = () => <AlternateExample />;

// Percy visual regression testing (auto-detected)
export const VisualTest = () => (
  <div>
    <DefaultVariant />
    <AlternateVariant />
  </div>
);

// Zoom testing at 200%
export const VisualTestWithZoom = {
  render: VisualTest,
  args: { zoomEnabled: true },
};
```

## Reference Materials

For detailed patterns and examples, see:
- [backpack-component-patterns.md](./backpack-component-patterns.md) - Detailed implementation guide
- [../type-safe-enums/SKILL.md](../type-safe-enums/SKILL.md) - Type safety patterns
- [../component-testing/SKILL.md](../component-testing/SKILL.md) - Testing patterns
- [../component-styling/SKILL.md](../component-styling/SKILL.md) - Styling patterns

## Backpack Boilerplate

Start from: `packages/bpk-component-boilerplate/`

Reference examples: `packages/bpk-component-badge/`, `packages/bpk-component-button/`

## Key Rules

✅ **DO:**
- Export const enum with `as const`
- Use CSS Modules (.module.scss)
- BEM naming: `.bpk-name--modifier`
- Create snapshots for all variants
- Add jest-axe accessibility tests
- Include VisualTest* stories
- Use rem units (no px)
- Import design tokens
- Use Modern SCSS API (@use)

❌ **DON'T:**
- Use string enums
- Create global styles
- Use px units (except box-shadow)
- Skip accessibility tests
- Use @import (use @use)
- Hardcode colors/spacing
- Export unnamed types
- Skip Storybook stories
