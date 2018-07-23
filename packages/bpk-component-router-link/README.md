# bpk-component-router-link

> Backpack react-router link component.

## Installation

```sh
npm install bpk-component-router-link --save-dev
```

## Usage

```js
import React from 'react';
import BpkRouterLink from 'bpk-component-router-link';

export default () => (
  <BpkRouterLink to="https://www.skyscanner.net/">Click here</BpkRouterLink>
)
```

## Props

| Property | PropType | Required | Default Value |
| -------- | -------- | -------- | ------------- |
| children | -        | true     | -             |
| to       | string   | true     | -             |
| onClick  | func     | false    | null          |
