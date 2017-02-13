import React, { Component, PropTypes } from 'react';

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

function getTransformStyles(transformValue) {
  const transform = `translateX(${transformValue}px)`;
  return {
    transform,
    msTransform: transform,
    MozTransform: transform,
    WebkitTransform: transform,
  };
}

const predictFocusedDate = (month, currentFocusedDate, minDate, maxDate) => dateToBoundaries(
  setMonthYear(currentFocusedDate, month.getMonth(), month.getFullYear()),
  startOfDay(minDate),
  startOfDay(maxDate),
);

/*

Strategy:
1. Parent changes month
(2. Remove focus and focusability?)
2. Start transition by dealing with month change: state.month to newProps.month
3. Transition ends
4. Set state to new month

*/

class BpkCalendarTransition extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isTransitioning: false,
      transitionValue: -294,
      currentMonth: props.month,
      months: [
        addMonths(props.month, -1),
        props.month,
        addMonths(props.month, 1),
      ],
    };

    this.strip = null;

    this.onMonthTransitionEnd = this.onMonthTransitionEnd.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const hasMonthChanged = !isSameMonth(this.props.month, nextProps.month);

    if (hasMonthChanged) {
      if (differenceInCalendarMonths(nextProps.month, this.props.month) === 1) {
        // Transition to next month
        this.setState({
          transitionValue: -588,
          isTransitioning: true,
        });
        return;
      }

      if (differenceInCalendarMonths(nextProps.month, this.props.month) === -1) {
        // Transition to previous month
        this.setState({
          transitionValue: 0,
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

  onMonthTransitionEnd() {
    const month = this.props.month;

    this.setState({
      transitionValue: -294,
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

    const classNames = ['BpkCalendarGridTransition'];
    if (this.state.isTransitioning) { classNames.push('BpkCalendarGridTransition--transitioning'); }

    const adjacentModifiers = {
      ...rest.dateModifiers,
    };
    delete adjacentModifiers.selected;

    // aria-hidden
    return (
      <div className="transition-container">
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
                isInCurrentMonth={!this.state.isTransitioning && (index === 1)}
                focusedDate={predictFocusedDate(m, focusedDate, rest.minDate, rest.maxDate)}
              />
            ))
          }
        </div>
      </div>
    );
  }
}

BpkCalendarTransition.propTypes = {
  TransitionComponent: PropTypes.func.isRequired,
  month: PropTypes.instanceOf(Date),

  focusedDate: PropTypes.instanceOf(Date),
};

const addCalendarGridTransition = TransitionComponent => props => (
  <BpkCalendarTransition TransitionComponent={TransitionComponent} {...props} />
);

export default addCalendarGridTransition;
