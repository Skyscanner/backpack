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
import React, { Component } from 'react';
import { withButtonAlignment } from 'bpk-component-icon';
import BpkAnimateHeight from 'bpk-animate-height';
import BpkCloseButton from 'bpk-component-close-button';
import TickCircleIcon from 'bpk-component-icon/sm/tick-circle';
import ChevronDownIcon from 'bpk-component-icon/sm/chevron-down';
import InfoCircleIcon from 'bpk-component-icon/sm/information-circle';
import { durationSm } from 'bpk-tokens/tokens/base.es6';
import { cssModules } from 'bpk-react-utils';

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

const getIconForType = (type) => {
  const map = {
    [ALERT_TYPES.SUCCESS]: <SuccessIcon className={getClassName('bpk-banner-alert__success-icon')} />,
    [ALERT_TYPES.WARN]: <WarnIcon className={getClassName('bpk-banner-alert__warn-icon')} />,
    [ALERT_TYPES.ERROR]: <ErrorIcon className={getClassName('bpk-banner-alert__error-icon')} />,
    [ALERT_TYPES.NEUTRAL]: <NeutralIcon className={getClassName('bpk-banner-alert__neutral-icon')} />,
  };

  return map[type];
};

const ToggleButton = (props) => {
  const classNames = [getClassName('bpk-banner-alert__expand-icon')];
  if (props.expanded) { classNames.push(getClassName('bpk-banner-alert__expand-icon--flipped')); }

  return (
    <button
      className={getClassName('bpk-banner-alert__toggle-button')}
      aria-label={props.label}
      aria-expanded={props.expanded}
      title={props.label}
    >
      <ExpandIcon
        className={classNames.join(' ')}
      />
    </button>
  );
};

ToggleButton.propTypes = {
  label: PropTypes.string.isRequired,
  expanded: PropTypes.bool.isRequired,
};

const DismissButton = (props) => {
  const { label, ...rest } = props;

  return (
    <BpkCloseButton
      className={getClassName('bpk-banner-alert__toggle-button')}
      aria-label={label}
      label={label}
      {...rest}
    />
  );
};

DismissButton.propTypes = {
  label: PropTypes.string.isRequired,
};

class BpkBannerAlert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };

    this.onExpand = this.onExpand.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  onExpand() {
    this.setState(state => ({
      expanded: !state.expanded,
    }));
  }

  onDismiss() {
    if (this.props.onDismiss) {
      this.props.onDismiss();
    }
  }

  render() {
    const {
      ariaLive,
      children,
      className,
      dismissable,
      dismissButtonLabel,
      message,
      onDismiss,
      show,
      type,
      toggleButtonLabel,
      ...rest
    } = this.props;
    const isExpanded = this.state.expanded;
    const isExpandable = children;
    const showChildren = isExpandable && isExpanded;
    const ariaRoles = ['alert'];

    const headerClassNames = [getClassName('bpk-banner-alert__header')];
    const sectionClassNames = ['bpk-banner-alert', `bpk-banner-alert--${type}`]
      .map(sectionClassName => getClassName(sectionClassName));

    if (className) { sectionClassNames.push(className); }
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
    return !show ? null : (
      <section className={sectionClassNames.join(' ')} {...rest}>
        <header
          role={ariaRoles.join(' ')}
          aria-live={ariaLive}
          className={headerClassNames.join(' ')}
          onClick={this.onExpand}
        >
          <span className={getClassName('bpk-banner-alert__icon')}>{getIconForType(type)}</span>
          &nbsp;
          <span className={getClassName('bpk-banner-alert__message')}>{message}</span>
          &nbsp;
          {isExpandable ? (
            <span className={getClassName('bpk-banner-alert__toggle')}>
              <ToggleButton expanded={isExpanded} label={toggleButtonLabel} />
            </span>
          ) : null}
          {dismissable ? (
            <DismissButton onClick={this.onDismiss} label={dismissButtonLabel} />
          ) : null}
        </header>
        <BpkAnimateHeight duration={parseInt(durationSm, 10)} height={showChildren ? 'auto' : 0}>
          <div className={getClassName('bpk-banner-alert__children-container')}>{children}</div>
        </BpkAnimateHeight>
      </section>
    );
    /* eslint-enable */
  }
}

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
  children: PropTypes.node,
  dismissable: PropTypes.bool,
  dismissButtonLabel: PropTypes.string,
  onDismiss: PropTypes.func,
  show: PropTypes.bool,
  toggleButtonLabel: PropTypes.string,
  className: PropTypes.string,
};

BpkBannerAlert.defaultProps = {
  ariaLive: ARIA_LIVE.ASSERTIVE,
  children: null,
  dismissable: false,
  dismissButtonLabel: null,
  onDismiss: null,
  show: true,
  toggleButtonLabel: null,
  className: null,
};

export default BpkBannerAlert;
