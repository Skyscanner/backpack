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

import {
  canvasContrastDay,
  cardPadding,
  fontWeightBold,
} from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import { action } from '../bpk-storybook-utils';
import CurrencyIcon from '../../packages/bpk-component-icon/sm/currency';
import { cssModules } from '../../packages/bpk-react-utils';
import BpkInfoBanner, {
  ALERT_TYPES,
  BpkInfoBannerExpandable,
  STYLE_TYPES,
  withBannerAlertState,
} from '../../packages/bpk-component-info-banner';
import BpkText from '../../packages/bpk-component-text';

import STYLES from './examples.module.scss';

const getClassName = cssModules(STYLES);

const message = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.';
const longMessage = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sagittis sagittis purus, id
blandit ipsum. Pellentesque nec diam nec erat condimentum dapibus. Nunc diam augue, egestas id egestas ut, facilisis
nec mi. Donec et congue odio, nec laoreet est. Integer rhoncus varius arcu, a fringilla libero laoreet at. Mauris
porta varius ullamcorper. Sed laoreet libero mauris, non pretium lectus accumsan et. Suspendisse vehicula ullamcorper
sapien, et dapibus mi aliquet non. Pellentesque auctor sagittis lectus vitae rhoncus. Fusce id enim porttitor, mattis
ante in, vestibulum nulla.`;

const BpkInfoBannerExpandableState = withBannerAlertState(
  BpkInfoBannerExpandable,
);

const DefaultExample = (props: {}) => (
  // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
  <BpkInfoBanner message="Default alert" {...props} />
);

const InfoExample = (props: {}) => (
  // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
  <BpkInfoBanner message="Info alert" type={ALERT_TYPES.INFO} {...props} />
);
const SuccessExample = (props: {}) => (
  // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
  <BpkInfoBanner
    message="Success alert"
    type={ALERT_TYPES.SUCCESS}
    {...props}
  />
);
const SuccessLongMessageExample = (props: {}) => (
  // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
  <BpkInfoBanner message={longMessage} type={ALERT_TYPES.SUCCESS} {...props} />
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
const SuccessWithReactRenderedMessageExample = (props: {}) => (
  // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
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
const WarningExample = (props) => (
  // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
  <BpkInfoBanner
    message="Warning alert"
    type={ALERT_TYPES.WARNING}
    {...props}
  />
);
const ErrorExample = (props) => (
  // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
  <BpkInfoBanner message="Error alert" type={ALERT_TYPES.ERROR} {...props} />
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
const SuccessCustomIconExample = () => (
  <BpkInfoBanner
    message="Success alert with custom icon"
    type={ALERT_TYPES.SUCCESS}
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
  </div>
);

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
  </>
);

export {
  DefaultExample,
  InfoExample,
  SuccessExample,
  SuccessLongMessageExample,
  SuccessExpandableExample,
  SuccessAnimateOnEnterExample,
  SuccessWithReactRenderedMessageExample,
  WarningExample,
  ErrorExample,
  SuccessExpandableBehaviourExample,
  SuccessCustomIconExample,
  DocsDefaultExample,
  OnContrastExample,
};
