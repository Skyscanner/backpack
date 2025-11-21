# bpk-component-layout

> Backpack layout components using CSS Modules for optimal performance and SSR support.

## Documentation

- **[Storybook Examples](../../examples/bpk-component-layout/)** - Interactive examples and component documentation

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Setup

### BpkProvider Required

**Important:** `BpkProvider` is **required** when using layout components. It wraps Chakra UI's `ChakraProvider` with a system configuration that disables CSS-in-JS, allowing CSS Modules to handle all styling.

```tsx
import { BpkProvider, BpkBox, BpkFlex, BpkGrid } from '@skyscanner/backpack-web/bpk-component-layout';

function App() {
  return (
    <BpkProvider>
      <BpkBox padding="base" bg="surface-highlight">
        {/* Your app content */}
      </BpkBox>
    </BpkProvider>
  );
}
```

**Why BpkProvider is needed:**
- Disables Chakra UI's CSS-in-JS runtime generation (`disableLayers: true`)
- Keeps Chakra UI component functionality (like `as` prop, responsive logic)
- All styling is handled by CSS Modules (zero CSS-in-runtime)

## Architecture

### CSS Modules Implementation

Layout components use **CSS Modules + SCSS** for styling, which provides:

- **Static CSS generation** - All styles are compiled at build time
- **No runtime CSS-in-JS** - Zero runtime performance overhead
- **SSR support** - Works seamlessly with server-side rendering
- **Consistent with Backpack** - Uses the same styling approach as other Backpack components (e.g., `BpkText`)

### How It Works

1. **Props are transformed to CSS class names** at runtime
2. **CSS classes are pre-compiled** in SCSS files at build time
3. **Responsive styles** use Backpack breakpoint mixins
4. **Dynamic values** (like numeric widths) use CSS custom properties

### SCSS Architecture

For detailed information about how SCSS is processed and organized, see **[STYLE.md](./STYLE.md)**.

The styling system uses:
- **Shared mixins** (`layoutMixins.scss`) - Centralized utility class generators
- **Component-specific styles** (`.module.scss` files) - Minimal component styles that use shared mixins
- **Mobile-first responsive design** - All responsive utilities use mobile-first media queries
- **CSS custom properties** - Dynamic values use CSS variables for runtime flexibility
- **Component factory** (`createBpkLayoutComponent`) - Reduces code duplication across components

## Component Overview

| Component | Primary Responsibility | Key Features | Default Display |
|-----------|----------------------|--------------|-----------------|
| **BpkBox** | Flexible container supporting both flexbox and grid | • Supports all base layout props<br>• Supports flexbox props<br>• Supports grid props<br>• Most versatile component | `block` |
| **BpkFlex** | Flexbox-optimized layout container | • Pre-configured with `display: flex`<br>• Full flexbox property support<br>• Shorthand props (`align`, `justify`, `wrap`, `direction`) | `flex` |
| **BpkGrid** | Grid-optimized layout container | • Pre-configured with `display: grid`<br>• Full CSS Grid property support<br>• Grid-specific gap props | `grid` |
| **BpkStack** | Flexbox-based stack with configurable direction | • Pre-configured with `display: flex`<br>• `spacing` prop for gap between items<br>• Sub-components: `BpkHStack`, `BpkVStack` | `flex` |
| **BpkContainer** | Container with max-width constraints | • Default max-width: `75rem` (1200px)<br>• Auto margins for centering<br>• `centerContent` prop | `block` |
| **BpkCenter** | Centers child both horizontally and vertically | • Uses flexbox for centering<br>• Supports all base layout props | `flex` |
| **BpkSpacer** | Flexible spacer that expands along major axis | • Automatically expands to fill space<br>• Minimal props | `block` |
| **BpkSeparator** | Visual separator (horizontal or vertical line) | • `orientation` prop<br>• Does not accept children | `block` |
| **BpkWrap** | Flexbox with `flex-wrap: wrap` by default | • Pre-configured with `display: flex` and `flex-wrap: wrap`<br>• `spacing` prop | `flex` |
| **BpkAspectRatio** | Maintains specific aspect ratio | • `ratio` prop (e.g., `16/9`, `4/3`)<br>• Uses CSS aspect-ratio property | `block` |
| **BpkFloat** | Provides floating positioning | • `float` prop (`left` \| `right` \| `none`) | `block` |
| **BpkGroup** | Flexbox component for grouping elements | • Pre-configured with `display: flex` | `flex` |

## Usage

### BpkBox

`BpkBox` is a flexible layout component that provides a Backpack-specific API using CSS Modules.

