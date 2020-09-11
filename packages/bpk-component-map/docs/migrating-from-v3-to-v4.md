# Migrating from `v3` to `v4`

`BpkMapMarker` has been completely rewritten to have a new look and a new name — `BpkIconMarker`. **If you are not using `BpkMapMarker`, this change will not break anything for you and you can ignore this migration guide.**

## History and rationale

The original map marker component was added to suit the needs of one team at Skyscanner. Over time, more complex use cases have appeared and the need for a redesign became clear, to provide a clear, easy-to-use component that can suit more use cases.

## Migrating

### TL;DR

* `BpkMapMarker` is now `BpkIconMarker`.
* The `large` prop has been removed.
* A `disabled` prop has been added.
* A `selected` prop has been added.
* `arrowClassNames` has been removed, because there is no separate arrow element any more.
* The `type` prop and the `MARKER_TYPES` object have been removed, there is now only one type of marker.
* The themeable attributes exported have changed. Use `defaultIconMarkerThemeAttributes` to theme icon markers.

### Changing from `large` to `selected`

Some teams were changing the `large` prop when pressing the marker to apply a pseudo selected appearance. With the new selected prop, simply replace `large` with `selected`:

#### Original

```jsx
import React from 'react';
import { BpkMapMarker } from 'bpk-component-map';
import BusIconSm from 'bpk-component-icon/sm/bus';

const MyComponent = () => (
  <BpkMapMarker
    position={{ latitude: 35.661777, longitude: 139.704051 }}
    icon={<BusIconSm />}
    large={this.state.selected}
  />
)
```

#### Replacement

```jsx
import React from 'react';
import { BpkIconMarker } from 'bpk-component-map';
import BusIconSm from 'bpk-component-icon/sm/bus';

const MyComponent = () => (
  <BpkIconMarker
    position={{ latitude: 35.661777, longitude: 139.704051 }}
    icon={<BusIconSm />}
    selected={this.state.selected}
  />
)
```

### Small icons

The new map marker **only** works with small icons from the Backpack icon library. Using large icons for the `icon` prop is not supported.
