# bpk-component-layout

Backpack layout primitives built on Chakra UI with PandaCSS.

## Installation

```bash
npm install @skyscanner/backpack-web/bpk-component-layout
```

## Quick Start

### 1. Wrap your app with BpkProvider

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

### 2. Use layout components

```tsx
import { BpkBox, BpkFlex, BpkGrid, BpkStack } from '@skyscanner/backpack-web/bpk-component-layout';

function MyComponent() {
  return (
    <BpkBox p="bpk-spacing-base" bg="bpk-canvas-day">
      <BpkFlex gap="bpk-spacing-md" align="center">
        <BpkBox>Item 1</BpkBox>
        <BpkBox>Item 2</BpkBox>
      </BpkFlex>
    </BpkBox>
  );
}
```

## Usage

### BpkProvider

The `BpkProvider` component provides the Chakra UI context for all layout components. Wrap your application with it at the root level.

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

### BpkBox

A basic container component for layout and styling.

```tsx
import { BpkBox } from '@skyscanner/backpack-web/bpk-component-layout';

<BpkBox p="bpk-spacing-base" bg="bpk-canvas-day" color="bpk-text-primary-day">
  Content here
</BpkBox>
```

### BpkFlex

A flexbox container component.

```tsx
import { BpkFlex } from '@skyscanner/backpack-web/bpk-component-layout';

<BpkFlex direction="row" align="center" justify="space-between" gap="bpk-spacing-md">
  <div>Item 1</div>
  <div>Item 2</div>
</BpkFlex>
```

### BpkGrid

A grid container component.

```tsx
import { BpkGrid } from '@skyscanner/backpack-web/bpk-component-layout';

<BpkGrid templateColumns="repeat(3, 1fr)" gap="bpk-spacing-base">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</BpkGrid>
```

### BpkStack, BpkHStack, BpkVStack

Stack components for vertical or horizontal layouts with consistent spacing.

```tsx
import { BpkStack, BpkHStack, BpkVStack } from '@skyscanner/backpack-web/bpk-component-layout';

// Vertical stack (default)
<BpkStack spacing="bpk-spacing-base">
  <div>Item 1</div>
  <div>Item 2</div>
</BpkStack>

// Horizontal stack
<BpkHStack spacing="bpk-spacing-md">
  <div>Item 1</div>
  <div>Item 2</div>
</BpkHStack>

// Vertical stack (explicit)
<BpkVStack spacing="bpk-spacing-lg">
  <div>Item 1</div>
  <div>Item 2</div>
</BpkVStack>
```

## Backpack Design Tokens

All layout components use Backpack design tokens for spacing and colors. This ensures consistency across the design system and prevents the use of arbitrary values.

### Spacing Tokens

Spacing tokens must be used for all spacing-related properties. Only Backpack spacing tokens or percentages are allowed (no `px`, `rem`, or `em` values).

**Available Spacing Tokens:**
- `bpk-spacing-none` - 0
- `bpk-spacing-sm` - Small spacing
- `bpk-spacing-base` - Base spacing (default)
- `bpk-spacing-md` - Medium spacing
- `bpk-spacing-lg` - Large spacing
- `bpk-spacing-xl` - Extra large spacing
- `bpk-spacing-xxl` - 2x large spacing

**Spacing Properties:**
All spacing-related props support Backpack tokens:
- Padding: `p`, `pt`, `pr`, `pb`, `pl`, `px`, `py`, `padding`, `paddingTop`, `paddingRight`, `paddingBottom`, `paddingLeft`
- Margin: `m`, `mt`, `mr`, `mb`, `ml`, `mx`, `my`, `margin`, `marginTop`, `marginRight`, `marginBottom`, `marginLeft`
- Gap: `gap`, `spacing`
- Size: `width`, `height`, `minWidth`, `minHeight`, `maxWidth`, `maxHeight` (also supports `auto`, `full`, `fit-content`)
- Border Radius: `borderRadius`, `borderTopLeftRadius`, `borderTopRightRadius`, `borderBottomLeftRadius`, `borderBottomRightRadius`
- Position: `top`, `right`, `bottom`, `left`
- Typography: `fontSize`, `lineHeight`

