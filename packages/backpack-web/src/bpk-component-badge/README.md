# bpk-component-badge

> Backpack badge component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```tsx
import BpkBadge, { BADGE_TYPES } from '@skyscanner/backpack-web/bpk-component-badge';

export default () => (
  <BpkBadge type={BADGE_TYPES.warning}>
    My Badge
  </BpkBadge>
);
```

## Theming

BpkBadge supports theming via `BpkThemeProvider`. Background colours and horizontal padding are controlled by private CSS custom properties, allowing overrides per variant.

Use `allBadgeThemeAttributes` to declare which properties you are overriding. All attributes in the array must be supplied or `BpkThemeProvider` will silently ignore the theme:

```tsx
import BpkBadge, { BADGE_TYPES, allBadgeThemeAttributes } from '@skyscanner/backpack-web/bpk-component-badge';
import BpkThemeProvider from '@skyscanner/backpack-web/bpk-theming';

export default () => (
  <BpkThemeProvider
    theme={{
      privateBadgeColourBgDefault: '#e8f4fd',
      privateBadgeDimensionPaddingHorizontalDefault: '0.75rem',
      privateBadgeColourBgInverse: '#ffffff',
      privateBadgeColourBgOutline: 'transparent',
      privateBadgeColourStrokeOutline: '#ffffff',
      privateBadgeColourBgSubtle: '#f0f0f0',
      privateBadgeDimensionPaddingHorizontalSubtle: '0.5rem',
    }}
    themeAttributes={allBadgeThemeAttributes}
  >
    <BpkBadge type={BADGE_TYPES.normal}>Normal</BpkBadge>
  </BpkThemeProvider>
);
```

### Theme attributes reference

| Theme attribute | CSS custom property | Default | Used by |
|---|---|---|---|
| `privateBadgeColourBgDefault` | `--bpk-private-badge-colour-bg-default` | `$bpk-private-badge-background-normal-day` | normal, warning, success, critical |
| `privateBadgeDimensionPaddingHorizontalDefault` | `--bpk-private-badge-dimension-padding-horizontal-default` | `bpk-spacing-md()` | all variants (base) |
| `privateBadgeColourBgInverse` | `--bpk-private-badge-colour-bg-inverse` | `$bpk-surface-default-day` | inverse |
| `privateBadgeColourBgOutline` | `--bpk-private-badge-colour-bg-outline` | `transparent` | outline |
| `privateBadgeColourStrokeOutline` | `--bpk-private-badge-colour-stroke-outline` | `$bpk-text-on-dark-day` | outline |
| `privateBadgeColourBgSubtle` | `--bpk-private-badge-colour-bg-subtle` | `$bpk-private-badge-background-normal-day` | subtle |
| `privateBadgeDimensionPaddingHorizontalSubtle` | `--bpk-private-badge-dimension-padding-horizontal-subtle` | `bpk-spacing-sm()` | subtle |

## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/badge/web-vDRH571D#section-props-0c).
