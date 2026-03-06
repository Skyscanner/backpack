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
<BpkCardV2.Root>
  <BpkCardV2.Body split splitRatio={70}>
    <BpkCardV2.Primary>Main content (70%)</BpkCardV2.Primary>
    <BpkCardV2.Secondary>Sidebar (30%)</BpkCardV2.Secondary>
  </BpkCardV2.Body>
</BpkCardV2.Root>
```

### With custom surface color

```tsx
<BpkCardV2.Root bgColor="surfaceElevated">
  Card with elevated surface color
</BpkCardV2.Root>
```

### With custom padding

```tsx
<BpkCardV2.Root>
  <BpkCardV2.Header padding="lg">Large padding header</BpkCardV2.Header>
  <BpkCardV2.Body padding={{ vertical: 'sm', horizontal: 'xl' }}>
    Custom vertical and horizontal padding
  </BpkCardV2.Body>
  <BpkCardV2.Footer padding={{ top: 'none', bottom: 'md' }}>
    Individual side padding
  </BpkCardV2.Footer>
</BpkCardV2.Root>
```