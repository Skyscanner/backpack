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
import React, { PureComponent } from 'react';

import { cssModules } from '../../bpk-react-utils';

import CustomPropTypes from './custom-proptypes';
import STYLES from './BpkCalendarDate.module.scss';

const getClassName = cssModules(STYLES);

export const SELECTION_TYPES = {
  none: 'none',
  single: 'single',
  start: 'start',
  middle: 'middle',
  end: 'end',
  sameDay: 'sameDay',
};

export const ROW_TYPES = {
  start: 'start',
  middle: 'middle',
  end: 'end',
  both: 'both',
};

const navigatedByMonthNudger = () =>
  document.activeElement.id &&
  document.activeElement.id.indexOf('month_nudger') !== -1;

class BpkCalendarDate extends PureComponent {
  componentDidMount() {
    if (!this.props.preventKeyboardFocus && this.props.isFocused) {
      // If we got here by clicking the nudger, don't focus this date
      if (!navigatedByMonthNudger()) {
        // Giving focus after instantiation
        this.button.focus();
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (
      !this.props.isKeyboardFocusable ||
      this.props.preventKeyboardFocus ||
      navigatedByMonthNudger()
    ) {
      return;
    }

    // Giving focus after keyboard navigation
    if (
      !prevProps.isFocused &&
      this.props.isFocused &&
      this.props.isKeyboardFocusable
    ) {
      this.button.focus();
      return;
    }

    // Giving focus after changing months with transition
    if (
      this.props.isFocused &&
      !prevProps.isKeyboardFocusable &&
      this.props.isKeyboardFocusable
    ) {
      this.button.focus();
    }
  }

  getButtonRef = (button) => {
    this.button = button;
  };

  render() {
    const {
      className,
      date,
      isBlocked,
      isFocused,
      isKeyboardFocusable,
      isOutside,
      isSelected,
      isToday,
      modifiers,
      onClick,
      onDateKeyDown,
      selectionType,
      style,
      ...buttonProps
    } = this.props;

    const classNames = [getClassName('bpk-calendar-date')];

    Object.keys(modifiers).forEach((modifier) => {
      if (modifiers[modifier](this.props)) {
        classNames.push(
          getClassName(`bpk-calendar-date--modifier-${modifier}`),
        );
      }
    });

    if (isFocused) {
      classNames.push(getClassName('bpk-calendar-date--focused'));
    }
    if (isSelected) {
      classNames.push(getClassName('bpk-calendar-date--selected'));
    }
    if (isBlocked) {
      classNames.push(getClassName('bpk-calendar-date--blocked'));
    }
    if (isOutside) {
      classNames.push(getClassName('bpk-calendar-date--outside'));
    }

    if (selectionType !== SELECTION_TYPES.none) {
      classNames.push(getClassName(`bpk-calendar-date--${selectionType}`));
    }

    if (className) {
      classNames.push(className);
    }

    delete buttonProps.preventKeyboardFocus;

    return (
      <button
        type="button"
        style={style}
        className={classNames.join(' ')}
        aria-hidden={isBlocked}
        aria-label={date.getDate()}
        disabled={isBlocked}
        tabIndex={isKeyboardFocusable && isFocused ? '0' : '-1'}
        onClick={() => {
          if (onClick) {
            onClick(date);
          }
        }}
        onKeyDown={onDateKeyDown}
        aria-pressed={isSelected}
        ref={this.getButtonRef}
        {...buttonProps}
      >
        <span aria-hidden="true">{date.getDate()}</span>
      </button>
    );
  }
}

export const propTypes = {
  // Required
  date: PropTypes.instanceOf(Date).isRequired,
  // Optional
  className: PropTypes.string,
  isBlocked: PropTypes.bool,
  isFocused: PropTypes.bool,
  isKeyboardFocusable: PropTypes.bool,
  isOutside: PropTypes.bool,
  isSelected: PropTypes.bool,
  isToday: PropTypes.bool,
  modifiers: CustomPropTypes.DateModifiers,
  onClick: PropTypes.func,
  onDateKeyDown: PropTypes.func,
  preventKeyboardFocus: PropTypes.bool,
  selectionType: PropTypes.oneOf(Object.keys(SELECTION_TYPES)),
  style: PropTypes.object,
};

BpkCalendarDate.propTypes = { ...propTypes };

export const defaultProps = {
  className: null,
  isBlocked: false,
  isFocused: false,
  isKeyboardFocusable: true,
  isOutside: false,
  isSelected: false,
  isToday: false,
  modifiers: {},
  onClick: null,
  onDateKeyDown: null,
  preventKeyboardFocus: true,
  selectionType: SELECTION_TYPES.none,
  style: null,
};

BpkCalendarDate.defaultProps = {
  ...defaultProps,
};

export default BpkCalendarDate;