**Examples:**
```tsx
// Using spacing tokens
<BpkBox p="bpk-spacing-base" mb="bpk-spacing-lg">
  Content
</BpkBox>

// Using percentages (allowed)
<BpkBox width="50%" height="100%">
  Content
</BpkBox>

// Using special size values
<BpkBox width="auto" maxWidth="full">
  Content
</BpkBox>
```

### Color Tokens

Color tokens must be used for all color-related properties. Only Backpack color tokens or special values (`transparent`, `currentColor`) are allowed.

**Available Color Tokens:**

**Text Colors:**
- `bpk-text-primary-day` - Primary text color
- `bpk-text-secondary-day` - Secondary text color
- `bpk-text-disabled-day` - Disabled text color
- `bpk-text-on-dark-day` - Text color for dark backgrounds
- `bpk-text-link-day` - Link text color
- `bpk-text-error-day` - Error text color
- `bpk-text-success-day` - Success text color
- `bpk-text-hero-day` - Hero text color

**Background Colors:**
- `bpk-canvas-day` - Canvas background
- `bpk-canvas-contrast-day` - Canvas contrast background
- `bpk-surface-highlight-day` - Surface highlight background
- `bpk-surface-default-day` - Surface default background
- `bpk-surface-elevated-day` - Surface elevated background

**Brand Colors:**
- `bpk-core-primary-day` - Core primary brand color
- `bpk-core-accent-day` - Core accent brand color

**Border Colors:**
- `bpk-line-day` - Standard line/border color
- `bpk-line-on-dark-day` - Line color for dark backgrounds

**Color Properties:**
All color-related props support Backpack tokens:
- Text: `color`
- Background: `bg`, `backgroundColor`
- Border: `borderColor`, `borderTopColor`, `borderRightColor`, `borderBottomColor`, `borderLeftColor`

**Examples:**
```tsx
// Using color tokens
<BpkBox 
  bg="bpk-canvas-day" 
  color="bpk-text-primary-day" 
  borderColor="bpk-line-day"
>
  Content
</BpkBox>

// Using brand colors
<BpkBox bg="bpk-core-primary-day" color="white">
  Primary Action
</BpkBox>

// Using special values
<BpkBox bg="transparent" borderColor="currentColor">
  Transparent background
</BpkBox>
```

### Token Mapping

All Backpack tokens are automatically mapped to their actual values from `@skyscanner/bpk-foundations-web`. The mapping happens at runtime, ensuring that:

1. **Type Safety**: TypeScript enforces the use of valid tokens
2. **Runtime Validation**: Invalid values are caught and warned in development
3. **Consistent Values**: All tokens resolve to the correct design system values
4. **No Arbitrary Values**: Direct `px` or `rem` values are not allowed (except percentages)

**Token Resolution:**
- Spacing tokens are resolved to their `rem` values from Backpack foundations
- Color tokens are resolved to their hex/rgb values from Backpack foundations
- Invalid tokens will show warnings in development mode

## API

All components follow Chakra UI's layout component API, but with the following differences:

- **No `className` prop**: The `className` prop is intentionally removed to prevent style overrides and maintain design system consistency.
- **Type-safe props**: All components are fully typed with TypeScript.
- **Token-only values**: Spacing and color props only accept Backpack tokens or allowed special values (percentages for spacing, `transparent`/`currentColor` for colors).

### Component-Specific Props

Each component exposes its specific Chakra UI props while enforcing Backpack token usage for spacing and color properties:

- **BpkBox**: All Box props + Backpack token restrictions
- **BpkFlex**: All Flex props + Backpack token restrictions
- **BpkGrid**: All Grid props + Backpack token restrictions
- **BpkStack/BpkHStack/BpkVStack**: All Stack props + Backpack token restrictions

## Common Usage Patterns

### Card Layout

```tsx
<BpkBox 
  p="bpk-spacing-lg" 
  bg="bpk-surface-elevated-day" 
  borderRadius="bpk-spacing-md"
  border="1px solid"
  borderColor="bpk-line-day"
>
  <BpkText color="bpk-text-primary-day" textStyle={TEXT_STYLES.heading5}>
    Card Title
  </BpkText>
  <BpkText color="bpk-text-secondary-day" textStyle={TEXT_STYLES.bodyDefault}>
    Card content
  </BpkText>
</BpkBox>
```

