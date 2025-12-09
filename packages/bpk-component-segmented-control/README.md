# bpk-segmented-control

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

### Basic usage

```js
import BpkSegmentedControl from '@skyscanner/backpack-web/bpk-component-segmented-control';

export default () => (
  <BpkSegmentedControl
    buttonContents={['Option 1', 'Option 2', 'Option 3']}
    label="Trip type" // Accessible name, this should be localised
    onItemClick={(index) => console.log('Selected:', index)}
    selectedIndex={1} // button selected on load
    type={SEGMENT_TYPES.SurfaceContrast}
    shadow
  />
);
```

### With tab panels (recommended for accessibility)

When using the segmented control to switch between content panels, use the `getTabPanelProps` helper to ensure proper ARIA relationships:

```js
import { useState } from 'react';
import BpkSegmentedControl, {
  getTabPanelProps,
} from '@skyscanner/backpack-web/bpk-component-segmented-control';

export default () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div>
      <BpkSegmentedControl
        id="my-tabs"
        buttonContents={['Flights', 'Hotels', 'Car hire']}
        label="Travel options"
        onItemClick={setSelectedIndex}
        selectedIndex={selectedIndex}
        panelIds={['my-tabs-panel-0', 'my-tabs-panel-1', 'my-tabs-panel-2']}
      />
      <div {...getTabPanelProps('my-tabs', 0, selectedIndex)}>
        Flights content
      </div>
      <div {...getTabPanelProps('my-tabs', 1, selectedIndex)}>
        Hotels content
      </div>
      <div {...getTabPanelProps('my-tabs', 2, selectedIndex)}>
        Car hire content
      </div>
    </div>
  );
};
```

### With conditional rendering

You can also use conditional rendering instead of the `hidden` attribute. When doing so, manually add the panel accessibility attributes:

```js
import { useState } from 'react';
import BpkSegmentedControl from '@skyscanner/backpack-web/bpk-component-segmented-control';

export default () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div>
      <BpkSegmentedControl
        id="my-tabs"
        buttonContents={['Specific dates', 'Flexible dates']}
        label="Date selection"
        onItemClick={setSelectedIndex}
        selectedIndex={selectedIndex}
        panelIds={['my-tabs-panel-0', 'my-tabs-panel-1']}
      />
      {selectedIndex === 0 && (
        <div
          id="my-tabs-panel-0"
          role="tabpanel"
          aria-labelledby="my-tabs-tab-0"
        >
          Specific dates content
        </div>
      )}
      {selectedIndex === 1 && (
        <div
          id="my-tabs-panel-1"
          role="tabpanel"
          aria-labelledby="my-tabs-tab-1"
        >
          Flexible dates content
        </div>
      )}
    </div>
  );
};
```

## Accessibility

### Keyboard navigation

The component implements the [WAI-ARIA Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) with the following keyboard interactions:

| Key                | Action                                     |
| ------------------ | ------------------------------------------ |
| `←` / `ArrowLeft`  | Move focus to previous tab (wraps to last) |
| `→` / `ArrowRight` | Move focus to next tab (wraps to first)    |
| `Home`             | Move focus to first tab                    |
| `End`              | Move focus to last tab                     |
| `Tab`              | Move focus into/out of the tab list        |

Selection follows focus automatically (automatic activation mode).

### ARIA attributes

The component automatically applies:

- `role="tablist"` on the container
- `role="tab"` on each button
- `aria-selected` to indicate the selected tab
- `aria-orientation="horizontal"` on the tablist
- `aria-controls` linking to panels (when `panelIds` prop provided)

When using the `getTabPanelProps` helper, panels receive:

- `role="tabpanel"`
- `aria-labelledby` linking back to the controlling tab
- `hidden` attribute for non-selected panels
- `tabIndex={0}` to allow focus when panel has no focusable content

## Props

| Property       | PropType             | Required | Default Value               |
| -------------- | -------------------- | -------- | --------------------------- |
| buttonContents | arrayOf(node)        | true     | -                           |
| onItemClick    | func                 | true     | -                           |
| selectedIndex  | number               | true     | -                           |
| id             | string               | false    | auto-generated              |
| label          | string               | false    | -                           |
| panelIds       | arrayOf(string)      | false    | -                           |
| shadow         | bool                 | false    | false                       |
| type           | oneOf(SEGMENT_TYPES) | false    | SEGMENT_TYPES.CanvasDefault |

### getTabPanelProps

Helper function to generate accessibility props for tab panels.

```ts
getTabPanelProps(baseId: string, index: number, selectedIndex: number): TabPanelProps
```

| Parameter     | Type   | Description                                 |
| ------------- | ------ | ------------------------------------------- |
| baseId        | string | The same `id` passed to BpkSegmentedControl |
| index         | number | The index of this panel (0-based)           |
| selectedIndex | number | The currently selected tab index            |

Returns an object with: `id`, `role`, `aria-labelledby`, `hidden`, `tabIndex`
