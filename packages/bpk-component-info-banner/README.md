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

### Dismissable

```tsx
import { Component } from 'react';
import { ALERT_TYPES, BpkInfoBannerDismissable } from '@skyscanner/backpack-web/bpk-component-banner-alert';

class DismissableBpkInfoBanner extends Component {
  constructor() {
    super();


    this.state = {
      show: true,
    };
  }

  setDismissed = () => {
    this.setState({
      show: false,
    });
  }

  render() {
    return (
      <BpkInfoBannerDismissable
        message="Successful banner with dismiss option."
        type={ALERT_TYPES.SUCCESS}
        onDismiss={this.setDismissed}
        show={this.state.show}
        dismissButtonLabel="Dismiss"
      />
    );
  }
}

export default () => (
  <DismissableBpkInfoBanner />
);
```

### withBannerAlertState(BpkInfoBanner)

```tsx
import { Component } from 'react';
import { ALERT_TYPES, withBannerAlertState, BpkInfoBannerDismissable, BpkInfoBannerExpandable } from '@skyscanner/backpack-web/bpk-component-info-banner';

const InfoBannerDismissableState = withBannerAlertState(BpkInfoBannerDismissable);
const InfoBannerExpandableState = withBannerAlertState(BpkInfoBannerExpandable);

<InfoBannerDismissableState
  dismissButtonLabel="Dismiss"
  message="Successful banner with dismiss option."
  type={ALERT_TYPES.SUCCESS}
/>

<InfoBannerDismissableState
  dismissButtonLabel="Dismiss"
  message="Successful banner that will disappear after 5 seconds."
  hideAfter={5}
  type={ALERT_TYPES.SUCCESS}
/>

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