**Key Features:**
- Accepts Backpack spacing tokens as strings (e.g., `padding="base"`)
- Accepts Backpack breakpoint tokens in responsive props
- Accepts Backpack color tokens for color-related props
- Uses CSS Modules for static CSS generation (no runtime CSS-in-JS)
- Supports SSR out of the box

### BpkFlex

`BpkFlex` is a flexbox layout component optimized for flexbox layouts.

```tsx
import { BpkFlex } from '@skyscanner/backpack-web/bpk-component-layout';

// Using standard flexbox props
<BpkFlex gap="base" alignItems="center" justifyContent="space-between">
  <BpkBox>Item 1</BpkBox>
  <BpkBox>Item 2</BpkBox>
</BpkFlex>
```

**Supported Flex-specific props:**
- Standard: `flexDirection`, `flexWrap`, `alignItems`, `justifyContent`, `flexGrow`, `flexShrink`, `flexBasis`, `alignContent`, `alignSelf`, `justifyItems`, `justifySelf`, `order`
- Shorthand: `align` (alignItems), `justify` (justifyContent), `wrap` (flexWrap), `direction` (flexDirection), `basis` (flexBasis), `grow` (flexGrow), `shrink` (flexShrink)

### BpkGrid

`BpkGrid` is a grid layout component optimized for grid layouts.

```tsx
import { BpkGrid } from '@skyscanner/backpack-web/bpk-component-layout';

// Basic grid
<BpkGrid gridTemplateColumns="repeat(3, 1fr)" gap="base">
  <BpkBox>Item 1</BpkBox>
  <BpkBox>Item 2</BpkBox>
  <BpkBox>Item 3</BpkBox>
</BpkGrid>
```

**Supported Grid-specific props:**
- Template: `gridTemplateColumns`, `gridTemplateRows`, `gridTemplateAreas`
- Placement: `gridColumn`, `gridRow`, `gridArea`
- Gap: `gridGap`, `gridColumnGap`, `gridRowGap` (also supports Backpack spacing tokens)

#### Using Backpack Spacing Tokens (Recommended)

You can use Backpack spacing tokens directly as strings - no imports needed:

```tsx
import BpkBox from '@skyscanner/backpack-web/bpk-component-layout';

export default () => (
  <BpkBox padding="base" margin="lg" bg="surface-highlight">
    Content here
  </BpkBox>
);
```

