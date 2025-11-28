# bpk-component-layout

Backpack layout primitives built on Chakra UI 3.0 with PandaCSS for zero-runtime CSS generation.

## Installation

```bash
npm install @skyscanner/backpack-web/bpk-component-layout
```

## Dependencies

### Required Dependencies

- **React**: `17.0.2 - 18.3.1` (peer dependency)
- **React DOM**: `17.0.2 - 18.3.1` (peer dependency)
- **@chakra-ui/react**: `^3.30.0` (included)
- **@pandacss/dev**: `^1.5.1` (build-time only, not included in production bundle)

### CSS Import

The package includes pre-generated CSS that must be imported in your application:

```typescript
import '@skyscanner/backpack-web/bpk-component-layout/dist/bpk-component-layout/src/styled-system/styles.css';
```

**Note**: The exact path may vary based on your build configuration. Check the `dist` folder structure after installation.

## Quick Start

### 1. Wrap your app with BpkProvider

The `BpkProvider` sets up the Chakra UI system with Backpack themes. It is **required** for layout components to function correctly.

```tsx
import { BpkProvider } from '@skyscanner/backpack-web/bpk-component-layout';

function App() {
  return (
    <BpkProvider>
      {/* Your app content */}
    </BpkProvider>
  );
}
```

### 2. Use layout components with Backpack tokens

You can use the exported token objects (`BpkSpacing`, `BpkColor`) for type safety and autocompletion.

```tsx
import {
  BpkBox,
  BpkFlex,
  BpkSpacing,
  BpkColor
} from '@skyscanner/backpack-web/bpk-component-layout';

function MyComponent() {
  return (
    <BpkBox p={BpkSpacing.Base} bg={BpkColor.Canvas}>
      <BpkFlex gap={BpkSpacing.Md} align="center">
        <BpkBox>Item 1</BpkBox>
        <BpkBox>Item 2</BpkBox>
      </BpkFlex>
    </BpkBox>
  );
}
```

## Available Components

### BpkBox

A basic container component for layout and styling.

