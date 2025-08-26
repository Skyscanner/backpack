# Migrating from `v1` to `v2`

The content and implementation from `BpkPriceMarkerV2` have been merged into the original `BpkPriceMarker` component. As a result, `BpkPriceMarkerV2` has been removed.
**If you are not using `BpkPriceMarker`, this change will not break anything for you and you can ignore this migration guide.**

## Migrating

### TL;DR

Compared to the previous `BpkPriceMarker` component, the new version introduces the following key changes::
* The `disabled` prop has been removed.
* The `arrowClassName` prop has been removed.
* The `PRICE_MARKER_STATUSES` has been removed.
* The `MARKER_STATUSES` has been added
* The `accessibilityLabel` prop has been added.
* The `icon` has been added.

#### Original

```jsx
import { BpkPriceMarker } from '@skyscanner/backpack-web/bpk-component-map';

const MyComponent = () => (
  <BpkPriceMarker
    label="£120"
    position={{ latitude: 27.9881, longitude: 86.925 }}
    onClick={() => {
      console.log('Price marker pressed.');
    }}
    status={PRICE_MARKER_STATUSES.focused}
    disabled
  />
)
```

#### Replacement

```jsx
import { BpkPriceMarker } from '@skyscanner/backpack-web/bpk-component-map';
import AirportsIconSm from '@skyscanner/backpack-web/bpk-component-icon/sm/airports';

const AlignedAirportsIconSm = withRtlSupport(AirportsIconSm);

const MyComponent = () => (
  <BpkPriceMarker
    label="£120"
    position={{ latitude: 27.9881, longitude: 86.925 }}
    onClick={() => {
      console.log('Click the Price marker with icon.');
    }}
    status={MARKER_STATUSES.previous_selected}
    accessibilityLabel="Click the Price marker with icon"
    icon={<AlignedAirportsIconSm />}
  />
)
```
