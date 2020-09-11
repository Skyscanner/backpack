# Migrating from `v3` to `v4`

Version 4 of `bpk-component-chip` has been completely rewritten to have a clearer API and support more features.

## History and rationale

Originally, chips were always dismissible. In `v3.1.0`, a `dismissible` prop was added that hid the close button. This had the side effect of making the API less clear, because props like `onClose` and `closeLabel` were still required even though they weren't needed on a non-dismissible chip.

After this, people began to request a chip that could be toggled on/off, like what's already offered for apps.

Because of both of these factors, we decided to rewrite the component to better support both of these use cases.

## Migrating

### TL;DR

* `BpkChip` is now `BpkSelectableChip` and `BpkDismissibleChip`.
* `onClose` is now `onClick`.
* `closeLabel` is now `accessibilityLabel`.

### Dismissible chips

Basic dismissible chips are simple to migrate. This should cover the overwhelming majority of current uses of the chip component.

#### Original

```jsx
import React from 'react';
import BpkChip from 'bpk-component-chip';

const MyComponent = () => (
  <BpkChip
    closeLabel="Close"
    onClose={ /* Handle closing the chip */}
  >
    Chip
  </BpkChip>
)
```

#### Replacement

```jsx
import React from 'react';
import { BpkDismissibleChip } from 'bpk-component-chip';

const MyComponent = () => (
  <BpkDismissibleChip
    accessibilityLabel="Close"
    onClick={ /* Handle closing the chip */}
  >
    Chip
  </BpkDismissibleChip>
)
```

### Selectable chips

Prior to `v4`, selectable/toggleable chips were something of a hack, by using a non-dismissible chip and changing the `type` prop from `neutral` to `primary` when the chip was pressed.

Now, this is properly supported with a first-class API, and the component is marked up with the correct accessibility role.

#### Original

```jsx
import React, { useState } from 'react';
import BpkChip, { CHIP_TYPES } from 'bpk-component-chip';

const MyComponent = () => {
  const [ selected, setSelected ] = useState(false);
  return (
    <BpkChip
      closeLabel="Close"
      onClose={() => {}}
      dismissible={false}
      type={selected ? CHIP_TYPES.primary : CHIP_TYPES.neutral}
      onClick={() => { setSelected(!selected) }}
    >
      Chip
    </BpkChip>
  );
```

#### Replacement

```jsx
import React, { useState } from 'react';
import BpkSelectableChip from 'bpk-component-chip';

const MyComponent = () => {
  const [ selected, setSelected ] = useState(false);
  return (
    <BpkSelectableChip
      accessibilityLabel="Toggle"
      selected={selected}
      onClick={() => { setSelected(!selected) }}
    >
      Chip
    </BpkSelectableChip>
  );
```

### Other changes

#### Accessory views

You can now add icons to your chips using the `leadingAccessoryView` and `trailingAccessoryView` props.

**Note:** `trailingAccessoryView` is not supported on `BpkDismissibleChip` because the close icon is already there.

#### Chip types

Prior to `v4` there were four members of `CHIP_TYPES`:

| Type | Appearance |
| - | - |
| light | White |
| neutral | Grey |
| primary | Blue |
| success | Green |

`v4` streamlines this by removing some types, and building in appearance changes based on the `selected` prop.

| Type | Appearance (`selected={false}`) | Appearance (`selected={true}`) |
| - | - | - |
| light | White | Blue |
| primary | Grey | Blue |
| success | Grey | Green |