**Common Props**: All spacing and color props (see [Common Props](#common-props))

**Component-Specific Props**: All Chakra UI `Box` props except spacing/color props and `className`

```tsx
<BpkBox
  p={BpkSpacing.Base}
  bg={BpkColor.Canvas}
  color={BpkColor.TextPrimary}
  borderRadius={BpkSpacing.Md}
>
  Content here
</BpkBox>
```

### BpkFlex

A flexbox container component.

**Common Props**: All spacing and color props (see [Common Props](#common-props))

**Component-Specific Props**: All Chakra UI `Flex` props (e.g., `direction`, `align`, `justify`, `wrap`) except spacing/color props and `className`

```tsx
<BpkFlex
  direction="row"
  align="center"
  justify="space-between"
  gap={BpkSpacing.Md}
>
  <div>Item 1</div>
  <div>Item 2</div>
</BpkFlex>
```

### BpkGrid

A grid container component.

**Common Props**: All spacing and color props (see [Common Props](#common-props))

**Component-Specific Props**: All Chakra UI `Grid` props (e.g., `templateColumns`, `templateRows`, `autoFlow`) except spacing/color props and `className`

```tsx
<BpkGrid templateColumns="repeat(3, 1fr)" gap={BpkSpacing.Base}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</BpkGrid>
```

### BpkStack, BpkHStack, BpkVStack

Stack components for vertical or horizontal layouts with consistent spacing.

**Common Props**: All spacing and color props (see [Common Props](#common-props))

**Component-Specific Props**:
- `spacing`: **Required** - Must use `BpkSpacing` tokens (enforced at type level)
- All other Chakra UI `Stack` props except spacing/color props and `className`

```tsx
// Vertical stack (default)
<BpkStack spacing={BpkSpacing.Base}>
  <div>Item 1</div>
  <div>Item 2</div>
</BpkStack>

// Horizontal stack
<BpkHStack spacing={BpkSpacing.Md}>
  <div>Item 1</div>
  <div>Item 2</div>
</BpkHStack>

// Vertical stack (explicit)
<BpkVStack spacing={BpkSpacing.Lg}>
  <div>Item 1</div>
  <div>Item 2</div>
</BpkVStack>
```

## Props API

### Common Props

All layout components share a common set of props for spacing and colors. These props are defined in `BpkCommonLayoutProps` and are available on all components.

#### Spacing Props

All spacing-related props accept `BpkSpacing` tokens or percentages (e.g., `"50%"`). Direct pixel/rem values are **not allowed**.

**Padding Props:**
- `p`, `padding` - All sides
- `pt`, `paddingTop` - Top
- `pr`, `paddingRight` - Right
- `pb`, `paddingBottom` - Bottom
- `pl`, `paddingLeft` - Left
- `px` - Horizontal (left + right)
- `py` - Vertical (top + bottom)

**Margin Props:**
- `m`, `margin` - All sides
- `mt`, `marginTop` - Top
- `mr`, `marginRight` - Right
- `mb`, `marginBottom` - Bottom
- `ml`, `marginLeft` - Left
- `mx` - Horizontal (left + right)
- `my` - Vertical (top + bottom)

**Gap:**
- `gap` - Gap between flex/grid items

**Size Props:**
- `width`, `height` - Accept tokens, percentages, or special values: `"auto"`, `"full"`, `"fit-content"`
- `minWidth`, `minHeight`, `maxWidth`, `maxHeight` - Same as above

**Border Radius:**
- `borderRadius` - All corners
- `borderTopLeftRadius`, `borderTopRightRadius`, `borderBottomLeftRadius`, `borderBottomRightRadius` - Individual corners

**Position Props:**
- `top`, `right`, `bottom`, `left` - Accept spacing tokens

**Typography Props:**
- `fontSize`, `lineHeight` - Accept spacing tokens

#### Color Props

All color-related props accept `BpkColor` tokens or special values (`"transparent"`, `"currentColor"`).

- `color` - Text color
- `bg`, `backgroundColor` - Background color
- `borderColor` - Border color
- `borderTopColor`, `borderRightColor`, `borderBottomColor`, `borderLeftColor` - Individual border colors

### Component-Specific Props

Each component has its own set of specific props that are unique to that component type. These are exported as separate types:

- `BpkBoxSpecificProps` - Box-specific props (e.g., `as`, `display`, `overflow`)
- `BpkFlexSpecificProps` - Flex-specific props (e.g., `direction`, `align`, `justify`, `wrap`)
- `BpkGridSpecificProps` - Grid-specific props (e.g., `templateColumns`, `templateRows`, `autoFlow`)
- `BpkStackSpecificProps` - Stack-specific props (e.g., `spacing`, `direction`)

You can import these types for advanced TypeScript usage:

```typescript
import type { BpkBoxSpecificProps } from '@skyscanner/backpack-web/bpk-component-layout';
```

## Backpack Design Tokens

All layout components use Backpack design tokens for spacing and colors. This ensures consistency across the design system and prevents the use of arbitrary values.

### Type-Safe Token Objects

We recommend using the exported token objects for better type safety and developer experience:

- `BpkSpacing`: Contains all spacing tokens (e.g., `BpkSpacing.Base`)
- `BpkColor`: Contains all color tokens (e.g., `BpkColor.CorePrimary`)
- `BpkBreakpoint`: Contains breakpoint tokens (e.g., `BpkBreakpoint.Tablet`)

### Spacing Tokens

Spacing tokens must be used for all spacing-related properties. Only Backpack spacing tokens or percentages are allowed.

**Available Spacing Tokens:**
- `BpkSpacing.None` (`'bpk-spacing-none'`) - 0
- `BpkSpacing.Sm` (`'bpk-spacing-sm'`) - 0.25rem (4px)
- `BpkSpacing.Base` (`'bpk-spacing-base'`) - 1rem (16px)
- `BpkSpacing.Md` (`'bpk-spacing-md'`) - 0.5rem (8px)
- `BpkSpacing.Lg` (`'bpk-spacing-lg'`) - 1.5rem (24px)
- `BpkSpacing.Xl` (`'bpk-spacing-xl'`) - 2rem (32px)
- `BpkSpacing.Xxl` (`'bpk-spacing-xxl'`) - 2.5rem (40px)

### Color Tokens

Color tokens must be used for all color-related properties. Only Backpack color tokens or special values (`transparent`, `currentColor`) are allowed.

**Text Colors:**
- `BpkColor.TextPrimary` - Primary text color
- `BpkColor.TextSecondary` - Secondary text color
- `BpkColor.TextDisabled` - Disabled text color
- `BpkColor.TextOnDark` - Text color for dark backgrounds
- `BpkColor.TextLink` - Link text color
- `BpkColor.TextError` - Error text color
- `BpkColor.TextSuccess` - Success text color
- `BpkColor.TextHero` - Hero text color

**Background Colors:**
- `BpkColor.Canvas` - Main canvas background
- `BpkColor.CanvasContrast` - Contrast canvas background
- `BpkColor.SurfaceHighlight` - Highlighted surface
- `BpkColor.SurfaceDefault` - Default surface
- `BpkColor.SurfaceElevated` - Elevated surface

**Brand Colors:**
- `BpkColor.CorePrimary` - Primary brand color
- `BpkColor.CoreAccent` - Accent brand color

**Border Colors:**
- `BpkColor.Line` - Standard border color
- `BpkColor.LineOnDark` - Border color for dark backgrounds

### Breakpoint Tokens

Breakpoint tokens are used for responsive overrides. The system supports 6 Backpack breakpoints:

- `BpkBreakpoint.SmallMobile` (`'small-mobile'`)
- `BpkBreakpoint.Mobile` (`'mobile'`)
- `BpkBreakpoint.SmallTablet` (`'small-tablet'`)
- `BpkBreakpoint.Tablet` (`'tablet'`)
- `BpkBreakpoint.Desktop` (`'desktop'`)
- `BpkBreakpoint.LargeDesktop` (`'large-desktop'`)

### Responsive Overrides

You can use standard Chakra UI responsive object syntax with Backpack tokens. This allows you to change tokens based on breakpoints.

**Simplified Breakpoint Keys:** `base`, `mobile`, `tablet`, `desktop`, `large-desktop`.

```tsx
import {
  BpkBox,
  BpkColor,
  BpkSpacing,
  BpkBreakpoint
} from '@skyscanner/backpack-web/bpk-component-layout';

<BpkBox
  // Change padding based on breakpoint
  p={{
    base: BpkSpacing.Base,
    tablet: BpkSpacing.Lg,
    desktop: BpkSpacing.Xl
  }}
  // Change background color based on breakpoint
  bg={{
    base: BpkColor.Canvas,
    desktop: BpkColor.SurfaceHighlight
  }}
>
  Responsive Content
</BpkBox>
```

## Important Notes

### ⚠️ className is Not Supported

The `className` prop is intentionally removed to maintain design system consistency. Use specific style props instead.

### ⚠️ Only Backpack Tokens Allowed

Direct pixel or rem values (e.g., `p="16px"`, `p="1rem"`) are **not allowed**. Use Backpack tokens or percentages instead.

Size props (`width`, `height`, etc.) accept `auto`, `full`, `fit-content` in addition to tokens and percentages.

### ⚠️ Type Safety

All props are strictly typed. TypeScript will prevent you from passing invalid values. Use the exported token objects (`BpkSpacing`, `BpkColor`) for the best developer experience.

## Type Exports

The package exports the following types for advanced usage:

```typescript
// Component prop types
import type {
  BpkBoxProps,
  BpkFlexProps,
  BpkGridProps,
  BpkStackProps,
  BpkProviderProps
} from '@skyscanner/backpack-web/bpk-component-layout';

// Common and specific prop types
import type {
  BpkCommonLayoutProps,
  BpkBoxSpecificProps,
  BpkFlexSpecificProps,
  BpkGridSpecificProps,
  BpkStackSpecificProps
} from '@skyscanner/backpack-web/bpk-component-layout';

// Token types
import type {
  BpkSpacingToken,
  BpkColorToken,
  BpkBreakpointToken,
  BpkSpacingValue,
  BpkColorValue,
  BpkBreakpointValue
} from '@skyscanner/backpack-web/bpk-component-layout';
```

## Related Documentation

- [STYLE.md](./STYLE.md) - Detailed explanation of the styling approach
- [TECHNICAL_GUIDANCE.md](./TECHNICAL_GUIDANCE.md) - Implementation details for maintainers
- [BUNDLE_SIZE_ANALYSIS.md](./BUNDLE_SIZE_ANALYSIS.md) - Bundle size impact analysis
