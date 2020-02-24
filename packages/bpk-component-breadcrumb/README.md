# bpk-component-breadcrumb

> Backpack breadcrumb component.

## Installation

```sh
npm install bpk-component-breadcrumb --save-dev
```

## Usage
```js
import React, { Component } from 'react';
import BpkBreadcrumb, { BpkBreadcrumbItem } from 'bpk-component-breadcrumb';


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

## Structured Data

[JSON-LD](https://json-ld.org/) schema mark up can be used to
add [structured data](https://developers.google.com/search/docs/guides/intro-structured-data)
to the component to improve the SEO of the component through the `schemaMetaData` property.

## Props

### BpkBreadcrumb

| Property           | PropType                             | Required | Default Value |
| ------------------ | ------------------------------------ | -------- | ------------- |
| children           | node                                 | true     | -             |
| label              | string                               | true     | -             |
| schemaMetaData     | array({url: string, label: string})  | false    | null          |



### BpkBreadcrumbItem

| Property           | PropType                   | Required | Default Value |
| ------------------ | -------------------------- | -------- | ------------- |
| children           | node                       | true     | -             |
| href               | string                     | false    | null          |
| active             | bool                       | false    | false         |
| linkProps          | object                     | false    | null          |
