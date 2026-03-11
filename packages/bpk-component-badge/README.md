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

BpkBadge supports theming via `BpkThemeProvider`. Each aspect of the badge's appearance is controlled by a dedicated CSS custom property, allowing fine-grained overrides per variant.

Use the exported theme attribute arrays to declare exactly which properties you are overriding. `BpkThemeProvider` applies CSS variables only when all declared attributes are present in the `theme` object — pass only the attributes you intend to override.

### Corner radius

```tsx
import BpkBadge from '@skyscanner/backpack-web/bpk-component-badge';
import BpkThemeProvider from '@skyscanner/backpack-web/bpk-theming';

export default () => (
  <BpkThemeProvider
    theme={{ badgeBorderRadius: '999px' }}
    themeAttributes={['badgeBorderRadius']}
  >
    <BpkBadge>Pill badge</BpkBadge>
  </BpkThemeProvider>
);
```

### Typography

```tsx
import BpkBadge from '@skyscanner/backpack-web/bpk-component-badge';
import BpkThemeProvider from '@skyscanner/backpack-web/bpk-theming';
import { fontSizeBase, fontWeightBold, lineHeightBase } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

export default () => (
  <BpkThemeProvider
    theme={{ badgeFontSize: fontSizeBase, badgeFontWeight: fontWeightBold, badgeLineHeight: lineHeightBase }}
    themeAttributes={['badgeFontSize', 'badgeFontWeight', 'badgeLineHeight']}
  >
    <BpkBadge>My Badge</BpkBadge>
  </BpkThemeProvider>
);
```

### Variant colours (background, text and icon)

Each variant exposes independent theme attributes for background colour, text colour and icon colour. Import the per-variant array to declare which attributes you are overriding:

```tsx
import BpkBadge, { BADGE_TYPES, badgeNormalThemeAttributes } from '@skyscanner/backpack-web/bpk-component-badge';
import BpkThemeProvider from '@skyscanner/backpack-web/bpk-theming';
import { coreAccentDay } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

export default () => (
  <BpkThemeProvider
    theme={{
      badgeNormalBackgroundColor: coreAccentDay,
      badgeNormalTextColor: 'rgb(255, 255, 255)',
      badgeNormalIconColor: 'rgb(255, 255, 255)',
    }}
    themeAttributes={badgeNormalThemeAttributes}
  >
    <BpkBadge type={BADGE_TYPES.normal}>Normal</BpkBadge>
  </BpkThemeProvider>
);
```

### Theme attributes reference

#### Shared (all variants)

| Theme attribute | CSS custom property | Default |
|---|---|---|
| `badgeBorderRadius` | `--bpk-badge-border-radius` | `tokens.$bpk-border-radius-xs` |
| `badgeFontSize` | `--bpk-badge-font-size` | `tokens.$bpk-font-size-sm` |
| `badgeFontWeight` | `--bpk-badge-font-weight` | `tokens.$bpk-font-weight-book` |
| `badgeLineHeight` | `--bpk-badge-line-height` | `tokens.$bpk-line-height-sm` |

#### Per-variant colour attributes

| Export | Theme attributes |
|---|---|
| `badgeNormalThemeAttributes` | `badgeNormalBackgroundColor`, `badgeNormalTextColor`, `badgeNormalIconColor` |
| `badgeWarningThemeAttributes` | `badgeWarningBackgroundColor`, `badgeWarningTextColor`, `badgeWarningIconColor` |
| `badgeSuccessThemeAttributes` | `badgeSuccessBackgroundColor`, `badgeSuccessTextColor`, `badgeSuccessIconColor` |
| `badgeCriticalThemeAttributes` | `badgeCriticalBackgroundColor`, `badgeCriticalTextColor`, `badgeCriticalIconColor` |
| `badgeInverseThemeAttributes` | `badgeInverseBackgroundColor`, `badgeInverseTextColor`, `badgeInverseIconColor` |
| `badgeOutlineThemeAttributes` | `badgeOutlineBackgroundColor`, `badgeOutlineTextColor`, `badgeOutlineIconColor` |
| `badgeStrongThemeAttributes` | `badgeStrongBackgroundColor`, `badgeStrongTextColor`, `badgeStrongIconColor` |
| `badgeBrandThemeAttributes` | `badgeBrandBackgroundColor`, `badgeBrandTextColor`, `badgeBrandIconColor` |

## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/badge/web-vDRH571D#section-props-0c).
