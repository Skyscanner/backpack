# bpk-component-breadcrumb

> Backpack breadcrumb component.

## Installation

```sh
npm install bpk-component-breadcrumb --save-dev
```

## Usage
```js
import React, { Component } from 'react';
import BpkBreadcrumb, { BpkBreadcrumbItem } 'bpk-component-breadcrumb';


export default class App extends Component {
  render() {
    return (
      <BpkBreadcrumb label="breadcrumb">
        <BpkBreadcrumbItem href="/">Home</BpkBreadcrumbItem>
        <BpkBreadcrumbItem href="/page-1">Page 1</BpkBreadcrumbItem>
        <BpkBreadcrumbItem active>
          Page 2
        </BpkBreadcrumbItem>
      </BpkBreadcrumb>
    );
  }
}

```
## Props

### BpkBreadcrumb

| Property           | PropType | Required | Default Value |
| ------------------ | -------- | -------- | ------------- |
| children           | node     | true     | -             |
| label              | string   | true     | -             |


### BpkBreadcrumbItem

| Property           | PropType                   | Required | Default Value |
| ------------------ | -------------------------- | -------- | ------------- |
| children           | node                       | true     | -             |
| href               | string                     | false    | null          |
| active             | bool                       | false    | false         |
| linkProps          | object                     | false    | {}            |
