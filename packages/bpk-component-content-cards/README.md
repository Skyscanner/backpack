# bpk-component-content-cards

> Backpack example component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```tsx
import React from 'react';
import BpkContentCards from '@skyscanner/backpack-web/bpk-component-content-cards';

<BpkContentCards
    heading='Heading'
    cards=[
        {
            image: {
                url: 'http://skyscanner.net/card-1-image-link.jpg',
                alt: 'People surfing in the ocean',
            },
            headline: 'Card headline',
            description: 'Card description',
            href: 'http://skyscanner.net/card-1-cta-link.html',
        },
    ]
/>

export default () => <BpkContentCards />;
```

## Props

| Property                                                                                                         | PropType                                                                                                           | Required                                                                                               | Default Value |
| ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ | ------------- |
| heading                                                                                                          | string                                                                                                             | true                                                                                                   |               |
| cards <ul><li>image</li><ul><li>url</li><li>alt</li></ul><li>headline</li><li>description</li><li>href</li></ul> | Array <ul><li>Object</li><ul><li>string</li><li>string</li></ul><li>string</li><li>string</li><li>string</li></ul> | true <ul><li>true</li><ul><li>true</li><li>false</li></ul><li>true</li><li>true</li><li>true</li></ul> | ""            |
