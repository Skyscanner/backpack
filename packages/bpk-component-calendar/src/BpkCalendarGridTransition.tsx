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

import type { ComponentType, ElementType } from 'react';
import { Component } from 'react';

import { cssModules, isRTL, getDataComponentAttribute } from '../../bpk-react-utils';

import {
  addMonths,
  isSameMonth,
  formatIsoMonth,
  differenceInCalendarMonths,
  dateToBoundaries,
  startOfDay,
  setMonthYear,
  isWithinRange,
  getMonthRange,
} from './date-utils';
import {
  getCalendarGridWidth,
  getTransformStyles,
  isTransitionEndSupported,
} from './utils';

import STYLES from './BpkCalendarGridTransition.module.scss';

const getClassName = cssModules(STYLES);

const transitionValues = {
  previous: '0px',
  current: getCalendarGridWidth(-1),
  next: getCalendarGridWidth(-2),
};

const getFocusedDateForMonth = (
  month: Date,
  currentFocusedDate: Date | null,
  minDate: Date,
  maxDate: Date,
) =>
  dateToBoundaries(
    setMonthYear(currentFocusedDate, month.getMonth(), month.getFullYear()),
    startOfDay(minDate),
    startOfDay(maxDate),
  );

export type Props = InjectedCalendarGridTransitionProps & {
  className?: string | null;
  month?: Date;
  focusedDate?: Date | null;
  [rest: string]: any;
};

type InjectedCalendarGridTransitionProps = {
  TransitionComponent: ElementType;
};

type State = {
  isTransitioning: boolean;
  transitionValue: string;
  currentMonth?: Date | null;
  months: Date[];
};

class BpkCalendarGridTransition extends Component<Props, State> {
  isTransitionEndSupported: boolean;

  static defaultProps = {
    className: null,
    month: new Date(),
    focusedDate: null,
  };

  constructor(props: Props) {
    super(props);

    const { month = new Date() } = props;

    this.onMonthTransitionEnd = this.onMonthTransitionEnd.bind(this);

    this.state = {
      isTransitioning: false,
      transitionValue: transitionValues.current,
      // Used in a test so this is valid usage.
      // eslint-disable-next-line react/no-unused-state
      currentMonth: props.month,
      months: [addMonths(month, -1), month, addMonths(month, 1)],
    };

    this.isTransitionEndSupported = isTransitionEndSupported();
  }

  componentDidUpdate(prevProps: Props) {
    const { month: currentMonth = new Date() } = this.props;
    const { month: previousMonth = new Date() } = prevProps;

    const hasMonthChanged = !isSameMonth(previousMonth, currentMonth);

    if (hasMonthChanged) {
      const reverse = isRTL();
      const monthDifference = differenceInCalendarMonths(
        currentMonth,
        previousMonth,
      );

      if (monthDifference === 1) {
        // Transition to next month
        this.setState({
          transitionValue: reverse
            ? transitionValues.previous
            : transitionValues.next,
          isTransitioning: true,
        });
        return;
      }

      if (monthDifference === -1) {
        // Transition to previous month
        this.setState({
          transitionValue: reverse
            ? transitionValues.next
            : transitionValues.previous,
          isTransitioning: true,
        });
        return;
      }

      this.setState({
        // Used in a test so this is valid usage.
        // eslint-disable-next-line react/no-unused-state
        currentMonth,
        months: [
          addMonths(currentMonth, -1),
          currentMonth,
          addMonths(currentMonth, 1),
        ],
      });
    }

    // For IE9, immediately call onMonthTransitionEnd instead of
    // waiting for the animation to complete
    // Thx to Airbnb's react-dates <3
    if (!this.isTransitionEndSupported && this.state.isTransitioning) {
      this.onMonthTransitionEnd();
    }
  }

  onMonthTransitionEnd() {
    const { month = new Date() } = this.props;

    this.setState({
      transitionValue: transitionValues.current,
      isTransitioning: false,
      // Used in a test so this is valid usage.
      // eslint-disable-next-line react/no-unused-state
      currentMonth: month,
      months: [addMonths(month, -1), month, addMonths(month, 1)],
    });
  }

  render() {
    const {
      TransitionComponent,
      className = null,
      focusedDate = null,
      ...rest
    } = this.props;
    const { isTransitioning, transitionValue } = this.state;

    const stripClassNames = getClassName(
      'bpk-calendar-grid-transition__strip',
      isTransitioning && 'bpk-calendar-grid-transition__strip--transitioning',
    );

    let min: Date;
    let max: Date;
    if (rest.minDate && rest.maxDate) {
      ({ max, min } = getMonthRange(rest.minDate, rest.maxDate));
    }

    return (
      <div className={getClassName('bpk-calendar-grid-transition', className)}>
        <div
          className={stripClassNames}
          style={getTransformStyles(transitionValue)}
          onTransitionEnd={this.onMonthTransitionEnd}
          {...getDataComponentAttribute('CalendarGridTransition')}
        >
          {this.state.months.map((m, index) =>
            min && max && isWithinRange(m, { start: min, end: max }) ? (
              <TransitionComponent
                {...rest}
                key={formatIsoMonth(m)}
                month={m}
                preventKeyboardFocus={index !== 1 || rest.preventKeyboardFocus}
                isKeyboardFocusable={!isTransitioning && index === 1}
                focusedDate={
                  index === 1
                    ? focusedDate
                    : getFocusedDateForMonth(
                        m,
                        focusedDate,
                        rest.minDate,
                        rest.maxDate,
                      )
                }
                aria-hidden={index !== 1}
                className={getClassName('bpk-calendar-grid-transition__grid')}
              />
            ) : (
              <div
                className={getClassName('bpk-calendar-grid-transition__dummy')}
                key={formatIsoMonth(m)}
              />
            ),
          )}
        </div>
      </div>
    );
  }
}

const addCalendarGridTransition =
  <P extends {}>(TransitionComponent: ComponentType<P>) =>
  (props: Omit<P & Props, keyof InjectedCalendarGridTransitionProps>) => (
    <BpkCalendarGridTransition
      {...(props as P)}
      TransitionComponent={TransitionComponent}
    />
  );

export default BpkCalendarGridTransition;
export { addCalendarGridTransition };