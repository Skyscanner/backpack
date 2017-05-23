# bpk-component-content-container

> Backpack content container component.

## Installation

```sh
npm install bpk-component-content-container --save-dev
```

## Usage

```js
import React from 'react';
import BpkContentContainer from 'bpk-component-content-container';

export default () => (
  <BpkContentContainer>
    <h1>My heading</h1>
    <p>My paragraph.</p>
  </BpkContentContainer>
);
```

## Props

| Property                | PropType                                     | Required | Default Value |
| ----------------------- | -------------------------------------------- | -------- | ------------- |
| children                | -                                            | false    | null          |
| dangerouslySetInnerHTML | { __html: string }                           | false    | null          |
| tagName                 | 'article', 'aside', 'div', 'main', 'section' | false    | 'div'         |
| bareHtml                | bool                                         | false    | false         |
