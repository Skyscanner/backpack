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
  <BpkMap apiKey="YOUR-API-KEY" centerLatitude={55.944357} centerLongitude={-3.1967116} />
)
```

### with center latitude and longitude , zoom level Loading

```js
import React from 'react';
import BpkMap from 'bpk-component-map';

export default () => (
  <BpkMap  
    apiKey="YOUR-API-KEY"
    zoom={15}
    centerLatitude={55.944357}
    centerLongitude={-3.1967116}
    zoomEnabled={false}
    dragEnabled={false}
    width="60%"
    height="50%"
    language="en" />
)

```

### with bound box Loading

```js
import React from 'react';
import BpkMap from 'bpk-component-map';

export default () => (
  <BpkMap  
    apiKey="YOUR-API-KEY"
    boundSouth={55.94129273544452}
    boundWest={-3.2285547854247625}
    boundNorth={55.952707392208396}
    boundEast={-3.159632742578083}
    width="60%"
    height="50%"
    language="zh" />
)

```


### with callback event

```js
import React from 'react';
import BpkMap from 'bpk-component-map';
const zoom = (level) => {
  console.info(level);
};

const drag = (bounds, center) => {
  console.info(bounds);
  console.info(center);
};

export default () => (
  <BpkMap  
    apiKey="YOUR-API-KEY"
    zoom={15}
    centerLatitude={55.944357}
    centerLongitude={-3.1967116}
    onZoom={zoom}
    onDrag={drag}/>
)

```

## BpkMap Props
| Property	      | PropType	| Required	| Default Value
| ---------       | --------  | --------  | ------------- |
| apiKey          | string    | false     | null          |
| children        | element   | false     | null          |
| className       | string    | false     | null          |
| width           | string    | false     | 100%          |
| height          | string    | false     | 100%          |
| zoom	          | number	  | false	    | 15            |
| centerLatitude  | number	  | false	    | null          |
| centerLongitude | number	  | false	    | null          |
| boundSouth	    | number	  | false	    | null          |
| boundWest	      | number	  | false	    | null          |
| boundNorth	    | number	  | false	    | null          |
| boundEast	      | number	  | false	    | null          |
| language	      | string	  | false	    | local language|
| region  	      | string	  | false	    | null          |
| zoomEnabled	    | bool	    | false	    | true          |
| dragEnabled	    | bool	    | false	    | true          |
| onZoom          | func	    | false		  | null          |
| onDrag          | func	    | false	    | null          |
| onClick         | func      | false     | null          |

Notes:
the zoom, centerLatitude, centerLongitude is one method to load the map using the center point and zoom level
the boundSouth,boundWest,boundNorth,boundEast is one method to load the map using bounding box 

The apiKey is required if you want call the google api without limit, you should apply it from google.

Language code list:
https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
region code list:
https://en.wikipedia.org/wiki/ISO_3166-2#Current_codes
