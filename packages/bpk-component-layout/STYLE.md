# Backpack Layout Components - Styling Architecture

This document explains the styling architecture and implementation approach for Backpack Layout Components.

## Overview

Backpack Layout Components use **Chakra UI v3 components + CSS Modules** for styling. This hybrid approach provides:

- **Chakra UI component logic** - Leverages Chakra UI's component functionality (e.g., `as` prop, responsive logic)
- **CSS Modules styling** - All styling handled by CSS Modules (zero CSS-in-runtime)
- **Static CSS generation** - All styles compiled at build time
- **SSR support** - Works seamlessly with server-side rendering
- **Type safety** - Full TypeScript support with constrained prop types

## Architecture

### Component Factory Pattern

All layout components are created using the `createBpkLayoutComponent` factory function, which:

1. **Reduces code duplication** - Common component logic is centralized
2. **Ensures consistency** - All components follow the same pattern
3. **Simplifies maintenance** - Changes to common logic only need to be made once

```typescript
// Example: BpkBox implementation
const BpkBox = createBpkLayoutComponent<BpkBoxProps>({
  componentName: 'box',
  ChakraComponent: Box,
  styles: STYLES,
});
```

### Key Components

#### `createBpkLayoutComponent`

The factory function that creates all layout components:

```typescript
export function createBpkLayoutComponent<P extends Record<string, any>>(
  options: CreateBpkLayoutComponentOptions,
): ComponentType<P>
```

**Options:**
- `componentName` - Component name for CSS class generation (e.g., 'box', 'flex')
- `ChakraComponent` - Chakra UI component to use as the base
- `styles` - CSS Modules styles object
- `transformOptions` - Additional options for `transformBpkLayoutProps`
- `transformProps` - Optional prop transformer function

#### `transformBpkLayoutProps`

Transforms component props to CSS class names and inline styles:

```typescript
const { className, restProps, style } = transformBpkLayoutProps(props, {
  componentName: 'box',
});
```

**Key features:**
- Filters out `className` from user props (generated internally only)
- Converts props to atomic utility classes
- Handles responsive values
- Generates CSS variables for dynamic values

## Styling Flow

### 1. Props Input

Component receives props (e.g., `padding="base"`, `bg="surface-highlight"`):

```tsx
<BpkBox padding="base" bg="surface-highlight">
  Content
</BpkBox>
```

### 2. Prop Transformation

`transformBpkLayoutProps` converts props to CSS class names:

```typescript
// Input props
{ padding: "base", bg: "surface-highlight" }

// Output
{
  className: "bpk-box bpk-padding-base bpk-bg-surfaceHighlight",
  style: {},
  restProps: {}
}
```

### 3. CSS Modules Mapping

CSS Modules maps class names to hashed class names:

```css
/* Source */
.bpk-box { ... }
.bpk-padding-base { ... }

/* Generated (with hash) */
.bpk-box_a1b2c3d4 { ... }
.bpk-padding-base_e4f5g6h7 { ... }
```

### 4. Chakra UI Component Rendering

The Chakra UI component renders with the mapped class names:

```tsx
<Box
  className="bpk-box_a1b2c3d4 bpk-padding-base_e4f5g6h7"
  style={style}
  {...restProps}
>
  {children}
</Box>
```

## CSS Modules + SCSS

### File Structure

```
packages/bpk-component-layout/src/
├── createBpkLayoutComponent.tsx  # Component factory
├── layoutMixins.scss              # Shared SCSS mixins
├── useBpkLayoutProps.ts            # Prop transformation logic
├── styleUtils.ts                   # CSS class name utilities
├── BpkBox/
│   ├── BpkBox.tsx                 # Component (uses factory)
│   ├── BpkBox.module.scss          # Component styles
│   └── BpkBox.types.ts            # Type definitions
└── ...
```

### SCSS Mixins

#### `layoutMixins.scss`

Central file containing all shared SCSS mixins:

