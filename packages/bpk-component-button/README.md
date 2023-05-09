# bpk-component-button

> Backpack button component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import { withButtonAlignment, withRtlSupport } from '@skyscanner/backpack-web/bpk-component-icon';
import ArrowIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/long-arrow-right';
import BpkButtonV2, { BUTTON_TYPES, SIZE_TYPES } from '@skyscanner/backpack-web/bpk-component-button';

const AlignedArrowIcon = withButtonAlignment(withRtlSupport(ArrowIcon));

export default () => (
  <div>
    <BpkButton>Primary</BpkButton>
    <BpkButton size={SIZE_TYPES.large}>Large primary</BpkButton>
    <BpkButton type={BUTTON_TYPES.secondary}>Secondary</BpkButton>
    <BpkButton type={BUTTON_TYPES.secondaryOnDark}>SecondaryOnDark</BpkButton>
    <BpkButton type={BUTTON_TYPES.link}>Link</BpkButton>
    <BpkButton type={BUTTON_TYPES.linkOnDark}>LinkOnDark</BpkButton>
    <BpkButton type={BUTTON_TYPES.primaryOnDark}>PrimaryOnDark</BpkButton>
    <BpkButton type={BUTTON_TYPES.primaryOnLight}>PrimaryOnLight</BpkButton>
    <BpkButton iconOnly>
      <AlignedArrowIcon />
      <span className="visually-hidden">Search</span>
    </BpkButton>
  </div>
);
```

## Props

| Property        | PropType             | Required | Default Value        |
| --------------- | -------------------- | -------- | -------------------- |
| children        | -                    | true     | -                    |
| type            | oneOf(BUTTON_TYPES)  | false    | BUTTON_TYPES.primary |
| size            | oneOf(SIZE_TYPES)    | false    | SIZE_TYPES.small     | 
| className       | string               | false    | null                 |
| disabled        | bool                 | false    | false                |
| iconOnly        | bool                 | false    | false                |
| onClick         | func                 | false    | null                 |
| rel             | string               | false    | null                 |
| submit          | bool                 | false    | false                |
| href            | string               | false    | null                 |
| blank           | bool                 | false    | false                |
