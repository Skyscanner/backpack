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

import PropTypes from 'prop-types';
import { Component } from 'react';

import { fontWeightBold } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import BpkBannerAlert, {
  ALERT_TYPES,
  BpkBannerAlertDismissable,
  BpkBannerAlertExpandable,
  withBannerAlertState,
} from '..';
import { action } from '../../../.storybook/bpk-storybook-utils';
import AriaLiveDemo from '../../bpk-component-aria-live/src/BpkAriaLive.story-helpers';
import BpkButton from '../../bpk-component-button';
import CurrencyIcon from '../../bpk-component-icon/sm/currency';
import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkBannerAlert.stories.module.scss';

const getClassName = cssModules(STYLES);

const message = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.';
const longMessage = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sagittis sagittis purus, id
blandit ipsum. Pellentesque nec diam nec erat condimentum dapibus. Nunc diam augue, egestas id egestas ut, facilisis
nec mi. Donec et congue odio, nec laoreet est. Integer rhoncus varius arcu, a fringilla libero laoreet at. Mauris
porta varius ullamcorper. Sed laoreet libero mauris, non pretium lectus accumsan et. Suspendisse vehicula ullamcorper
sapien, et dapibus mi aliquet non. Pellentesque auctor sagittis lectus vitae rhoncus. Fusce id enim porttitor, mattis
ante in, vestibulum nulla.`;

class BpkBannerAlertDismissableState extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dismissed: false,
      updates: [],
    };
  }

  render() {
    return <>
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
        <BpkButton
          className={getClassName('bpk-banner-alert-examples__component')}
          onClick={() => {
            this.setState((prevState) => ({
              dismissed: false,
              updates: [...prevState.updates, 'Success alert added'],
            }));
          }}
        >
          Reset
        </BpkButton>
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
    </>;
  }
}

const BpkBannerAlertExpandableState = withBannerAlertState(
  BpkBannerAlertExpandable,
);

const NeutralExample = (props) => (
  <BpkBannerAlert
    message="Neutral alert"
    type={ALERT_TYPES.NEUTRAL}
    {...props}
  />
);

NeutralExample.propTypes = {
  className: PropTypes.string,
};

NeutralExample.defaultProps = {
  className: null,
};

const PrimaryExample = (props) => (
  <BpkBannerAlert
    message="Primary alert"
    type={ALERT_TYPES.PRIMARY}
    {...props}
  />
);

PrimaryExample.propTypes = {
  className: PropTypes.string,
};

PrimaryExample.defaultProps = {
  className: null,
};

const SuccessExample = (props) => (
  <BpkBannerAlert
    message="Success alert"
    type={ALERT_TYPES.SUCCESS}
    {...props}
  />
);

SuccessExample.propTypes = {
  className: PropTypes.string,
};

SuccessExample.defaultProps = {
  className: null,
};

const SuccessLongMessageExample = (props) => (
  <BpkBannerAlert message={longMessage} type={ALERT_TYPES.SUCCESS} {...props} />
);

SuccessLongMessageExample.propTypes = {
  className: PropTypes.string,
};

SuccessLongMessageExample.defaultProps = {
  className: null,
};

const DismissableExample = () => (
  <BpkBannerAlertDismissable
    dismissButtonLabel="Dismiss"
    message="Dimissable alert"
    type={ALERT_TYPES.SUCCESS}
    onDismiss={action('dismissed')}
  />
);

const SuccessExpandableExample = () => (
  <BpkBannerAlertExpandable
    message="Success alert"
    type={ALERT_TYPES.SUCCESS}
    toggleButtonLabel="View more"
  >
    {longMessage}
  </BpkBannerAlertExpandable>
);

const SuccessAnimateOnEnterExample = () => (
  <BpkBannerAlert
    animateOnEnter
    message={message}
    type={ALERT_TYPES.SUCCESS}
    onDismiss={action('dismissed')}
  />
);

const SuccessWithReactRenderedMessageExample = (props) => (
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

SuccessWithReactRenderedMessageExample.propTypes = {
  className: PropTypes.string,
};

SuccessWithReactRenderedMessageExample.defaultProps = {
  className: null,
};

const WarnExample = (props) => (
  <BpkBannerAlert message="Warn alert" type={ALERT_TYPES.WARN} {...props} />
);

WarnExample.propTypes = {
  className: PropTypes.string,
};

WarnExample.defaultProps = {
  className: null,
};

const ErrorExample = (props) => (
  <BpkBannerAlert message="Error alert" type={ALERT_TYPES.ERROR} {...props} />
);

ErrorExample.propTypes = {
  className: PropTypes.string,
};

ErrorExample.defaultProps = {
  className: null,
};

const SuccessDismissableBehaviourExample = () => (
  <BpkBannerAlertDismissableState
    dismissButtonLabel="Dismiss"
    message="Success alert with dismiss option"
    type={ALERT_TYPES.SUCCESS}
  />
);

const SuccessExpandableBehaviourExample = () => (
  <BpkBannerAlertExpandableState
    message="Success alert with more information"
    type={ALERT_TYPES.SUCCESS}
    toggleButtonLabel="View more"
  >
    {longMessage}
  </BpkBannerAlertExpandableState>
);

const SuccessAutomaticallyDismissedExample = () => (
  <BpkBannerAlertDismissableState
    hideAfter={5}
    message={message}
    type={ALERT_TYPES.SUCCESS}
    dismissButtonLabel="Dismiss"
  />
);

const SuccessCustomIconExample = () => (
  <BpkBannerAlert
    message="Success alert with custom icon"
    type={ALERT_TYPES.SUCCESS}
    icon={CurrencyIcon}
  />
);

const DocsDefaultExample = () => (
  <>
    <NeutralExample />
    <PrimaryExample
      className={getClassName('bpk-banner-alert-examples__component')}
    />
    <SuccessExample
      className={getClassName('bpk-banner-alert-examples__component')}
    />
    <SuccessWithReactRenderedMessageExample
      className={getClassName('bpk-banner-alert-examples__component')}
    />
    <WarnExample
      className={getClassName('bpk-banner-alert-examples__component')}
    />
    <ErrorExample
      className={getClassName('bpk-banner-alert-examples__component')}
    />
  </>
);

// Workaround for Storybook not supporting HOCs API table generation in v7
// https://github.com/storybookjs/storybook/issues/12558#issuecomment-1288834879
const withBannerAlertStateMock = () => <div />;

const meta = {
  title: 'bpk-component-banner-alert',
  component: BpkBannerAlert,
  subcomponents: {
    BpkBannerAlertDismissable,
    BpkBannerAlertExpandable,
    withBannerAlertState: withBannerAlertStateMock,
  },
};

export default meta;

export const DocsDefault = { render: () => <DocsDefaultExample /> };

export const Neutral = { render: () => <NeutralExample /> };
export const Primary = { render: () => <PrimaryExample /> };
export const Success = { render: () => <SuccessExample /> };
export const SuccessLongMessage = { render: () => <SuccessLongMessageExample /> };
export const SuccessDismissable = { render: () => <DismissableExample /> };
export const SuccessExpandable = { render: () => <SuccessExpandableExample /> };
export const SuccessAnimateOnEnter = { render: () => <SuccessAnimateOnEnterExample /> };
export const SuccessWithReactRenderedMessage = { render: () => <SuccessWithReactRenderedMessageExample /> };
export const Warn = { render: () => <WarnExample /> };
export const Error = { render: () => <ErrorExample /> };
export const SuccessDismissableBehaviour = { render: () => <SuccessDismissableBehaviourExample /> };
export const SuccessExpandableBehaviour = { render: () => <SuccessExpandableBehaviourExample /> };
export const SuccessAutomaticallyDismissedAfter5Seconds = { render: () => <SuccessAutomaticallyDismissedExample /> };
export const SuccessWithCustomIcon = { render: () => <SuccessCustomIconExample /> };

export const VisualTest = { render: () => <DocsDefaultExample /> };
export const VisualTestWithZoom = { render: () => <DocsDefaultExample />, args: { zoomEnabled: true } };