1. **`base-component-styles`** - Common base styles (e.g., `box-sizing: border-box`)
2. **`generate-spacing-utilities`** - Generates spacing utility classes
3. **`generate-color-utilities`** - Generates color utility classes
4. **`generate-layout-utilities`** - Generates layout utility classes
5. **`common-layout-utilities`** - Convenience mixin for all common utilities

#### Component `.module.scss` Files

Each component has a minimal `.module.scss` file:

```scss
// BpkBox.module.scss
@use '../../bpk-mixins/tokens';
@use '../../bpk-mixins/breakpoints';
@use '../layoutMixins';

.bpk-box {
  @include layoutMixins.base-component-styles;
}

@include layoutMixins.common-layout-utilities($include-gap: true, $include-border-color: true);
@include layoutMixins.generate-responsive-layout-utilities;
```

## Atomic Utility Classes

### Approach

The styling system uses **Atomic Utility Classes**:

- **One class per property-value pair** (e.g., `.bpk-padding-base`, `.bpk-bg-surfaceHighlight`)
- **Only generates classes for props actually used**
- **No unused CSS properties** in the bundle

### Class Name Patterns

- **Base**: `bpk-{componentName}` (e.g., `bpk-box`, `bpk-flex`)
- **Utility**: `bpk-{property}-{value}` (e.g., `bpk-padding-base`, `bpk-bg-surfaceHighlight`)
- **Responsive**: `bpk-{property}-{value}-{breakpoint}` (e.g., `bpk-padding-base-mobile`)
- **Dynamic**: `bpk-{property}-dynamic` (e.g., `bpk-width-dynamic`)

### Examples

```tsx
// Predefined tokens → atomic utility classes
<BpkBox padding="base" bg="surface-highlight" />
// → className: "bpk-box bpk-padding-base bpk-bg-surfaceHighlight"

// Dynamic values → CSS variables
<BpkBox width={300} />
// → className: "bpk-box bpk-width-dynamic"
// → style: { '--bpk-width': '300px' }

// Responsive values → responsive utility classes
<BpkBox padding={{ mobile: "base", desktop: "lg" }} />
// → className: "bpk-box bpk-padding-base-mobile bpk-padding-lg-desktop"
```

## Chakra UI Integration

### BpkProvider

`BpkProvider` wraps Chakra UI's `ChakraProvider` with a system configuration:

```typescript
// Remove globalCss and preflight from defaultConfig
const { globalCss: _, preflight: __, ...restConfig } = defaultConfig;

export const backpackSystem = createSystem(restConfig, {
  disableLayers: true,  // Disables CSS-in-JS cascade layers
  preflight: false,     // Disables Chakra UI's CSS reset (preflight)
});
```

**Key features:**
- Disables Chakra UI's CSS cascade layers (`disableLayers: true`)
- Disables Chakra UI's preflight/CSS reset (`preflight: false`)
- Removes global CSS injection (excluded from `defaultConfig`)
- Keeps Chakra UI component functionality (e.g., `as` prop, responsive logic)
- All styling handled by CSS Modules
- **Zero Chakra UI system styles injected** - completely CSS-in-runtime free

### Component Usage

Layout components use Chakra UI components internally:

```typescript
// BpkBox uses Chakra UI's Box component
const BpkBox = createBpkLayoutComponent<BpkBoxProps>({
  componentName: 'box',
  ChakraComponent: Box,  // Chakra UI component
  styles: STYLES,
});
```

**Benefits:**
- Leverages Chakra UI's component logic (e.g., `as` prop)
- Maintains Chakra UI's responsive behavior
- All styling controlled by CSS Modules

## className Handling

### Internal Use Only

`className` is **NOT exposed** in component props interfaces:

```typescript
// ❌ TypeScript error - className is not in BpkBoxProps
<BpkBox className="custom-class" />

// ✅ Correct - className is generated internally
<BpkBox padding="base" />
```

### Automatic Filtering

`transformBpkLayoutProps` automatically filters out `className`:

