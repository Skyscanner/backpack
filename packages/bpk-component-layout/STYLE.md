# Layout Styling Approach

This document explains the styling approach used in `bpk-component-layout` and how it differs from traditional CSS-in-JS solutions.

## Overview

`bpk-component-layout` uses a **Chakra UI facade pattern** with **PandaCSS**-generated tokens and CSS variables. BpkProvider writes those variables once, and Chakra consumes them via `var(--bpk-*)` references so the bulk of token decoding happens outside of each render.

## Architecture

### Chakra UI Facade Pattern

The layout components act as facades over Chakra UI's layout primitives. We do not expose Chakra UI components directly.

```
BpkBox → Token Processing (Runtime/Type Check) → Chakra UI Box → PandaCSS → Static CSS
```

This pattern provides:
- **Stable API**: Backpack-specific API that doesn't change with Chakra UI updates.
- **Token Enforcement**: Only Backpack tokens are allowed, not Chakra UI tokens.
- **Style Isolation**: `className` prop is removed to prevent style overrides.

### Component Structure

Each component follows the same pattern:

1. **Facade Component** (`BpkBox.tsx`, `BpkFlex.tsx`, etc.): Receives Backpack-specific props
2. **Token Processing** (`processBpkProps`): Validates and converts tokens to CSS values
3. **Chakra UI Primitive**: Receives processed props and renders
4. **PandaCSS**: Generates static CSS at build time

### PandaCSS Integration

PandaCSS is configured to generate static CSS at build time. The generated styles are located in `src/styled-system` and are shipped with the package.

```typescript
// panda.config.ts
export default defineConfig({
  presets: ['@chakra-ui/panda-preset'],
  jsxFramework: 'react',
  outdir: 'src/styled-system', // Output directory
  // ...
});
```

**Important**: The `styled-system` directory is pre-generated and shipped with the package. Downstream consumers do not need to run PandaCSS generation.

## Token System

### Type-Safe Token Objects

We provide strict TypeScript objects for tokens to ensure type safety and autocompletion:

```typescript
// tokens.ts
export const BpkColor = {
  TextPrimary: 'bpk-text-primary-day',
  Canvas: 'bpk-canvas-day',
  // ...
} as const;

export const BpkSpacing = {
  Base: 'bpk-spacing-base',
  Md: 'bpk-spacing-md',
  // ...
} as const;

export const BpkBreakpoint = {
  Tablet: 'tablet',
  Desktop: 'desktop',
  // ...
} as const;
```

### Token Processing Pipeline

1.  **User provides Backpack tokens** in component props:
    ```tsx
    <BpkBox p={BpkSpacing.Base} bg={BpkColor.Canvas} />
    ```

2.  **Runtime Validation & Conversion**:
    `processBpkProps` still validates responsive token usages, but now maps each spacing/color token to a CSS variable reference (`var(--bpk-...)`).
3.  **Chakra UI sees CSS variables**:
    ```tsx
    <Box padding="var(--bpk-spacing-base)" bg="var(--bpk-color-canvas)" />
    ```

4.  **PandaCSS generates static CSS** at build time based on these usage patterns in the library itself.

### Responsive Overrides

The system supports Chakra UI's responsive object syntax. The `processResponsiveValue` utility recursively traverses these objects to validate and convert tokens at every breakpoint depth.

```tsx
<BpkBox
  bg={{
    base: BpkColor.Canvas,
    tablet: BpkColor.SurfaceHighlight,
    desktop: BpkColor.SurfaceElevated
  }}
/>
```

The processor converts this to:
```javascript
{
  bg: {
    base: 'rgb(255, 255, 255)',
    tablet: 'rgb(241, 242, 248)',
    desktop: 'rgb(255, 255, 255)'
  }
}
```

The recursive processing ensures that nested responsive objects and arrays are properly handled.

### Breakpoint Mapping

Backpack provides 6 standard breakpoints which are mapped to simplified keys:

- `small-mobile` → Backpack's `breakpointQuerySmallMobile`
- `mobile` → Backpack's `breakpointQueryMobile`
- `small-tablet` → Backpack's `breakpointQuerySmallTablet`
- `tablet` → Backpack's `breakpointQueryTablet`
- `desktop` → Backpack's `breakpointQueryAboveTablet`
- `large-desktop` → Backpack's `breakpointQueryAboveDesktop`

These simplified keys are used in responsive object syntax for better developer experience.

## Props Architecture

### Common Props vs Component-Specific Props

The props system is structured into two layers:

1. **Common Props** (`BpkCommonLayoutProps`): Shared by all layout components
   - Spacing props (`BpkSpacingProps`)
   - Color props (`BpkColorProps`)
   - Explicitly excludes `className`

2. **Component-Specific Props**: Unique to each component type
   - `BpkBoxSpecificProps` - Box-specific props
   - `BpkFlexSpecificProps` - Flex-specific props (e.g., `direction`, `align`, `justify`)
   - `BpkGridSpecificProps` - Grid-specific props (e.g., `templateColumns`, `templateRows`)
   - `BpkStackSpecificProps` - Stack-specific props (with enforced `spacing` prop)

