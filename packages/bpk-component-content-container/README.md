# bpk-component-content-container

> Backpack content container component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import React from 'react';
import BpkContentContainer from '@skyscanner/backpack-web/bpk-component-content-container';

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
| alternate               | bool                                         | false    | false         |
