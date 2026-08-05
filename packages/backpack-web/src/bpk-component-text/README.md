# bpk-component-text

> Backpack text component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```tsx
import BpkText, { TEXT_STYLES } from '@skyscanner-internal/backpack-web/bpk-component-text';

export default () => (
  <>
    <BpkText tagName="h1" textStyle={TEXT_STYLES.subheading}>My heading</BpkText>
    <BpkText tagName="p">My paragraph</BpkText>
    <BpkText tagName="p" textStyle={TEXT_STYLES.bodyLongform}>My callout paragraph</BpkText>
  </>
);
```

When using the same style in many places repeating the `textStyle` and `tagName` props can become tedious in this case you can use `withDefaultProps` from `bpk-react-utils`.

```tsx
import BpkText from '@skyscanner-internal/backpack-web/bpk-component-text';
import { withDefaultProps } from '@skyscanner-internal/backpack-web/bpk-react-utils';

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

```tsx
import BpkText, { TEXT_STYLES } from '@skyscanner-internal/backpack-web/bpk-component-text';

export default () => (
  <>
    <BpkText tagName="h1" textStyle={TEXT_STYLES.heading1}>My heading</BpkText>
    <BpkText tagName="h2" textStyle={TEXT_STYLES.subheading}>My subhheading</BpkText>
  </>
);
```

### Editorial Text

For use cases where the new Editorial Larken font is required, there are 3 textStyles available to apply this styling.

```tsx
import BpkText, { TEXT_STYLES } from '@skyscanner-internal/backpack-web/bpk-component-text';

export default () => (
  <BpkText tagName="h1" textStyle={TEXT_STYLES.editorial1}>Editorial 1</BpkText>
  <BpkText tagName="h2" textStyle={TEXT_STYLES.editorial2}>Editorial 2</BpkText>
  <BpkText tagName="p" textStyle={TEXT_STYLES.editorial3}>Editorial 3</BpkText>
);
```

### Strikethrough Prop

The `strikethrough` prop renders text with a line through it. It defaults to `false`. When combined with the `color` prop, both the text and the decoration line use the same color, ensuring visual consistency — including in dark mode.

```tsx
import BpkText, { TEXT_COLORS } from '@skyscanner-internal/backpack-web/bpk-component-text';

export default () => (
  <>
    <BpkText strikethrough>Struck-through text</BpkText>
    <BpkText color={TEXT_COLORS.textError} strikethrough>
      Struck-through error text
    </BpkText>
  </>
);
```

### Underline Prop

The `underline` prop renders text with a basic underline. It defaults to
`false`. The underline uses the current text color, including when the `color`
prop or dark mode is used.

```tsx
import BpkText, {
  TEXT_COLORS,
} from '@skyscanner-internal/backpack-web/bpk-component-text';

export default () => (
  <>
    <BpkText underline>Underlined text</BpkText>
    <BpkText color={TEXT_COLORS.textError} underline>
      Underlined error text
    </BpkText>
  </>
);
```

### Truncation Props

Use `truncate` for no-wrap, single-line truncation, or pass a positive integer
to `lineClamp` to truncate after a specific number of lines. Both need a
constrained available width. Invalid `lineClamp` values (zero, negative, non-integers,
`NaN`, and `Infinity`) are ignored, and a valid `lineClamp` takes precedence when
both props are provided.

```tsx
import BpkText from '@skyscanner-internal/backpack-web/bpk-component-text';

export default () => (
  <div className="text-container">
    <BpkText truncate>Text truncated without wrapping</BpkText>
    <BpkText lineClamp={3}>Text truncated after three lines</BpkText>
  </div>
);
```

`lineClamp` changes the element's display mode and sets `overflow-wrap: anywhere`,
which allows line breaks at any character. This may affect elements with existing
custom line-breaking rules. Apply `lineClamp` to the text element itself rather than
an element responsible for flex or grid layout.

### Color Prop

The `color` prop allows you to set the text color directly rather override by `className`. It uses predefined `TEXT_COLORS` tokens to ensure ux consistency with the design system.

```tsx
import BpkText, {
  TEXT_COLORS,
} from '@skyscanner-internal/backpack-web/bpk-component-text';

export default () => (
  <BpkText color={TEXT_COLORS.textSecondary}>
    Text with token textSecondary
  </BpkText>
);
```

## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/text/web-rHoUxcxq#section-props-44).
