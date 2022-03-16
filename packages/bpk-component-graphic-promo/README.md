# bpk-component-graphic-promo

## Installation

```sh
npm install bpk-component-graphic-promo --save-dev
```

## Usage

```js
import React from 'react';
import BpkGraphicPromo from 'bpk-component-code';

export default () => <BpkGraphicPromo />;
```

## Props

| Property         | PropType          | Required | Default Value |
| ---------------- | ----------------- | -------- | ------------- |
| className        | string            | false    | null          |
| kicker           | string            | false    | null          |
| headline         | string            | true     | -             |
| strapline        | string            | false    | null          |
| image            | string            | true     | -             |
| sponsor          | object            | false    | null          |
| sponsor.label    | string            | true     | -             |
| sponsor.logo     | string            | true     | -             |
| sponsor.altText  | string            | true     | -             |
| ctaText          | string            | true     | -             |
| onClick          | func              | true     | -             |
| invertVertically | bool              | true     | -             |
| textAlign        | oneOf(TEXT_ALIGN) | true     | -             |
| textColor        | oneOf(TEXT_COLOR) | true     | -             |
