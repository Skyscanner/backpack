# bpk-component-horizontal-nav

> Backpack horizontal nav component.

## Installation

```sh
npm install bpk-component-horizontal-nav --save-dev
```

## Usage

```js
import React from 'react';
import BpkHorizontalNav, { BpkHorizontalNavItem } from 'bpk-component-horizontal-nav';

export default () => (
  <BpkHorizontalNav>
    <BpkHorizontalNavItem>Flights</BpkHorizontalNavItem>
    <BpkHorizontalNavItem selected>Hotels</BpkHorizontalNavItem>
    <BpkHorizontalNavItem>Car hire</BpkHorizontalNavItem>
  </BpkHorizontalNav>
)
```

## Props

### BpkHorizontalNav

| Property    | PropType | Required | Default Value |
| ----------- | -------- | -------- | ------------- |
| children    | node     | true     | -             |
| className   | string   | false    | null          |

### BpkHorizontalNavItem

| Property    | PropType | Required | Default Value |
| ----------- | -------- | -------- | ------------- |
| children    | node     | true     | -             |
| className   | string   | false    | null          |
| spaceAround | bool     | false    | false         |
| selected    | bool     | false    | false         |
| href        | string   | false    | null          |

## Theme Props

* `horizontalNavLinkColor`
* `horizontalNavLinkHoverColor`
* `horizontalNavLinkActiveColor`
* `horizontalNavLinkSelectedColor`
* `horizontalNavBarSelectedColor`