This separation provides:
- **Clear API boundaries**: Developers can see what's common vs. specific
- **Type safety**: Component-specific props are properly typed
- **Maintainability**: Common props are defined once and reused

### Spacing Props

All spacing-related props accept:
- `BpkSpacing` tokens (e.g., `BpkSpacing.Base`)
- Percentages (e.g., `"50%"`)

**NOT allowed:**
- Direct pixel values (`"16px"`)
- Direct rem values (`"1rem"`)
- Numeric values (`16`)

**Special cases:**
- Size props (`width`, `height`, etc.) also accept: `"auto"`, `"full"`, `"fit-content"`

### Color Props

All color-related props accept:
- `BpkColor` tokens (e.g., `BpkColor.Canvas`)
- Special values: `"transparent"`, `"currentColor"`

**NOT allowed:**
- Chakra UI color tokens (e.g., `"blue.500"`)
- Direct hex/rgb values (e.g., `"#ffffff"`)
- Arbitrary color strings

## Styling Restrictions

### What's Allowed

✅ **Backpack spacing tokens**: via `BpkSpacing` object or string literals.
✅ **Backpack color tokens**: via `BpkColor` object or string literals.
✅ **Percentages**: `50%`, `100%` (for size/spacing).
✅ **Special values**: `auto`, `full`, `fit-content` (for size props only).
✅ **Special colors**: `transparent`, `currentColor`.
✅ **Responsive objects**: `{{ base: ..., tablet: ... }}`.
✅ **Component-specific props**: All Chakra UI props except spacing/color/className.

### What's NOT Allowed

❌ **Direct pixel/rem values**: `16px`, `1rem`, `2em`.
❌ **Chakra UI tokens**: `sm`, `md`, `lg` (unless mapped), `blue.500`.
❌ **className prop**: Removed to prevent style overrides.
❌ **Arbitrary CSS values**: Only tokens or allowed special values.
❌ **Numeric spacing values**: `4`, `8`, `16` (must use tokens).

### Runtime Validation

In development mode, invalid values trigger warnings in the console to aid debugging.

```typescript
// tokenUtils.ts
if (!isValidSpacingValue(value)) {
  console.warn(`Invalid spacing value "${value}"...`);
}
```

Invalid values are removed from props in production to prevent rendering issues.

## Performance Considerations

### Zero-Runtime Styling

By using PandaCSS, we generate static CSS files. This avoids the runtime performance cost associated with traditional CSS-in-JS libraries (style injection, class generation on render).

### Token Processing Overhead

`processBpkProps` now mostly handles validation/responsive expansion; the actual token values come from CSS variables written by `BpkProvider`, so runtime work is limited to recursion/validation rather than token resolution. This keeps the performance profile lean while still protecting consumers from invalid tokens.

### Bundle Size

The styling system adds:
- **JavaScript**: ~5-8 KB (gzipped) for token processing utilities
- **CSS**: ~10-20 KB (gzipped) for generated styles
- **Chakra UI**: ~150-200 KB (gzipped, tree-shaken) for layout primitives

See [BUNDLE_SIZE_ANALYSIS.md](./BUNDLE_SIZE_ANALYSIS.md) for detailed analysis.

## Build Process

### PandaCSS Generation

1. **Codegen Step**: `npm run codegen` generates the JS/TS styling engine in `src/styled-system/`.
2. **CSS Generation Step**: `npm run cssgen` generates the static CSS file at `src/styled-system/styles.css`.
3. **Build Integration**: `npm run build` runs both steps before transpilation.
4. **Shipping**: The `styled-system` directory (including `styles.css`) is copied to `dist/` during transpilation

### Consumer Integration

Consumers do **not** need to:
- Run PandaCSS generation
- Configure PandaCSS
- Import PandaCSS dependencies

They only need to:
- Import the pre-generated CSS file
- Use `<BpkProvider>` to wrap their app

## Design Philosophy

### Why This Approach?

1. **Design System Enforcement**: By restricting props to tokens, we ensure consistency across all applications using Backpack.

2. **Type Safety**: TypeScript prevents invalid token usage at compile time, catching errors before runtime.

3. **Zero Runtime**: PandaCSS generates static CSS, eliminating the performance overhead of runtime CSS-in-JS.

4. **Maintainability**: The facade pattern isolates Backpack's API from Chakra UI's implementation, allowing us to evolve independently.

5. **Developer Experience**: Clear prop separation (common vs. specific) makes the API intuitive and discoverable.

### Trade-offs

- **Bundle Size**: Chakra UI adds ~150-200 KB to the bundle (mitigated by tree-shaking)
- **Learning Curve**: Developers must learn Backpack tokens instead of arbitrary CSS values
- **Flexibility**: Less flexible than direct CSS, but more consistent

The benefits of design system consistency and type safety outweigh these trade-offs for a design system library.
