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

For certain langauges/characters that are not supported by Larken, the fonts will use the Noto Sans/Serif fonts defined [here](https://www.skyscanner.design/latest/foundations/product-typography/fallback-fonts-Fx8gulTr)

## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/text/web-rHoUxcxq#section-props-44).
