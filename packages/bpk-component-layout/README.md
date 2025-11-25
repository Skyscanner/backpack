# bpk-component-layout

Backpack layout primitives built on Chakra UI with PandaCSS.

## Installation

```bash
npm install @skyscanner/backpack-web/bpk-component-layout
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

<BpkBox padding="4" bg="blue.500" color="white">
  Content here
</BpkBox>
```

### BpkFlex

A flexbox container component.

```tsx
import { BpkFlex } from '@skyscanner/backpack-web/bpk-component-layout';

<BpkFlex direction="row" align="center" justify="space-between">
  <div>Item 1</div>
  <div>Item 2</div>
</BpkFlex>
```

### BpkGrid

A grid container component.

```tsx
import { BpkGrid } from '@skyscanner/backpack-web/bpk-component-layout';

<BpkGrid templateColumns="repeat(3, 1fr)" gap={4}>
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
<BpkStack spacing={4}>
  <div>Item 1</div>
  <div>Item 2</div>
</BpkStack>

// Horizontal stack
<BpkHStack spacing={4}>
  <div>Item 1</div>
  <div>Item 2</div>
</BpkHStack>

// Vertical stack (explicit)
<BpkVStack spacing={4}>
  <div>Item 1</div>
  <div>Item 2</div>
</BpkVStack>
```

## API

All components follow Chakra UI's layout component API, but with the following differences:

- **No `className` prop**: The `className` prop is intentionally removed to prevent style overrides and maintain design system consistency.
- **Type-safe props**: All components are fully typed with TypeScript.

## Design Philosophy

This package provides a facade over Chakra UI's layout components, offering:

- **Stable API**: Clear and consistent API surface
- **Design System Integration**: Built to integrate with Backpack design tokens
- **PandaCSS**: Uses PandaCSS for zero-runtime CSS generation
- **No Style Overrides**: `className` prop is removed to maintain design system integrity

