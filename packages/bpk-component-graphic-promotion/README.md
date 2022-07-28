# bpk-component-graphic-promotion

## Installation

```sh
npm install bpk-component-graphic-promotion --save-dev
```

## Usage

```js
import React from 'react';
import BpkGraphicPromo from 'bpk-component-graphic-promotion';

export default () => (
  <BpkGraphicPromo
    contentId="graphic-promo-1"
    tagline="Tagline"
    headline="Ride your wave"
    subheading="Portugal and 6 more countries have just been added to the UK travel green list"
    sponsor={{
      label: 'Sponsored',
      logo: './path/to/sponsor/logo.png',
      altText: 'Sponsor Name',
    }}
    buttonText="Learn more"
    onClick={() => redirect("https://www.sponsor-name.com/promotion")}
    textAlign={TEXT_ALIGN.start}
    invertVertically
  />
);
```

## Props

| Property         | PropType          | Required | Default Value |
| ---------------- | ----------------- | -------- | ------------- |
| contentId        | string            | false    | null          |
| buttonText       | string            | true     | -             |
| headline         | string            | true     | -             |
| invertVertically | bool              | true     | -             |
| onClick          | func              | true     | -             |
| textAlign        | oneOf(TEXT_ALIGN) | true     | -             |
| className        | string            | false    | null          |
| style            | object            | false    | {}            |
| tagline          | string            | false    | null          |
| sponsor          | object            | false    | null          |
| subheading       | string            | false    | null          |

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
