# bpk-component-button

> Backpack button component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import { withButtonAlignment, withRtlSupport } from '@skyscanner/backpack-web/bpk-component-icon';
import ArrowIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/long-arrow-right';
import LightningIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/lightning';
import BpkButton, { BUTTON_TYPES, SIZE_TYPES } from '@skyscanner/backpack-web/bpk-component-button';
import BpkVisuallyHidden from '@skyscanner/backpack-web/bpk-component-visually-hidden';

const AlignedArrowIcon = withButtonAlignment(withRtlSupport(ArrowIcon));

export default () => (
  <div>
    <BpkButton>Primary</BpkButton>
    <BpkButton size={SIZE_TYPES.large}>Large primary</BpkButton>
    <BpkButton type={BUTTON_TYPES.secondary}>Secondary</BpkButton>
    <BpkButton type={BUTTON_TYPES.secondaryOnDark}>SecondaryOnDark</BpkButton>
    <BpkButton type={BUTTON_TYPES.link}>Link</BpkButton>
    <BpkButton type={BUTTON_TYPES.linkOnDark}>LinkOnDark</BpkButton>
    <BpkButton type={BUTTON_TYPES.primaryOnDark}>PrimaryOnDark</BpkButton>
    <BpkButton type={BUTTON_TYPES.primaryOnLight}>PrimaryOnLight</BpkButton>
    <BpkButton leadingIcon={<LightningIcon />}>With leading icon</BpkButton>
    <BpkButton trailingIcon={<ArrowIcon />}>With trailing icon</BpkButton>
    <BpkButton iconOnly>
      <AlignedArrowIcon />
      <BpkVisuallyHidden>Search</BpkVisuallyHidden>
    </BpkButton>
    <BpkButton fullWidth>Full Width</BpkButton>
  </div>
);
```

### Loading state

Use the `loading` boolean prop to show a spinner inside the button and prevent interaction whilst an async operation is in progress. The button's dimensions are preserved so the page layout does not shift.

```js
<BpkButton loading>Submit</BpkButton>
<BpkButton loading size={SIZE_TYPES.large}>Submit</BpkButton>
<BpkButton loading iconOnly aria-label="Loading">
  <AlignedArrowIcon />
</BpkButton>
```

When `loading={true}` the button is rendered as `disabled` in the DOM and `aria-busy="true"` is added. The spinner colour adapts automatically to each button type. For `link` and `linkOnDark` types the underline decoration is suppressed.

#### Theming the link loading colour

The loading colour for `link`-type buttons is exposed as a CSS custom property (`--bpk-button-link-loading-color`) and can be themed via `BpkThemeProvider`:

```js
import BpkButton, { linkThemeAttributes } from '@skyscanner/backpack-web/bpk-component-button';

<BpkThemeProvider
  theme={{ buttonLinkLoadingColor: '#yourColor' }}
  themeAttributes={linkThemeAttributes}
>
  <BpkButton type={BUTTON_TYPES.link} loading>Submit</BpkButton>
</BpkThemeProvider>
```

### Button Link
The button which has `link` or `linkOnDark` type. Detail in [Button Link Type](./docs/button-link-type.md)

## BpkButton (formerly BpkButtonV2)

The legacy `BpkButton` component (V1) and all its variants (`BpkButtonPrimary`, `BpkButtonSecondary`, etc.) have been removed as of Backpack v41. The component previously known as `BpkButtonV2` is now simply `BpkButton`.

Please import `BpkButton` directly:

```js
import BpkButton from '@skyscanner/backpack-web/bpk-component-button';
```

## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/button/web-eI5EFTLO#section-button-props-48).
