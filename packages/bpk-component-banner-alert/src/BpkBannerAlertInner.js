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

/* This is an internal component to Backpack that powers `BpkBannerAlert`,
 * `BpkBannerAlertDismissable` and `BpkBannerAlertExpandable`.
 */

import PropTypes from 'prop-types';
import React, { type Node, type StatelessFunctionalComponent } from 'react';
import { durationSm } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import { withButtonAlignment } from '../../bpk-component-icon';
import BpkAnimateHeight from '../../bpk-animate-height';
import BpkCloseButton from '../../bpk-component-close-button';
import TickCircleIcon from '../../bpk-component-icon/sm/tick-circle';
import ChevronDownIcon from '../../bpk-component-icon/lg/chevron-down';
import InfoCircleIcon from '../../bpk-component-icon/sm/information-circle';
import { cssModules } from '../../bpk-react-utils';

import AnimateAndFade from './AnimateAndFade';
import {
  type AlertTypeValue,
  type CommonProps,
  type OnDismissHandler,
  type OnExpandToggleHandler,
  ALERT_TYPES,
  COMMON_PROP_TYPES,
  COMMON_DEFAULT_PROPS,
} from './common-types';
import STYLES from './BpkBannerAlert.module.scss';

const getClassName = cssModules(STYLES);

const ExpandIcon = withButtonAlignment(ChevronDownIcon);

export const CONFIGURATION = {
  NONE: 'none',
  DISMISSABLE: 'dismissable',
  EXPANDABLE: 'expandable',
};

const getIconForType = (
  type: AlertTypeValue,
  CustomIcon: ?StatelessFunctionalComponent<any>,
) => {
  const classMap: { [AlertTypeValue]: string } = {
    [ALERT_TYPES.PRIMARY]: getClassName('bpk-banner-alert__primary-icon'),
    [ALERT_TYPES.SUCCESS]: getClassName('bpk-banner-alert__success-icon'),
    [ALERT_TYPES.WARN]: getClassName('bpk-banner-alert__warn-icon'),
    [ALERT_TYPES.ERROR]: getClassName('bpk-banner-alert__error-icon'),
    [ALERT_TYPES.NEUTRAL]: getClassName('bpk-banner-alert__neutral-icon'),
    [ALERT_TYPES.EVENT]: getClassName('bpk-banner-alert__event-icon'),
  };
  const className = classMap[type];
  const componentMap: { [AlertTypeValue]: Node } = {
    [ALERT_TYPES.PRIMARY]: InfoCircleIcon,
    [ALERT_TYPES.SUCCESS]: TickCircleIcon,
    [ALERT_TYPES.WARN]: InfoCircleIcon,
    [ALERT_TYPES.ERROR]: InfoCircleIcon,
    [ALERT_TYPES.NEUTRAL]: InfoCircleIcon,
    [ALERT_TYPES.EVENT]: InfoCircleIcon,
  };
  const Icon = CustomIcon || componentMap[type];
  const AlignedIcon = withButtonAlignment(Icon);

  return <AlignedIcon className={className} />;
};

type ToggleButtonProps = {
  label: ?string,
  expanded: boolean,
};

const ToggleButton = (props: ToggleButtonProps) => {
  const classNames = [getClassName('bpk-banner-alert__expand-icon')];
  if (props.expanded) {
    classNames.push(getClassName('bpk-banner-alert__expand-icon--flipped'));
  }

  return (
    <button
      type="button"
      className={getClassName('bpk-banner-alert__toggle-button')}
      aria-label={props.label}
      aria-expanded={props.expanded}
      title={props.label}
    >
      <ExpandIcon className={classNames.join(' ')} />
    </button>
  );
};

type Props = {
  ...$Exact<CommonProps>,
  configuration: $Values<typeof CONFIGURATION>,

  // Only relevant when configuration == CONFIGURATION.EXPANDABLE
  children: Node,
  expanded: boolean,
  toggleButtonLabel: ?string,
  onExpandToggle: OnExpandToggleHandler,

  // Only relevant when configuration == CONFIGURATION.DISMISSABLE
  dismissButtonLabel: string,
  onDismiss: OnDismissHandler,
};

