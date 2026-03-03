# bpk-component-thumb-button

> Backpack thumb button component. Part of Chatbot UI on Carhire Chatbot.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```tsx
import { useState } from 'react';
import BpkThumbButton from '@skyscanner/backpack-web/bpk-component-thumb-button';

export default () => {
  const [selectedThumb, setSelectedThumb] = useState<'up' | 'down' | null>(null);

  return (
    <div>
      <BpkThumbButton
        type="up"
        accessibilityLabel="Rate as helpful"
        selected={selectedThumb === 'up'}
        onClick={(type) => setSelectedThumb(type === selectedThumb ? null : type)}
      />
      <BpkThumbButton
        type="down"
        accessibilityLabel="Rate as not helpful"
        selected={selectedThumb === 'down'}
        onClick={(type) => setSelectedThumb(type === selectedThumb ? null : type)}
      />
    </div>
  );
};
```

## Props

| Property           | PropType                   | Required | Default Value |
| ------------------ | -------------------------- | -------- | ------------- |
| accessibilityLabel | string                     | true     | -             |
| type               | 'up' \| 'down'             | true     | -             |
| onClick            | (type: ThumbsType) => void | true     | -             |
| selected           | boolean                    | false    | false         |

**Note:** Click events do not bubble — `BpkThumbButton` calls `stopPropagation()` internally to prevent accidental triggering of parent click handlers when used inside interactive containers (e.g. cards).
