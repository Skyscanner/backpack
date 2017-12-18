/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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
import React from 'react';
import { withButtonAlignment } from 'bpk-component-icon';
import BpkAnimateHeight from 'bpk-animate-height';
import BpkCloseButton from 'bpk-component-close-button';
import TickCircleIcon from 'bpk-component-icon/sm/tick-circle';
import ChevronDownIcon from 'bpk-component-icon/sm/chevron-down';
import InfoCircleIcon from 'bpk-component-icon/sm/information-circle';
import { durationSm } from 'bpk-tokens/tokens/base.es6';
import { cssModules } from 'bpk-react-utils';
import AnimateAndFade from './AnimateAndFade';

import STYLES from './bpk-banner-alert.scss';

const getClassName = cssModules(STYLES);

const NeutralIcon = withButtonAlignment(InfoCircleIcon);
const WarnIcon = withButtonAlignment(InfoCircleIcon);
const ErrorIcon = withButtonAlignment(InfoCircleIcon);
const SuccessIcon = withButtonAlignment(TickCircleIcon);
const ExpandIcon = withButtonAlignment(ChevronDownIcon);

export const ALERT_TYPES = {
  SUCCESS: 'success',
  WARN: 'warn',
  ERROR: 'error',
  NEUTRAL: 'neutral',
};

export const ARIA_LIVE = {
  OFF: 'off',
  ASSERTIVE: 'assertive',
  POLITE: 'polite',
};

const getIconForType = type => {
  const map = {
    [ALERT_TYPES.SUCCESS]: (
      <SuccessIcon className={getClassName('bpk-banner-alert__success-icon')} />
    ),
    [ALERT_TYPES.WARN]: (
      <WarnIcon className={getClassName('bpk-banner-alert__warn-icon')} />
    ),
    [ALERT_TYPES.ERROR]: (
      <ErrorIcon className={getClassName('bpk-banner-alert__error-icon')} />
    ),
    [ALERT_TYPES.NEUTRAL]: (
      <NeutralIcon className={getClassName('bpk-banner-alert__neutral-icon')} />
    ),
  };

  return map[type];
};

const ToggleButton = props => {
  const classNames = [getClassName('bpk-banner-alert__expand-icon')];
  if (props.expanded) {
    classNames.push(getClassName('bpk-banner-alert__expand-icon--flipped'));
  }

  return (
    <button
      className={getClassName('bpk-banner-alert__toggle-button')}
      aria-label={props.label}
      aria-expanded={props.expanded}
      title={props.label}
    >
      <ExpandIcon className={classNames.join(' ')} />
    </button>
  );
};

ToggleButton.propTypes = {
  label: PropTypes.string.isRequired,
  expanded: PropTypes.bool.isRequired,
};

const BpkBannerAlert = props => {
  const onBannerExpandToggle = () => {
    if (props.onExpandToggle) {
      props.onExpandToggle();
    }
  };

  const onBannerDismiss = () => {
    if (props.onDismiss) {
      props.onDismiss();
    }
  };

  const {
    animateOnEnter,
    animateOnLeave,
    ariaLive,
    children,
    bannerClassName,
    dismissable,
    dismissButtonLabel,
    message,
    onDismiss,
    show,
    type,
    toggleButtonLabel,
    expanded,
    onExpandToggle,
    ...rest
  } = props;
  const isExpandable = children;
  const showChildren = isExpandable && expanded;
  const ariaRoles = ['alert'];

  const headerClassNames = [getClassName('bpk-banner-alert__header')];
  const sectionClassNames = [
    'bpk-banner-alert',
    `bpk-banner-alert--${type}`,
  ].map(sectionClassName => getClassName(sectionClassName));

  if (bannerClassName) {
    sectionClassNames.push(bannerClassName);
  }

  if (isExpandable) {
    headerClassNames.push(getClassName('bpk-banner-alert__header--expandable'));
    ariaRoles.push('button');
  }

  /* eslint-disable
    jsx-a11y/no-static-element-interactions,
    jsx-a11y/click-events-have-key-events,
    jsx-a11y/no-noninteractive-element-interactions
    */
  // Disabling 'click-events-have-key-events and interactive-supports-focus' because header element is not focusable.
  // ToggleButton is focusable and works for this.
  return (
    <AnimateAndFade
      animateOnEnter={animateOnEnter}
      animateOnLeave={dismissable || animateOnLeave}
      show={show}
      {...rest}
    >
      <section className={sectionClassNames.join(' ')}>
        <header
          role={ariaRoles.join(' ')}
          aria-live={ariaLive}
          className={headerClassNames.join(' ')}
          onClick={onBannerExpandToggle}
        >
          <span className={getClassName('bpk-banner-alert__icon')}>
            {getIconForType(type)}
          </span>
          &nbsp;
          <span className={getClassName('bpk-banner-alert__message')}>
            {message}
          </span>
          &nbsp;
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
        </header>
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

BpkBannerAlert.propTypes = {
  type: PropTypes.oneOf([
    ALERT_TYPES.SUCCESS,
    ALERT_TYPES.WARN,
    ALERT_TYPES.ERROR,
    ALERT_TYPES.NEUTRAL,
  ]).isRequired,
  message: PropTypes.node.isRequired,
  ariaLive: PropTypes.oneOf([
    ARIA_LIVE.OFF,
    ARIA_LIVE.ASSERTIVE,
    ARIA_LIVE.POLITE,
  ]),
  animateOnEnter: PropTypes.bool,
  animateOnLeave: PropTypes.bool,
  children: PropTypes.node,
  expanded: PropTypes.bool,
  toggleButtonLabel: PropTypes.string,
  onExpandToggle: PropTypes.func,
  dismissable: PropTypes.bool,
  dismissButtonLabel: PropTypes.string,
  onDismiss: PropTypes.func,
  show: PropTypes.bool,
  bannerClassName: PropTypes.string,
};

BpkBannerAlert.defaultProps = {
  animateOnEnter: false,
  animateOnLeave: false,
  ariaLive: ARIA_LIVE.ASSERTIVE,
  children: null,
  expanded: false,
  toggleButtonLabel: null,
  onExpandToggle: null,
  dismissable: false,
  dismissButtonLabel: null,
  onDismiss: null,
  show: true,
  bannerClassName: null,
};

export default BpkBannerAlert;
