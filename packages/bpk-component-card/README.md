# bpk-component-card

> Backpack card component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

### BpkCard

```js
import BpkCard from '@skyscanner/backpack-web/bpk-component-card';

export default () => (
  <BpkCard>
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
    ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis
    parturient montes, nascetur ridiculus mus.
  </BpkCard>
);
```

### BpkDividedCard

```js
import {
  BpkDividedCard,
  ORIENTATION,
} from '@skyscanner/backpack-web/bpk-component-card';

export default () => (
  <>
    <BpkDividedCard
      primaryContent={'foo'}
      secondaryContent={'bar'}
      orientation={ORIENTATION.vertical}
    />
    // Toggle shadow shadow with isElevated
    <BpkDividedCard
      primaryContent={'foo'}
      secondaryContent={'bar'}
      orientation={ORIENTATION.horizontal}
      isElevated={false}
    />
  </>
);
```

### BpkCardWrapper

```js
import { BpkCardWrapper } from '@skyscanner/backpack-web/bpk-component-card';
import { coreAccentDay } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

export default () => (
  <BpkCardWrapper header={'foo'} card={'bar'} backgroundColor={coreAccentDay} />
);
```

## Props

### BpkCard

| Property  | PropType | Required | Default Value |
| --------- | -------- | -------- | ------------- |
| children  | -        | true     | -             |
| className | string   | false    | null          |
| href      | string   | false    | null          |
| atomic    | bool     | false    | true          |
| padded    | bool     | false    | true          |

### BpkDividedCard

| Property         | PropType                                            | Required | Default Value          |
| ---------------- | --------------------------------------------------- | -------- | ---------------------- |
| primaryContent   | node                                                | true     | -                      |
| secondaryContent | node                                                | true     | -                      |
| orientation      | oneOf(ORIENTATION.horizontal, ORIENTATION.vertical) | false    | ORIENTATION.horizontal |
| href             | string                                              | false    | null                   |
| className        | string                                              | false    | null                   |
| isElevated       | bool                                                | false    | true                   |

### BpkCardWrapper

| Property        | PropType | Required | Default Value |
| --------------- | -------- | -------- | ------------- |
| backgroundColor | string   | true     | -             |
| card            | node     | true     | -             |
| header          | node     | true     | -             |
| className       | string   | false    | null          |
