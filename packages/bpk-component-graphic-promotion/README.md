# bpk-component-graphic-promotion

## Installation

```sh
npm install bpk-component-graphic-promotion --save-dev
```

## Usage

```tsx
import React from 'react';
import BpkGraphicPromo from 'bpk-component-graphic-promotion';

export default () => (
  <BpkGraphicPromo
    buttonText="Learn more"
    contentId="graphic-promo-1"
    headline="Ride your wave"
    invertVertically
    onClick={() => redirect("https://www.sponsor-name.com/promotion")}
    sponsor={{
      label: 'Sponsored',
      logo: './path/to/sponsor/logo.png',
      altText: 'Sponsor Name',
    }}
    subheading="Portugal and 6 more countries have just been added to the UK travel green list"
    tagline="Tagline"
    textAlign={TEXT_ALIGN.start}
  />
);
```

## Props

| Property         | PropType          | Required | Default Value |
| ---------------- | ----------------- | -------- | ------------- |
| buttonText       | string            | true     | -             |
| className        | string            | false    | null          |
| contentId        | string            | false    | null          |
| headline         | string            | true     | -             |
| invertVertically | bool              | false    | false         |
| onClick          | func              | true     | -             |
| sponsor          | object            | false    | null          |
| style            | object            | false    | {}            |
| subheading       | string            | false    | null          |
| tagline          | string            | false    | null          |
| textAlign        | oneOf(TEXT_ALIGN) | true     | -             |

### Prop Details

#### sponsor

An object that groups together all the sponsor related properties. This should only be provided if the graphic promo is sponsored, in which case all of the object's properties are required.

The object consists of the following fields:

- `altText`: string
- `label`: string
- `logo`: string

##### Example

```ts
const sponsor = {
  label: 'Sponsored',
  altText: 'Skyscanner',
  logo: './path/to/skyscanner/logo.png',
};
```
