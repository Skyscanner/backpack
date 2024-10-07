# bpk-component-card-list

> Backpack card list component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

### BpkCardList

```js
import { BpkCardList } from '@skyscanner/backpack-web/bpk-component-card-list';

export default () => (
  <BpkCardList
    title="Title"
    description="Description"
    buttonText="Button"
    buttonHref="https://www.skyscanner.net"
    onButtonClick={() => {}}
  />
);
```

## Props

### BpkCardList

| Property            | PropType                               | Required | Default Value |
| ------------------- | -------------------------------------- | -------- | ------------- |
| buttonText          | string                                 | false    | -             |
| description         | string                                 | false    | -             |
| onButtonClick       | Function                               | false    | -             |
| title               | string                                 | true     | -             |
| buttonHref          | string                                 | false    | -             |