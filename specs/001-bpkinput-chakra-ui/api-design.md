# API Design: BpkInputV2 with Chakra UI

**Feature**: BpkInputV2 Chakra UI Reimplementation
**Spec**: [spec.md](./spec.md)
**Date**: 2026-01-27

## Component APIs

### BpkInputV2

**Component Signature**:
```typescript
const BpkInputV2 = forwardRef<HTMLInputElement, BpkInputV2Props>((props, ref) => {
  // Implementation
});
```

**Props Interface** (unchanged from existing):
```typescript
type BpkInputV2Props = PropsWithoutClearButtonMode | PropsWithClearButtonMode;

type PropsWithoutClearButtonMode = BaseProps & {
  clearButtonMode?: 'never';
  clearButtonLabel?: string | null;
  onClear?: ((e?: SyntheticEvent<HTMLButtonElement>) => void) | null;
};

type PropsWithClearButtonMode = BaseProps & {
  clearButtonMode: 'whileEditing' | 'always';
  clearButtonLabel: string;
  onClear: (e?: SyntheticEvent<HTMLButtonButton>) => void;
};

type BaseProps = {
  id: string;  // Required
  name: string;  // Required
  value: string | number;  // Required
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;  // Required
  type?: 'text' | 'email' | 'number' | 'password' | 'tel';  // Default: 'text'
  valid?: boolean | null;  // Default: null
  large?: boolean;  // Default: false
  docked?: boolean;  // Default: false
  dockedFirst?: boolean;  // Default: false
  dockedMiddle?: boolean;  // Default: false
  dockedLast?: boolean;  // Default: false
  disabled?: boolean;  // Default: false
  placeholder?: string;
  className?: string;
  inputRef?: ((ref: HTMLInputElement) => void) | null;
} & ComponentProps<'input'>;  // All HTML input attributes
```

**Usage Examples**:

```typescript
// Basic input
<BpkInputV2
  id="name"
  name="name"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>

// With validation
<BpkInputV2
  id="email"
  name="email"
  type="email"
  value={email}
  valid={isValidEmail}
  onChange={(e) => setEmail(e.target.value)}
/>

// With clear button
<BpkInputV2
  id="search"
  name="search"
  value={searchTerm}
  clearButtonMode="whileEditing"
  clearButtonLabel="Clear search"
  onClear={() => setSearchTerm('')}
  onChange={(e) => setSearchTerm(e.target.value)}
/>

// Large size
<BpkInputV2
  id="destination"
  name="destination"
  value={destination}
  large
  onChange={(e) => setDestination(e.target.value)}
/>
```

### BpkInputGroup

**Component Signature**:
```typescript
const BpkInputGroup = (props: BpkInputGroupProps) => {
  // Implementation
};
```

**Props Interface**:
```typescript
type BpkInputGroupProps = {
  children: ReactNode;  // Required - typically BpkInputV2
  startElement?: ReactNode;  // Optional
  endElement?: ReactNode;  // Optional
  className?: string;  // Optional
};
```

**Usage Examples**:

```typescript
// With currency symbol
<BpkInputGroup startElement={<span>$</span>}>
  <BpkInputV2
    id="price"
    name="price"
    value={price}
    onChange={(e) => setPrice(e.target.value)}
  />
</BpkInputGroup>

// With unit label
<BpkInputGroup endElement={<span>kg</span>}>
  <BpkInputV2
    id="weight"
    name="weight"
    type="number"
    value={weight}
    onChange={(e) => setWeight(e.target.value)}
  />
</BpkInputGroup>

// With both
<BpkInputGroup startElement={<span>$</span>} endElement={<span>USD</span>}>
  <BpkInputV2
    id="amount"
    name="amount"
    value={amount}
    onChange={(e) => setAmount(e.target.value)}
  />
</BpkInputGroup>
```

## Constants & Enums

**INPUT_TYPES**:
```typescript
const INPUT_TYPES = {
  text: 'text',
  email: 'email',
  number: 'number',
  password: 'password',
  tel: 'tel',
} as const;
```