```typescript
// User props
{ padding: "base", className: "custom" }

// After transformation
{
  className: "bpk-box bpk-padding-base",  // Generated internally
  // className from user props is filtered out
}
```

### Runtime Protection

Even if `className` is passed (bypassing TypeScript), it's filtered at runtime:

```typescript
disallowedProps = ['className']  // Default filter
```

## Logical Properties and RTL Support

### CSS Logical Properties

Backpack Layout Components support CSS logical properties for automatic RTL/LTR adaptation:

**Available logical spacing props:**
- `marginStart` → `margin-inline-start` (left in LTR, right in RTL)
- `marginEnd` → `margin-inline-end` (right in LTR, left in RTL)
- `paddingStart` → `padding-inline-start` (left in LTR, right in RTL)
- `paddingEnd` → `padding-inline-end` (right in LTR, left in RTL)
- `marginInline` → `margin-inline` (sets both start and end)
- `paddingInline` → `padding-inline` (sets both start and end)

**Benefits:**
- ✅ Automatically adapts to text direction (`dir="rtl"` or `dir="ltr"`)
- ✅ No manual RTL handling required
- ✅ Uses modern CSS logical properties
- ✅ Works with responsive props

**Example:**
```tsx
<BpkBox
  marginStart="base"      // margin-inline-start
  paddingEnd="lg"         // padding-inline-end
  marginInline={{ mobile: "base", desktop: "xl" }}
/>
```

**Generated CSS:**
```scss
.bpk-margin-start-base {
  margin-inline-start: 1rem;
}

.bpk-padding-end-lg {
  padding-inline-end: 1.5rem;
}
```

**RTL Behavior:**
- In LTR: `marginStart` applies to the left side
- In RTL: `marginStart` automatically applies to the right side
- No code changes needed - browser handles the flip automatically

## Responsive Design

### Mobile-First Approach

All responsive utilities use mobile-first media queries:

```scss
// Base value (applies to all sizes)
.bpk-padding-base-smallMobile {
  padding: 1rem;
}

// Mobile and above
.bpk-padding-base-mobile {
  @include breakpoints.bpk-breakpoint-above-mobile {
    padding: 1rem;
  }
}

// Desktop and above
.bpk-padding-base-desktop {
  @include breakpoints.bpk-breakpoint-above-tablet {
    padding: 1rem;
  }
}
```

### Backpack Breakpoints

Responsive props use Backpack breakpoint names:

```tsx
<BpkBox padding={{ mobile: "base", desktop: "lg" }} />
```

**Available breakpoints:**
- `smallMobile` - Backpack SMALL_MOBILE
- `mobile` - Backpack MOBILE
- `smallTablet` - Backpack SMALL_TABLET
- `tablet` - Backpack TABLET
- `desktop` - Backpack DESKTOP

## Dynamic Values

### CSS Custom Properties

Dynamic values (numeric pixel values, custom strings) use CSS custom properties:

```scss
.bpk-width-dynamic {
  width: var(--bpk-width, 0);
}
```

At runtime, CSS variables are set via inline styles:

```typescript
// width={300} → style={{ '--bpk-width': '300px' }}
```

### Responsive Dynamic Values

For responsive dynamic values, breakpoint-specific CSS variables are used:

```scss
.bpk-width-dynamic {
  width: var(--bpk-width, 0);
  
  @include breakpoints.bpk-breakpoint-above-mobile {
    width: var(--bpk-width-mobile, var(--bpk-width, 0));
  }
}
```

## Performance Benefits

### Zero CSS-in-Runtime

- **No Emotion** - Chakra UI's CSS-in-JS is disabled
- **No runtime CSS generation** - All styles compiled at build time
- **Smaller JavaScript bundle** - No style logic in JS

### Static CSS Generation

- **Build-time compilation** - All CSS generated during build
- **Tree shaking** - Unused classes removed
- **CSS Modules hashing** - Scoped styles, cache busting

### SSR Support

- **No hydration issues** - Static CSS works out of the box
- **No FOUC** - Styles are in static CSS files
- **Consistent rendering** - Server and client render identically

