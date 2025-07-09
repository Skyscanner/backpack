# bpk-component-text

> Backpack text component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```javascript
import BpkText, { TEXT_STYLES } from '@skyscanner/backpack-web/bpk-component-text';

export default () => (
  <BpkText tagName="h1" textStyle={TEXT_STYLES.subheading}>My heading</BpkText>
  <BpkText tagName="p">My paragraph</BpkText>
  <BpkText tagName="p" textStyle={TEXT_STYLES.bodyLongform}>My callout paragraph</BpkText>
);
```

When using the same style in many places repeating the `textStyle` and `tagName` props can become tedious in this case you can use `withDefaultProps` from `bpk-react-utils`.

```javascript
import BpkText from '@skyscanner/backpack-web/bpk-component-text';
import { withDefaultProps } from '@skyscanner/backpack-web/bpk-react-utils';

const LargeParagraph = withDefaultProps(BpkText, {
  textStyle: 'bodyLongform',
  tagName: 'p',
});
const TinySpan = withDefaultProps(BpkText, {
  textStyle: 'caption',
  tagName: 'span',
});

export default () => (
  <div>
    <LargeParagraph>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
      imperdiet lobortis tellus, non rhoncus erat tincidunt id. Pellentesque
      consectetur, dolor nec vulputate vehicula, ex metus mattis ante, non
      dictum mi ante eu arcu.
    </LargeParagraph>
    <LargeParagraph>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
      imperdiet lobortis tellus, non rhoncus erat tincidunt id. Pellentesque
      consectetur, dolor nec vulputate vehicula, ex metus mattis ante, non
      dictum mi ante eu arcu.
    </LargeParagraph>
    <TinySpan>
      Side effects of Backpack include euphoria, happiness, and increased
      develpoment velocity.
    </TinySpan>
  </div>
);
```

Heading `textStyle` should not be confused with heading `tagName` that provide structure for SEO and Accessibility. The weight which is normally applied using `tagName` will be overwritten by the weight defined in the `textStyle`.

```javascript
import BpkText, { TEXT_STYLES } from '@skyscanner/backpack-web/bpk-component-text';

export default () => (
  <BpkText tagName="h1" textStyle={TEXT_STYLES.heading1}>My heading</BpkText>
  <BpkText tagName="h2" textStyle={TEXT_STYLES.subheading}>My subhheading</BpkText>
);
```

### Editorial Text

For use cases where the new Editorial Larken font is required, there are 3 textStyles available to apply this styling.

```javascript
import BpkText, { TEXT_STYLES } from '@skyscanner/backpack-web/bpk-component-text';

export default () => (
  <BpkText tagName="h1" textStyle={TEXT_STYLES.editorial1}>Editorial 1</BpkText>
  <BpkText tagName="h2" textStyle={TEXT_STYLES.editorial2}>Editorial 2</BpkText>
  <BpkText tagName="p" textStyle={TEXT_STYLES.editorial3}>Editorial 3</BpkText>
);
```

### Color Prop

The color prop allows you to customize the text color of the BpkText component rather override by className. It supports a variety of color formats, including CSS named colors, HEX values, RGB/RGBA values, HSL/HSLA values and CSS global values. If no color is provided, the text color defaults to 'inherit', meaning it will inherit the color from its parent element. It's recommended to use predefined tokens from [bpk-foundations-web](https://github.com/Skyscanner/backpack-foundations/tree/7f2a6358ddb288a2c8372f3ffef3d39fa97a40cf/packages/bpk-foundations-web/tokens) for consistency.

```javascript
import BpkText, { TEXT_STYLES } from '@skyscanner/backpack-web/bpk-component-text';
import { textColors } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

export default () => (
  <div>
    {/* Using Backpack Token */}
    <BpkText textStyle={TEXT_STYLES.bodyDefault} color={textColors.textPrimaryDay}>
      Text with token textPrimaryDay
    </BpkText>

    {/* Using RGB Value */}
      <BpkText textStyle={TEXT_STYLES.bodyDefault} color="rgb(0, 98, 227)">
      Text with RGB color rgb(0, 98, 227)
    </BpkText>

    {/* Using HEX Value */}
    <BpkText textStyle={TEXT_STYLES.bodyDefault} color="#0c838a">
      Text with HEX color #0c838a
    </BpkText>

    {/* Using Named Color */}
    <BpkText textStyle={TEXT_STYLES.bodyDefault} color="purple">
      Text with named color purple
    </BpkText>
  </div>
);
```



## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/text/web-rHoUxcxq#section-props-44).