**CLEAR_BUTTON_MODES**:
```typescript
const CLEAR_BUTTON_MODES = {
  never: 'never',
  whileEditing: 'whileEditing',
  always: 'always',
} as const;
```

## Chakra UI Integration Details

### Chakra Components Used

**From `@chakra-ui/react`**:
- `Input` - Core input component
- `InputGroup` - Container for grouped inputs
- `InputLeftElement` - Left-side decorative element container
- `InputRightElement` - Right-side decorative element container

### Chakra Provider Requirement

**Provider Setup** (required for all usage):
```typescript
import { BpkProvider } from '@skyscanner/backpack-web/bpk-component-layout';

// BpkProvider internally provides ChakraProvider
<BpkProvider>
  <YourApp>
    <BpkInputV2 {...props} />
  </YourApp>
</BpkProvider>
```

**Test Setup**:
```typescript
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';

// Wrap all test renders
const { container } = render(
  <ChakraProvider value={defaultSystem}>
    <BpkInputV2 {...props} />
  </ChakraProvider>
);
```

### Props Mapping (Chakra to Backpack)

| Backpack Prop | Chakra Prop | Notes |
|---------------|-------------|-------|
| `value` | `value` | Direct pass-through |
| `onChange` | `onChange` | Direct pass-through |
| `type` | `type` | Direct pass-through |
| `disabled` | `disabled` | Direct pass-through |
| `placeholder` | `placeholder` | Direct pass-through |
| `className` | `className` | Applied to override styles |
| `ref` (forwarded) | `ref` | Chakra Input supports forwardRef |
| All HTML attrs | `{...rest}` | Spread to Chakra Input |

**Style Override Approach**:
- All visual styling comes from Backpack SCSS
- Chakra Input receives className with Backpack classes
- SCSS targets `[data-chakra-input]` to override Chakra defaults
- Use `!important` to ensure Backpack styles win

## API Compatibility Matrix

| Feature | Current Implementation | Chakra Implementation | Compatible |
|---------|------------------------|------------------------|------------|
| Basic input | Native `<input>` | Chakra `<Input>` | ✅ Yes |
| Validation states | CSS classes + aria-invalid | CSS classes + aria-invalid | ✅ Yes |
| Clear button | Custom button + logic | Custom button + logic (unchanged) | ✅ Yes |
| Large size | CSS class | CSS class | ✅ Yes |
| Input types | type prop | type prop | ✅ Yes |
| Docked layouts | CSS classes | CSS classes | ✅ Yes |
| Disabled state | disabled prop | disabled prop | ✅ Yes |
| Custom className | Applied to input or container | Applied to input or container | ✅ Yes |
| inputRef callback | useEffect + callback | useEffect + callback | ✅ Yes |
| forwardRef | useRef + useEffect | useRef + useEffect | ✅ Yes |
| HTML attributes | {...rest} spread | {...rest} spread | ✅ Yes |
| InputGroup | Custom div positioning | Chakra InputGroup | ✅ Yes (enhanced) |

**100% API compatibility confirmed** - all existing code works without changes.

## Export Structure

**Package Exports** (`packages/bpk-component-input/index.ts`):
```typescript
// BpkInputV2 (Chakra foundation)
export { BpkInputV2 } from './src/BpkInputV2/BpkInputV2';
export type { BpkInputV2Props } from './src/BpkInputV2/common-types';
export { INPUT_TYPES_V2, CLEAR_BUTTON_MODES_V2 } from './src/BpkInputV2/common-types';

// BpkInputGroup (Chakra InputGroup)
export { BpkInputGroup } from './src/BpkInputGroup/BpkInputGroup';
export type { BpkInputGroupProps } from './src/BpkInputGroup/BpkInputGroup';
```

## References

- Specification: [spec.md](./spec.md)
- Research: [research.md](./research.md)
- Existing Implementation: `packages/bpk-component-input/src/BpkInputV2/`
- Chakra UI Input Docs: https://chakra-ui.com/docs/components/input
- Chakra UI InputGroup Docs: https://chakra-ui.com/docs/components/input#input-group
