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
  <BpkMap centerLatitude={55.944357} centerLongitude={-3.1967116} />
)
```

### with center latitude and longitude , zoom level Loading

```js
import React from 'react';
import BpkMap from 'bpk-component-map';

export default () => (
  <BpkMap  
    zoom={15}
    centerLatitude={55.944357}
    centerLongitude={-3.1967116}
    zoomEnabled={false}
    dragEnabled={false}
    width="600px"
    height="600px"
    language="en" />
)

```

### with bound box Loading

```js
import React from 'react';
import BpkMap from 'bpk-component-map';

export default () => (
  <BpkMap  
    zoom={15}
    centerLatitude={55.944357}
    centerLongitude={-3.1967116}
    zoomEnabled={false}
    dragEnabled={false}
    width="600px"
    height="600px"
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
| children        | element   | false     | null          |
| className       | string    | false     | null          |
| width           | string    | false     | 100%          |
| height          | string    | false     | 100%          |
| zoom	          | number	  | false	    | 15            |
| centerLatitude	| number	  | false	    | null          |
| centerLongitude	| number	  | false	    | null          |
| boundSouth	    | number	  | false	    | null          |
| boundWest	      | number	  | false	    | null          |
| boundNorth	    | number	  | false	    | null          |
| boundEast	      | number	  | false	    | null          |
| language	      | string	  | false	    | local language|
| region  	      | string	  | false	    | null          |
| zoomEnabled	    | bool	    | false	    | true          |
| dragEnabled	    | bool	    | false	    | true          |
| onZoom	        | func	    | false		  | null          |
| onDrag	        | func	    | false	    | null          |
| onClick         | func      | false     | null          |

Notes:
the zoom, centerLatitude, centerLongitude is one method to load the map using the center point and zoom level
the boundSouth,boundWest,boundNorth,boundEast is one method to load the map using bounding box 

Language code list:
https://www.w3schools.com/tags/ref_language_codes.asp
region code list:
https://www.w3schools.com/tags/ref_country_codes.asp