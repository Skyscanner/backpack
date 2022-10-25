# bpk-component-map

> Backpack map component.

Requires **React 16.8+**

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import React from 'react';
import BpkText from '@skyscanner/backpack-web/bpk-component-text';
import { withRtlSupport } from '@skyscanner/backpack-web/bpk-component-icon';
import LandmarkIconSm from '@skyscanner/backpack-web/bpk-component-icon/sm/landmark';
import BpkMap, {
  BpkIconMarker,
  BpkOverlayView,
} from '@skyscanner/backpack-web/bpk-component-map';

const AlignedLandmarkIconSm = withRtlSupport(LandmarkIconSm);

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
      disabled
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
import React from 'react';
import BpkMap, { BpkPriceMarker, PRICE_MARKER_STATUSES } from '@skyscanner/backpack-web/bpk-component-map';

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
        console.log("Price marker pressed.")
      }}
      status={PRICE_MARKER_STATUSES.focused}
    />
    <BpkPriceMarker
      label="£120"
      position={{ latitude: 27.9881, longitude: 86.925 }}
      onClick={() => {
        console.log("Price marker pressed.")
      }}
      status={PRICE_MARKER_STATUSES.viewed}
    />
  </BpkMap>
);
```

## Accompanying HOCs

### withGoogleMapsScript

`withGoogleMapsScript` is a HOC that loads the Google Maps JavaScript, then loads the map. This is useful for when you don't already have the Google Maps JavaScript loaded.

If you intend to include multiple maps on one page, it's better to load the Google Maps JavaScript in this HOC, as it ensures that script will not be re-downloaded every time it's used.

```js
import React from 'react';
import BpkMap, { withGoogleMapsScript } from '@skyscanner/backpack-web/bpk-component-map';

const BpkMapWithScript = withGoogleMapsScript(BpkMap);

export default () => (
  <BpkMapWithScript
    googleMapsApiKey='YOUR_API_KEY'
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

## Props

### BpkMap

| Property              | PropType                                                                                        | Required | Default Value                    |
| --------------------- | ----------------------------------------------------------------- | -------- | -------------------------------- |
| bounds                | shape({north: number, east: number, south: number, west: number}) | false    | null                             |
| center                | shape({latitude: number, longitude: number})                      | false    | null                             |
| className             | string                                                            | false    | null                             |
| greedyGestureHandling | bool                                                              | false    | false                            |
| mapOptionStyles       | array                                                             | false    | null                             |
| mapRef                | func                                                              | false    | null                             |
| onRegionChange        | func                                                              | false    | null                             |
| onZoom                | func                                                              | false    | null                             |
| onTilesLoaded         | func                                                              | false    | null                             |
| panEnabled            | bool                                                              | false    | true                             |
| showControls          | bool                                                              | false    | true                             |
| zoom                  | number                                                            | false    | 15                               |

Note: One of `bounds` and `center` must be provided.

#### withGoogleMapsScript

When using `withGoogleMapsScript`, some additional props are available:

| Property                  | PropType | Required | Default Value                     |
| ------------------------- | -------- | -------- | --------------------------------- |
| googleMapsApiKey          | string   | true     | -                                 |
| libraries                 | array    | false    | ['geometry', 'drawing', 'places'] |
| loadingElement            | node     | false    | BpkSpinner                        |
| preventGoogleFontsLoading | bool     | false    | false                             |

### BpkIconMarker

| Property       | PropType                                     | Required | Default Value        |
| -------------- | -------------------------------------------- | -------- | -------------------- |
| icon           | node                                         | true     | -                    |
| position       | shape({latitude: number, longitude: number}) | true     | -                    |
| className      | string                                       | false    | null                 |
| disabled       | bool                                         | false    | false                |
| onClick        | func                                         | false    | null                 |
| selected       | bool                                         | false    | false                |
| buttonProps    | object                                       | false    | null                 |

#### `icon`

`BpkIconMarker` only supports small icons from the Backpack icon set. Large icons should not be used with `BpkIconMarker`.

### BpkPriceMarker

| Property       | PropType                                     | Required | Default Value |
| -------------- | -------------------------------------------- | -------- | ------------- |
| label          | string                                       | true     | -             |
| position       | shape({latitude: number, longitude: number}) | true     | -             |
| arrowClassName | string                                       | false    | null          |
| className      | string                                       | false    | null          |
| disabled       | bool                                         | false    | false         |
| onClick        | func                                         | false    | null          |
| status         | oneOf(`PRICE_MARKER_STATUSES.default`, `PRICE_MARKER_STATUSES.focused`, `PRICE_MARKER_STATUSES.viewed`)                                        | false    | `PRICE_MARKER_STATUSES.default`             |
| buttonProps    | object                                       | false    | null          |

### BpkOverlayView

| Property | PropType                                     | Required | Default Value |
| -------- | -------------------------------------------- | -------- | ------------- |
| children | node                                         | true     | -             |
| position | shape({latitude: number, longitude: number}) | true     | -             |

## Theme Props

Icon markers:

- `iconMarkerDefaultBackgroundColor`
- `iconMarkerDefaultSelectedColor`
- `iconMarkerDefaultDisabledBackgroundColor`
- `iconMarkerDefaultDisabledColor`

Price markers:

- `priceMarkerBackgroundColor`

- `priceMarkerSelectedBorderColor`
- `priceMarkerSelectedColor`

- `priceMarkerViewedBackgroundColor`
- `priceMarkerViewedBorderColor`
- `priceMarkerViewedColor`
