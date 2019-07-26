# bpk-component-map

> Backpack map component.

## Installation

```sh
npm install bpk-component-map --save-dev
```

## Usage

```js
import React from 'react';
import BpkText from 'bpk-component-text';
import { withRtlSupport } from 'bpk-component-icon';
import LandmarkIconLg from 'bpk-component-icon/lg/landmark';
import BpkMap, { BpkMapMarker, BpkOverlayView, MARKER_TYPES } from 'bpk-component-map';

const AlignedLandmarkIconLg = withRtlSupport(LandmarkIconLg);

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
    <BpkMapMarker
      icon={<AlignedLandmarkIconLg />}
      type={MARKER_TYPES.secondary}
      position={{ latitude: 27.9881, longitude: 86.925 }}
      onClick={() => {}}
      large
    />
    <BpkMapMarker
      icon={<AlignedLandmarkIconLg />}
      type={MARKER_TYPES.primary}
      position={{ latitude: 27.9881, longitude: 86.925 }}
      onClick={() => {}}
      large
      selected
    />
    <BpkOverlayView position={{ latitude: 27.9881, longitude: 86.925 }}>
      <BpkText>Shibuya Crossing</BpkText>
    </BpkOverlayView>
  </BpkMap>
);
```

## Accompanying HOCs

### withGoogleMapsScript

`withGoogleMapsScript` is a HOC that loads the Google Maps JavaScript, then loads the map. This is useful for when you don't already have the Google Maps JavaScript loaded.

If you intend to include multiple maps on one page, it's better to load the Google Maps JavaScript elsewhere and not use this HOC, as it downloads the script every time it's used.

```js
import React from 'react';
import BpkMap, { withGoogleMapsScript } from 'bpk-component-map';

const MAP_URL = 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places';

const BpkMapWithScript = withGoogleMapsScript(BpkMap);

export default () => (
  <BpkMapWithScript
    googleMapURL={MAP_URL}
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

| Property	            | PropType                                                          | Required                 | Default Value                    |
| --------------------- | ----------------------------------------------------------------- | ------------------------ | -------------------------------- |
| bounds                | shape({north: number, east: number, south: number, west: number}) | false                    | null                             |
| center                | shape({latitude: number, longitude: number})                      | false                    | null                             |
| containerElement      | node                                                              | false                    | <div style={{height: '100%'}} /> |
| greedyGestureHandling | bool                                                              | false                    | false                            |
| mapElement            | node                                                              | false                    | <div style={{height: '100%'}} /> |
| mapRef                | func                                                              | false                    | null                             |
| onRegionChange        | func                                                              | false                    | null                             |
| onZoom                | func                                                              | false                    | null                             |
| panEnabled            | bool                                                              | false                    | true                             |
| showControls          | bool                                                              | false                    | true                             |
| zoom                  | number                                                            | false                    | 15                               |

Note: One of `bounds` and `center` must be provided.

#### withGoogleMapsScript

When using `withGoogleMapsScript`, some additional props are available:

| Property	       | PropType                                     | Required                  | Default Value  |
| ---------------- | -------------------------------------------- | ------------------------- | -------------- |
| googleMapURL     | string                                       | true                      | -              |
| loadingElement   | node                                         | false                     | BpkSpinner     |

### BpkMapMarker

| Property	       | PropType                                     | Required                 | Default Value        |
| ---------------- | -------------------------------------------- | ------------------------ | -------------------- |
| icon             | node                                         | true                     | -                    |
| position         | shape({latitude: number, longitude: number}) | true                     | -                    |
| arrowClassName   | string                                       | false                    | null                 |
| className        | string                                       | false                    | null                 |
| large            | bool                                         | false                    | false                |
| onClick          | func                                         | false                    | null                 |
| selected         | bool                                         | false                    | false                |
| type             | oneOf('primary', 'secondary', 'plain')       | false                    | MARKER_TYPES.primary |
| buttonProps      | object                                       | false                    | null                 |

### BpkOverlayView

| Property	       | PropType                                     | Required                 | Default Value      |
| ---------------- | -------------------------------------------- | ------------------------ | ------------------ |
| children         | node                                         | true                     | -                  |
| position         | shape({latitude: number, longitude: number}) | true                     | -                  |

## Theme Props

Primary markers:

* `mapMarkerPrimaryBackgroundColor`

Secondary markers:

* `mapMarkerSecondaryBackgroundColor`

Plain markers:

* `mapMarkerPlainBackgroundColor`
