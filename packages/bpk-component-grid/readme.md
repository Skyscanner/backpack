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
      <BpkGridColumn width={8} tabletWidth={12}>
        Search controls
      </BpkGridColumn>
      <BpkGridColumn width={4} tabletWidth={0}>
        MPU
      </BpkGridColumn>
    </BpkGridRow>
    <BpkGridRow>
      <BpkGridColumn width={12}>
        Provider logos
      </BpkGridColumn>
    </BpkGridRow>
    <BpkGridRow>
      <BpkGridColumn width={4} mobileWidth={12}>
        Content panel
      </BpkGridColumn>
      <BpkGridColumn width={4} mobileWidth={12}>
        Content panel
      </BpkGridColumn>
      <BpkGridColumn width={4} mobileWidth={12}>
        Content panel
      </BpkGridColumn>
    </BpkGridRow>
    <BpkGridRow>
      <BpkGridColumn width={3} tabletWidth={6} mobileWidth={12}>
        Confidence statement
      </BpkGridColumn>
      <BpkGridColumn width={3} tabletWidth={6} mobileWidth={12}>
        Confidence statement
      </BpkGridColumn>
      <BpkGridColumn width={3} tabletWidth={6} mobileWidth={12}>
        Confidence statement
      </BpkGridColumn>
      <BpkGridColumn width={3} tabletWidth={6} mobileWidth={12}>
        Confidence statement
      </BpkGridColumn>
    </BpkGridRow>
  </BpkGridContainer>
)
```
