# bpk-component-content-cards

> Backpack example component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```tsx
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