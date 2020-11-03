# bpk-component-button

> Backpack button component.

## Installation

```sh
npm install bpk-component-button --save-dev
```

## Usage

```js
import React from 'react';
import { withButtonAlignment, withRtlSupport } from 'bpk-component-icon';
import ArrowIcon from 'bpk-component-icon/sm/long-arrow-right';
import BpkButton from 'bpk-component-button';

const AlignedArrowIcon = withButtonAlignment(withRtlSupport(ArrowIcon));

export default () => (
  <div>
    <BpkButton>Primary</BpkButton>
    <BpkButton large>Large primary</BpkButton>
    <BpkButton secondary>Secondary</BpkButton>
    <BpkButton link>Link</BpkButton>
    <BpkButton outline>Outline</BpkButton>
    <BpkButton iconOnly>
      <AlignedArrowIcon />
      <span className="visually-hidden">Search</span>
    </BpkButton>
  </div>
);
```

## Props

| Property    | PropType | Required | Default Value |
| ----------- | -------- | -------- | ------------- |
| children    | -        | true     | -             |
| destructive | bool     | false    | false         |
| featured    | bool     | false    | false         |
| link        | bool     | false    | false         |
| outline     | bool     | false    | false         |
| secondary   | bool     | false    | false         |
| blank       | bool     | false    | false         |
| className   | string   | false    | null          |
| disabled    | bool     | false    | false         |
| href        | string   | false    | null          |
| iconOnly    | bool     | false    | false         |
| large       | bool     | false    | false         |
| onClick     | func     | false    | null          |
| padded      | bool     | false    | false         |
| rel         | string   | false    | null          |
| submit      | bool     | false    | false         |

> Note: The `padded` boolean only applies to link-style buttons

## Theme Props

### Primary:

* `buttonPrimaryTextColor`
* `buttonPrimaryHoverTextColor`
* `buttonPrimaryActiveTextColor`
* `buttonPrimaryGradientStartColor`
* `buttonPrimaryGradientEndColor`
* `buttonPrimaryBackgroundColor`
* `buttonPrimaryHoverBackgroundColor`
* `buttonPrimaryActiveBackgroundColor`

### Secondary:

* `buttonSecondaryTextColor`
* `buttonSecondaryHoverTextColor`
* `buttonSecondaryActiveTextColor`
* `buttonSecondaryBorderColor`
* `buttonSecondaryHoverBorderColor`
* `buttonSecondaryActiveBorderColor`
* `buttonSecondaryBackgroundColor`
* `buttonSecondaryHoverBackgroundColor`
* `buttonSecondaryActiveBackgroundColor`

### Featured:

* `buttonFeaturedTextColor`
* `buttonFeaturedHoverTextColor`
* `buttonFeaturedActiveTextColor`
* `buttonFeaturedGradientStartColor`
* `buttonFeaturedGradientEndColor`
* `buttonFeaturedBackgroundColor`
* `buttonFeaturedHoverBackgroundColor`
* `buttonFeaturedActiveBackgroundColor`

### Destructive:

* `buttonDestructiveTextColor`
* `buttonDestructiveHoverTextColor`
* `buttonDestructiveActiveTextColor`
* `buttonDestructiveBorderColor`
* `buttonDestructiveHoverBorderColor`
* `buttonDestructiveActiveBorderColor`
* `buttonDestructiveBackgroundColor`
* `buttonDestructiveHoverBackgroundColor`
* `buttonDestructiveActiveBackgroundColor`

### All button types:
* `buttonFontSize` (Optional)