### Responsive Grid

```tsx
<BpkGrid 
  templateColumns="repeat(auto-fit, minmax(200px, 1fr))" 
  gap="bpk-spacing-base"
>
  <BpkBox>Item 1</BpkBox>
  <BpkBox>Item 2</BpkBox>
  <BpkBox>Item 3</BpkBox>
</BpkGrid>
```

### Form Layout

```tsx
<BpkVStack spacing="bpk-spacing-base">
  <BpkBox>
    <label>Name</label>
    <input />
  </BpkBox>
  <BpkBox>
    <label>Email</label>
    <input />
  </BpkBox>
  <BpkHStack spacing="bpk-spacing-md">
    <BpkBox 
      p="bpk-spacing-base" 
      bg="bpk-core-primary-day" 
      borderRadius="bpk-spacing-md"
    >
      <BpkText color="white">Submit</BpkText>
    </BpkBox>
    <BpkBox 
      p="bpk-spacing-base" 
      bg="bpk-canvas-contrast-day" 
      borderRadius="bpk-spacing-md"
      border="1px solid"
      borderColor="bpk-line-day"
    >
      <BpkText color="bpk-text-primary-day">Cancel</BpkText>
    </BpkBox>
  </BpkHStack>
</BpkVStack>
```

### Complex Layout

```tsx
<BpkBox p="bpk-spacing-lg" bg="bpk-canvas-day">
  <BpkFlex justify="space-between" align="center" mb="bpk-spacing-base">
    <BpkText textStyle={TEXT_STYLES.heading4}>Header</BpkText>
    <BpkBox 
      p="bpk-spacing-sm" 
      bg="bpk-core-primary-day" 
      borderRadius="bpk-spacing-md"
    >
      <BpkText color="white">Action</BpkText>
    </BpkBox>
  </BpkFlex>
  
  <BpkGrid templateColumns="repeat(3, 1fr)" gap="bpk-spacing-base">
    <BpkBox p="bpk-spacing-base" bg="bpk-surface-highlight-day">
      Column 1
    </BpkBox>
    <BpkBox p="bpk-spacing-base" bg="bpk-surface-highlight-day">
      Column 2
    </BpkBox>
    <BpkBox p="bpk-spacing-base" bg="bpk-surface-highlight-day">
      Column 3
    </BpkBox>
  </BpkGrid>
</BpkBox>
```

## Important Notes

### ⚠️ className is Not Supported

The `className` prop is intentionally removed to maintain design system consistency. If you try to use it, you'll see a warning in development mode and it will be ignored.

```tsx
// ❌ This will not work
<BpkBox className="my-custom-class">Content</BpkBox>

// ✅ Use props instead
<BpkBox p="bpk-spacing-base" bg="bpk-canvas-day">Content</BpkBox>
```

### ⚠️ Only Backpack Tokens Allowed

Direct pixel or rem values are not allowed. Use Backpack tokens or percentages instead.

```tsx
// ❌ This will not work
<BpkBox p="16px" margin="1rem">Content</BpkBox>

// ✅ Use tokens
<BpkBox p="bpk-spacing-base" m="bpk-spacing-lg">Content</BpkBox>

// ✅ Percentages are allowed
<BpkBox width="50%" height="100%">Content</BpkBox>
```

## Design Philosophy

This package provides a facade over Chakra UI's layout components, offering:

- **Stable API**: Clear and consistent API surface
- **Design System Integration**: Built to integrate with Backpack design tokens
- **PandaCSS**: Uses PandaCSS for zero-runtime CSS generation
- **No Style Overrides**: `className` prop is removed to maintain design system integrity
- **Token Enforcement**: All spacing and color values must use Backpack tokens, ensuring design consistency
- **Type Safety**: Full TypeScript support with strict token validation

## Styling Approach

For detailed information about the styling approach, see [STYLE.md](./STYLE.md).

Key points:
- **Zero-runtime CSS**: Uses PandaCSS for build-time CSS generation
- **Token-based**: All styling uses Backpack design tokens
- **Type-safe**: Full TypeScript validation of tokens
- **Performance**: Follows Chakra UI's performance best practices

