# Backpack Layout Components - Technical Guidance

This document provides comprehensive technical guidance for the Backpack Layout Components implementation, including architecture, components, properties, and CSS processing approach.

## Table of Contents

1. [Overview](#overview)
2. [Directory Structure](#directory-structure)
3. [Components](#components)
4. [Properties and Types](#properties-and-types)
5. [CSS Processing Architecture](#css-processing-architecture)
6. [Token System](#token-system)
7. [Responsive Design](#responsive-design)
8. [Implementation Details](#implementation-details)
9. [Best Practices](#best-practices)
10. [Migration Guide](#migration-guide)

## Overview

The Backpack Layout Components provide a comprehensive set of layout primitives built on top of CSS Modules and SCSS. This implementation replaces the previous Chakra UI-based approach with a static CSS generation system that offers:

- **Zero runtime CSS-in-JS** - All styles are compiled at build time
- **SSR support** - Works seamlessly with server-side rendering
- **Type-safe props** - Full TypeScript support with constrained value types
- **Backpack token integration** - Native support for Backpack spacing, color, and breakpoint tokens
- **Performance optimized** - Minimal JavaScript bundle size, static CSS classes

## Directory Structure

```
packages/bpk-component-layout/
├── src/
│   ├── BpkBaseLayoutProps.types.ts      # Base props interface shared by all components
│   ├── BpkProvider.tsx                   # Provider component (no-op, for compatibility)
│   ├── layoutMixins.scss                 # Shared SCSS mixins and utility generators
│   ├── layoutPropTypes.ts                # Type definitions and validation functions
│   ├── styleUtils.ts                     # CSS class name generation utilities
│   ├── useBpkLayoutProps.ts              # Core prop transformation logic
│   ├── colorTokenTransformers.ts         # Color token transformation utilities
│   ├── tokenTransformers.ts              # Spacing and breakpoint token transformers
│   ├── commonProps.types.ts             # Common prop interfaces (shorthand props)
│   ├── backpackTheme.ts                  # Theme configuration (for compatibility)
│   │
│   ├── BpkBox/                           # Box component
│   │   ├── BpkBox.tsx
│   │   ├── BpkBox.types.ts
│   │   ├── BpkBox.module.scss
│   │   └── BpkBox-test.tsx
│   │
│   ├── BpkFlex/                          # Flexbox component
│   │   ├── BpkFlex.tsx
│   │   ├── BpkFlex.types.ts
│   │   ├── BpkFlex.module.scss
│   │   └── BpkFlex-test.tsx
│   │
│   ├── BpkGrid/                          # Grid component
│   │   ├── BpkGrid.tsx
│   │   ├── BpkGrid.types.ts
│   │   ├── BpkGrid.module.scss
│   │   └── BpkGrid-test.tsx
│   │
│   ├── BpkStack/                         # Stack component (with HStack/VStack)
│   │   ├── BpkStack.tsx
│   │   ├── BpkStack.types.ts
│   │   ├── BpkStack.module.scss
│   │   ├── BpkHStack.tsx                 # Horizontal stack sub-component
│   │   ├── BpkVStack.tsx                 # Vertical stack sub-component
│   │   └── BpkStack-test.tsx
│   │
│   ├── BpkContainer/                     # Container component
│   ├── BpkCenter/                        # Center component
│   ├── BpkSeparator/                     # Separator component
│   ├── BpkSpacer/                        # Spacer component
│   ├── BpkWrap/                          # Wrap component
│   ├── BpkAspectRatio/                   # Aspect ratio component
│   ├── BpkFloat/                         # Float component
│   └── BpkGroup/                         # Group component
│
├── examples/
│   └── bpk-component-layout/            # Storybook examples and stories
│
├── index.ts                              # Main export file
├── README.md                             # User-facing documentation
├── STYLES.md                             # SCSS architecture documentation
└── TECHNICAL_GUIDANCE.md                 # This file
```

## Components

### Component Overview Table

| Component | Primary Responsibility | Key Features | Default Display | Use Cases |
|-----------|----------------------|--------------|-----------------|-----------|
| **BpkBox** | Flexible container supporting both flexbox and grid | • Supports all base layout props<br>• Supports flexbox props<br>• Supports grid props<br>• Most versatile component | `block` | General purpose layouts, containers, wrappers |
| **BpkFlex** | Flexbox-optimized layout container | • Pre-configured with `display: flex`<br>• Full flexbox property support<br>• Shorthand props (`align`, `justify`, `wrap`, `direction`)<br>• Additional shorthands (`basis`, `grow`, `shrink`) | `flex` | Horizontal/vertical layouts, alignment, distribution |
| **BpkGrid** | Grid-optimized layout container | • Pre-configured with `display: grid`<br>• Full CSS Grid property support<br>• Grid-specific gap props<br>• Auto-flow and auto-sizing | `grid` | Complex 2D layouts, responsive grids, card layouts |
| **BpkStack** | Flexbox-based stack with configurable direction | • Pre-configured with `display: flex`<br>• `spacing` prop for gap between items<br>• `direction` prop (horizontal/vertical)<br>• Sub-components: `BpkHStack`, `BpkVStack` | `flex` | Simple stacking layouts, form layouts, list layouts |
| **BpkContainer** | Container with max-width constraints | • Default max-width: `75rem` (1200px)<br>• Auto margins for centering<br>• `centerContent` prop<br>• Custom sizing via `size` and `maxW` props | `block` | Page containers, content wrappers, centered layouts |
| **BpkCenter** | Centers child both horizontally and vertically | • Uses flexbox for centering<br>• Supports all base layout props | `flex` | Modal content, loading spinners, centered content |
| **BpkSpacer** | Flexible spacer that expands along major axis | • Automatically expands to fill space<br>• Minimal props (just `as` for element type) | `block` | Push content to edges, distribute space in flex layouts |
| **BpkSeparator** | Visual separator (horizontal or vertical line) | • `orientation` prop (`horizontal` \| `vertical`)<br>• Supports all base layout props<br>• Does not accept children | `block` | Dividers, section separators, visual breaks |
| **BpkWrap** | Flexbox with `flex-wrap: wrap` by default | • Pre-configured with `display: flex` and `flex-wrap: wrap`<br>• `spacing` prop for gap between items | `flex` | Responsive wrapping layouts, tag lists, button groups |
| **BpkAspectRatio** | Maintains specific aspect ratio | • `ratio` prop (e.g., `16/9`, `4/3`, `1`)<br>• Uses CSS aspect-ratio property<br>• Supports all base layout props | `block` | Image containers, video players, responsive media |
| **BpkFloat** | Provides floating positioning | • `float` prop (`left` \| `right` \| `none`)<br>• Supports all base layout props | `block` | Text wrapping layouts, magazine-style layouts |
| **BpkGroup** | Flexbox component for grouping elements | • Pre-configured with `display: flex`<br>• Supports all base layout props | `flex` | Button groups, form groups, related element groups |

### Core Layout Components

#### BpkBox
A flexible container component that supports both flexbox and grid layouts.

**Key Features:**
- Supports all base layout props (spacing, colors, borders, etc.)
- Supports flexbox props (when used with `display: flex`)
- Supports grid props (when used with `display: grid`)
- Most versatile component for general layout needs

**Usage:**
```tsx
<BpkBox padding="base" bg="surface-highlight" display="flex" gap="md">
  <BpkBox>Item 1</BpkBox>
  <BpkBox>Item 2</BpkBox>
</BpkBox>
```

#### BpkFlex
A flexbox-optimized component with `display: flex` by default.

**Key Features:**
- Pre-configured with `display: flex`
- Supports all flexbox properties
- Includes flexbox shorthand props (`align`, `justify`, `wrap`, `direction`)
- Additional shorthand props: `basis`, `grow`, `shrink`

**Usage:**
```tsx
<BpkFlex gap="base" alignItems="center" justifyContent="space-between">
  <BpkBox>Item 1</BpkBox>
  <BpkBox>Item 2</BpkBox>
</BpkFlex>
```

#### BpkGrid
A grid-optimized component with `display: grid` by default.

**Key Features:**
- Pre-configured with `display: grid`
- Supports all CSS Grid properties
- Grid-specific gap props (`gridGap`, `gridColumnGap`, `gridRowGap`)
- Grid auto-flow and auto-sizing props

**Usage:**
```tsx
<BpkGrid
  gridTemplateColumns="repeat(3, 1fr)"
  gap="base"
>
  <BpkBox>Item 1</BpkBox>
  <BpkBox>Item 2</BpkBox>
  <BpkBox>Item 3</BpkBox>
</BpkGrid>
```

#### BpkStack
A flexbox-based stack component with configurable direction.

**Key Features:**
- Pre-configured with `display: flex`
- Supports `spacing` prop (gap between items)
- Supports `direction` prop (horizontal/vertical)
- Sub-components: `BpkHStack` (horizontal) and `BpkVStack` (vertical)

**Usage:**
```tsx
<BpkStack direction="column" spacing="base">
  <BpkBox>Item 1</BpkBox>
  <BpkBox>Item 2</BpkBox>
</BpkStack>

// Or use sub-components
<BpkHStack spacing="md">
  <BpkBox>Item 1</BpkBox>
  <BpkBox>Item 2</BpkBox>
</BpkHStack>
```

### Specialized Components

#### BpkContainer
A container component with max-width constraints and optional centering.

**Key Features:**
- Default max-width: `75rem` (1200px)
- Auto margins for centering
- Supports `centerContent` prop
- Supports `size` and `maxW` props for custom sizing

**Usage:**
```tsx
<BpkContainer centerContent>
  <BpkBox>Centered content</BpkBox>
</BpkContainer>
```

#### BpkCenter
A component that centers its child both horizontally and vertically.

**Key Features:**
- Uses flexbox for centering
- Supports all base layout props

**Usage:**
```tsx
<BpkCenter width="100%" height="400px">
  <BpkBox>Centered content</BpkBox>
</BpkCenter>
```

#### BpkSpacer
A flexible spacer component that expands along the major axis.

**Key Features:**
- Used within flexbox layouts
- Automatically expands to fill available space
- Minimal props (just `as` for element type)

**Usage:**
```tsx
<BpkFlex>
  <BpkBox>Left</BpkBox>
  <BpkSpacer />
  <BpkBox>Right</BpkBox>
</BpkFlex>
```

#### BpkSeparator
A visual separator component (horizontal or vertical line).

**Key Features:**
- Supports `orientation` prop (`horizontal` | `vertical`)
- Supports all base layout props
- Does not accept children

**Usage:**
```tsx
<BpkSeparator orientation="horizontal" marginY="lg" />
```

#### BpkWrap
A flexbox component with `flex-wrap: wrap` by default.

**Key Features:**
- Pre-configured with `display: flex` and `flex-wrap: wrap`
- Supports `spacing` prop (gap between items)
- Useful for responsive wrapping layouts

**Usage:**
```tsx
<BpkWrap spacing="base">
  <BpkBox>Item 1</BpkBox>
  <BpkBox>Item 2</BpkBox>
  <BpkBox>Item 3</BpkBox>
</BpkWrap>
```

#### BpkAspectRatio
A component that maintains a specific aspect ratio.

**Key Features:**
- Supports `ratio` prop (e.g., `16/9`, `4/3`, `1`)
- Uses CSS aspect-ratio property
- Supports all base layout props

**Usage:**
```tsx
<BpkAspectRatio ratio={16/9}>
  <img src="image.jpg" alt="Image" />
</BpkAspectRatio>
```

#### BpkFloat
A component that provides floating positioning.

**Key Features:**
- Supports `float` prop (`left` | `right` | `none`)
- Useful for text wrapping layouts
- Supports all base layout props

**Usage:**
```tsx
<BpkFloat float="left" marginRight="base" marginBottom="base">
  <img src="image.jpg" alt="Image" />
</BpkFloat>
```

#### BpkGroup
A flexbox component for grouping related elements.

**Key Features:**
- Pre-configured with `display: flex`
- Supports all base layout props
- Useful for button groups, form groups, etc.

**Usage:**
```tsx
<BpkGroup gap="sm">
  <button>Button 1</button>
  <button>Button 2</button>
  <button>Button 3</button>
</BpkGroup>
```

## Properties and Types

### Base Layout Props (`BpkBaseLayoutProps`)

All layout components extend `BpkBaseLayoutProps`, which includes:

#### Core Props
- `as?: ElementType` - HTML element type (default: `'div'`)
- `children?: ReactNode` - Component children

#### Layout Props
- `width?: ResponsiveValue<string | number>`
- `height?: ResponsiveValue<string | number>`
- `minWidth?: ResponsiveValue<string | number>`
- `maxWidth?: ResponsiveValue<string | number>`
- `minHeight?: ResponsiveValue<string | number>`
- `maxHeight?: ResponsiveValue<string | number>`

#### Spacing Props
All spacing props accept `SpacingValue`:
- `padding?: SpacingValue`
- `paddingTop?: SpacingValue`
- `paddingRight?: SpacingValue`
- `paddingBottom?: SpacingValue`
- `paddingLeft?: SpacingValue`
- `paddingX?: SpacingValue` (shorthand for left/right)
- `paddingY?: SpacingValue` (shorthand for top/bottom)
- `margin?: SpacingValue`
- `marginTop?: SpacingValue`
- `marginRight?: SpacingValue`
- `marginBottom?: SpacingValue`
- `marginLeft?: SpacingValue`
- `marginX?: SpacingValue`
- `marginY?: SpacingValue`
- `gap?: SpacingValue`
- `rowGap?: SpacingValue`
- `columnGap?: SpacingValue`

#### Logical Spacing Props (RTL Support)
All logical spacing props accept `SpacingValue` and automatically adapt to text direction (LTR/RTL):
These props use CSS logical properties (`margin-inline-start`, `padding-inline`, etc.) which automatically flip based on the `dir` attribute.

- `marginStart?: SpacingValue` - margin-inline-start (left in LTR, right in RTL)
- `marginEnd?: SpacingValue` - margin-inline-end (right in LTR, left in RTL)
- `paddingStart?: SpacingValue` - padding-inline-start (left in LTR, right in RTL)
- `paddingEnd?: SpacingValue` - padding-inline-end (right in LTR, left in RTL)
- `marginInline?: SpacingValue` - margin-inline (sets both start and end simultaneously)
- `paddingInline?: SpacingValue` - padding-inline (sets both start and end simultaneously)

**Benefits:**
- ✅ Automatically adapts to RTL/LTR text direction
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

**How it works:**
- In LTR mode (`dir="ltr"`): `marginStart` applies to the left side
- In RTL mode (`dir="rtl"`): `marginStart` automatically applies to the right side
- Browser handles the flip automatically - no JavaScript required

#### Display Props
- `display?: ResponsiveValue<DisplayValue>`
- `visibility?: ResponsiveValue<VisibilityValue>`
- `overflow?: ResponsiveValue<OverflowValue>`
- `overflowX?: ResponsiveValue<OverflowValue>`
- `overflowY?: ResponsiveValue<OverflowValue>`

#### Position Props
- `position?: ResponsiveValue<PositionValue>`
- `top?: ResponsiveValue<string | number>`
- `right?: ResponsiveValue<string | number>`
- `bottom?: ResponsiveValue<string | number>`
- `left?: ResponsiveValue<string | number>`
- `zIndex?: ResponsiveValue<string | number>`

#### Color Props
All color props accept `ColorValue` (restricted to Backpack color tokens):
- `bg?: ColorValue` (shorthand for `backgroundColor`)
- `backgroundColor?: ColorValue`
- `color?: ColorValue`
- `opacity?: ResponsiveValue<string | number>`

#### Border Props
- `border?: ResponsiveValue<string>`
- `borderWidth?: ResponsiveValue<string | number>`
- `borderStyle?: ResponsiveValue<BorderStyleValue>`
- `borderColor?: ColorValue`
- `borderRadius?: ResponsiveValue<string>`
- Individual border props: `borderTop`, `borderRight`, `borderBottom`, `borderLeft`
- Individual border width props: `borderTopWidth`, `borderRightWidth`, etc.
- Individual border color props: `borderTopColor`, `borderRightColor`, etc.
- Individual border radius props: `borderTopLeftRadius`, `borderTopRightRadius`, etc.

#### Shadow Props
- `boxShadow?: ResponsiveValue<string>`
- `textShadow?: ResponsiveValue<string>`

#### Typography Props
- `fontSize?: ResponsiveValue<string | number>`
- `fontWeight?: ResponsiveValue<string | number>`
- `lineHeight?: ResponsiveValue<string | number>`
- `textAlign?: ResponsiveValue<TextAlignValue>`
- `textTransform?: ResponsiveValue<TextTransformValue>`
- `textDecoration?: ResponsiveValue<TextDecorationValue>`
- `letterSpacing?: ResponsiveValue<string | number>`

#### Interaction Props
- `cursor?: ResponsiveValue<CursorValue>`
- `pointerEvents?: ResponsiveValue<PointerEventsValue>`

#### Transform Props
- `transform?: ResponsiveValue<string>`
- `transformOrigin?: ResponsiveValue<string>`

#### Transition Props
- `transition?: ResponsiveValue<string>`
- `transitionProperty?: ResponsiveValue<string>`
- `transitionDuration?: ResponsiveValue<string>`
- `transitionTimingFunction?: ResponsiveValue<string>`
- `transitionDelay?: ResponsiveValue<string>`

### Component-Specific Props

#### BpkFlex Props
Extends `BpkBaseLayoutProps` with:
- `flex?: ResponsiveValue<string | number>`
- `flexDirection?: ResponsiveValue<FlexDirectionValue>`
- `flexWrap?: ResponsiveValue<FlexWrapValue>`
- `flexGrow?: ResponsiveValue<string | number>`
- `flexShrink?: ResponsiveValue<string | number>`
- `flexBasis?: ResponsiveValue<string | number>`
- `alignItems?: ResponsiveValue<AlignItemsValue>`
- `alignContent?: ResponsiveValue<AlignContentValue>`
- `alignSelf?: ResponsiveValue<AlignSelfValue>`
- `justifyContent?: ResponsiveValue<JustifyContentValue>`
- `justifyItems?: ResponsiveValue<JustifyItemsValue>`
- `justifySelf?: ResponsiveValue<JustifySelfValue>`
- `order?: ResponsiveValue<string | number>`
- Shorthand props: `align`, `justify`, `wrap`, `direction`, `basis`, `grow`, `shrink`

#### BpkGrid Props
Extends `BpkBaseLayoutProps` with:
- `gridTemplateColumns?: ResponsiveValue<string>`
- `gridTemplateRows?: ResponsiveValue<string>`
- `gridTemplateAreas?: ResponsiveValue<string>`
- `gridColumn?: ResponsiveValue<string>`
- `gridRow?: ResponsiveValue<string>`
- `gridArea?: ResponsiveValue<string>`
- `gridColumnStart?: ResponsiveValue<string | number>`
- `gridColumnEnd?: ResponsiveValue<string | number>`
- `gridRowStart?: ResponsiveValue<string | number>`
- `gridRowEnd?: ResponsiveValue<string | number>`
- `gridGap?: SpacingValue`
- `gridColumnGap?: SpacingValue`
- `gridRowGap?: SpacingValue`
- `gridAutoFlow?: ResponsiveValue<string>`
- `gridAutoRows?: ResponsiveValue<string>`
- `gridAutoColumns?: ResponsiveValue<string>`

#### BpkStack Props
Extends `BpkBaseLayoutProps` with:
- `spacing?: SpacingValue` - Gap between items
- `direction?: ResponsiveValue<FlexDirectionValue>` - Stack direction
- All flexbox props (inherited from base)

#### BpkContainer Props
Extends `BpkBaseLayoutProps` with:
- `centerContent?: boolean` - Center content horizontally
- `size?: string` - Container size variant
- `maxW?: ResponsiveValue<string | number>` - Custom max-width

#### BpkSeparator Props
Extends `BpkBaseLayoutProps` with:
- `orientation?: 'horizontal' | 'vertical'` - Separator orientation
- Does not accept `children`

#### BpkAspectRatio Props
Extends `BpkBaseLayoutProps` with:
- `ratio?: number` - Aspect ratio (e.g., `16/9`, `4/3`, `1`)

#### BpkFloat Props
Extends `BpkBaseLayoutProps` with:
- `float?: 'left' | 'right' | 'none'` - Float direction

### Type Definitions

#### ResponsiveValue<T>
```typescript
type ResponsiveValue<T> = T | Record<string, T>;
```
Allows a single value or an object with breakpoint keys:
```tsx
padding="base"  // Single value
padding={{ mobile: "base", desktop: "lg" }}  // Responsive object
```

#### SpacingValue
```typescript
type SpacingValue = ResponsiveValue<string | number>;
```
Accepts:
- Backpack token strings: `"none"`, `"sm"`, `"md"`, `"base"`, `"lg"`, `"xl"`, `"xxl"`, `"xxxl"`, `"xxxxl"`
- Numeric pixel values: `0`, `4`, `8`, `16`, `24`, `32`, `40`, `64`, `96`
- Responsive objects with either format

#### ColorValue
```typescript
type ColorValue = ResponsiveValue<BpkColorTokenEnum>;
```
Restricted to Backpack color token enum values only (type-safe):
```tsx
bg="surface-highlight"  // ✅ Valid
bg="#ff0000"            // ❌ Type error
```

#### Constrained Value Types
All layout-related props use constrained value types for type safety:
- `DisplayValue`: `'block' | 'inline' | 'inline-block' | 'flex' | 'grid' | 'none' | 'table' | 'table-cell' | 'table-row'`
- `FlexDirectionValue`: `'row' | 'column' | 'row-reverse' | 'column-reverse'`
- `FlexWrapValue`: `'nowrap' | 'wrap' | 'wrap-reverse'`
- `AlignItemsValue`: `'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'`
- `JustifyContentValue`: `'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'`
- And more...

## CSS Processing Architecture

### Overview

The CSS processing architecture uses **CSS Modules + SCSS** to generate static CSS classes at build time. This approach eliminates runtime CSS-in-JS overhead while maintaining flexibility.

### Core Processing Flow

1. **Props Input** → Component receives props (e.g., `padding="base"`, `bg="surface-highlight"`)
2. **Prop Transformation** → `transformBpkLayoutProps()` converts props to CSS class names and styles
3. **Class Name Generation** → Utility classes are generated (e.g., `bpk-padding-base`, `bpk-bg-surfaceHighlight`)
4. **CSS Modules Mapping** → CSS Modules maps class names to hashed class names
5. **DOM Rendering** → Component renders with final class names and inline styles (for dynamic values)

### Prop Transformation Logic

The `transformBpkLayoutProps()` function in `useBpkLayoutProps.ts` implements the transformation:

#### Atomic Utility Classes Approach

For each prop, the function generates atomic utility classes:

1. **Predefined Tokens** → Atomic utility classes
   - `padding="base"` → `bpk-padding-base`
   - `bg="surface-highlight"` → `bpk-bg-surfaceHighlight`
   - `display="flex"` → `bpk-display-flex`

2. **Dynamic Values** → CSS custom properties + inline styles
   - `width={300}` → CSS variable `--bpk-width: 300px` + class `bpk-width-dynamic`
   - `padding={8}` → CSS variable `--bpk-padding: 0.5rem` + class `bpk-padding-dynamic`

3. **Responsive Values** → Responsive utility classes
   - `padding={{ mobile: "base", desktop: "lg" }}` → `bpk-padding-base-mobile bpk-padding-lg-desktop`

#### Class Name Generation

Class names follow this pattern:
- Base: `bpk-{componentName}` (e.g., `bpk-box`, `bpk-flex`)
- Utility: `bpk-{property}-{value}` (e.g., `bpk-padding-base`, `bpk-bg-surfaceHighlight`)
- Responsive: `bpk-{property}-{value}-{breakpoint}` (e.g., `bpk-padding-base-mobile`)
- Dynamic: `bpk-{property}-dynamic` (e.g., `bpk-width-dynamic`)

### SCSS Architecture

#### Shared Mixins (`layoutMixins.scss`)

The `layoutMixins.scss` file contains all shared SCSS mixins:

1. **`base-component-styles`** - Common base styles (e.g., `box-sizing: border-box`)
2. **`generate-spacing-utilities`** - Generates spacing utility classes
3. **`generate-directional-spacing-utilities`** - Generates directional spacing utilities
4. **`generate-color-utilities`** - Generates color utility classes
5. **`generate-layout-utilities`** - Generates layout utility classes (display, flexbox, grid, etc.)
6. **`generate-responsive-layout-utilities`** - Generates responsive layout utilities
7. **`common-layout-utilities`** - Convenience mixin that includes all commonly used utilities

#### Component SCSS Files

Each component has a `.module.scss` file that:
1. Imports Backpack tokens and breakpoints
2. Imports `layoutMixins`
3. Defines base component class
4. Includes utility mixins

Example (`BpkBox.module.scss`):
```scss
@use '../../bpk-mixins/tokens';
@use '../../bpk-mixins/breakpoints';
@use '../layoutMixins';

.bpk-box {
  @include layoutMixins.base-component-styles;
}

@include layoutMixins.common-layout-utilities($include-gap: true, $include-border-color: true);
```

### CSS Modules Hashing

CSS Modules automatically adds hashes to class names:
- Source: `.bpk-box`
- Generated: `.bpk-box_a1b2c3d4`

This ensures:
- Scoped styles (no conflicts)
- Cache busting (hash changes when styles change)
- Tree shaking (unused classes are removed)

## Token System

### Spacing Tokens

Backpack spacing tokens map to rem values:

| Token | Value | Pixels |
|-------|-------|--------|
| `none` | `0` | `0px` |
| `sm` | `0.25rem` | `4px` |
| `md` | `0.5rem` | `8px` |
| `base` | `1rem` | `16px` |
| `lg` | `1.5rem` | `24px` |
| `xl` | `2rem` | `32px` |
| `xxl` | `2.5rem` | `40px` |
| `xxxl` | `4rem` | `64px` |
| `xxxxl` | `6rem` | `96px` |

**Usage:**
```tsx
// Token string
padding="base"  // 1rem (16px)

// Numeric pixel value (converted to rem)
padding={16}    // 1rem (16px)

// Responsive
padding={{ mobile: "sm", desktop: "lg" }}
```

### Color Tokens

Color props are restricted to Backpack color token enum values:

**Background Colors:**
- `bg="canvas"` / `bg="canvasContrast"`
- `bg="surfaceDefault"` / `bg="surfaceHighlight"` / `bg="surfaceElevated"`
- `bg="corePrimary"` / `bg="coreAccent"`
- And more...

**Text Colors:**
- `color="textPrimary"` / `color="textSecondary"` / `color="textDisabled"`
- `color="textOnDark"`
- And more...

**Usage:**
```tsx
<BpkBox bg="surface-highlight" color="text-primary">
  Content
</BpkBox>
```

### Breakpoint Tokens

Backpack breakpoint tokens:

| Token | Min Width | Description |
|-------|-----------|-------------|
| `smallMobile` | `0px` | Base (mobile-first) |
| `mobile` | `480px` | Large mobile |
| `smallTablet` | `768px` | Small tablet |
| `tablet` | `1024px` | Tablet |
| `desktop` | `1280px` | Desktop |

**Usage:**
```tsx
// Responsive prop with Backpack breakpoints
padding={{ mobile: "base", desktop: "lg" }}

// Single breakpoint
display={{ desktop: "flex" }}
```

## Responsive Design

### Mobile-First Approach

All responsive utilities use a **mobile-first** approach:

1. **Base value** (`smallMobile`) - Applies to all screen sizes (no media query)
2. **Mobile and above** - Uses `@include breakpoints.bpk-breakpoint-above-mobile`
3. **Tablet and above** - Uses `@include breakpoints.bpk-breakpoint-above-tablet`
4. **Desktop and above** - Uses `@include breakpoints.bpk-breakpoint-above-tablet`

### Responsive Value Syntax

Responsive values can be:
1. **Single value** - Applies to all breakpoints
   ```tsx
   padding="base"
   ```

2. **Object with breakpoint keys** - Different values per breakpoint
   ```tsx
   padding={{ mobile: "base", desktop: "lg" }}
   ```

3. **Nested responsive values** - For complex layouts
   ```tsx
   display={{ mobile: "block", desktop: "flex" }}
   flexDirection={{ mobile: "column", desktop: "row" }}
   ```

### Responsive Class Generation

Responsive props generate multiple utility classes:
- `padding={{ mobile: "base", desktop: "lg" }}`
- Generates: `bpk-padding-base-mobile bpk-padding-lg-desktop`
- CSS uses mobile-first media queries to apply correct values

## Implementation Details

### Prop Transformation Function

The core transformation happens in `transformBpkLayoutProps()`:

```typescript
const { className, style, restProps } = transformBpkLayoutProps(props, {
  componentName: 'box',
});
```

**Returns:**
- `className`: Space-separated string of utility class names
- `style`: CSSProperties object with CSS custom properties for dynamic values
- `restProps`: Remaining props to pass to the DOM element

### Class Name Processing

The `processClassName()` helper function:
1. Splits the className string by spaces
2. Maps each class name through CSS Modules `getClass()`
3. Returns the final hashed class name string

```typescript
const finalClassName = processClassName(getClass, className, 'bpk-box');
```

### Dynamic Value Handling

Dynamic values (numbers, custom strings) use CSS custom properties:

1. **CSS Variable Generation**
   ```typescript
   style={{ '--bpk-width': '300px' }}
   ```

2. **CSS Class for Variable**
   ```scss
   .bpk-width-dynamic {
     width: var(--bpk-width, 0);
   }
   ```

3. **Responsive Dynamic Values**
   ```scss
   .bpk-width-dynamic {
     width: var(--bpk-width, 0);
     @include breakpoints.bpk-breakpoint-above-mobile {
       width: var(--bpk-width-mobile, var(--bpk-width, 0));
     }
   }
   ```

### Component Structure

Each component follows this pattern:

```typescript
const BpkComponent = ({
  as = 'div',
  children,
  ...rest
}: Props) => {
  const { className, restProps, style } = transformBpkLayoutProps(rest, {
    componentName: 'component',
  });
  const Component = as as ElementType;

  const finalClassName = processClassName(getClass, className, 'bpk-component');

  return (
    <Component
      {...restProps}
      className={finalClassName || undefined}
      style={style || undefined}
    >
      {children}
    </Component>
  );
};
```

## Best Practices

### 1. Use Backpack Tokens

Prefer Backpack tokens over numeric values:
```tsx
// ✅ Good
padding="base"
bg="surface-highlight"

// ❌ Avoid (unless necessary)
padding={16}
bg="#f0f0f0"
```

### 2. Use Appropriate Components

Choose the right component for the job:
- **BpkBox** - General purpose, supports both flex and grid
- **BpkFlex** - When you need flexbox layout
- **BpkGrid** - When you need grid layout
- **BpkStack** - When you need simple stacking with spacing
- **BpkContainer** - When you need max-width constraints

### 3. Responsive Design

Use responsive props for breakpoint-specific styles:
```tsx
// ✅ Good
<BpkFlex
  flexDirection={{ mobile: "column", desktop: "row" }}
  gap={{ mobile: "sm", desktop: "lg" }}
>
  Content
</BpkFlex>
```

### 4. Avoid Inline Styles

Prefer props over inline styles:
```tsx
// ✅ Good
<BpkBox padding="base" bg="surface-highlight" />

// ❌ Avoid
<BpkBox style={{ padding: '1rem', backgroundColor: 'var(--bpk-surface-highlight-day)' }} />
```

### 5. Type Safety

Use TypeScript types for type safety:
```tsx
// ✅ Type-safe
<BpkBox bg="surface-highlight" />  // ✅ Valid
<BpkBox bg="#ff0000" />              // ❌ Type error

// ✅ Constrained values
<BpkFlex flexDirection="row" />     // ✅ Valid
<BpkFlex flexDirection="invalid" />  // ❌ Type error
```

### 6. Performance

- Static CSS classes are generated at build time
- Only used classes are included in the bundle (tree shaking)
- No runtime CSS generation overhead
- CSS Modules hashing ensures scoped styles

## Migration Guide

### From Chakra UI Version

If migrating from the previous Chakra UI-based implementation:

1. **Remove BpkProvider**
   ```tsx
   // ❌ Old
   <BpkProvider>
     <BpkBox>Content</BpkBox>
   </BpkProvider>

   // ✅ New
   <BpkBox>Content</BpkBox>
   ```

2. **Update Breakpoint Names**
   ```tsx
   // ❌ Old (Chakra UI breakpoints)
   padding={{ base: "base", lg: "lg" }}

   // ✅ New (Backpack breakpoints)
   padding={{ mobile: "base", desktop: "lg" }}
   ```

3. **Color Props are Type-Safe**
   ```tsx
   // ❌ Old (string literals)
   bg="surface-highlight"  // Might work but not type-safe

   // ✅ New (enum values)
   bg="surface-highlight"  // Type-safe, autocomplete works
   ```

4. **No Runtime Theme**
   - No need for theme provider
   - All styles are static CSS classes
   - Works with SSR out of the box

### Common Patterns

#### Card Layout
```tsx
<BpkBox
  padding="lg"
  bg="surface-elevated"
  borderRadius="md"
  boxShadow="sm"
>
  <BpkStack spacing="base">
    <BpkBox>Title</BpkBox>
    <BpkBox>Content</BpkBox>
  </BpkStack>
</BpkBox>
```

#### Responsive Grid
```tsx
<BpkGrid
  gridTemplateColumns={{
    mobile: "1fr",
    tablet: "repeat(2, 1fr)",
    desktop: "repeat(3, 1fr)"
  }}
  gap={{ mobile: "base", desktop: "lg" }}
>
  {items.map(item => <BpkBox key={item.id}>{item.content}</BpkBox>)}
</BpkGrid>
```

#### Centered Container
```tsx
<BpkContainer centerContent>
  <BpkStack spacing="lg">
    <BpkBox>Header</BpkBox>
    <BpkBox>Content</BpkBox>
    <BpkBox>Footer</BpkBox>
  </BpkStack>
</BpkContainer>
```

## Additional Resources

- **[README.md](./README.md)** - User-facing documentation
- **[STYLES.md](./STYLES.md)** - Detailed SCSS architecture documentation
- **[Storybook Examples](../../examples/bpk-component-layout/)** - Interactive examples

## Summary

The Backpack Layout Components provide a comprehensive, type-safe, and performant solution for building layouts in Backpack applications. By using CSS Modules and SCSS, we achieve:

- **Zero runtime overhead** - All CSS is compiled at build time
- **Type safety** - Full TypeScript support with constrained value types
- **Token integration** - Native support for Backpack design tokens
- **SSR support** - Works seamlessly with server-side rendering
- **Performance** - Minimal JavaScript bundle, static CSS classes
- **Developer experience** - Intuitive API, autocomplete, type checking

This implementation represents a significant improvement over CSS-in-JS approaches, providing better performance, maintainability, and alignment with Backpack's design system principles.

