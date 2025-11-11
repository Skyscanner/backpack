# bpk-component-layout

> Backpack layout components built on top of Chakra UI.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

**Note:** This component requires Chakra UI's `ChakraProvider` to be set up in your application. Make sure to wrap your app with `ChakraProvider`:

```tsx
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider>
      {/* Your app content */}
    </ChakraProvider>
  );
}
```

## Usage

### BpkBox

`BpkBox` is a flexible layout component that wraps Chakra UI's Box component using the facade pattern. It provides a Backpack-specific API while leveraging Chakra UI's powerful layout capabilities.

```tsx
import BpkBox from '@skyscanner/backpack-web/bpk-component-layout';

export default () => (
  <BpkBox padding={4} margin={2} bg="blue.500">
    Content here
  </BpkBox>
);
```

### Props

`BpkBox` accepts all props that Chakra UI's `Box` component accepts, including:

- Layout props: `width`, `height`, `minWidth`, `maxWidth`, etc.
- Spacing props: `padding`, `margin`, `gap`, etc.
- Flexbox props: `display`, `flexDirection`, `alignItems`, `justifyContent`, etc.
- Grid props: `gridTemplateColumns`, `gridGap`, etc.
- Color props: `bg`, `color`, `borderColor`, etc.
- And many more...

For a complete list of available props, refer to the [Chakra UI Box documentation](https://chakra-ui.com/docs/components/box).

### Custom className

You can pass a custom `className` prop to add additional styling:

```tsx
<BpkBox className="my-custom-class" padding={4}>
  Content
</BpkBox>
```

### Semantic HTML

Use the `as` prop to render as a different HTML element:

```tsx
<BpkBox as="section" padding={4}>
  Content
</BpkBox>
```

