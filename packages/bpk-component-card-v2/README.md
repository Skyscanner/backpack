# BpkCardV2

A composable, responsive card component for Backpack that supports multi-area layouts, explicit composition, and flexible surface color theming. BpkCardV2 enables developers to build complex card designs without custom CSS or wrapper components.

## Installation

```bash
npm install @skyscanner/backpack-web
```

## Usage

### Basic card with sections

```tsx
import BpkCardV2 from '@skyscanner/backpack-web/bpk-component-card-v2';

<BpkCardV2.Root>
  <BpkCardV2.Header>Header content</BpkCardV2.Header>
  <BpkCardV2.Body>Body content</BpkCardV2.Body>
  <BpkCardV2.Footer>Footer content</BpkCardV2.Footer>
</BpkCardV2.Root>
```

### Split layout (70/30 two-column on desktop, stacked on mobile)

```tsx
import BpkCardV2 from '@skyscanner/backpack-web/bpk-component-card-v2';

<BpkCardV2.Root>
  <BpkCardV2.Body templateColumns={{ base: '1fr', tablet: '7fr auto 3fr' }}>
    <BpkCardV2.Section>Main content (70%)</BpkCardV2.Section>
    <BpkCardV2.Divider />
    <BpkCardV2.Section>Sidebar (30%)</BpkCardV2.Section>
  </BpkCardV2.Body>
</BpkCardV2.Root>
```

### With custom surface color

```tsx
<BpkCardV2.Root bgColor="surfaceElevated">
  <BpkCardV2.Body>Card with elevated surface color</BpkCardV2.Body>
</BpkCardV2.Root>
```

### With custom padding

```tsx
import { BpkSpacing } from '@skyscanner/backpack-web/bpk-component-layout';

<BpkCardV2.Root>
  <BpkCardV2.Header padding={BpkSpacing.LG}>Large padding header</BpkCardV2.Header>
  <BpkCardV2.Body padding={BpkSpacing.SM}>
    Custom padding body
  </BpkCardV2.Body>
  <BpkCardV2.Footer paddingTop={BpkSpacing.None} paddingBottom={BpkSpacing.Base}>
    Individual side padding
  </BpkCardV2.Footer>
</BpkCardV2.Root>
```