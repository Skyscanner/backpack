# bpk-component-button

> Backpack button component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import React from 'react';
import { withButtonAlignment, withRtlSupport } from '@skyscanner/backpack-web/bpk-component-icon';
import ArrowIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/long-arrow-right';
import BpkButton from '@skyscanner/backpack-web/bpk-component-button';

const AlignedArrowIcon = withButtonAlignment(withRtlSupport(ArrowIcon));

export default () => (
  <div>
    <BpkButton>Primary</BpkButton>
    <BpkButton large>Large primary</BpkButton>
    <BpkButton secondary>Secondary</BpkButton>
    <BpkButton secondaryOnDark>SecondaryOnDark</BpkButton>
    <BpkButton link>Link</BpkButton>
    <BpkButton linkOnDark>LinkOnDark</BpkButton>
    <BpkButton outline>Outline (Deprecated, use PrimaryOnDark or PrimaryOnLight instead)</BpkButton>
    <BpkButton primaryOnDark>PrimaryOnDark</BpkButton>
    <BpkButton primaryOnLight>PrimaryOnLight</BpkButton>
    <BpkButton iconOnly>
      <AlignedArrowIcon />
      <span className="visually-hidden">Search</span>
    </BpkButton>
  </div>
);
```

## Props

| Property        | PropType             | Required | Default Value |
| --------------- | -------------------- | -------- | ------------- |
| children        | -                    | true     | -             |
| destructive     | bool                 | false    | false         |
| featured        | bool                 | false    | false         |
| link            | bool                 | false    | false         |
| linkOnDark      | bool                 | false    | false         |
| outline         | bool (deprecated)    | false    | false         |
| secondary       | bool                 | false    | false         |
| secondaryOnDark | bool                 | false    | false         |
| primaryOnDark   | bool                 | false    | false         |
| primaryOnLight  | bool                 | false    | false         |
| blank           | bool                 | false    | false         |
| className       | string               | false    | null          |
| disabled        | bool                 | false    | false         |
| href            | string               | false    | null          |
| iconOnly        | bool                 | false    | false         |
| large           | bool                 | false    | false         |
| onClick         | func                 | false    | null          |
| rel             | string               | false    | null          |
| submit          | bool                 | false    | false         |

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

### Primary on dark:

* `buttonPrimaryOnDarkTextColor`
* `buttonPrimaryOnDarkHoverTextColor`
* `buttonPrimaryOnDarkActiveTextColor`
* `buttonPrimaryOnDarkBackgroundColor`
* `buttonPrimaryOnDarkHoverBackgroundColor`
* `buttonPrimaryOnDarkActiveBackgroundColor`

### Primary on light:

* `buttonPrimaryOnLightTextColor`
* `buttonPrimaryOnLightHoverTextColor`
* `buttonPrimaryOnLightActiveTextColor`
* `buttonPrimaryOnLightBackgroundColor`
* `buttonPrimaryOnLightHoverBackgroundColor`
* `buttonPrimaryOnLightActiveBackgroundColor`

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

### Secondary on dark:

* `buttonSecondaryOnDarkTextColor`
* `buttonSecondaryOnDarkHoverTextColor`
* `buttonSecondaryOnDarkActiveTextColor`
* `buttonSecondaryOnDarkBackgroundColor`
* `buttonSecondaryOnDarkHoverBackgroundColor`
* `buttonSecondaryOnDarkActiveBackgroundColor`

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
