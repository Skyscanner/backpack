# bpk-component-inset-banner-v3

> Backpack inset banner v3 component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

A composable inset banner built from named sub-components. The banner is structured as a `Root` container with an explicit `Header` slot (for logo, text, and actions) and an optional `Body` slot (for extended content such as images or descriptive text).

```tsx
import { BpkInsetBannerV3 } from '@skyscanner/backpack-web/bpk-component-inset-banner';
```

### Horizontal layout (default)

```tsx
<BpkInsetBannerV3.Root backgroundColor="#FFE300" textVariant="on-light" aria-label="Sponsored">
  <BpkInsetBannerV3.Header>
    <BpkInsetBannerV3.LeadingAccessory>
      <img src="logo.png" alt="Brand" />
    </BpkInsetBannerV3.LeadingAccessory>
    <BpkInsetBannerV3.Content>
      <BpkText textStyle={TEXT_STYLES.label2}>Title</BpkText>
      <BpkText textStyle={TEXT_STYLES.caption}>Subtitle</BpkText>
    </BpkInsetBannerV3.Content>
    <BpkInsetBannerV3.TrailingAccessory onClick={handleClick} aria-label="About this advert">
      <InfoIcon />
    </BpkInsetBannerV3.TrailingAccessory>
  </BpkInsetBannerV3.Header>
</BpkInsetBannerV3.Root>
```

### Vertical layout

Pass `layout="vertical"` to `Header` to stack slots top-to-bottom instead of side-by-side.

```tsx
<BpkInsetBannerV3.Root backgroundColor="#FFE300" textVariant="on-light" aria-label="Sponsored">
  <BpkInsetBannerV3.Header layout="vertical">
    <BpkInsetBannerV3.LeadingAccessory>
      <img src="logo.png" alt="Brand" />
    </BpkInsetBannerV3.LeadingAccessory>
    <BpkInsetBannerV3.Content>
      <BpkText textStyle={TEXT_STYLES.label2}>Title</BpkText>
    </BpkInsetBannerV3.Content>
  </BpkInsetBannerV3.Header>
</BpkInsetBannerV3.Root>
```

### With a Body (image or text)

`Body` is a direct child of `Root` (sibling of `Header`). Its background extends full-width thanks to `Root`'s `overflow: hidden`. Use `bleed` to remove padding for edge-to-edge content such as images.

```tsx
<BpkInsetBannerV3.Root backgroundColor="#FFE300" textVariant="on-light" aria-label="Sponsored">
  <BpkInsetBannerV3.Header>
    {/* ... */}
  </BpkInsetBannerV3.Header>

  {/* Edge-to-edge image */}
  <BpkInsetBannerV3.Body bleed>
    <BpkImage src="hero.jpg" altText="Destination" aspectRatio={16 / 9} />
  </BpkInsetBannerV3.Body>

  {/* Or descriptive text with a background colour */}
  <BpkInsetBannerV3.Body backgroundColor={canvasContrastDay}>
    <BpkText tagName="p" textStyle={TEXT_STYLES.bodyDefault}>
      Additional information about this offer.
    </BpkText>
  </BpkInsetBannerV3.Body>
</BpkInsetBannerV3.Root>
```

