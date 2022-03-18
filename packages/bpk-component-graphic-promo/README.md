# bpk-component-graphic-promo

## Installation

```sh
npm install bpk-component-graphic-promo --save-dev
```

## Usage

```js
import React from 'react';
import BpkGraphicPromo from 'bpk-component-code';

export default () => (
  <BpkGraphicPromo
    kicker="Kicker"
    headline="Ride your wave"
    strapline="Portugal and 6 more countries have just been added to the UK travel green list"
    image="./path/to/background/image.jpg"
    sponsor={{
      label: 'Sponsored',
      logo: './path/to/sponsor/logo.png',
      altText: 'Sponsor Name',
    }}
    buttonText="Learn more"
    onClick={() => redirect("https://www.sponsor-name.com/promotion"))}
    textAlign={TEXT_ALIGN.start}
    invertVertically
  />
);
```

## Props

| Property         | PropType          | Required | Default Value |
| ---------------- | ----------------- | -------- | ------------- |
| buttonText       | string            | true     | -             |
| headline         | string            | true     | -             |
| image            | string            | true     | -             |
| invertVertically | bool              | true     | -             |
| onClick          | func              | true     | -             |
| textAlign        | oneOf(TEXT_ALIGN) | true     | -             |
| textColor        | oneOf(TEXT_COLOR) | true     | -             |
| className        | string            | false    | null          |
| kicker           | string            | false    | null          |
| sponsor          | object            | false    | null          |
| strapline        | string            | false    | null          |

### Prop Details

#### sponsor

An object that groups together all the sponsor related properties. This should only be provided if the graphic promo is sponsored, in which case all of the object's properties are required.

The object consists of the following fields:

- `altText`: string
- `label`: string
- `logo`: string

##### Example

```typescript
const sponsor = {
  label: 'Sponsored',
  altText: 'Skyscanner',
  logo: './path/to/skyscanner/logo.png',
};
```