const BpkBannerAlertInner = (props: Props) => {
  const {
    animateOnEnter,
    animateOnLeave,
    bannerClassName,
    children,
    configuration,
    dismissButtonLabel,
    expanded,
    icon,
    message,
    onDismiss,
    onExpandToggle,
    show,
    toggleButtonLabel,
    type,
    ...rest
  } = props;
  const onBannerExpandToggle = () => {
    if (props.onExpandToggle) {
      props.onExpandToggle(!expanded);
    }
  };

  const onBannerDismiss = () => {
    if (props.onDismiss) {
      props.onDismiss();
    }
  };

  const isExpandable = configuration === CONFIGURATION.EXPANDABLE;
  const dismissable = configuration === CONFIGURATION.DISMISSABLE;
  const showChildren = isExpandable && expanded;

  const headerClassNames = [getClassName('bpk-banner-alert__header')];
  const sectionClassNames = [
    'bpk-banner-alert',
    `bpk-banner-alert--${type}`,
  ].map((sectionClassName) => getClassName(sectionClassName));

  if (bannerClassName) {
    sectionClassNames.push(bannerClassName);
  }

  if (isExpandable) {
    headerClassNames.push(getClassName('bpk-banner-alert__header--expandable'));
  }

  /* eslint-disable
    jsx-a11y/no-static-element-interactions,
    jsx-a11y/click-events-have-key-events,
    */
  // Disabling 'click-events-have-key-events and interactive-supports-focus' because header element is not focusable.
  // ToggleButton is focusable and works for this.
  return (
    // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
    <AnimateAndFade
      animateOnEnter={animateOnEnter}
      animateOnLeave={dismissable || animateOnLeave}
      show={show}
      {...rest}
    >
      <section className={sectionClassNames.join(' ')} role="alert">
        <div
          role={isExpandable ? 'button' : undefined}
          className={headerClassNames.join(' ')}
          onClick={onBannerExpandToggle}
        >
          <span className={getClassName('bpk-banner-alert__icon')}>
            {getIconForType(type, icon)}
          </span>
          <span className={getClassName('bpk-banner-alert__message')}>
            {message}
          </span>
          {isExpandable && (
            <span className={getClassName('bpk-banner-alert__toggle')}>
              <ToggleButton expanded={expanded} label={toggleButtonLabel} />
            </span>
          )}
          {dismissable && (
            <span className={getClassName('bpk-banner-alert__toggle')}>
              <BpkCloseButton
                className={getClassName('bpk-banner-alert__toggle-button')}
                onClick={onBannerDismiss}
                aria-label={dismissButtonLabel}
                label={dismissButtonLabel}
              />
            </span>
          )}
        </div>
        <BpkAnimateHeight
          duration={parseInt(durationSm, 10)}
          height={showChildren ? 'auto' : 0}
        >
          <div className={getClassName('bpk-banner-alert__children-container')}>
            {children}
          </div>
        </BpkAnimateHeight>
      </section>
    </AnimateAndFade>
  );
  /* eslint-enable */
};

BpkBannerAlertInner.propTypes = {
  ...COMMON_PROP_TYPES,
  configuration: PropTypes.oneOf([
    CONFIGURATION.NONE,
    CONFIGURATION.DISMISSABLE,
    CONFIGURATION.EXPANDABLE,
  ]).isRequired,

  // Only relevant when configuration == CONFIGURATION.EXPANDABLE
  children: PropTypes.node,
  expanded: PropTypes.bool,
  toggleButtonLabel: PropTypes.string,
  onExpandToggle: PropTypes.func,

  // Only relevant when configuration == CONFIGURATION.DISMISSABLE
  dismissButtonLabel: PropTypes.string,
  onDismiss: PropTypes.func,
};

BpkBannerAlertInner.defaultProps = {
  ...COMMON_DEFAULT_PROPS,
  configuration: CONFIGURATION.NONE,

  // Only relevant when configuration == CONFIGURATION.EXPANDABLE
  children: null,
  expanded: false,
  toggleButtonLabel: null,
  onExpandToggle: null,

  // Only relevant when configuration == CONFIGURATION.DISMISSABLE
  dismissButtonLabel: '',
  onDismiss: null,
};

export default BpkBannerAlertInner;
