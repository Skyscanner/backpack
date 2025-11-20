# SCSS Styling Architecture

This document explains how SCSS is processed and organized in `bpk-component-layout`.

## Overview

The layout components use **CSS Modules + SCSS** for styling, which provides:

- **Static CSS generation** - All styles are compiled at build time
- **Zero runtime CSS-in-JS** - No performance overhead
- **SSR support** - Works seamlessly with server-side rendering
- **Consistent with Backpack** - Uses the same styling approach as other Backpack components

## Architecture

### File Structure

```
packages/bpk-component-layout/src/
├── layoutMixins.scss          # Shared SCSS mixins and utilities
├── BpkBox/
│   └── BpkBox.module.scss      # Component-specific styles
├── BpkFlex/
│   └── BpkFlex.module.scss     # Component-specific styles
└── ...
```

### Core Files

#### `layoutMixins.scss`

This is the central file that contains all shared SCSS mixins and utility class generators. It provides:

1. **Spacing utilities** - Generates padding, margin, and gap utility classes
2. **Color utilities** - Generates background-color, color, and border-color utility classes
3. **Layout utilities** - Generates display, flexbox, grid, overflow, position, border, and border-radius utility classes
4. **Responsive utilities** - Generates responsive variants for layout utilities
5. **Base component styles** - Common base styles (e.g., `box-sizing: border-box`)
6. **Common utilities mixin** - Convenience mixin that includes all commonly used utilities

#### Component `.module.scss` Files

Each component has its own `.module.scss` file that:

1. **Imports dependencies** - Backpack tokens, breakpoints, and layoutMixins
2. **Defines base class** - Component-specific base styles (e.g., `.bpk-box`, `.bpk-flex`)
3. **Includes utilities** - Uses mixins from `layoutMixins.scss` to generate utility classes

## How It Works

### 1. Build-Time CSS Generation

All CSS is generated at build time through SCSS compilation:

```scss
// BpkBox.module.scss
@use '../layoutMixins';

.bpk-box {
  @include layoutMixins.base-component-styles;
}

@include layoutMixins.common-layout-utilities($include-gap: true, $include-border-color: true);
```

This generates utility classes like:
- `.bpk-padding-base` → `padding: 1rem;`
- `.bpk-bg-surfaceHighlight` → `background-color: var(--bpk-surface-highlight-day, ...);`
- `.bpk-display-flex` → `display: flex;`

### 2. Runtime Class Name Mapping

At runtime, props are transformed to CSS class names:

```typescript
// Component code
const { className, style, restProps } = transformBpkLayoutProps(rest, {
  componentName: 'box',
});

// Example: padding="base" → className: "bpk-box bpk-padding-base"
```

### 3. CSS Modules Hashing

CSS Modules automatically adds a hash to class names:

```css
/* Generated CSS */
.bpk-box_a1b2c3d4 {
  box-sizing: border-box;
}

.bpk-padding-base_e4f5g6h7 {
  padding: 1rem;
}
```

This ensures:
- **Scoped styles** - No class name conflicts
- **Cache busting** - Hash changes when styles change
- **Tree shaking** - Unused classes are removed

## SCSS Mixins

### `base-component-styles`

Provides common base styles for all layout components:

```scss
@mixin base-component-styles {
  box-sizing: border-box;
}
```

**Usage:**
```scss
.bpk-box {
  @include layoutMixins.base-component-styles;
}
```

### `common-layout-utilities`

Convenience mixin that includes all commonly used utility classes:

```scss
@mixin common-layout-utilities($include-gap: true, $include-border-color: false) {
  // Spacing utilities
  @include generate-spacing-utilities(padding, 'padding');
  @include generate-directional-spacing-utilities(padding, 'padding');
  @include generate-spacing-utilities(margin, 'margin');
  @include generate-directional-spacing-utilities(margin, 'margin');
  
  // Gap utilities (optional)
  @if $include-gap {
    @include generate-spacing-utilities(gap, 'gap');
  }
  
  // Color utilities
  @include generate-color-utilities(background-color, 'bg');
  @include generate-color-utilities(color, 'color');
  
  // Border color utilities (optional)
  @if $include-border-color {
    @include generate-color-utilities(border-color, 'border-color');
  }
  
  // Layout utilities (border, border-radius, display, etc.)
  @include generate-layout-utilities;
}
```

**Parameters:**
- `$include-gap` (default: `true`) - Whether to include gap utilities
- `$include-border-color` (default: `false`) - Whether to include border-color utilities

**Usage:**
```scss
// Include all utilities with gap and border-color
@include layoutMixins.common-layout-utilities($include-gap: true, $include-border-color: true);

// Include utilities without gap
@include layoutMixins.common-layout-utilities($include-gap: false, $include-border-color: false);
```

### `generate-spacing-utilities`

Generates spacing utility classes for a given property:

