# bpk-component-thumb

> Backpack thumb component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```tsx
import { useState } from 'react';
import BpkThumb from '@skyscanner/backpack-web/bpk-component-thumb';

export default () => {
  const [selectedThumb, setSelectedThumb] = useState<'up' | 'down' | null>(null);

  return (
    <div>
      <BpkThumb
        type="up"
        accessibilityLabel="Rate as helpful"
        selected={selectedThumb === 'up'}
        onClick={(type) => setSelectedThumb(type === selectedThumb ? null : type)}
      />
      <BpkThumb
        type="down"
        accessibilityLabel="Rate as not helpful"
        selected={selectedThumb === 'down'}
        onClick={(type) => setSelectedThumb(type === selectedThumb ? null : type)}
      />
    </div>
  );
};
```

## Props

| Property           | PropType                   | Required | Default Value |
| ------------------ | -------------------------- | -------- | ------------- |
| accessibilityLabel | string                     | true     | -             |
| type               | 'up' \| 'down'             | true     | -             |
| onClick            | (type: ThumbsType) => void | false    | null          |
| selected           | boolean                    | false    | false         |
| disabled           | boolean                    | false    | false         |

**Note:** This component does not support `className` or `style` props to maintain visual consistency across the design system.

## Accessibility

The `BpkThumb` component is designed with accessibility in mind:

- Uses semantic `<button>` element for proper keyboard navigation
- Requires `accessibilityLabel` prop for screen reader support
- Supports keyboard interaction (Tab, Enter, Space keys)
- Respects `prefers-reduced-motion` for animations
- Provides clear visual feedback for hover, selected, and disabled states
- Includes proper ARIA labels and attributes
- Meets WCAG 2.1 Level AA standards for color contrast

### Best Practices

1. Always provide a clear and descriptive `accessibilityLabel` that describes the action
2. Use this component in pairs (up/down) for rating or feedback scenarios
3. Provide visual feedback for selected state
4. Consider providing text labels alongside the thumbs for additional clarity

## States

The component supports the following states:

- **Default**: Normal, interactive state
- **Hovered**: Visual feedback when mouse hovers over the thumb
- **Selected**: Highlighted state when the thumb is selected
- **Disabled**: Non-interactive state when the button is disabled
- **Selected + Disabled**: Selected appearance with disabled interaction

## Design tokens

The component uses the following design tokens:

- `bpk-text-disabled-day` - Default icon color
- `bpk-text-secondary-day` - Hover state icon color
- `bpk-core-accent-day` - Selected state icon color
- `bpk-spacing-lg` - Button size and spacing
