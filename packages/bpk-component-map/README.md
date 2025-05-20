# bpk-component-map

> Backpack map component.

Requires **React 16.8+**

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import BpkText from '@skyscanner/backpack-web/bpk-component-text';
import { withRtlSupport } from '@skyscanner/backpack-web/bpk-component-icon';
import LandmarkIconSm from '@skyscanner/backpack-web/bpk-component-icon/sm/landmark';
import AirportsIconSm from '../../packages/bpk-component-icon/sm/airports';
import BpkMap, {
  BpkIconMarker,
  BpkOverlayView,
} from '@skyscanner/backpack-web/bpk-component-map';

const AlignedLandmarkIconSm = withRtlSupport(LandmarkIconSm);
const AlignedAirportsIconSm = withRtlSupport(AirportsIconSm);

export default () => (
  <BpkMap
    zoom={15}
    showControls={false}
    panEnabled={false}
    center={{
      latitude: 27.9881,
      longitude: 86.925,
    }}
  >
    <BpkIconMarker
      icon={<AlignedLandmarkIconSm />}
      position={{ latitude: 27.9881, longitude: 86.925 }}
      onClick={() => {}}
    />
    <BpkIconMarker
      icon={<AlignedLandmarkIconSm />}
      position={{ latitude: 27.9881, longitude: 86.925 }}
      onClick={() => {}}
      selected
    />
    <BpkIconMarker
      icon={<AlignedLandmarkIconSm />}
      position={{ latitude: 27.9881, longitude: 86.927 }}
      onClick={() => {}}
    />
    <BpkOverlayView position={{ latitude: 27.9881, longitude: 86.925 }}>
      <BpkText>Shibuya Crossing</BpkText>
    </BpkOverlayView>
  </BpkMap>
);
```

### BpkPriceMarker

Price markers are used to display clickable prices on a map.

```js
import BpkMap, {
  BpkPriceMarker,
  PRICE_MARKER_STATUSES,
} from '@skyscanner/backpack-web/bpk-component-map';

export default () => (
  <BpkMap
    zoom={15}
    showControls={false}
    panEnabled={false}
    center={{
      latitude: 27.9881,
      longitude: 86.925,
    }}
  >
    <BpkPriceMarker
      label="£120"
      position={{ latitude: 27.9881, longitude: 86.925 }}
      onClick={() => {
        console.log('Price marker pressed.');
      }}
      status={PRICE_MARKER_STATUSES.focused}
    />
    <BpkPriceMarker
      label="£120"
      position={{ latitude: 27.9881, longitude: 86.925 }}
      onClick={() => {
        console.log('Price marker pressed.');
      }}
      status={PRICE_MARKER_STATUSES.viewed}
    />
  </BpkMap>
);
```

### BpkPriceMarkerV2

BpkPriceMarker V2 version that is the BpkPriceMarker redesign.

```js
import BpkMap, {
  BpkPriceMarkerV2,
  MARKER_STATUSES,
} from '@skyscanner/backpack-web/bpk-component-map';

export default () => (
  <BpkMap
    zoom={15}
    showControls={false}
    panEnabled={false}
    center={{
      latitude: 27.9881,
      longitude: 86.925,
    }}
  >
    <BpkPriceMarkerV2
      label="£120"
      position={{ latitude: 27.9881, longitude: 86.925 }}
      onClick={() => {
        console.log('Price marker pressed.');
      }}
      status={MARKER_STATUSES.selected}
      accessibilityLabel="Price marker pressed."
    />
    <BpkPriceMarkerV2
      label="£120"
      position={{ latitude: 27.9881, longitude: 86.925 }}
      onClick={() => {
        console.log('Price marker pressed.');
      }}
      status={MARKER_STATUSES.previous_selected}
      accessibilityLabel="Have seen Price marker before"
    />
    <BpkPriceMarkerV2
      label="£120"
      icon={<AlignedAirportsIconSm />}
      position={{ latitude: 27.9881, longitude: 86.925 }}
      onClick={() => {
        console.log('Click the Price marker with icon.');
      }}
      accessibilityLabel="Click the Price marker with icon"
    />
  </BpkMap>
);
```

### BpkPriceMarkerButton

BpkPriceMarkerButton that is the BpkPriceMarker redesign.

```js
import BpkMap, {
  BpkPriceMarkerButton,
  MARKER_STATUSES,
} from '@skyscanner/backpack-web/bpk-component-map';

export default () => (
  <BpkPriceMarkerButton
    label="£120"
    onClick={() => {
      console.log('Price marker pressed.');
    }}
    status={MARKER_STATUSES.selected}
  />
  <BpkPriceMarkerButton
    label="£120"
    onClick={() => {
      console.log('Price marker pressed.');
    }}
    status={MARKER_STATUSES.previous_selected}
  />
  <BpkPriceMarkerButton
    label="£120"
    icon={<AlignedAirportsIconSm />}
    onClick={() => {
      console.log('Click the Price marker with icon.');
    }}
  />
);
```

## Accompanying HOCs

### withGoogleMapsScript

`withGoogleMapsScript` is a HOC that loads the Google Maps JavaScript, then loads the map. This is useful for when you don't already have the Google Maps JavaScript loaded.

If you intend to include multiple maps on one page, it's better to load the Google Maps JavaScript in this HOC, as it ensures that script will not be re-downloaded every time it's used.

```js
import BpkMap, {
  withGoogleMapsScript,
} from '@skyscanner/backpack-web/bpk-component-map';

const BpkMapWithScript = withGoogleMapsScript(BpkMap);

export default () => (
  <BpkMapWithScript
    googleMapsApiKey="YOUR_API_KEY"
    zoom={15}
    center={{
      latitude: 27.9881,
      longitude: 86.925,
    }}
    showControls={false}
    panEnabled={false}
  />
);
```

### BpkIconMarker

`BpkIconMarker` only supports small icons from the Backpack icon set. Large icons should not be used with `BpkIconMarker`.

## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/map/web-rj4ymUaL#section-props-0f).
