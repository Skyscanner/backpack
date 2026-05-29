# Migrating from v1 to v2

With version 2 of `bpk-component-banner-alert` we overhauled and simplified the external interface of the component by splitting it in several components for each use case. In version 2 there are 3 components:

+ `BpkBannerAlert`
+ `BpkBannerAlertDismissable`
+ `BpkBannerAlertExpandable`

`BpkBannerAlert` is the default version that does not feature the ability to dismiss or expand. `BpkBannerAlertDismissable` is the variant that can be dismissed by the user. `BpkBannerAlertExpandable` is a variant that can show more detailed content by expanding an initially hidden section of content.

## Migrating

Let us walk through migrating the 3 different cases.

### The default case

No `dismissable` prop and no children.

**V1:**

```javascript
import BpkBannerAlert, { ALERT_TYPES } from "bpk-component-banner-alert";

const render = () => (
  <BpkBannerAlert type={ALERT_TYPES.SUCCESS} message="Everything went well" />
);
```

This migration is really simple as you have to make no changes unless you are using `ariaLive` which has been removed.

**V2:**

```javascript
import BpkBannerAlert, { ALERT_TYPES } from "bpk-component-banner-alert";

const render = () => (
  <BpkBannerAlert type={ALERT_TYPES.SUCCESS} message="Everything went well" />
);
```

## The dismissable case

In the dismissable case the component needs to be changed to `BpkBannerAlertDismissable`. Also verify that you are not passing props that `BpkBannerAlertDismissable` does not use.


**V1:**

```javascript
import BpkBannerAlert, { ALERT_TYPES } from "bpk-component-banner-alert";

const render = () => (
  <BpkBannerAlert
    dismissable
    dismissButtonLabel="Dismiss"
    type={ALERT_TYPES.SUCCESS}
    message="Everything went well"
    onDismiss={() => undefined}
  />
);
```

**V2:**

```javascript
import {
  ALERT_TYPES,
  BpkBannerAlertDismissable
} from "bpk-component-banner-alert";

const render = () => (
  <BpkBannerAlertDismissable
    dismissButtonLabel="Dismiss"
    type={ALERT_TYPES.SUCCESS}
    message="Everything went well"
    onDismiss={() => undefined}
  />
);
```

## The expandable case

In version 1 the expandable behaviour was enabled if the component had any children. With version 2 there is now a dedicated component, `BpkBannerAlertExpandable`, for this behaviour.

**V1:**

```javascript
import BpkBannerAlert, { ALERT_TYPES } from "bpk-component-banner-alert";

const render = () => (
  <BpkBannerAlert
    type={ALERT_TYPES.SUCCESS}
    message="Everything went horribly wrong"
    toggleButtonLabel="Toggle details"
    onExpandToggle={() => undefined}
  >
    An even longer more detailed message
  </BpkBannerAlert>
);
```

**V2:**

```javascript
import { ALERT_TYPES, BpkBannerAlertExpandable } from "bpk-component-banner-alert";

const render = () => (
  <BpkBannerAlertExpandable
    type={ALERT_TYPES.SUCCESS}
    message="Everything went horribly wrong"
    toggleButtonLabel="Toggle details"
    onExpandToggle={() => undefined}
  >
    An even longer more detailed message
  </BpkBannerAlertExpandable>
);
```

## `withBannerAlertState`

`withBannerAlertState` continues to work with both `BpkBannerAlertDismissable` and `BpkBannerAlertExpandable` as before. However when using `hideAfter` `onDimiss` is no longer called when the banner alert is removed, instead a new prop `onHide` has been introduced for this purpose. `hideAfter` is no longer a valid option for expandable banner alerts.
