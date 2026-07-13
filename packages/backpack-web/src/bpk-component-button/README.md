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

## Theming

BpkButton supports theming via `BpkThemeProvider`. Backgrounds and select text colours are controlled by private CSS custom properties, allowing overrides per variant. Use the per-variant arrays (e.g. `primaryThemeAttributes`) for targeted theming, or `allButtonThemeAttributes` for the complete set:

```js
import BpkButton, { BUTTON_TYPES, primaryThemeAttributes } from '@skyscanner/backpack-web/bpk-component-button';
import BpkThemeProvider from '@skyscanner/backpack-web/bpk-theming';

<BpkThemeProvider
  theme={{
    privateButtonColourBgPrimary: '#0062e3',
    privateButtonColourBgPrimaryPressed: '#024daf',
  }}
  themeAttributes={primaryThemeAttributes}
>
  <BpkButton type={BUTTON_TYPES.primary}>Submit</BpkButton>
</BpkThemeProvider>
```

All attributes in the array must be supplied or `BpkThemeProvider` will silently ignore the theme.

### Theme attributes reference

| Theme attribute | CSS custom property | Used by |
|---|---|---|
| `privateButtonDimensionRadius` | `--bpk-private-button-dimension-radius` | all variants (corner radius) |
| `privateButtonDimensionMinHeightLarge` | `--bpk-private-button-dimension-min-height-large` | all variants (large size height) |
| `privateButtonDimensionPaddingHorizontalLarge` | `--bpk-private-button-dimension-padding-horizontal-large` | all variants (large size horizontal padding) |
| `privateButtonColourBgPrimary` / `privateButtonColourBgPrimaryPressed` | `--bpk-private-button-colour-bg-primary` / `-primary-pressed` | primary |
| `privateButtonColourBgPrimaryOnDark` / `privateButtonColourBgPrimaryOnDarkPressed` | `--bpk-private-button-colour-bg-primary-on-dark` / `-primary-on-dark-pressed` | primaryOnDark |
| `privateButtonColourBgPrimaryOnLight` / `privateButtonColourBgPrimaryOnLightPressed` | `--bpk-private-button-colour-bg-primary-on-light` / `-primary-on-light-pressed` | primaryOnLight |
| `privateButtonColourTextSecondary`, `privateButtonColourBgSecondary`, `privateButtonColourBgSecondaryPressed` | `--bpk-private-button-colour-text-secondary`, `-colour-bg-secondary`, `-secondary-pressed` | secondary |
| `privateButtonColourBgSecondaryOnDark` / `privateButtonColourBgSecondaryOnDarkPressed` | `--bpk-private-button-colour-bg-secondary-on-dark` / `-secondary-on-dark-pressed` | secondaryOnDark |
| `privateButtonColourTextFeature`, `privateButtonColourBgFeatured`, `privateButtonColourBgFeaturePressed` | `--bpk-private-button-colour-text-feature`, `-colour-bg-featured`, `-feature-pressed` | featured |
| `privateButtonColourTextDestructive`, `privateButtonColourBgDestructive`, `privateButtonColourBgDestructivePressed` | `--bpk-private-button-colour-text-destructive`, `-colour-bg-destructive`, `-destructive-pressed` | destructive |
| `privateButtonColourTextLinkOnDark` | `--bpk-private-button-colour-text-link-on-dark` | linkOnDark |

#### Theming the link-on-dark text colour

The text colour for `linkOnDark`-type buttons is exposed as a private CSS custom property and can be themed via `BpkThemeProvider`:

```js
import BpkButton, { linkThemeAttributes } from '@skyscanner/backpack-web/bpk-component-button';

<BpkThemeProvider
  theme={{ privateButtonColourTextLinkOnDark: '#yourColor' }}
  themeAttributes={linkThemeAttributes}
>
  <BpkButton type={BUTTON_TYPES.linkOnDark}>Submit</BpkButton>
</BpkThemeProvider>
```

The loading-state colour for `link`-type buttons (`--bpk-button-link-loading-color`) pre-dates the CSS custom properties migration and has no private var equivalent — it remains available only via the deprecated `legacyThemeAttributes` default export (`buttonLinkLoadingColor`).

### Button Link
The button which has `link` or `linkOnDark` type. Detail in [Button Link Type](./docs/button-link-type.md)


## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/button/web-eI5EFTLO#section-button-props-48).
