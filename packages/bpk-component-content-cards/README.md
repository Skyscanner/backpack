# BpkContentCards

> Backpack example component.

## Installation

```sh
npm install bpk-component-content-cards --save-dev
```

## Usage

```js
import React from 'react';
import BpkContentCards from 'bpk-component-content-cards';

export default () => <BpkContentCards />;
```

## Props

| Property                                                                                                | PropType                                                                                   | Required | Default Value |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | -------- | ------------- |
| headerText                                                                                              | string                                                                                     | true     | null          |
| cards <ul><li>imageLink</li><li>imageAlt</li><li>headline</li><li>description</li><li>ctaLink</li></ul> | Array <ul><li>string</li><li>string</li><li>string</li><li>string</li><li>string</li></ul> | false    | ""            |
