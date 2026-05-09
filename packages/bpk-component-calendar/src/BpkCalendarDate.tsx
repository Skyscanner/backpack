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

import type { KeyboardEvent } from 'react';
import { PureComponent } from 'react';

import { cssModules, getDataComponentAttribute } from '../../bpk-react-utils';

import type { DateModifiers } from './custom-proptypes';

import STYLES from './BpkCalendarDate.module.scss';

const getClassName = cssModules(STYLES);

export const SELECTION_TYPES = {
  none: 'none',
  single: 'single',
  start: 'start',
  middle: 'middle',
  end: 'end',
  sameDay: 'sameDay',
} as const;

export const ROW_TYPES = {
  start: 'start',
  middle: 'middle',
  end: 'end',
  both: 'both',
} as const;

export type SelectionTypes =
  (typeof SELECTION_TYPES)[keyof typeof SELECTION_TYPES];

export type Props = DefaultProps & {
  date: Date;
};

type DefaultProps = {
  className?: string | null;
  isoLabel?: string;
  isBlocked?: boolean;
  isFocused?: boolean;
  isKeyboardFocusable?: boolean;
  isOutside?: boolean;
  isSelected?: boolean;
  isToday?: boolean;
  modifiers?: DateModifiers;
  onClick?: ((date: Date) => void) | null;
  onDateKeyDown?: (event: KeyboardEvent<HTMLButtonElement>) => void;
  preventKeyboardFocus?: boolean;
  /**
   * This property determines which selected styles will be applied to the date cell. If using ranges use `start`, `middle` and `end` to apply the correct range styles.
   *   - `SELECTION_TYPES.single` - When the date is selected individually i.e. Not as part of a range
   *   - `SELECTION_TYPES.start` - When a start date is selected in a range calendar i.e. First date in the range
   *   - `SELECTION_TYPES.middle` - When a date is in a range between start and end date i.e. Date in the middle of two dates
   *   - `SELECTION_TYPES.end` - When an end date is selected in a range calendar i.e. Last date in the range
   */
  selectionType?: SelectionTypes;
  style?: {};
};

const navigatedByMonthNudger = () =>
  document?.activeElement?.id &&
  document.activeElement.id.indexOf('month_nudger') !== -1;

class BpkCalendarDate extends PureComponent<Props> {
  static defaultProps: DefaultProps = {
    className: null,
    isBlocked: false,
    isFocused: false,
    isKeyboardFocusable: true,
    isOutside: false,
    isSelected: false,
    isToday: false,
    modifiers: {},
    onClick: null,
    onDateKeyDown: () => {},
    preventKeyboardFocus: true,
    selectionType: SELECTION_TYPES.none,
    style: {},
  };

  componentDidMount() {
    if (!this.props.preventKeyboardFocus && this.props.isFocused) {
      // If we got here by clicking the nudger, don't focus this date
      if (!navigatedByMonthNudger()) {
        // Giving focus after instantiation
        this.button?.focus();
      }
    }
  }

  componentDidUpdate(prevProps: Props) {
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
      this.button?.focus();
      return;
    }

    // Giving focus after changing months with transition
    if (
      this.props.isFocused &&
      !prevProps.isKeyboardFocusable &&
      this.props.isKeyboardFocusable
    ) {
      this.button?.focus();
    }
  }

  button: HTMLButtonElement | null = null;

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

    Object.keys(modifiers!).forEach((modifier) => {
      if (modifiers![modifier](this.props)) {
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
    delete buttonProps.isoLabel;

    return (
      <button
        type="button"
        style={style}
        className={classNames.join(' ')}
        {...getDataComponentAttribute('CalendarDate')}
        aria-label={`${date.getDate()}`}
        disabled={isBlocked}
        tabIndex={isKeyboardFocusable && isFocused ? 0 : -1}
        onClick={() => {
          if (onClick) {
            onClick(date);
          }
        }}
        onKeyDown={onDateKeyDown}
        aria-pressed={isSelected}
        ref={(button: HTMLButtonElement | null) => {
          this.button = button;
        }}
        {...buttonProps}
      >
        <span aria-hidden="true">{date.getDate()}</span>
      </button>
    );
  }
}

export default BpkCalendarDate;