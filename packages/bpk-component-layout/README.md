# bpk-component-layout

> Backpack layout components built on top of Chakra UI.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Setup

### BpkLayoutProvider

**Important:** You must wrap your application with `BpkLayoutProvider` (not Chakra UI's default `ChakraProvider`) to ensure Backpack tokens and breakpoints are used. Place it at the root of your application:

```tsx
import { BpkLayoutProvider } from '@skyscanner/backpack-web/bpk-component-layout';

function App() {
  return (
    <BpkLayoutProvider>
      {/* Your app content */}
    </BpkLayoutProvider>
  );
}
```

`BpkLayoutProvider` configures Chakra UI with:
- **Backpack spacing tokens** mapped to Chakra UI's spacing scale
- **Backpack breakpoints** mapped to Chakra UI's breakpoint system

This ensures all layout components use Backpack's design system consistently.

## Usage

### BpkBox

`BpkBox` is a flexible layout component that wraps Chakra UI's Box component using the facade pattern. It provides a Backpack-specific API while leveraging Chakra UI's powerful layout capabilities.

**The facade pattern allows you to use Backpack tokens directly as strings**, making the API more intuitive and hiding Chakra UI implementation details.

#### Using Backpack Spacing Tokens (Recommended)

You can use Backpack spacing tokens directly as strings - no imports needed:

```tsx
import BpkBox from '@skyscanner/backpack-web/bpk-component-layout';

export default () => (
  <BpkBox padding="base" margin="lg" bg="blue.500">
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

#### Using Backpack Breakpoints (Recommended)

For responsive layouts, use Backpack breakpoint names directly as object keys:

```tsx
import BpkBox from '@skyscanner/backpack-web/bpk-component-layout';

export default () => (
  <BpkBox
    width={{
      base: '100%',
      mobile: '50%',
      desktop: '33%',
    }}
    padding={{ mobile: "base", desktop: "xl" }}
  >
    Responsive content using Backpack tokens
  </BpkBox>
);
```

**Available Backpack breakpoint names:**
- `smallMobile` → maps to Chakra 'sm' (Backpack SMALL_MOBILE)
- `mobile` → maps to Chakra 'md' (Backpack MOBILE)
- `smallTablet` → maps to Chakra 'lg' (Backpack SMALL_TABLET)
- `tablet` → maps to Chakra 'xl' (Backpack TABLET)
- `desktop` → maps to Chakra '2xl' (Backpack DESKTOP)

#### Alternative: Using Token Constants

If you prefer using constants (for TypeScript autocomplete or consistency), you can still use the exported token constants:

```tsx
import BpkBox, { BPK_SPACING_TOKENS, BPK_BREAKPOINT_TOKENS } from '@skyscanner/backpack-web/bpk-component-layout';

export default () => (
  <BpkBox
    padding={BPK_SPACING_TOKENS.base}
    margin={BPK_SPACING_TOKENS.lg}
    width={{
      [BPK_BREAKPOINT_TOKENS.mobile]: '100%',
      [BPK_BREAKPOINT_TOKENS.desktop]: '50%',
    }}
  >
    Content using token constants
  </BpkBox>
);
```

**Note:** The string token approach (e.g., `padding="base"`) is preferred as it's simpler and doesn't require imports. The transformation happens automatically inside the component.

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

**Important:** `BpkBox` only accepts Backpack color tokens for color-related props (`bg`, `color`, `borderColor`, etc.). Chakra UI color tokens (e.g., `"blue.500"`, `"gray.100"`) are **not allowed** to ensure consistency with Backpack's design system, similar to how `BpkText` restricts color values.

Color tokens are transformed to CSS custom properties (e.g., `var(--bpk-text-primary-day)`) which work with Backpack's theming system.

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
- **Spacing props**: `padding`, `margin`, `gap` and their variants (`p`, `m`, `px`, `py`, `mx`, `my`, etc.)
  - Accept Backpack token strings: `"none"`, `"sm"`, `"base"`, `"md"`, `"lg"`, `"xl"`
  - Or Chakra UI spacing values (numbers or strings)
- **Display props**: `display`, `visibility`, `overflow`, `overflowX`, `overflowY`
- **Position props**: `position`, `top`, `right`, `bottom`, `left`, `zIndex`
- **Flexbox props**: `flex`, `flexDirection`, `flexWrap`, `alignItems`, `justifyContent`, etc.
- **Grid props**: `gridTemplateColumns`, `gridTemplateRows`, `gridGap`, etc.
- **Color props**: `bg`, `backgroundColor`, `color`, `opacity`
- **Border props**: `border`, `borderWidth`, `borderColor`, `borderRadius`, etc.
- **Shadow props**: `boxShadow`, `textShadow`
- **Typography props**: `fontSize`, `fontWeight`, `lineHeight`, `textAlign`, etc.
- **Transform & Transition props**: `transform`, `transition`, etc.
- **Event handlers**: `onClick`, `onMouseEnter`, `onMouseLeave`, `onFocus`, `onBlur`
- **Accessibility props**: `id`, `role`, `aria-label`, `aria-labelledby`, etc.

**Responsive props**: All style props support responsive values using Backpack breakpoint tokens:
```tsx
<BpkBox width={{ base: '100%', mobile: '50%', desktop: '33%' }} />
```

**Note:**
- `BpkBox` does **not** support the `className` prop to maintain consistency with Backpack's design principles
- TypeScript will provide autocomplete and type checking for all allowed props
- The API is intentionally limited to ensure stability and prevent breaking changes

### Semantic HTML

Use the `as` prop to render as a different HTML element:

```tsx
<BpkBox as="section" padding={4}>
  Content
</BpkBox>
```

