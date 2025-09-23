# BpkProgressRing

> Backpack progress ring component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```tsx
import BpkProgressRing, { PROGRESS_RING_SIZES } from '@skyscanner/backpack-web/bpk-component-progress-ring';

export default () => (
  <div>
    {/* Basic usage */}
    <BpkProgressRing value={50} aria-label="Loading progress" />
    
    {/* With content */}
    <BpkProgressRing value={75} aria-label="Upload progress">
      75%
    </BpkProgressRing>
    
    {/* Different sizes */}
    <BpkProgressRing 
      value={60} 
      size={PROGRESS_RING_SIZES.small} 
      aria-label="Small progress" 
    />
    <BpkProgressRing 
      value={60} 
      size={PROGRESS_RING_SIZES.large} 
      aria-label="Large progress" 
    />
    
    {/* Custom max value */}
    <BpkProgressRing value={25} max={50} aria-label="Half complete">
      50%
    </BpkProgressRing>
  </div>
);
```

## Props

| Property            | PropType                                                  | Required | Default Value |
| ------------------- | --------------------------------------------------------- | -------- | ------------- |
| value               | number                                                    | true     | -             |
| max                 | number                                                    | false    | 100           |
| size                | oneOf(PROGRESS_RING_SIZES.small, PROGRESS_RING_SIZES.default, PROGRESS_RING_SIZES.large) | false | PROGRESS_RING_SIZES.default |
| className           | string                                                    | false    | null          |
| children            | ReactNode                                                 | false    | null          |
| aria-label          | string                                                    | false    | null          |
| aria-describedby    | string                                                    | false    | null          |

## Accessibility

The `BpkProgressRing` component follows accessibility best practices:

- Uses `role="progressbar"` for screen readers
- Includes `aria-valuenow`, `aria-valuemin`, and `aria-valuemax` attributes
- Supports `aria-label` for providing accessible names
- Supports `aria-describedby` for additional descriptions
- Provides visual and programmatic progress indication

Always provide an `aria-label` to describe what the progress represents to screen reader users.

## Size Variants

The component supports three size variants:

- `PROGRESS_RING_SIZES.small` - 32px diameter
- `PROGRESS_RING_SIZES.default` - 48px diameter  
- `PROGRESS_RING_SIZES.large` - 64px diameter

## Content

The progress ring can display content in its center by passing children. This is commonly used to show percentage values or status text.

## Theming

This component doesn't currently support theming.

## Migration

### From other progress components

If migrating from other progress indicators, ensure you:

1. Update to use the new prop names
2. Add appropriate `aria-label` attributes
3. Consider if `BpkProgressRing` is the right component for your use case
4. Test with screen readers