## Code Organization

### Component Factory

All components use the factory pattern to reduce duplication:

```typescript
// Before (duplicated code)
const BpkBox = ({ as, children, ...rest }: Props) => {
  const { className, restProps, style } = transformBpkLayoutProps(rest, {
    componentName: 'box',
  });
  const finalClassName = processClassName(getClass, className, 'bpk-box');
  return (
    <Box className={finalClassName} style={style} {...restProps}>
      {children}
    </Box>
  );
};

// After (using factory)
const BpkBox = createBpkLayoutComponent<BpkBoxProps>({
  componentName: 'box',
  ChakraComponent: Box,
  styles: STYLES,
});
```

### Shared Utilities

Common logic is extracted to shared utilities:

- `styleUtils.ts` - CSS class name generation utilities
- `useBpkLayoutProps.ts` - Prop transformation logic
- `colorTokenTransformers.ts` - Color token transformation
- `tokenTransformers.ts` - Spacing and breakpoint transformation

## Best Practices

### 1. Use Component Factory

Always use `createBpkLayoutComponent` for new components:

```typescript
// ✅ Good
const BpkNewComponent = createBpkLayoutComponent<BpkNewComponentProps>({
  componentName: 'new-component',
  ChakraComponent: Box,
  styles: STYLES,
});

// ❌ Bad - Duplicates code
const BpkNewComponent = ({ ... }) => {
  // Duplicated transformation logic
};
```

### 2. Keep SCSS Files Minimal

Component `.module.scss` files should be minimal:

```scss
// ✅ Good - Uses mixins
.bpk-box {
  @include layoutMixins.base-component-styles;
}
@include layoutMixins.common-layout-utilities($include-gap: true);

// ❌ Bad - Duplicates utilities
.bpk-box {
  box-sizing: border-box;
}
.bpk-padding-base { padding: 1rem; }
// ... (duplicating all utilities)
```

### 3. Use Transform Props for Special Cases

For components with special prop transformations:

```typescript
// ✅ Good - Uses transformProps
const BpkStack = createBpkLayoutComponent<BpkStackProps>({
  componentName: 'stack',
  ChakraComponent: Stack,
  styles: STYLES,
  transformProps: (props) => {
    const { spacing, direction = 'column', ...rest } = props;
    return { ...rest, gap: spacing, flexDirection: direction };
  },
});
```

### 4. Don't Expose className

Never expose `className` in component props:

```typescript
// ✅ Good - className not in props
export interface BpkBoxProps extends BpkBaseLayoutProps {
  // No className here
}

// ❌ Bad - className exposed
export interface BpkBoxProps {
  className?: string;  // Don't do this
}
```

## Troubleshooting

### Styles Not Applying

1. **Check BpkProvider** - Ensure `BpkProvider` wraps your app
2. **Check CSS Modules** - Verify `.module.css` files are generated
3. **Check class names** - Use browser DevTools to inspect generated class names
4. **Check CSS specificity** - Ensure no conflicting styles

### TypeScript Errors

1. **Check prop types** - Verify props match component interface
2. **Check imports** - Ensure all types are imported correctly
3. **Check factory usage** - Verify `createBpkLayoutComponent` is used correctly

### Build Errors

1. **Check SCSS syntax** - Verify all SCSS syntax is correct
2. **Check imports** - Ensure all `@use` statements are correct
3. **Check mixin parameters** - Verify mixin parameters match expected types

## Summary

The Backpack Layout Components styling architecture provides:

- ✅ **Zero CSS-in-runtime** - All styles compiled at build time
- ✅ **Chakra UI integration** - Leverages Chakra UI component logic
- ✅ **CSS Modules styling** - All styling handled by CSS Modules
- ✅ **Component factory** - Reduces code duplication
- ✅ **Type safety** - Full TypeScript support
- ✅ **Performance optimized** - Static CSS, tree shaking, SSR support

This approach combines the best of both worlds: Chakra UI's component functionality with CSS Modules' performance benefits.

