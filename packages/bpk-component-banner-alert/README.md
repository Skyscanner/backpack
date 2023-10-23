# bpk-component-banner-alert

> Backpack banner alert component.

DEPRECATED!

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

### Default

```tsx
import BpkBannerAlert, { ALERT_TYPES } from '@skyscanner/backpack-web/bpk-component-banner-alert';

export default () => (
  <BpkBannerAlert
    message="Successful alert with more information."
    type={ALERT_TYPES.SUCCESS}
  />
);
```

### Dismissable

```tsx
import { Component } from 'react';
import { ALERT_TYPES, BpkBannerAlertDismissable } from '@skyscanner/backpack-web/bpk-component-banner-alert';

class DismissableBpkBannerAlert extends Component {
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
      <BpkBannerAlertDismissable
        message="Successful alert with dismiss option."
        type={ALERT_TYPES.SUCCESS}
        onDismiss={this.setDismissed}
        show={this.state.show}
        dismissButtonLabel="Dismiss"
      />
    );
  }
}

export default () => (
  <DismissableBpkBannerAlert />
);
```

### withBannerAlertState(BpkBannerAlert)

```tsx
import { Component } from 'react';
import { ALERT_TYPES, withBannerAlertState, BpkBannerAlertDismissable, BpkBannerAlertExpandable } from '@skyscanner/backpack-web/bpk-component-banner-alert';

const BannerAlertDismissableState = withBannerAlertState(BpkBannerAlertDismissable);
const BannerAlertExpandableState = withBannerAlertState(BpkBannerAlertExpandable);

<BannerAlertDismissableState
  dismissButtonLabel="Dismiss"
  message="Successful alert with dismiss option."
  type={ALERT_TYPES.SUCCESS}
/>

<BannerAlertDismissableState
  dismissButtonLabel="Dismiss"
  message="Successful alert that will disappear after 5 seconds."
  hideAfter={5}
  type={ALERT_TYPES.SUCCESS}
/>

<BannerAlertExpandableState
  message="Successful alert with expandable option."
  type={ALERT_TYPES.SUCCESS}
  toggleButtonLabel="View more"
>
  Lorem ipsum dolor sit amet.
</BannerAlertExpandableState>
```

## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/banner-alert/web-TyY0O2cu#section-props-12).
