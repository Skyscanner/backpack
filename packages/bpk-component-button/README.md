# bpk-component-button

> Backpack button component.

# 👻 BpkButton (V1) has been deprecated, and usages should be replaced with BpkButtonV2

The legacy `BpkButton` component and all its variants (`BpkButtonPrimary`, `BpkButtonSecondary`, etc.) are deprecated and will be removed in a future major version. Please migrate to `BpkButtonV2` using the migration guide.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import { withButtonAlignment, withRtlSupport } from '@skyscanner/backpack-web/bpk-component-icon';
import ArrowIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/long-arrow-right';
import { BpkButtonV2, BUTTON_TYPES, SIZE_TYPES } from '@skyscanner/backpack-web/bpk-component-button';

const AlignedArrowIcon = withButtonAlignment(withRtlSupport(ArrowIcon));

export default () => (
  <div>
    <BpkButtonV2>Primary</BpkButtonV2>
    <BpkButtonV2 size={SIZE_TYPES.large}>Large primary</BpkButtonV2>
    <BpkButtonV2 type={BUTTON_TYPES.secondary}>Secondary</BpkButtonV2>
    <BpkButtonV2 type={BUTTON_TYPES.secondaryOnDark}>SecondaryOnDark</BpkButtonV2>
    <BpkButtonV2 type={BUTTON_TYPES.link}>Link</BpkButtonV2>
    <BpkButtonV2 type={BUTTON_TYPES.linkOnDark}>LinkOnDark</BpkButtonV2>
    <BpkButtonV2 type={BUTTON_TYPES.primaryOnDark}>PrimaryOnDark</BpkButtonV2>
    <BpkButtonV2 type={BUTTON_TYPES.primaryOnLight}>PrimaryOnLight</BpkButtonV2>
    <BpkButtonV2 iconOnly>
      <AlignedArrowIcon />
      <span className="visually-hidden">Search</span>
    </BpkButtonV2>
    <BpkButtonV2 fullWidth>Full Width</BpkButtonV2>
  </div>
);
```

### Link Button

Link buttons (`type="link"` or `type="linkOnDark"`) are styled like `BpkLink` with underline decoration. It has underline by default, while with `implicit` would underline on hover.

```js
import { BpkButtonV2, BUTTON_TYPES } from '@skyscanner/backpack-web/bpk-component-button';

export default () => (
  <div>
    {/* Default link with underline */}
    <BpkButtonV2 type={BUTTON_TYPES.link}>
      Link Button
    </BpkButtonV2>

    {/* Implicit link with underline on hover */}
    <BpkButtonV2 type={BUTTON_TYPES.link} implicit>
      Implicit Link
    </BpkButtonV2>

    {/* Link on dark */}
    <BpkButtonV2 type={BUTTON_TYPES.linkOnDark}>
      Link on Dark
    </BpkButtonV2>

    {/* Implicit link on dark */}
    <BpkButtonV2 type={BUTTON_TYPES.linkOnDark} implicit>
      Implicit Link on Dark
    </BpkButtonV2>

    {/* Default link with icon */}
    <BpkButtonV2 type={BUTTON_TYPES.link}>
      Link Button with icon <SmallLongArrowRightIcon />
    </BpkButtonV2>

    {/* The iconOnly link (no underline) */}
    <BpkButtonV2 type={BUTTON_TYPES.link} iconOnly aria-label="Favorite">
      <HeartIcon />
    </BpkButtonV2>
  </div>
);
```

**Note:** When using `iconOnly` with link buttons, no underline is applied.

## Props

| Property    | PropType | Required | Default Value      | Description                                                                      |
| ----------- | -------- | -------- | ------------------ | -------------------------------------------------------------------------------- |
| children    | node     | true     | -                  | The content of the button                                                        |
| type        | oneOf    | false    | BUTTON_TYPES.primary | The button type. One of `primary`, `primaryOnDark`, `primaryOnLight`, `secondary`, `secondaryOnDark`, `destructive`, `featured`, `link`, `linkOnDark` |
| size        | oneOf    | false    | SIZE_TYPES.small   | The button size. One of `small`, `large`                                         |
| className   | string   | false    | null               | Custom class name                                                                |
| disabled    | bool     | false    | false              | Whether the button is disabled                                                   |
| fullWidth   | bool     | false    | false              | Whether the button should take full width                                        |
| iconOnly    | bool     | false    | false              | Whether the button contains only an icon (no text)                               |
| implicit    | bool     | false    | false              | For link types only: applies implicit link styling that would underline on hover                    |
| onClick     | func     | false    | () => {}           | Click handler function                                                           |
| submit      | bool     | false    | false              | Whether the button is a submit button                                            |
| href        | string   | false    | null               | If provided, renders as an anchor tag                                            |
| blank       | bool     | false    | false              | If true and href is provided, opens in new tab                                   |
| rel         | string   | false    | undefined          | The rel attribute for anchor tags                                                |

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/button/web-eI5EFTLO#section-button-props-48).
