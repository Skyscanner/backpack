# bpk-component-code

> Backpack code component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import { BpkCode, BpkCodeBlock } from '@skyscanner/backpack-web/bpk-component-code';
import BpkText from '@skyscanner/backpack-web/bpk-component-text';

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

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/code/web-YrqbgBny#section-props-80).
