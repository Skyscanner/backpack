# bpk-component-text

> Backpack text component.

## Installation

```sh
npm install bpk-component-text --save-dev
```

## Usage

```javascript
import React from 'react';
import BpkText from 'bpk-component-text';

export default () => (
  <BpkText tagName="h1" textStyle="xl">My Heading</BpkText>
);
```

When using the same style in many places repeating the `textStyle` and `tagName` props can become tedious in this case you can use `withDefaultProps` from `bpk-react-utils`.

```javascript
import React from 'react';
import BpkText from 'bpk-component-text';
import { withDefaultProps } from 'bpk-react-utils';

const LargeParagraph = withDefaultProps(BpkText, { textStyle: 'lg', tagName: 'p' });
const TinySpan = withDefaultProps(BpkText, { textStyle: 'xs', tagName: 'span' });

export default () => (
  <div>
    <LargeParagraph>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Pellentesque imperdiet lobortis tellus, non rhoncus erat tincidunt id.
      Pellentesque consectetur, dolor nec vulputate vehicula, ex metus mattis ante,
      non dictum mi ante eu arcu.
    </LargeParagraph>
    <LargeParagraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Pellentesque imperdiet lobortis tellus, non rhoncus erat tincidunt id.
        Pellentesque consectetur, dolor nec vulputate vehicula, ex metus mattis ante,
        non dictum mi ante eu arcu.
    </LargeParagraph>
    <TinySpan>
      Side effects of Backpack include euphoria, happiness, and increased develpoment velocity.
    </TinySpan>
  </div>
);
```

## Props

| Property  | PropType                                 | Required | Default Value |
| --------- | ---------------------------------------- | -------- | ------------- |
| children  | -                                        | true     | -             |
| textStyle | 'xs', 'sm', 'base', 'lg', 'xl', 'xxl'    | false    | 'base'        |
| tagName   | 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' | false    | 'span'        |
| className | string                                   | false    | null          |
| bold      | bool                                     | false    | false         |
