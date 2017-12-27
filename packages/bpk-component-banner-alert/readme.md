# bpk-component-banner-alert

> Backpack banner alert component.

## Installation

```sh
npm install bpk-component-banner-alert --save-dev
```

## Usage

### Non-dismissable

```js
import React from 'react';
import BpkBannerAlert, { ALERT_TYPES, CONFIGURATION } from 'bpk-component-banner-alert';

const longMessage = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sagittis sagittis purus, id blandit ipsum. Pellentesque nec diam nec erat condimentum dapibus. Nunc diam augue, egestas id egestas ut, facilisis nec mi. Donec et congue odio, nec laoreet est. Integer rhoncus varius arcu, a fringilla libero laoreet at. Mauris porta varius ullamcorper. Sed laoreet libero mauris, non pretium lectus accumsan et. Suspendisse vehicula ullamcorper sapien, et dapibus mi aliquet non. Pellentesque auctor sagittis lectus vitae rhoncus. Fusce id enim porttitor, mattis ante in, vestibulum nulla.';

export default () => (
  <BpkBannerAlert
    configuration={CONFIGURATION.EXPANDABLE}
    message="Successful alert with more information."
    type={ALERT_TYPES.SUCCESS}
  >
    {longMessage}
  </BpkBannerAlert>
);
```

### Dismissable

```js
import React, { Component } from 'react';
import BpkBannerAlert, { ALERT_TYPES, CONFIGURATION } from 'bpk-component-banner-alert';

class DismissableBpkBannerAlert extends Component {
  constructor() {
    super();

    this.setDismissed = this.setDismissed.bind(this);

    this.state = {
      show: true,
    };
  }

  setDismissed() {
    this.setState({
      show: false,
    });
  }

  render() {
    return (
      <BpkBannerAlert
        message="Successful alert with dismiss option."
        type={ALERT_TYPES.SUCCESS}
        configuration={CONFIGURATION.DISMISSABLE}
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
import BpkBannerAlert, { ALERT_TYPES, withBannerAlertState, CONFIGURATION } from 'bpk-component-banner-alert';

const BannerAlertState = withBannerAlertState(BpkBannerAlert);

<BannerAlertState
  configuration={CONFIGURATION.DISMISSABLE}
  dismissButtonLabel="Dismiss"
  message="Successful alert with dismiss option."
  type={ALERT_TYPES.SUCCESS}
/>

<BannerAlertState
  message="Successful alert that will disappear after 5 seconds."
  hideAfter={5}
  type={ALERT_TYPES.SUCCESS}
/>

<BannerAlertState
  configuration={CONFIGURATION.EXPANDABLE}
  message="Successful alert with expandable option."
  type={ALERT_TYPES.SUCCESS}
  toggleButtonLabel="View more"
>
  Lorem ipsum dolor sit amet.
</BannerAlertState>
```


## Props

### BpkBannerAlert

| Property           | PropType               | Required | Default Value |
| ------------------ | ---------------------- | -------- | ------------- |
| type               | ALERT_TYPES (one of)   | true     | -             |
| configuration      | CONFIGURATION (one of) | true     | -             |
| message            | node                   | true     | -             |
| animateOnEnter     | bool                   | false    | false         |
| animateOnLeave     | bool                   | false    | false         |
| ariaLive           | ARIA_LIVE (one of)     | false    | 'assertive'   |
| bannerClassName    | string                 | false    | null          |
| children           | node                   | false    | null          |
| dismissButtonLabel | string                 | false    | null          |
| onDismiss          | func                   | false    | null          |
| show               | bool                   | false    | true          |
| expanded           | bool                   | false    | false         |
| toggleButtonLabel  | string                 | false    | null          |
| onExpandToggle     | func                   | false    | null          |
| className          | string                 | false    | null          |

### withBannerAlertState(BpkBannerAlert)

| Property  | PropType | Required | Default Value |
| --------- | -------- | -------- | ------------- |
| hideAfter | number   | false    | null          |
| onDismiss | func     | false    | null          |
