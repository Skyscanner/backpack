# bpk-component-banner-alert

> Backpack banner alert component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

### Default

```js
import React from 'react';
import BpkBannerAlert, { ALERT_TYPES } from '@skyscanner/backpack-web/bpk-component-banner-alert';

export default () => (
  <BpkBannerAlert
    message="Successful alert with more information."
    type={ALERT_TYPES.SUCCESS}
  />
);
```

### Dismissable

```js
import React, { Component } from 'react';
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

```js
import React, { Component } from 'react';
import { ALERT_TYPES, withBannerAlertState, BpkBannerAlertDismissable, BpkBannerAlertExpandable } from '@skyscanner/backpack-web/bpk-component-banner-alert';

const BannerAlertDismissableState = withBannerAlertState(BpkBannerAlertDismissable);
const BannerAlertExpandableState = withBannerAlertState(BpkBannerAlertExpandable);

<BannerAlertDismissableState
  dismissButtonLabel="Dismiss"
  message="Successful alert with dismiss option."
  type={ALERT_TYPES.SUCCESS}
/>

<BannerAlertDismissableState
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

### BpkBannerAlert

| Property           | PropType               | Required | Default Value |
| ------------------ | ---------------------- | -------- | ------------- |
| type               | ALERT_TYPES (one of)   | true     | -             |
| message            | node                   | true     | -             |
| animateOnEnter     | bool                   | false    | false         |
| animateOnLeave     | bool                   | false    | false         |
| bannerClassName    | string                 | false    | null          |
| icon               | BpkIcon                | false    | null          |
| show               | bool                   | false    | true          |

### BpkBannerAlertDismissable

| Property           | PropType               | Required | Default Value |
| ------------------ | ---------------------- | -------- | ------------- |
| type               | ALERT_TYPES (one of)   | true     | -             |
| message            | node                   | true     | -             |
| animateOnEnter     | bool                   | false    | false         |
| animateOnLeave     | bool                   | false    | false         |
| bannerClassName    | string                 | false    | null          |
| dismissButtonLabel | string                 | false    | null          |
| icon               | BpkIcon                | false    | null          |
| onDismiss          | func                   | false    | null          |
| show               | bool                   | false    | true          |

### BpkBannerAlertExpandable

| Property           | PropType               | Required | Default Value |
| ------------------ | ---------------------- | -------- | ------------- |
| type               | ALERT_TYPES (one of)   | true     | -             |
| message            | node                   | true     | -             |
| animateOnEnter     | bool                   | false    | false         |
| animateOnLeave     | bool                   | false    | false         |
| bannerClassName    | string                 | false    | null          |
| expanded           | bool                   | false    | false         |
| icon               | BpkIcon                | false    | null          |
| onExpandToggle     | func                   | false    | null          |
| show               | bool                   | false    | true          |
| toggleButtonLabel  | string                 | false    | null          |

### withBannerAlertState(BpkBannerAlert)

| Property  | PropType | Required | Default Value |
| --------- | -------- | -------- | ------------- |
| hideAfter | number   | false    | null          |
| onHide    | func     | false    | null          |

## Theme Props

* `bannerAlertPrimaryColor`
* `bannerAlertSuccessColor`
* `bannerAlertWarnColor`
* `bannerAlertErrorColor`
