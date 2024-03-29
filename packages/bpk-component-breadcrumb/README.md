# bpk-component-breadcrumb

> Backpack breadcrumb component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage
```js
import { Component } from 'react';
import BpkBreadcrumb, { BpkBreadcrumbItem } from '@skyscanner/backpack-web/bpk-component-breadcrumb';


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

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/breadcrumb/web-rxEpDVCn#section-props-2d).