```scss
@mixin generate-spacing-utilities($property, $prefix) {
  // Generates classes like:
  // .bpk-padding-none, .bpk-padding-sm, .bpk-padding-base, etc.
  // .bpk-padding-base-smallMobile, .bpk-padding-base-mobile, etc. (responsive)
}
```

**Parameters:**
- `$property` - CSS property name (e.g., `padding`, `margin`, `gap`)
- `$prefix` - Class name prefix (e.g., `'padding'`, `'margin'`)

**Usage:**
```scss
@include layoutMixins.generate-spacing-utilities(padding, 'padding');
@include layoutMixins.generate-spacing-utilities(margin, 'margin');
@include layoutMixins.generate-spacing-utilities(gap, 'gap');
```

**Generated classes:**
- Base: `.bpk-padding-none`, `.bpk-padding-sm`, `.bpk-padding-base`, etc.
- Responsive: `.bpk-padding-base-smallMobile`, `.bpk-padding-base-mobile`, `.bpk-padding-base-desktop`, etc.

### `generate-directional-spacing-utilities`

Generates directional spacing utility classes (top, right, bottom, left, x, y):

```scss
@mixin generate-directional-spacing-utilities($property, $prefix) {
  // Generates classes like:
  // .bpk-padding-top-base, .bpk-padding-right-base, etc.
  // .bpk-padding-x-base, .bpk-padding-y-base
}
```

**Usage:**
```scss
@include layoutMixins.generate-directional-spacing-utilities(padding, 'padding');
@include layoutMixins.generate-directional-spacing-utilities(margin, 'margin');
```

### `generate-color-utilities`

Generates color utility classes for a given property:

```scss
@mixin generate-color-utilities($property, $prefix) {
  // Generates classes like:
  // .bpk-bg-canvasContrast, .bpk-bg-surfaceHighlight, etc.
  // .bpk-color-textPrimary, .bpk-color-textSecondary, etc.
}
```

**Parameters:**
- `$property` - CSS property name (e.g., `background-color`, `color`, `border-color`)
- `$prefix` - Class name prefix (e.g., `'bg'`, `'color'`, `'border-color'`)

**Usage:**
```scss
@include layoutMixins.generate-color-utilities(background-color, 'bg');
@include layoutMixins.generate-color-utilities(color, 'color');
@include layoutMixins.generate-color-utilities(border-color, 'border-color');
```

**Generated classes:**
- `.bpk-bg-canvasContrast` → `background-color: var(--bpk-canvas-contrast-day, ...);`
- `.bpk-color-textPrimary` → `color: var(--bpk-text-primary-day, ...);`

### `generate-layout-utilities`

Generates layout utility classes (display, flexbox, grid, overflow, position, border, border-radius):

```scss
@mixin generate-layout-utilities {
  // Generates classes like:
  // .bpk-display-flex, .bpk-display-grid, .bpk-display-none
  // .bpk-flex-direction-row, .bpk-flex-direction-column
  // .bpk-align-items-center, .bpk-justify-content-spaceBetween
  // .bpk-overflow-hidden, .bpk-overflow-auto
  // .bpk-position-relative, .bpk-position-absolute
  // .bpk-border-radius-md, .bpk-border-1, etc.
}
```

**Usage:**
```scss
@include layoutMixins.generate-layout-utilities;
```

### `generate-responsive-layout-utilities`

Generates responsive variants for layout utilities:

```scss
@mixin generate-responsive-layout-utilities {
  // Generates responsive classes like:
  // .bpk-display-flex-smallMobile, .bpk-display-flex-mobile, .bpk-display-flex-desktop
  // .bpk-flex-direction-row-smallMobile, .bpk-flex-direction-row-mobile, etc.
}
```

**Usage:**
```scss
@include layoutMixins.generate-responsive-layout-utilities;
```

## Responsive Design

### Mobile-First Approach

All responsive utilities use a **mobile-first** approach:

1. **Base value (smallMobile)** - Applies to all screen sizes (no media query)
2. **Mobile and above** - Uses `@include breakpoints.bpk-breakpoint-above-mobile`
3. **Tablet and above** - Uses `@include breakpoints.bpk-breakpoint-above-tablet`
4. **Desktop and above** - Uses `@include breakpoints.bpk-breakpoint-above-tablet`

### Example

```scss
// Base value (applies to all sizes)
.bpk-padding-base-smallMobile {
  padding: 1rem;
}

// Mobile and above (overrides smallMobile)
.bpk-padding-base-mobile {
  @include breakpoints.bpk-breakpoint-above-mobile {
    padding: 1rem;
  }
}

// Desktop and above (overrides mobile)
.bpk-padding-base-desktop {
  @include breakpoints.bpk-breakpoint-above-tablet {
    padding: 1rem;
  }
}
```

This ensures proper cascading where later breakpoints override earlier ones.

## Dynamic Values

### CSS Custom Properties

For dynamic values (numeric pixel values, custom strings), CSS custom properties are used:

```scss
.bpk-width-dynamic {
  width: var(--bpk-width, 0);
}

.bpk-padding-dynamic {
  padding: var(--bpk-padding, 0);
}
```

