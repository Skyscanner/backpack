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
    cardList={[]}
    layoutDesktop="row"
    layoutMobile="rail"
    title="Card List Component"
  />
);
```

## Props

### BpkCardList

| Property            | PropType                               | Required | Default Value |
| ------------------- | -------------------------------------- | -------- | ------------- |
| accessory           | oneOf('expand' ,'button','pagination') | false    | -             |
| buttonText          | string                                 | false    | -             |
| cardList            | array(node)                            | true     | -             |
| description         | string                                 | false    | -             |
| expandText          | string                                 | false    | -             |
| initiallyShownCards | number                                 | false    | 3             |
| layoutDesktop       | oneOf('row','grid')                    | true     | -             |
| layoutMobile        | oneOf('rail','stack')                  | true     | -             |
| onButtonClick       | Function                               | false    | -             |
| title               | string                                 | true     | -             |
