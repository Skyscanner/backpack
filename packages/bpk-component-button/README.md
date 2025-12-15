# bpk-component-button

> Backpack button component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import { withButtonAlignment, withRtlSupport } from '@skyscanner/backpack-web/bpk-component-icon';
import ArrowIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/long-arrow-right';
import BpkButton, { BUTTON_TYPES, SIZE_TYPES } from '@skyscanner/backpack-web/bpk-component-button';

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
    <BpkButton iconOnly>
      <AlignedArrowIcon />
      <span className="visually-hidden">Search</span>
    </BpkButton>
    <BpkButton fullWidth>Full Width</BpkButton>
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

## Why do we export both `BpkButton` and `BpkButtonV2`?

The legacy `BpkButton` component (V1) and all its variants (`BpkButtonPrimary`, `BpkButtonSecondary`, etc.) have been removed as of Backpack v41. Importing `BpkButton` now resolves to `BpkButtonV2`.

To ease the migration process, `BpkButtonV2` remains available as a named export for consumers who previously imported it directly. However, **`BpkButtonV2` will be removed in Backpack v42**.

From Backpack v41 onwards, please import `BpkButton` directly.

## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/button/web-eI5EFTLO#section-button-props-48).