At runtime, these CSS variables are set via inline styles:

```typescript
// width={300} → style={{ '--bpk-width': '300px' }}
```

### Responsive Dynamic Values

For responsive dynamic values, breakpoint-specific CSS variables are used:

```scss
.bpk-width-dynamic {
  // Base value
  width: var(--bpk-width, 0);
  
  // Responsive values with fallback chain
  @include breakpoints.bpk-breakpoint-mobile {
    width: var(--bpk-width-mobile, var(--bpk-width, 0));
  }
  
  @include breakpoints.bpk-breakpoint-above-tablet {
    width: var(--bpk-width-desktop, var(--bpk-width-tablet, var(--bpk-width-mobile, var(--bpk-width, 0))));
  }
}
```

## Component-Specific Styles

### Base Component Class

Each component defines a base class with component-specific styles:

```scss
// BpkFlex.module.scss
.bpk-flex {
  display: flex;
  @include layoutMixins.base-component-styles;
}

// BpkGrid.module.scss
.bpk-grid {
  display: grid;
  @include layoutMixins.base-component-styles;
}
```

### Component-Specific Utilities

Some components define component-specific utility classes:

```scss
// BpkGrid.module.scss
.bpk-grid-template-columns-1fr {
  grid-template-columns: 1fr;
}

.bpk-grid-template-columns-repeat2 {
  grid-template-columns: repeat(2, 1fr);
}
```

These are not included in `layoutMixins.scss` because they're specific to a particular component.

## Best Practices

### 1. Use Mixins for Common Patterns

Instead of duplicating code, use mixins from `layoutMixins.scss`:

```scss
// ✅ Good
@include layoutMixins.common-layout-utilities($include-gap: true, $include-border-color: false);

// ❌ Bad
.bpk-padding-none { padding: 0; }
.bpk-padding-sm { padding: 0.25rem; }
// ... (duplicating all spacing utilities)
```

### 2. Keep Component Files Minimal

Component `.module.scss` files should be minimal and focused on component-specific styles:

```scss
// ✅ Good - Minimal and focused
.bpk-box {
  @include layoutMixins.base-component-styles;
}

@include layoutMixins.common-layout-utilities($include-gap: true, $include-border-color: true);
```

### 3. Use Base Component Styles Mixin

Always use `base-component-styles` for common base styles:

```scss
// ✅ Good
.bpk-box {
  @include layoutMixins.base-component-styles;
}

// ❌ Bad
.bpk-box {
  box-sizing: border-box; // Duplicated across components
}
```

### 4. Follow Mobile-First Approach

Always use mobile-first media queries for responsive utilities:

```scss
// ✅ Good
.bpk-padding-base-mobile {
  @include breakpoints.bpk-breakpoint-above-mobile {
    padding: 1rem;
  }
}

// ❌ Bad
.bpk-padding-base-mobile {
  @media (max-width: 768px) {
    padding: 1rem;
  }
}
```

## Build Process

### SCSS Compilation

1. **SCSS files are compiled** to CSS during the build process
2. **CSS Modules** add hashes to class names
3. **Tree shaking** removes unused classes
4. **Final CSS** is bundled with the component

### Output

The build process generates:

- **`.module.css` files** - Compiled CSS with hashed class names
- **TypeScript declarations** - Type definitions for CSS Modules

## Performance Considerations

### Static CSS Generation

- All CSS is generated at build time
- No runtime CSS generation
- Smaller JavaScript bundle (no style logic)

### CSS Modules Hashing

- Class names are hashed at build time
- Ensures scoped styles
- Enables cache busting

### Tree Shaking

- Unused utility classes are removed
- Only classes actually used in components are included
- Smaller CSS bundle size

## Troubleshooting

### Class Names Not Found

If a class name is not found, check:

1. **Is the utility included?** - Make sure the mixin is included in the component's `.module.scss` file
2. **Is the class name correct?** - Check the generated CSS or use browser DevTools
3. **Is CSS Modules working?** - Check that the build process is generating `.module.css` files

### Styles Not Applying

If styles are not applying:

1. **Check CSS specificity** - Make sure there are no conflicting styles
2. **Check media queries** - Verify that responsive classes are using the correct breakpoints
3. **Check CSS variables** - For dynamic values, verify that CSS variables are set correctly

### Build Errors

If you encounter build errors:

1. **Check SCSS syntax** - Verify that all SCSS syntax is correct
2. **Check imports** - Make sure all `@use` statements are correct
3. **Check mixin parameters** - Verify that mixin parameters match the expected types

## Future Improvements

Potential improvements to the SCSS architecture:

1. **Automatic utility generation** - Generate utilities based on component props
2. **Better tree shaking** - More aggressive removal of unused classes
3. **CSS-in-CSS** - Consider using CSS instead of SCSS for simpler cases
4. **PostCSS plugins** - Use PostCSS plugins for additional optimizations

