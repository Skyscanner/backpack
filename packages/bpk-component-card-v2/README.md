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

<BpkCardV2>
  <BpkCardV2.Header>Header content</BpkCardV2.Header>
  <BpkCardV2.Body>Body content</BpkCardV2.Body>
  <BpkCardV2.Footer>Footer content</BpkCardV2.Footer>
</BpkCardV2>
```

### Split layout (70/30 two-column on desktop, stacked on mobile)

```tsx
<BpkCardV2>
  <BpkCardV2.Body split splitRatio={70}>
    <BpkCardV2.Primary>Main content (70%)</BpkCardV2.Primary>
    <BpkCardV2.Secondary>Sidebar (30%)</BpkCardV2.Secondary>
  </BpkCardV2.Body>
</BpkCardV2>
```

### With custom surface color

```tsx
<BpkCardV2 bgColor="surfaceElevated">
  Card with elevated surface color
</BpkCardV2>
```

## Props

### BpkCardV2

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'outlined'` | `'default'` | Visual variant styling |
| `bgColor` | Surface token | `'surfaceDefault'` | Background surface color |
| `children` | `ReactNode` | - | Card content (Header, Body, Footer subcomponents) |
| `className` | `string` | - | Additional CSS class names |
| `ariaLabel` | `string` | - | Accessible label |
| `ariaLabelledBy` | `string` | - | ID of labelling element |

### BpkCardV2.Body

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `split` | `boolean` | `false` | Enable two-column split layout |
| `splitRatio` | `0-100` | `70` | Primary section percentage width on desktop |
| `children` | `ReactNode` | - | Body content or Primary/Secondary subcomponents |
| `className` | `string` | - | Additional CSS class names |

### BpkCardV2.Header, BpkCardV2.Footer

| Prop | Type | Description |
|------|------|-------------|
| `children` | `ReactNode` | Section content |
| `className` | `string` | Additional CSS class names |

## Browser support

- Chrome 109+
- Edge 129+
- Firefox 131+
- Safari 15+
- Samsung 26+

## Accessibility

BpkCardV2 uses semantic HTML (`<header>`, `<footer>`) and supports keyboard navigation through all content regions. The component is fully keyboard accessible with proper focus management. All implementations meet WCAG 2.1 Level AA standards.

## Related components

- [BpkCard](https://www.skyscanner.design/latest/components/card) - Standard card component
- [BpkPanel](https://www.skyscanner.design/latest/components/panel) - Panel component

## Figma

[View in Figma](https://www.figma.com/design/ITvypOGdga42nM2ipBM4uk/Bpk-2.0?node-id=365-1783&m=dev)
