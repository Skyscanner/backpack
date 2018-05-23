/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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
import { cssModules } from 'bpk-react-utils';

import CustomPropTypes from './custom-proptypes';

import STYLES from './bpk-calendar-scroll-date.scss';

const getClassName = cssModules(STYLES);

class BpkCalendarScrollDate extends PureComponent {
  constructor() {
    super();

    this.getButtonRef = this.getButtonRef.bind(this);
  }

  componentDidMount() {
    if (!this.props.preventKeyboardFocus && this.props.isFocused) {
      this.button.focus();
    }
  }

  componentDidUpdate(prevProps) {
    // Giving focus after keyboard navigation
    if (!prevProps.isFocused && this.props.isFocused && this.button) {
      this.button.focus();
    }
  }

  getButtonRef(button) {
    this.button = button;
  }

  render() {
    const {
      date,
      modifiers,
      onClick,
      onDateKeyDown,
      isFocused,
      isSelected,
      isBlocked,
      isOutside,
      isToday,
      ...buttonProps
    } = this.props;
    const classNames = [getClassName('bpk-calendar-scroll-date')];

    Object.keys(modifiers).forEach(modifier => {
      if (modifiers[modifier](this.props)) {
        classNames.push(
          getClassName(`bpk-calendar-scroll-date--modifier-${modifier}`),
        );
      }
    });

    if (isFocused) {
      classNames.push(getClassName('bpk-calendar-scroll-date--focused'));
    }
    if (isSelected) {
      classNames.push(getClassName('bpk-calendar-scroll-date--selected'));
    }
    if (isBlocked) {
      classNames.push(getClassName('bpk-calendar-scroll-date--blocked'));
    }
    if (isToday) {
      classNames.push(getClassName('bpk-calendar-scroll-date--today'));
    }

    delete buttonProps.preventKeyboardFocus;

    return !isOutside ? (
      <button
        type="button"
        className={classNames.join(' ')}
        aria-label={date.getDate()}
        tabIndex={isFocused ? '0' : '-1'}
        onClick={() => {
          if (onClick) {
            onClick(date);
          }
        }}
        disabled={isBlocked}
        onKeyDown={onDateKeyDown}
        aria-pressed={isSelected}
        ref={this.getButtonRef}
        {...buttonProps}
      >
        <span aria-hidden="true">{date.getDate()}</span>
      </button>
    ) : (
      <span className={classNames.join(' ')} />
    );
  }
}

BpkCalendarScrollDate.propTypes = {
  // Required
  date: PropTypes.instanceOf(Date).isRequired,
  // Optional
  isBlocked: PropTypes.bool,
  isFocused: PropTypes.bool,
  isOutside: PropTypes.bool,
  isSelected: PropTypes.bool,
  isToday: PropTypes.bool,
  modifiers: CustomPropTypes.DateModifiers,
  onClick: PropTypes.func,
  onDateKeyDown: PropTypes.func,
  preventKeyboardFocus: PropTypes.bool,
};

BpkCalendarScrollDate.defaultProps = {
  isBlocked: false,
  isFocused: false,
  isOutside: false,
  isSelected: false,
  isToday: false,
  modifiers: {},
  onClick: null,
  onDateKeyDown: null,
  preventKeyboardFocus: true,
};

export default BpkCalendarScrollDate;
