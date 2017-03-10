import React, { Component, PropTypes } from 'react';

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
} from './date-utils';

import './bpk-calendar.scss';

const transitionValues = {
  previous: 0,
  current: -getCalendarGridWidth(),
  next: -2 * getCalendarGridWidth(),
};

const getFocusedDateForMonth = (month, currentFocusedDate, minDate, maxDate) => dateToBoundaries(
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
      currentMonth: props.month,
      months: [
        addMonths(props.month, -1),
        props.month,
        addMonths(props.month, 1),
      ],
    };

    this.strip = null;
    this.isTransitionEndSupported = isTransitionEndSupported();
    this.onMonthTransitionEnd = this.onMonthTransitionEnd.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const hasMonthChanged = !isSameMonth(this.props.month, nextProps.month);

    if (hasMonthChanged) {
      const reverse = getScriptDirection() === 'rtl';

      if (differenceInCalendarMonths(nextProps.month, this.props.month) === 1) {
        // Transition to next month
        this.setState({
          transitionValue: reverse ? transitionValues.previous : transitionValues.next,
          isTransitioning: true,
        });
        return;
      }

      if (differenceInCalendarMonths(nextProps.month, this.props.month) === -1) {
        // Transition to previous month
        this.setState({
          transitionValue: reverse ? transitionValues.next : transitionValues.previous,
          isTransitioning: true,
        });
        return;
      }

      this.setState({
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

  onMonthTransitionEnd() {
    const month = this.props.month;

    this.setState({
      transitionValue: transitionValues.current,
      isTransitioning: false,
      currentMonth: month,
      months: [
        addMonths(month, -1),
        month,
        addMonths(month, 1),
      ],
    });
  }

  render() {
    const {
      TransitionComponent,
      focusedDate,
      ...rest
    } = this.props;

    const classNames = ['bpk-calendar-grid-transition__strip'];
    if (this.state.isTransitioning) { classNames.push('bpk-calendar-grid-transition__strip--transitioning'); }

    const adjacentModifiers = {
      ...rest.dateModifiers,
    };
    delete adjacentModifiers.selected;

    return (
      <div className="bpk-calendar-grid-transition">
        <div
          className={classNames.join(' ')}
          style={{ display: 'block', ...getTransformStyles(this.state.transitionValue) }}
          onTransitionEnd={this.onMonthTransitionEnd}
          ref={(strip) => { this.strip = strip; }}
        >
          {
            this.state.months.map((m, index) => (
              <TransitionComponent
                {...rest}
                key={formatIsoMonth(m)}
                month={m}
                dateModifiers={index === 1 ? rest.dateModifiers : adjacentModifiers}
                preventKeyboardFocus={index !== 1 || rest.preventKeyboardFocus}
                isKeyboardFocusable={!this.state.isTransitioning && (index === 1)}
                focusedDate={getFocusedDateForMonth(m, focusedDate, rest.minDate, rest.maxDate)}
                aria-hidden={index !== 1}
              />
            ))
          }
        </div>
      </div>
    );
  }
}

BpkCalendarGridTransition.propTypes = {
  TransitionComponent: PropTypes.func.isRequired,
  month: PropTypes.instanceOf(Date),
  focusedDate: PropTypes.instanceOf(Date),
};

BpkCalendarGridTransition.defaultProps = {
  month: null,
  focusedDate: null,
};

const addCalendarGridTransition = TransitionComponent => props => (
  <BpkCalendarGridTransition TransitionComponent={TransitionComponent} {...props} />
);

export default BpkCalendarGridTransition;
export { addCalendarGridTransition };
