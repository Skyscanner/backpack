# bpk-component-text

> Backpack text component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```javascript
import React from 'react';
import BpkText, { TEXT_STYLES } from '@skyscanner/backpack-web/bpk-component-text';

export default () => (
  <BpkText tagName="h1" textStyle={TEXT_STYLES.subheading}>My heading</BpkText>
  <BpkText tagName="p">My paragraph</BpkText>
  <BpkText tagName="p" textStyle={TEXT_STYLES.bodyLongform}>My callout paragraph</BpkText>
);
```

When using the same style in many places repeating the `textStyle` and `tagName` props can become tedious in this case you can use `withDefaultProps` from `bpk-react-utils`.

```javascript
import React from 'react';
import BpkText from '@skyscanner/backpack-web/bpk-component-text';
import { withDefaultProps } from '@skyscanner/backpack-web/bpk-react-utils';

const LargeParagraph = withDefaultProps(BpkText, { textStyle: 'bodyLongform', tagName: 'p' });
const TinySpan = withDefaultProps(BpkText, { textStyle: 'caption', tagName: 'span' });

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

Heading `textStyle` should not be confused with heading `tagName` that provide structure for SEO and Accessibility. The weight which is normally applied using `tagName` will be overwritten by the weight defined in the `textStyle`.

```javascript
import React from 'react';
import BpkText, { TEXT_STYLES } from '@skyscanner/backpack-web/bpk-component-text';

export default () => (
  <BpkText tagName="h1" textStyle={TEXT_STYLES.heading1}>My heading</BpkText>
  <BpkText tagName="h2" textStyle={TEXT_STYLES.subheading}>My subhheading</BpkText>
);
```

## Props

| Property  | PropType                                 | Required | Default Value |
| --------- | ---------------------------------------- | -------- | ------------- |
| children  | -                                        | true     | -             |
| textStyle | oneOf(TEXT_STYLES.caption, TEXT_STYLES.footnote, TEXT_STYLES.label1, TEXT_STYLES.label2, TEXT_STYLES.label3, TEXT_STYLES.bodyDefault, TEXT_STYLES.bodyLongform, TEXT_STYLES.subheading, TEXT_STYLES.heading1, TEXT_STYLES.heading2, TEXT_STYLES.heading3, TEXT_STYLES.heading4, TEXT_STYLES.heading5, TEXT_STYLES.hero1, TEXT_STYLES.hero2, TEXT_STYLES.hero3, TEXT_STYLES.hero4, TEXT_STYLES.hero5, TEXT_STYLES.xs, TEXT_STYLES.sm, TEXT_STYLES.base, TEXT_STYLES.lg, TEXT_STYLES.xl, TEXT_STYLES.xxl, TEXT_STYLES.xxxl, TEXT_STYLES.xxxxl, TEXT_STYLES.xxxxxl)    | false    | TEXT_STYLES.base  |
| tagName   | 'span', 'p', 'text', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' | false    | 'span'        |
| className | string                                   | false    | null          |
| bold (deprecated, use a different `textStyle` to achieve the desired weight)     | bool                                     | false    | null         |
| weight (deprecated, use a different `textStyle` to achieve the desired weight)   | oneOf(WEIGHT_STYLES.regular, WEIGHT_STYLES.bold, WEIGHT_STYLES.black)                                         | false    | null         |       
