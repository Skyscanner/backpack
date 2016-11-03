# bpk-sponsored-badge

> Backpack sponsored ad badge component.

## Installation

```sh
npm install bpk-component-sponsored-badge --save
```

## Usage

```js
import React from 'react'
import BpkSponsoredBadge from 'bpk-sponsored-badge'

export default MyComponent = () => (
  <div>
    <BpkSponsoredBadge></BpkButton>
    <BpkSponsoredBadge docked="right"></BpkButton>
    <BpkSponsoredBadge docked="left"></BpkButton>
    <BpkSponsoredBadge sponsoredText="Promocionado"></BpkButton>
  </div>
)
```

### Props

| Property      | PropType | Required | Default Value |
| ------------- | -------- | -------- | ------------- |
| docked        | oneOf    | false    | none          |
| sponsoredText | string   | false    | Sponsored     |
| children      | -        | false    | -             |
