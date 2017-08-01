# bpk-component-code

> Backpack code component.

## Installation

```sh
npm install bpk-component-code --save-dev
```

## Usage

```js
import React from 'react';
import { BpkCode, BpkCodeBlock } from 'bpk-component-code';
import BpkText from 'bpk-component-text';

const codeBlock = `import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<App />, ...);`;

export default () => (
  <div>
    <BpkText tagName='p'>
      We recommend using React from npm with a bundler like webpack. You can use
      the <BpkCode>react</BpkCode> and <BpkCode>react-dom</BpkCode> packages. After installing it
      using <BpkCode>npm install --save react react-dom</BpkCode>, you can use:
    </BpkText>
    <BpkCodeBlock>{codeBlock}</BpkCodeBlock>
  </div>
);
```

## Props

*For BpkCode & BpkCodeBlock:*

| Property  | PropType | Required | Default Value |
| --------- | -------- | -------- | ------------- |
| children  | -        | true     | -             |
