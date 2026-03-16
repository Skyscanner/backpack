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
import { useState, useMemo } from 'react';
import BpkSegmentedControl, {
  useSegmentedControlPanels,
  SEGMENT_TYPES,
} from '@skyscanner/backpack-web/bpk-component-segmented-control';

const TabbedContent = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // For optimal performance, memoize buttonContents to prevent unnecessary recalculations
  const buttonContents = useMemo(() => ['Flights', 'Hotels', 'Car hire'], []);

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

## Performance

### Memoizing Button Contents

For optimal performance when using `useSegmentedControlPanels` or frequently re-rendering the component, memoize the `buttonContents` array to prevent unnecessary recalculations:

```tsx
// ✅ Good - memoized array
const buttonContents = useMemo(() => ['Option 1', 'Option 2'], []);

// ✅ Good - defined outside component
const BUTTON_CONTENTS = ['Option 1', 'Option 2'];

// ❌ Avoid - creates new array on every render
const buttonContents = ['Option 1', 'Option 2'];
```

This is especially important when:
- Using the `useSegmentedControlPanels` hook
- The parent component re-renders frequently
- The button contents are complex React elements

## Props

Check out the full list of props on Skyscanner's [design system documentation website]( https://www.skyscanner.design/latest/components/section-list/web-tP8t6vq8).

---

## BpkSegmentedControlV2 (experimental)

A composable, accessible segmented control backed by [Ark-UI SegmentGroup](https://ark-ui.com/react/docs/components/segment-group). Each segment is composed from slot components — `Item`, `ItemText`, `ItemControl`, and `ItemHiddenInput` — giving full control over content structure. Theming is driven by CSS custom properties so VDL 2.0 adopters can override tokens at any wrapper level.

### Basic usage

```tsx
import { useState } from 'react';
import {
  BpkSegmentedControlV2,
  SEGMENT_TYPES_V2,
} from '@skyscanner/backpack-web/bpk-component-segmented-control';

const SortControl = () => {
  const [selected, setSelected] = useState('price');
  return (
    <BpkSegmentedControlV2.Root
      label="Sort results by"
      value={selected}
      onChange={setSelected}
      type={SEGMENT_TYPES_V2.CanvasDefault}
    >
      <BpkSegmentedControlV2.Indicator />
      <BpkSegmentedControlV2.Item value="price">
        <BpkSegmentedControlV2.ItemText>Price</BpkSegmentedControlV2.ItemText>
        <BpkSegmentedControlV2.ItemControl />
        <BpkSegmentedControlV2.ItemHiddenInput />
      </BpkSegmentedControlV2.Item>
      <BpkSegmentedControlV2.Item value="rating">
        <BpkSegmentedControlV2.ItemText>Rating</BpkSegmentedControlV2.ItemText>
        <BpkSegmentedControlV2.ItemControl />
        <BpkSegmentedControlV2.ItemHiddenInput />
      </BpkSegmentedControlV2.Item>
      <BpkSegmentedControlV2.Item value="duration">
        <BpkSegmentedControlV2.ItemText>Duration</BpkSegmentedControlV2.ItemText>
        <BpkSegmentedControlV2.ItemControl />
        <BpkSegmentedControlV2.ItemHiddenInput />
      </BpkSegmentedControlV2.Item>
    </BpkSegmentedControlV2.Root>
  );
};
```

### Complex content

`ItemText` accepts any React children — icons, multi-line layouts, or custom components:

```tsx
<BpkSegmentedControlV2.Root label="Sort by" defaultValue="best">
  <BpkSegmentedControlV2.Indicator />
  <BpkSegmentedControlV2.Item value="best">
    <BpkSegmentedControlV2.ItemText>
      <div>Best</div>
      <div>£84</div>
      <div>2h average</div>
    </BpkSegmentedControlV2.ItemText>
    <BpkSegmentedControlV2.ItemControl />
    <BpkSegmentedControlV2.ItemHiddenInput />
  </BpkSegmentedControlV2.Item>
</BpkSegmentedControlV2.Root>
```

### Icon-only items

Wrap icon-only items with `BpkVisuallyHidden` to satisfy WCAG 4.1.2:

```tsx
import BpkVisuallyHidden from '@skyscanner/backpack-web/bpk-component-visually-hidden';
import GridLayoutIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/grid-layout';
import ListIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/list';

<BpkSegmentedControlV2.Root label="View layout" defaultValue="grid">
  <BpkSegmentedControlV2.Indicator />
  <BpkSegmentedControlV2.Item value="grid">
    <BpkSegmentedControlV2.ItemText>
      <GridLayoutIcon />
      <BpkVisuallyHidden>Grid view</BpkVisuallyHidden>
    </BpkSegmentedControlV2.ItemText>
    <BpkSegmentedControlV2.ItemControl />
    <BpkSegmentedControlV2.ItemHiddenInput />
  </BpkSegmentedControlV2.Item>
  <BpkSegmentedControlV2.Item value="list">
    <BpkSegmentedControlV2.ItemText>
      <ListIcon />
      <BpkVisuallyHidden>List view</BpkVisuallyHidden>
    </BpkSegmentedControlV2.ItemText>
    <BpkSegmentedControlV2.ItemControl />
    <BpkSegmentedControlV2.ItemHiddenInput />
  </BpkSegmentedControlV2.Item>
</BpkSegmentedControlV2.Root>
```

### Migrating from V1

| V1 | V2 equivalent |
|---|---|
| `buttonContents={['Price', 'Rating']}` | Two `<BpkSegmentedControlV2.Item>` children with `ItemText` |
| `selectedIndex={0}` | `value="price"` |
| `onItemClick={(i) => fn(i)}` | `onChange={(v) => fn(v)}` |
| `type={SEGMENT_TYPES.CanvasDefault}` | `type={SEGMENT_TYPES_V2.CanvasDefault}` |

### BpkSegmentedControlV2.Root props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | `BpkSegmentedControlV2.Indicator` (recommended first) followed by one or more `BpkSegmentedControlV2.Item` elements |
| `label` | `string` | — | Accessible group label (required for WCAG 4.1.2) |
| `value` | `string` | — | Controlled selected value |
| `defaultValue` | `string` | — | Uncontrolled initial value |
| `onChange` | `(value: string) => void` | — | Called when selection changes |
| `type` | `SegmentTypesV2` | `'canvas-default'` | Visual style variant |
| `shadow` | `boolean` | `false` | Adds a box shadow |
| `activationMode` | `'automatic' \| 'manual'` | `'automatic'` | When to commit selection on keyboard navigation |

### BpkSegmentedControlV2.Item props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | — | Unique identifier for this segment |
| `children` | `ReactNode` | — | Slot content — typically `ItemText` + `ItemControl` + `ItemHiddenInput` |

### BpkSegmentedControlV2.ItemText props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | Visible content — text, icons, or a combination |

### BpkSegmentedControlV2.ItemControl

No props. Renders the visual selected-state indicator for the segment.

### BpkSegmentedControlV2.ItemHiddenInput

No props. Renders the visually-hidden `<input type="radio">` required for keyboard interaction and form submission.

### BpkSegmentedControlV2.Indicator

No props. Renders the animated sliding highlight that tracks the selected segment. Place it as the **first child** of `BpkSegmentedControlV2.Root`, before any `Item` elements.
