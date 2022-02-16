/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* @flow strict */

import React, { Component } from 'react';
import { action } from 'bpk-storybook-utils';
import { fontWeightBold } from '@skyscanner/bpk-foundations-web/tokens/base.es6';
import CurrencyIcon from 'bpk-component-icon/sm/currency';
import { AriaLiveDemo } from 'bpk-component-aria-live/examples';
import { BpkButtonPrimary } from 'bpk-component-button';
import { cssModules } from 'bpk-react-utils';

import STYLES from './examples.module.scss';

import BpkBannerAlert, {
  ALERT_TYPES,
  withBannerAlertState,
  BpkBannerAlertDismissable,
  BpkBannerAlertExpandable,
} from './index';

const getClassName = cssModules(STYLES);

const message = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.';
const longMessage = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sagittis sagittis purus, id
blandit ipsum. Pellentesque nec diam nec erat condimentum dapibus. Nunc diam augue, egestas id egestas ut, facilisis
nec mi. Donec et congue odio, nec laoreet est. Integer rhoncus varius arcu, a fringilla libero laoreet at. Mauris
porta varius ullamcorper. Sed laoreet libero mauris, non pretium lectus accumsan et. Suspendisse vehicula ullamcorper
sapien, et dapibus mi aliquet non. Pellentesque auctor sagittis lectus vitae rhoncus. Fusce id enim porttitor, mattis
ante in, vestibulum nulla.`;

type Props = {};
type State = {
  dismissed: boolean,
  updates: Array<string>,
};

class BpkBannerAlertDismissableState extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      dismissed: false,
      updates: [],
    };
  }

  render() {
    return (
      <>
        {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
        <BpkBannerAlertDismissable
          show={!this.state.dismissed}
          dismissButtonLabel="Dismiss"
          onDismiss={() => {
            this.setState((prevState) => ({
              dismissed: true,
              updates: [...prevState.updates, 'Success alert dismissed'],
            }));
          }}
          message="Neutral alert with dismiss option"
          {...this.props}
        />
        {this.state.dismissed && (
          <BpkButtonPrimary
            className={getClassName('bpk-banner-alert-examples__component')}
            onClick={() => {
              this.setState((prevState) => ({
                dismissed: false,
                updates: [...prevState.updates, 'Success alert added'],
              }));
            }}
          >
            Reset
          </BpkButtonPrimary>
        )}
        <AriaLiveDemo
          visible
          className={getClassName('bpk-banner-alert-examples__component')}
        >
          {this.state.updates.map((u) => (
            <>
              {u}
              <br />
            </>
          ))}
        </AriaLiveDemo>
      </>
    );
  }
}

const BpkBannerAlertExpandableState = withBannerAlertState(
  BpkBannerAlertExpandable,
);

const Neutral = (props: {}) => (
  // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
  <BpkBannerAlert
    message="Neutral alert"
    type={ALERT_TYPES.NEUTRAL}
    {...props}
  />
);
const Primary = (props: {}) => (
  // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
  <BpkBannerAlert
    message="Primary alert"
    type={ALERT_TYPES.PRIMARY}
    {...props}
  />
);
const Success = (props: {}) => (
  // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
  <BpkBannerAlert
    message="Success alert"
    type={ALERT_TYPES.SUCCESS}
    {...props}
  />
);
const SuccessLongMessage = (props: {}) => (
  // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
  <BpkBannerAlert message={longMessage} type={ALERT_TYPES.SUCCESS} {...props} />
);
const Dismissable = () => (
  <BpkBannerAlertDismissable
    dismissButtonLabel="Dismiss"
    message="Dimissable alert"
    type={ALERT_TYPES.SUCCESS}
    onDismiss={action('dismissed')}
  />
);
const SuccessExpandable = () => (
  <BpkBannerAlertExpandable
    message="Success alert"
    type={ALERT_TYPES.SUCCESS}
    toggleButtonLabel="View more"
  >
    {longMessage}
  </BpkBannerAlertExpandable>
);
const SuccessAnimateOnEnter = () => (
  <BpkBannerAlert
    animateOnEnter
    message={message}
    type={ALERT_TYPES.SUCCESS}
    onDismiss={action('dismissed')}
  />
);
const SuccessWithReactRenderedMessage = (props: {}) => (
  // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
  <BpkBannerAlert
    message={
      <span style={{ fontWeight: fontWeightBold }}>
        Successful alert with custom rendered message
      </span>
    }
    type={ALERT_TYPES.SUCCESS}
    {...props}
  />
);
const Warn = (props: {}) => (
  // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
  <BpkBannerAlert message="Warn alert" type={ALERT_TYPES.WARN} {...props} />
);
const ErrorExample = (props: {}) => (
  // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
  <BpkBannerAlert message="Error alert" type={ALERT_TYPES.ERROR} {...props} />
);
const Event = (props: {}) => (
  // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
  <BpkBannerAlert message="Event alert" type={ALERT_TYPES.EVENT} {...props} />
);
const SuccessDismissableBehaviour = () => (
  <BpkBannerAlertDismissableState
    dismissButtonLabel="Dismiss"
    message="Success alert with dismiss option"
    type={ALERT_TYPES.SUCCESS}
  />
);
const SuccessExpandableBehaviour = () => (
  <BpkBannerAlertExpandableState
    message="Success alert with more information"
    type={ALERT_TYPES.SUCCESS}
    toggleButtonLabel="View more"
  >
    {longMessage}
  </BpkBannerAlertExpandableState>
);
const SuccessAutomaticallyDismissed = () => (
  <BpkBannerAlertDismissableState
    hideAfter={5}
    message={message}
    type={ALERT_TYPES.SUCCESS}
    dismissButtonLabel="Dismiss"
  />
);
const SuccessCustomIcon = () => (
  <BpkBannerAlert
    message="Success alert with custom icon"
    type={ALERT_TYPES.SUCCESS}
    icon={CurrencyIcon}
  />
);

const DocsDefault = () => (
  <>
    <Neutral />
    <Primary className={getClassName('bpk-banner-alert-examples__component')} />
    <Success className={getClassName('bpk-banner-alert-examples__component')} />
    <SuccessWithReactRenderedMessage
      className={getClassName('bpk-banner-alert-examples__component')}
    />
    <Warn className={getClassName('bpk-banner-alert-examples__component')} />
    <ErrorExample
      className={getClassName('bpk-banner-alert-examples__component')}
    />
  </>
);

export {
  Neutral,
  Primary,
  Success,
  SuccessLongMessage,
  Dismissable,
  SuccessExpandable,
  SuccessAnimateOnEnter,
  SuccessWithReactRenderedMessage,
  Warn,
  ErrorExample,
  Event,
  SuccessDismissableBehaviour,
  SuccessExpandableBehaviour,
  SuccessAutomaticallyDismissed,
  SuccessCustomIcon,
  DocsDefault,
};
