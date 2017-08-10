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
import TickCircleIcon from 'bpk-component-icon/sm/tick-circle';
import ChevronDownIcon from 'bpk-component-icon/sm/chevron-down';
import InfoCircleIcon from 'bpk-component-icon/sm/information-circle';
import { cssModules } from 'bpk-react-utils';

import STYLES from './bpk-banner-alert.scss';

const getClassName = cssModules(STYLES);

const WarnIcon = withButtonAlignment(InfoCircleIcon);
const ErrorIcon = withButtonAlignment(InfoCircleIcon);
const SuccessIcon = withButtonAlignment(TickCircleIcon);
const ExpandIcon = withButtonAlignment(ChevronDownIcon);

export const ALERT_TYPES = {
  SUCCESS: 'success',
  WARN: 'warn',
  ERROR: 'error',
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

class BpkBannerAlert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };

    this.onExpand = this.onExpand.bind(this);
  }

  onExpand() {
    this.setState({
      expanded: !this.state.expanded,
    });
  }

  render() {
    const { children, className, type, ariaLive, message, toggleButtonLabel, ...rest } = this.props;
    const isExpanded = this.state.expanded;
    const isExpandable = children;
    const showChildren = isExpandable && isExpanded;

    const headerClassNames = [getClassName('bpk-banner-alert__header')];
    const sectionClassNames = ['bpk-banner-alert', `bpk-banner-alert--${type}`]
      .map(sectionClassName => getClassName(sectionClassName));

    if (className) { sectionClassNames.push(className); }
    if (isExpandable) { headerClassNames.push(getClassName('bpk-banner-alert__header--expandable')); }

    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <section className={sectionClassNames.join(' ')} {...rest}>
        <header
          role="alert"
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
        </header>
        {
          showChildren ?
            <div className={getClassName('bpk-banner-alert__children-container')}>{children}</div>
            : null
        }
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
  ]).isRequired,
  message: PropTypes.node.isRequired,
  ariaLive: PropTypes.oneOf([
    ARIA_LIVE.OFF,
    ARIA_LIVE.ASSERTIVE,
    ARIA_LIVE.POLITE,
  ]),
  children: PropTypes.node,
  toggleButtonLabel: PropTypes.string,
  className: PropTypes.string,
};

BpkBannerAlert.defaultProps = {
  ariaLive: ARIA_LIVE.ASSERTIVE,
  children: null,
  toggleButtonLabel: null,
  className: null,
};

export default BpkBannerAlert;
