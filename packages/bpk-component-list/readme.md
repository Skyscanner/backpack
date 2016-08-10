# bpk-component-list

> Backpack list component.

### Installation

```sh
npm install bpk-component-list --save
```

### Usage

```js
import React from 'react'
import { BpkList, BpkListItem } from 'bpk-component-list'

export default MyComponent = () => (
  <BpkList>
    <BpkListItem>Apples</BpkListItem>
    <BpkListItem>
      Oranges
      <BpkList ordered>
        <BpkListItem>Tangerines</BpkListItem>
        <BpkListItem>Nectarines</BpkListItem>
        <BpkListItem>Satsuma</BpkListItem>
      </BpkList>
    </BpkListItem>
    <BpkListItem>Pears</BpkListItem>
  </BpkList>
)
```
