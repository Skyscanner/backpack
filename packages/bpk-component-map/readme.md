# bpk-component-map

> Backpack map component.

## Installation

```sh
npm install bpk-component-map --save-dev
```

## Usage

```js
import React from 'react';
import BpkMap from 'bpk-component-map';

export default () => (
  <BpkMap
    containerElement={<div style={{ height: '400px' }} />}
    mapElement={<div style={{ height: `100%` }} />}
    defaultZoom={15}
    defaultCenter={{
      lat: 27.9881,
      lng: 86.925,
    }}
    options={{
      zoomControl: false,
      dragEnabled: false,
    }}
  />
);
```

## Accompanying HOCs

### withScriptjs

`withScriptjs` is a HOC that loads the Google Maps Javascript, then loads the map. This is useful for when you don't already have the Google Maps Javascript loaded.

If you intend to include multiple maps on one page, it's better to load the Google Maps Javascript elsewhere and not use this HOC, as it downloads the script every time it's used.

```js
import React from 'react';
import BpkMap, { withScriptjs } from 'bpk-component-map';

const MAP_URL = 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places';

const BpkMapWithScript = withScriptjs(BpkMap);

export default () => (
  <BpkMapWithScript
    googleMapURL={MAP_URL}
    loadingElement={<div />}
    containerElement={<div style={{ height: '400px' }} />}
    mapElement={<div style={{ height: `100%` }} />}
    defaultZoom={15}
    defaultCenter={{
      lat: 27.9881,
      lng: 86.925,
    }}
    options={{
      zoomControl: false,
      dragEnabled: false,
    }}
  />
);
```

## Props

### BpkMap

| Property	      | PropType	| Required                	| Default Value |
| --------------- | --------- | ------------------------- | ------------- |
| mapRef          | func      | false                     | null          |

When using `withScriptjs`, some additional props are required. Refer to [`withScriptjs` from `react-google-maps`](https://tomchentw.github.io/react-google-maps/#withscriptjs).

Refer to [`GoogleMap` from `react-google-maps`](https://tomchentw.github.io/react-google-maps/#withgooglemap) for all other props.

> Note: `bpk-component-map` also exports everything that `react-google-maps` does, such as `InfoBox` and `OverlayView`.
