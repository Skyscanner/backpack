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

### Small size

Use `size="small"` for inline use cases where the button sits alongside text (e.g. a feedback row). This uses `sm` icons and no fixed dimensions to align with caption-sized text.

```tsx
<BpkThumbButton
  type="up"
  size="small"
  accessibilityLabel="Rate as helpful"
  onClick={handleVote}
/>
```

### Icon colour

Use `iconColor="primary"` to render the icon in the primary text colour (darker). The default is a lighter grayish colour.

```tsx
<BpkThumbButton
  type="up"
  iconColor="primary"
  accessibilityLabel="Rate as helpful"
  onClick={handleVote}
/>
```

## Props

| Property           | PropType                         | Required | Default Value |
| ------------------ | -------------------------------- | -------- | ------------- |
| accessibilityLabel | string                           | true     | -             |
| type               | 'up' \| 'down'                   | true     | -             |
| onClick            | (type: ThumbsButtonType) => void | true     | -             |
| iconColor          | 'default' \| 'primary'           | false    | 'default'     |
| selected           | boolean                          | false    | false         |
| size               | 'default' \| 'small'             | false    | 'default'     |

**Note:** Click events do not bubble — `BpkThumbButton` calls `stopPropagation()` internally to prevent accidental triggering of parent click handlers when used inside interactive containers (e.g. cards).
