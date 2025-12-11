# bpk-component-segmented-control

> Backpack segmented control component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

### Basic Usage

```tsx
import BpkSegmentedControl, {
  SEGMENT_TYPES,
} from '@skyscanner/backpack-web/bpk-component-segmented-control';

export default () => (
  <BpkSegmentedControl
    buttonContents={['Specific dates', 'Flexible dates']}
    label="Date selection" // Accessible name, this should be localised
    onItemClick={(index) => console.log(`Selected index: ${index}`)}
    selectedIndex={0}
    type={SEGMENT_TYPES.CanvasDefault}
  />
);
```

### With Tab Panels (Recommended)

When using the segmented control to switch between content panels, use the `useSegmentedControlPanels` hook for automatic ID generation and proper ARIA relationships.

```tsx
import { useState } from 'react';
import BpkSegmentedControl, {
  useSegmentedControlPanels,
  SEGMENT_TYPES,
} from '@skyscanner/backpack-web/bpk-component-segmented-control';

const TabbedContent = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const buttonContents = ['Flights', 'Hotels', 'Car hire'];

  const { controlProps, getPanelProps } = useSegmentedControlPanels(
    buttonContents,
    selectedIndex,
  );

  return (
    <div>
      <BpkSegmentedControl
        {...controlProps}
        label="Travel options"
        onItemClick={setSelectedIndex}
        type={SEGMENT_TYPES.CanvasDefault}
      />
      <div {...getPanelProps(0)}>
        <p>Search for flights to your destination.</p>
      </div>
      <div {...getPanelProps(1)}>
        <p>Find the perfect place to stay.</p>
      </div>
      <div {...getPanelProps(2)}>
        <p>Rent a car for your trip.</p>
      </div>
    </div>
  );
};

export default TabbedContent;
```

## Accessibility

The `BpkSegmentedControl` component implements the [ARIA tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) with full keyboard navigation support.

### Keyboard Navigation

- **Arrow Left/Right**: Move focus between tabs (respects RTL layouts)
- **Home**: Move focus to the first tab
- **End**: Move focus to the last tab
- **Enter/Space**: Activate the focused tab (in manual mode)

### Activation Modes

The component supports two activation modes:

- **Automatic (default)**: Tabs are activated automatically when focused via keyboard navigation. This provides a faster experience but may cause frequent content changes.
- **Manual**: Tabs must be explicitly activated using Enter or Space keys after focusing. This is recommended when tab panel content is computationally expensive or when rapid content changes could be disorienting.

## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/segmented-control/web).
