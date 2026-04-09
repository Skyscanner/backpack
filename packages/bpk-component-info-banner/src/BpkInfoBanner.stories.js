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

import {
  canvasContrastDay,
  cardPadding,
  fontWeightBold,
} from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import BpkInfoBanner, {
  ALERT_TYPES,
  BpkInfoBannerDismissable,
  BpkInfoBannerExpandable,
  STYLE_TYPES,
  withBannerAlertState,
} from '..';
import { action } from '../../../examples/bpk-storybook-utils';
import AriaLiveDemo from '../../bpk-component-aria-live/src/BpkAriaLive.story-helpers';
import BpkButton from '../../bpk-component-button';
import CurrencyIcon from '../../bpk-component-icon/sm/currency';
import BpkText from '../../bpk-component-text';
import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkInfoBanner.stories.module.scss';

const getClassName = cssModules(STYLES);

const message = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.';
const longMessage = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sagittis sagittis purus, id
blandit ipsum. Pellentesque nec diam nec erat condimentum dapibus. Nunc diam augue, egestas id egestas ut, facilisis
nec mi. Donec et congue odio, nec laoreet est. Integer rhoncus varius arcu, a fringilla libero laoreet at. Mauris
porta varius ullamcorper. Sed laoreet libero mauris, non pretium lectus accumsan et. Suspendisse vehicula ullamcorper
sapien, et dapibus mi aliquet non. Pellentesque auctor sagittis lectus vitae rhoncus. Fusce id enim porttitor, mattis
ante in, vestibulum nulla.`;

const ALERT_TYPE_LABELS = {
  [ALERT_TYPES.SUCCESS]: 'Success',
  [ALERT_TYPES.WARNING]: 'Warning',
  [ALERT_TYPES.ERROR]: 'Error',
  [ALERT_TYPES.INFO]: 'Info',
  [ALERT_TYPES.CRITICAL]: 'Critical',
};

class BpkInfoBannerDismissableState extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dismissed: false,
      updates: [],
    };
  }

  render() {
    const typeLabel = ALERT_TYPE_LABELS[this.props.type || ALERT_TYPES.INFO] || 'Info';

    return <>
      <BpkInfoBannerDismissable
        show={!this.state.dismissed}
        dismissButtonLabel="Dismiss"
        onDismiss={() => {
          this.setState((prevState) => ({
            dismissed: true,
            updates: [...prevState.updates, `${typeLabel} alert dismissed`],
          }));
        }}
        message="Neutral alert with dismiss option"
        {...this.props}
      />
      {this.state.dismissed && (
        <BpkButton
          className={getClassName('bpk-info-banner-examples__component')}
          onClick={() => {
            this.setState((prevState) => ({
              dismissed: false,
              updates: [...prevState.updates, `${typeLabel} alert added`],
            }));
          }}
        >
          Reset
        </BpkButton>
      )}
      <AriaLiveDemo
        visible
        className={getClassName('bpk-info-banner-examples__component')}
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

BpkInfoBannerDismissableState.propTypes = {
  type: PropTypes.string,
};

BpkInfoBannerDismissableState.defaultProps = {
  type: null,
};

const BpkInfoBannerExpandableState = withBannerAlertState(
  BpkInfoBannerExpandable,
);

const DefaultExample = (props) => (
  <BpkInfoBanner message="Default alert" {...props} />
);

DefaultExample.propTypes = {
  className: PropTypes.string,
};

DefaultExample.defaultProps = {
  className: null,
};

const InfoExample = (props) => (
  <BpkInfoBanner message="Info alert" type={ALERT_TYPES.INFO} {...props} />
);

InfoExample.propTypes = {
  className: PropTypes.string,
};

InfoExample.defaultProps = {
  className: null,
};

const SuccessExample = (props) => (
  <BpkInfoBanner
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
  <BpkInfoBanner message={longMessage} type={ALERT_TYPES.SUCCESS} {...props} />
);

SuccessLongMessageExample.propTypes = {
  className: PropTypes.string,
};

SuccessLongMessageExample.defaultProps = {
  className: null,
};

const DismissableExample = () => (
  <BpkInfoBannerDismissable
    dismissButtonLabel="Dismiss"
    message="Dimissable alert"
    type={ALERT_TYPES.SUCCESS}
    onDismiss={action('dismissed')}
  />
);

const SuccessExpandableExample = () => (
  <BpkInfoBannerExpandable
    message="Success alert"
    type={ALERT_TYPES.SUCCESS}
    toggleButtonLabel="View more"
  >
    {longMessage}
  </BpkInfoBannerExpandable>
);

const SuccessAnimateOnEnterExample = () => (
  <BpkInfoBanner
    animateOnEnter
    message={message}
    type={ALERT_TYPES.SUCCESS}
    onDismiss={action('dismissed')}
  />
);

const SuccessWithReactRenderedMessageExample = (props) => (
  <BpkInfoBanner
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

const WarningExample = (props) => (
  <BpkInfoBanner
    message="Warning alert"
    type={ALERT_TYPES.WARNING}
    {...props}
  />
);

WarningExample.propTypes = {
  className: PropTypes.string,
};

WarningExample.defaultProps = {
  className: null,
};

const ErrorExample = (props) => (
  <BpkInfoBanner message="Error alert" type={ALERT_TYPES.ERROR} {...props} />
);

ErrorExample.propTypes = {
  className: PropTypes.string,
};

ErrorExample.defaultProps = {
  className: null,
};

const CriticalExample = (props) => (
  <BpkInfoBanner
    message="Critical alert"
    type={ALERT_TYPES.CRITICAL}
    {...props}
  />
);

CriticalExample.propTypes = {
  className: PropTypes.string,
};

CriticalExample.defaultProps = {
  className: null,
};

const SuccessDismissableBehaviourExample = () => (
  <BpkInfoBannerDismissableState
    dismissButtonLabel="Dismiss"
    message="Success alert with dismiss option"
    type={ALERT_TYPES.SUCCESS}
  />
);

const CriticalDismissableBehaviourExample = () => (
  <BpkInfoBannerDismissableState
    dismissButtonLabel="Dismiss"
    message="Critical alert with dismiss option"
    type={ALERT_TYPES.CRITICAL}
  />
);

const SuccessExpandableBehaviourExample = () => (
  <BpkInfoBannerExpandableState
    message="Success alert with more information"
    type={ALERT_TYPES.SUCCESS}
    toggleButtonLabel="View more"
  >
    {longMessage}
  </BpkInfoBannerExpandableState>
);

const SuccessExpandableWithActionExample = () => (
  <BpkInfoBannerExpandableState
    message="Success alert"
    type={ALERT_TYPES.SUCCESS}
    action={{title: "Sample Action", callback: () => alert('Hello from action')}} // eslint-disable-line no-alert
    toggleButtonLabel="View more"
  >
    {longMessage}
  </BpkInfoBannerExpandableState>
);

const CriticalExpandableWithActionExample = () => (
  <BpkInfoBannerExpandableState
    message="Critical alert"
    type={ALERT_TYPES.CRITICAL}
    action={{title: "Sample Action", callback: action('action clicked')}}
    toggleButtonLabel="View more"
  >
    {longMessage}
  </BpkInfoBannerExpandableState>
);

const SuccessAutomaticallyDismissedExample = () => (
  <BpkInfoBannerDismissableState
    hideAfter={5}
    message={message}
    type={ALERT_TYPES.SUCCESS}
    dismissButtonLabel="Dismiss"
  />
);

const SuccessCustomIconExample = () => (
  <BpkInfoBanner
    message="Success alert with custom icon"
    type={ALERT_TYPES.SUCCESS}
    icon={CurrencyIcon}
  />
);

const CriticalCustomIconExample = () => (
  <BpkInfoBanner
    message="Critical alert with custom icon"
    type={ALERT_TYPES.CRITICAL}
    icon={CurrencyIcon}
  />
);

const OnContrastExample = (props) => (
  <div style={{ backgroundColor: canvasContrastDay, padding: cardPadding }}>
    <BpkText
      tagName="p"
      className={getClassName('bpk-info-banner-examples__p')}
    >
      {message}
    </BpkText>
    <BpkInfoBanner
      message="Info alert on contrast"
      type={ALERT_TYPES.INFO}
      style={STYLE_TYPES.ON_CONTRAST}
      {...props}
    />
    <BpkText
      tagName="p"
      className={getClassName('bpk-info-banner-examples__p')}
    >
      {message}
    </BpkText>
    <BpkInfoBannerExpandableState
      message="Expandable info alert on contrast"
      style={STYLE_TYPES.ON_CONTRAST}
      type={ALERT_TYPES.INFO}
      toggleButtonLabel="View more"
    >
      {longMessage}
    </BpkInfoBannerExpandableState>
    <BpkText
      tagName="p"
      className={getClassName('bpk-info-banner-examples__p')}
    >
      {message}
    </BpkText>
    <BpkInfoBanner
      message="Success alert on contrast"
      type={ALERT_TYPES.SUCCESS}
      style={STYLE_TYPES.ON_CONTRAST}
      {...props}
    />
    <BpkText
      tagName="p"
      className={getClassName('bpk-info-banner-examples__p')}
    >
      {message}
    </BpkText>
    <BpkInfoBanner
      message="Warning alert on contrast"
      type={ALERT_TYPES.WARNING}
      style={STYLE_TYPES.ON_CONTRAST}
      {...props}
    />
    <BpkText
      tagName="p"
      className={getClassName('bpk-info-banner-examples__p')}
    >
      {message}
    </BpkText>
    <BpkInfoBanner
      message="Error alert on contrast"
      type={ALERT_TYPES.ERROR}
      style={STYLE_TYPES.ON_CONTRAST}
      {...props}
    />
    <BpkText
      tagName="p"
      className={getClassName('bpk-info-banner-examples__p')}
    >
      {message}
    </BpkText>
    <BpkInfoBanner
      message="Critical alert on contrast"
      type={ALERT_TYPES.CRITICAL}
      style={STYLE_TYPES.ON_CONTRAST}
      {...props}
    />
    <BpkText
      tagName="p"
      className={getClassName('bpk-info-banner-examples__p')}
    >
      {message}
    </BpkText>
  </div>
);

OnContrastExample.propTypes = {
  className: PropTypes.string,
};

OnContrastExample.defaultProps = {
  className: null,
};

const DocsDefaultExample = () => (
  <>
    <InfoExample />
    <SuccessExample
      className={getClassName('bpk-info-banner-examples__component')}
    />
    <SuccessWithReactRenderedMessageExample
      className={getClassName('bpk-info-banner-examples__component')}
    />
    <WarningExample
      className={getClassName('bpk-info-banner-examples__component')}
    />
    <ErrorExample
      className={getClassName('bpk-info-banner-examples__component')}
    />
    <CriticalExample
      className={getClassName('bpk-info-banner-examples__component')}
    />
  </>
);

// Workaround for Storybook not supporting HOCs API table generation in v7
// https://github.com/storybookjs/storybook/issues/12558#issuecomment-1288834879
const withBannerAlertStateMock = () => <div />;

const meta = {
  title: 'bpk-component-info-banner',
  component: BpkInfoBanner,
  subcomponents: {
    BpkInfoBannerDismissable,
    BpkInfoBannerExpandable,
    withBannerAlertState: withBannerAlertStateMock,
  },
};

export default meta;

export const DocsDefault = { render: () => <DocsDefaultExample /> };
export const Default = { render: () => <DefaultExample /> };
export const Info = { render: () => <InfoExample /> };
export const Success = { render: () => <SuccessExample /> };
export const SuccessLongMessage = { render: () => <SuccessLongMessageExample /> };
export const SuccessDismissable = { render: () => <DismissableExample /> };
export const SuccessExpandable = { render: () => <SuccessExpandableExample /> };
export const SuccessExpandableWithAction = { render: () => <SuccessExpandableWithActionExample /> };
export const SuccessAnimateOnEnter = { render: () => <SuccessAnimateOnEnterExample /> };
export const SuccessWithReactRenderedMessage = { render: () => <SuccessWithReactRenderedMessageExample /> };
export const Warning = { render: () => <WarningExample /> };
export const Error = { render: () => <ErrorExample /> };
export const Critical = { render: () => <CriticalExample /> };
export const CriticalExpandableWithAction = { render: () => <CriticalExpandableWithActionExample /> };
export const CriticalDismissableBehaviour = { render: () => <CriticalDismissableBehaviourExample /> };
export const SuccessDismissableBehaviour = { render: () => <SuccessDismissableBehaviourExample /> };
export const OnContrast = { render: () => <OnContrastExample /> };
export const SuccessExpandableBehaviour = { render: () => <SuccessExpandableBehaviourExample /> };
export const SuccessAutomaticallyDismissedAfter5Seconds = { render: () => <SuccessAutomaticallyDismissedExample /> };
export const SuccessWithCustomIcon = { render: () => <SuccessCustomIconExample /> };
export const CriticalWithCustomIcon = { render: () => <CriticalCustomIconExample /> };

export const VisualTest = { render: () => <DocsDefaultExample /> };
export const VisualTestWithZoom = { render: () => <DocsDefaultExample />, args: { zoomEnabled: true } };