**Available Backpack spacing token strings:**
Based on [Backpack spacing tokens](https://www.skyscanner.design/latest/foundations/spacing/overview-jCiTHnBD):
- `"none"` → 0px (bpk-spacing-none)
- `"sm"` → 4px (bpk-spacing-sm)
- `"md"` → 8px (bpk-spacing-md)
- `"base"` → 16px (bpk-spacing-base)
- `"lg"` → 24px (bpk-spacing-lg)
- `"xl"` → 32px (bpk-spacing-xl)
- `"xxl"` → 40px (bpk-spacing-xxl)
- `"xxxl"` → 64px (bpk-spacing-xxxl)
- `"xxxxl"` → 96px (bpk-spacing-xxxxl)

#### Using Numeric Pixel Values (For Fine-Grained Spacing)

For fine-grained spacing values that don't have corresponding Backpack tokens (e.g., 2px, 6px, 10px, 12px), you can use numeric pixel values directly. These values are automatically converted to CSS custom properties and rendered using `rem` units:

```tsx
import BpkBox from '@skyscanner/backpack-web/bpk-component-layout';

export default () => (
  <BpkBox padding={2} margin={6} gap={10}>
    Content with fine-grained spacing
  </BpkBox>
);
```

**Conversion rule:** Numeric values (px) are converted to `rem` units: `rem = px / 16` (assuming 16px root font size)

**Examples:**
- `0` → renders as `0`
- `2` → renders as `0.125rem` (2px at 16px root font size)
- `4` → renders as `0.25rem` (4px, same as `"sm"`)
- `6` → renders as `0.375rem` (6px at 16px root font size)
- `8` → renders as `0.5rem` (8px, same as `"md"`)
- `10` → renders as `0.625rem` (10px at 16px root font size)
- `12` → renders as `0.75rem` (12px at 16px root font size)
- `16` → renders as `1rem` (16px, same as `"base"`)

**Rendering:** All spacing values are rendered using `rem` units in the browser, which are relative to the root element's font size (typically 16px). This ensures spacing scales proportionally if users adjust their browser's font size settings.

**You can mix both approaches:**
```tsx
<BpkBox
  padding="base"        // Backpack token → 16px → renders as 1rem
  margin={6}            // Numeric value → 6px → renders as 0.375rem
  gap={{ smallMobile: "sm", smallTablet: 2 }}  // Mixed in responsive props
>
  Content
</BpkBox>
```

**Note:** All spacing-related props support both Backpack token strings and numeric pixel values:
- `padding`, `margin`, `gap`, `rowGap`, `columnGap`
- `gridGap`, `gridColumnGap`, `gridRowGap`
- `spacing`, `spacingX`, `spacingY`

#### Logical Spacing Props (RTL Support)

For RTL (right-to-left) language support, use logical spacing props that automatically adapt to text direction:

```tsx
import BpkBox from '@skyscanner/backpack-web/bpk-component-layout';

export default () => (
  <BpkBox
    marginStart="base"    // margin-inline-start (left in LTR, right in RTL)
    paddingEnd="lg"       // padding-inline-end (right in LTR, left in RTL)
    marginInline="xl"     // margin-inline (sets both start and end)
  >
    Content that adapts to text direction
  </BpkBox>
);
```

**Available logical spacing props:**
- `marginStart` / `marginEnd` - Logical margin (automatically flips in RTL)
- `paddingStart` / `paddingEnd` - Logical padding (automatically flips in RTL)
- `marginInline` / `paddingInline` - Sets both start and end simultaneously

**Benefits:**
- ✅ Automatically adapts to RTL/LTR text direction
- ✅ No need for manual RTL handling
- ✅ Uses modern CSS logical properties (`margin-inline-start`, `padding-inline`, etc.)
- ✅ Works with responsive props

```tsx
// Responsive logical spacing
<BpkBox
  marginStart={{ mobile: "base", desktop: "xl" }}
  paddingInline={{ smallMobile: "sm", tablet: "lg" }}
/>
```

#### Using Backpack Breakpoints (Recommended)

For responsive layouts, use Backpack breakpoint names directly as object keys:

```tsx
import BpkBox from '@skyscanner/backpack-web/bpk-component-layout';

export default () => (
  <BpkBox
    width={{
      smallMobile: '100%',
      mobile: '50%',
      desktop: '33%',
    }}
    padding={{ smallMobile: "base", desktop: "xl" }}
  >
    Responsive content using Backpack tokens
  </BpkBox>
);
```

**Available Backpack breakpoint names:**
- `smallMobile` → Backpack SMALL_MOBILE breakpoint
- `mobile` → Backpack MOBILE breakpoint
- `smallTablet` → Backpack SMALL_TABLET breakpoint
- `tablet` → Backpack TABLET breakpoint
- `desktop` → Backpack DESKTOP breakpoint

**Note:** We recommend using `smallMobile` instead of `base` for consistency with Backpack's design system.

#### Using Backpack Color Tokens (Recommended)

You can use Backpack color tokens directly as strings for color-related props:

```tsx
import BpkBox from '@skyscanner/backpack-web/bpk-component-layout';

export default () => (
  <BpkBox
    bg="canvas-contrast"
    color="text-primary"
    borderColor="line"
    padding="base"
  >
    Content with Backpack color tokens
  </BpkBox>
);
```

**Available Backpack color token strings:**

**Text colors:**
- `"text-primary"` → Primary text color
- `"text-secondary"` → Secondary text color
- `"text-disabled"` → Disabled text color
- `"text-on-dark"` → Text color for dark backgrounds
- `"text-on-light"` → Text color for light backgrounds
- `"text-link"` → Link text color
- `"text-error"` → Error text color
- `"text-success"` → Success text color
- `"text-hero"` → Hero text color
- `"text-primary-inverse"` → Inverse primary text color

**Background colors:**
- `"canvas"` → Main canvas background
- `"canvas-contrast"` → Contrast canvas background
- `"surface-default"` → Default surface background
- `"surface-highlight"` → Highlighted surface background
- `"surface-elevated"` → Elevated surface background

**Brand colors:**
- `"core-primary"` → Primary brand color
- `"core-accent"` → Accent brand color

**Border colors:**
- `"line"` → Standard border color
- `"line-on-dark"` → Border color for dark backgrounds

**Status colors:**
- `"status-success"`, `"status-success-fill"`
- `"status-warning"`, `"status-warning-fill"`
- `"status-error"`, `"status-error-fill"`

**Important:** `BpkBox` only accepts Backpack color tokens for color-related props (`bg`, `color`, `borderColor`, etc.). Color tokens are transformed to CSS custom properties (e.g., `var(--bpk-text-primary-day)`) which work with Backpack's theming system.

#### Using Color Token Constants (Alternative)

Similar to `BpkText`'s `TEXT_COLORS`, you can use the exported `BPK_COLOR_TOKENS` constant for TypeScript autocomplete:

```tsx
import BpkBox, { BPK_COLOR_TOKENS } from '@skyscanner/backpack-web/bpk-component-layout';

export default () => (
  <BpkBox
    bg={BPK_COLOR_TOKENS.canvasContrast}
    color={BPK_COLOR_TOKENS.textPrimary}
    borderColor={BPK_COLOR_TOKENS.line}
  >
    Content using color token constants
  </BpkBox>
);
```

### Props

`BpkBox` provides a **controlled and stable API** with explicitly defined props. This ensures type safety and prevents accidental use of unsupported properties.

**Supported prop categories:**
- **Layout props**: `width`, `height`, `minWidth`, `maxWidth`, `minHeight`, `maxHeight`
- **Spacing props**: `padding`, `margin`, `gap` and their variants
  - Accept Backpack token strings: `"none"`, `"sm"`, `"base"`, `"md"`, `"lg"`, `"xl"`
  - Or numeric pixel values (converted to `rem`)
- **Logical spacing props** (automatically adapt to RTL/LTR):
  - `marginStart`, `marginEnd`, `paddingStart`, `paddingEnd` - Use CSS logical properties (`margin-inline-start`, etc.)
  - `marginInline`, `paddingInline` - Set both start and end simultaneously
- **Display props**: `display`, `visibility`, `overflow`, `overflowX`, `overflowY`
- **Position props**: `position`, `top`, `right`, `bottom`, `left`, `zIndex`
- **Flexbox props**: `flex`, `flexDirection`, `flexWrap`, `alignItems`, `justifyContent`, etc.
- **Grid props**: `gridTemplateColumns`, `gridTemplateRows`, `gridGap`, etc.
- **Color props**: `bg`, `backgroundColor`, `color`, `opacity` (Backpack color tokens only)
- **Border props**: `border`, `borderWidth`, `borderColor`, `borderRadius`, etc.
- **Shadow props**: `boxShadow`, `textShadow`
- **Typography props**: `fontSize`, `fontWeight`, `lineHeight`, `textAlign`, etc.
- **Transform & Transition props**: `transform`, `transition`, etc.
- **Event handlers**: `onClick`, `onMouseEnter`, `onMouseLeave`, `onFocus`, `onBlur`
- **Accessibility props**: `id`, `role`, `aria-label`, `aria-labelledby`, etc.

**Responsive props**: All style props support responsive values using Backpack breakpoint tokens:
```tsx
<BpkBox width={{ smallMobile: '100%', mobile: '50%', desktop: '33%' }} />
```

**Note:**
- `BpkBox`, `BpkFlex`, and `BpkGrid` do **not** support the `className` prop to maintain consistency with Backpack's design principles
- TypeScript will provide autocomplete and type checking for all allowed props
- All components share the same prop interface and support the same Backpack tokens
- The API is intentionally limited to ensure stability and prevent breaking changes

### Semantic HTML

Use the `as` prop to render as a different HTML element:

```tsx
<BpkBox as="section" padding="base">
  Content
</BpkBox>
```

## Performance Benefits

### CSS Modules vs CSS-in-JS

**Previous implementation (Chakra UI CSS-in-JS):**
- Runtime CSS generation
- JavaScript bundle includes style logic
- Potential FOUC (Flash of Unstyled Content)
- SSR requires additional setup

**Current implementation (CSS Modules):**
- ✅ **Zero runtime CSS generation** - All styles compiled at build time
- ✅ **Smaller JavaScript bundle** - No style logic in JS
- ✅ **No FOUC** - Styles are in static CSS files
- ✅ **Native SSR support** - Works out of the box
- ✅ **Better performance** - No runtime style calculations
- ✅ **Consistent with Backpack** - Same approach as other components

## Migration Guide

### From Previous Versions

If you're migrating from a previous version:

1. **Add BpkProvider** - Wrap your app with `<BpkProvider>` (required for Chakra UI v3 integration)
2. **No API changes** - All props remain the same
3. **Color tokens** - Continue using Backpack color token strings
4. **Spacing tokens** - Continue using Backpack spacing token strings
5. **Breakpoints** - Continue using Backpack breakpoint names

The migration should be seamless as the API remains 100% compatible.

### Code Optimization

The implementation has been optimized with:
- **Component factory pattern** - `createBpkLayoutComponent` reduces code duplication
- **Shared utilities** - Common logic extracted to reusable functions
- **Type safety** - Full TypeScript support with constrained prop types
