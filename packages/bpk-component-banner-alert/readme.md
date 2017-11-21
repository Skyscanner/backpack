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
import BpkBannerAlert, { ALERT_TYPES } from 'bpk-component-banner-alert';

const longMessage = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sagittis sagittis purus, id blandit ipsum. Pellentesque nec diam nec erat condimentum dapibus. Nunc diam augue, egestas id egestas ut, facilisis nec mi. Donec et congue odio, nec laoreet est. Integer rhoncus varius arcu, a fringilla libero laoreet at. Mauris porta varius ullamcorper. Sed laoreet libero mauris, non pretium lectus accumsan et. Suspendisse vehicula ullamcorper sapien, et dapibus mi aliquet non. Pellentesque auctor sagittis lectus vitae rhoncus. Fusce id enim porttitor, mattis ante in, vestibulum nulla.';

export default () => (
  <BpkBannerAlert
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
import BpkBannerAlert, { ALERT_TYPES } from 'bpk-component-banner-alert';

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
        dismissable
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

## Props

| Property           | PropType             | Required | Default Value |
| ------------------ | -------------------- | -------- | ------------- |
| type               | ALERT_TYPES (one of) | true     | -             |
| message            | node                 | true     | -             |
| ariaLive           | ARIA_LIVE (one of)   | false    | 'assertive'   |
| children           | node                 | false    | null          |
| dismissable        | bool                 | false    | false         |
| dismissButtonLabel | string               | false    | null          |
| onDismiss          | func                 | false    | null          |
| show               | bool                 | false    | true          |
| toggleButtonLabel  | string               | false    | null          |
| className          | string               | false    | null          |
