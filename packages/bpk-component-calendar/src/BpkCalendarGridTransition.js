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
import React, { Component } from 'react';
import { cssModules } from 'bpk-react-utils';

import {
  getCalendarGridWidth,
  getTransformStyles,
  getScriptDirection,
  isTransitionEndSupported,
} from './utils';
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

import STYLES from './bpk-calendar-grid-transition.css';

const getClassName = cssModules(STYLES);

const transitionValues = {
  previous: '0px',
  current: getCalendarGridWidth(-1),
  next: getCalendarGridWidth(-2),
};

const getFocusedDateForMonth = (month, currentFocusedDate, minDate, maxDate) =>
  dateToBoundaries(
    setMonthYear(currentFocusedDate, month.getMonth(), month.getFullYear()),
    startOfDay(minDate),
    startOfDay(maxDate),
  );

class BpkCalendarGridTransition extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isTransitioning: false,
      transitionValue: transitionValues.current,
      // Used in a test so this is valid usage.
      // eslint-disable-next-line react/no-unused-state
      currentMonth: props.month,
      months: [
        addMonths(props.month, -1),
        props.month,
        addMonths(props.month, 1),
      ],
    };

    this.isTransitionEndSupported = isTransitionEndSupported();
  }

  componentWillReceiveProps(nextProps) {
    const hasMonthChanged = !isSameMonth(this.props.month, nextProps.month);

    if (hasMonthChanged) {
      const reverse = getScriptDirection() === 'rtl';

      if (differenceInCalendarMonths(nextProps.month, this.props.month) === 1) {
        // Transition to next month
        this.setState({
          transitionValue: reverse
            ? transitionValues.previous
            : transitionValues.next,
          isTransitioning: true,
        });
        return;
      }

      if (
        differenceInCalendarMonths(nextProps.month, this.props.month) === -1
      ) {
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
        currentMonth: nextProps.month,
        months: [
          addMonths(nextProps.month, -1),
          nextProps.month,
          addMonths(nextProps.month, 1),
        ],
      });
    }
  }

  componentDidUpdate() {
    // For IE9, immediately call onMonthTransitionEnd instead of
    // waiting for the animation to complete
    // Thx to Airbnb's react-dates <3
    if (!this.isTransitionEndSupported && this.state.isTransitioning) {
      this.onMonthTransitionEnd();
    }
  }

  onMonthTransitionEnd = () => {
    const { month } = this.props;

    this.setState({
      transitionValue: transitionValues.current,
      isTransitioning: false,
      // Used in a test so this is valid usage.
      // eslint-disable-next-line react/no-unused-state
      currentMonth: month,
      months: [addMonths(month, -1), month, addMonths(month, 1)],
    });
  };

  render() {
    const { TransitionComponent, className, focusedDate, ...rest } = this.props;
    const { isTransitioning, transitionValue } = this.state;

    const stripClassNames = getClassName(
      'bpk-calendar-grid-transition__strip',
      isTransitioning && 'bpk-calendar-grid-transition__strip--transitioning',
    );

    const { min, max } = getMonthRange(rest.minDate, rest.maxDate);

    return (
      <div className={getClassName('bpk-calendar-grid-transition', className)}>
        <div
          className={stripClassNames}
          style={getTransformStyles(transitionValue)}
          onTransitionEnd={this.onMonthTransitionEnd}
        >
          {this.state.months.map(
            (m, index) =>
              isWithinRange(m, min, max) ? (
                <TransitionComponent
                  {...rest}
                  key={formatIsoMonth(m)}
                  month={m}
                  preventKeyboardFocus={
                    index !== 1 || rest.preventKeyboardFocus
                  }
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
                  className={getClassName(
                    'bpk-calendar-grid-transition__dummy',
                  )}
                  key={formatIsoMonth(m)}
                />
              ),
          )}
        </div>
      </div>
    );
  }
}

BpkCalendarGridTransition.propTypes = {
  TransitionComponent: PropTypes.func.isRequired,
  className: PropTypes.string,
  month: PropTypes.instanceOf(Date),
  focusedDate: PropTypes.instanceOf(Date),
};

BpkCalendarGridTransition.defaultProps = {
  className: null,
  month: null,
  focusedDate: null,
};

const addCalendarGridTransition = TransitionComponent => props => (
  <BpkCalendarGridTransition
    TransitionComponent={TransitionComponent}
    {...props}
  />
);

export default BpkCalendarGridTransition;
export { addCalendarGridTransition };
