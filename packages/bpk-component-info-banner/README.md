# bpk-component-banner-alert

> Backpack banner alert component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

### Default

```tsx
import BpkInfoBanner, { ALERT_TYPES } from '@skyscanner/backpack-web/bpk-component-info-banner';

export default () => (
  <BpkInfoBanner
    message="Successful alert with more information."
    type={ALERT_TYPES.SUCCESS}
  />
);
```

### withBannerAlertState(BpkInfoBanner)

```tsx
import { Component } from 'react';
import { ALERT_TYPES, withBannerAlertState, BpkInfoBannerExpandable } from '@skyscanner/backpack-web/bpk-component-info-banner';

const InfoBannerExpandableState = withBannerAlertState(BpkInfoBannerExpandable);

<InfoBannerExpandableState
  message="Successful banner with expandable option."
  type={ALERT_TYPES.SUCCESS}
  toggleButtonLabel="View more"
>
  Lorem ipsum dolor sit amet.
</InfoBannerExpandableState>
```

## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/info-banner/web-TyY0O2cu#section-props-12).
