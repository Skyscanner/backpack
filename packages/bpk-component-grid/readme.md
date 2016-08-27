# bpk-component-grid

> Backpack grid components.

### Installation

```sh
npm install bpk-component-grid --save
```

### Usage

```js
import React from 'react'
import { BpkGridContainer, BpkGridRow, BpkGridColumn } from 'bpk-component-grid'

export default MyComponent = () => (
  <BpkGridContainer>
    <BpkGridRow>
      <BpkGridColumn width={3}>Content</BpkGridColumn>
      <BpkGridColumn width={3}>Content</BpkGridColumn>
      <BpkGridColumn width={3}>Content</BpkGridColumn>
      <BpkGridColumn width={3}>Content</BpkGridColumn>
    </BpkGridRow>
  </BpkGridContainer>
)
```
