import React, { Component, PropTypes } from 'react';

import {
  addMonths,
  isSameMonth,
  isSameDay,
  formatIsoMonth,
  differenceInCalendarMonths,
  dateToBoundaries,
  startOfDay,
  setMonth,
  setYear,
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

const setMonthYear = (date, newMonth, newYear) => setYear(
  setMonth(date, newMonth),
  newYear,
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
        // next
        console.log('Transition start, next month');
        this.setState({
          transitionValue: -588,
          isTransitioning: true,
        });
        return;
      }

      if (differenceInCalendarMonths(nextProps.month, this.props.month) === -1) {
        // prev
        console.log('Transition start, prev month');
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
    console.log('Transition end', this.state.transitionValue);

    const month = this.props.month;

    this.setState({
      transitionValue: -294,
      isTransitioning: false,
      currentMonth: this.props.month,
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
      minDate,
      maxDate,
      focusedDate,
      ...rest
    } = this.props;

    const month = this.state.currentMonth;

    const prevMonth = addMonths(month, -1);
    const nextMonth = addMonths(month, 1);

    // TODO: change 'focused' modifier to suit the adjacent month
    const predictFocusedDate = (m, currentFocusedDate) => {
      return dateToBoundaries(
        setMonthYear(currentFocusedDate, m.getMonth(), m.getFullYear()),
        startOfDay(minDate),
        startOfDay(maxDate),
      );
    };
    // TODO: works fine, HOWEVER, there's a bug where - when it's animating, it will change the next month's focused
    // date highlighted in the previous month (if it's an outside date there). We must make this completely independent
    // of upper state. Goddammit.

    const classNames = ['BpkCalendarGridTransition'];
    if (this.state.isTransitioning) { classNames.push('BpkCalendarGridTransition--transitioning'); }

    const adjacentModifiers = {
      ...rest.dateModifiers,
      focused: (date, m) => isSameDay(date, predictFocusedDate(m, focusedDate)),
    };
    delete adjacentModifiers.selected;

    console.log(this.state.months);

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
                preventKeyboardFocus={index !== 1}
                isInCurrentMonth={!this.state.isTransitioning && (index === 1)}
              />
            ))
          }
          {/* <TransitionComponent
            {...rest}
            key={formatIsoMonth(prevMonth)}
            month={prevMonth}
            dateModifiers={adjacentModifiers}
            preventKeyboardFocus
            isInCurrentMonth={false}
          />
          <TransitionComponent
            key={formatIsoMonth(month)}
            month={month}
            {...rest}
            isInCurrentMonth={!this.state.isTransitioning}
          />
          <TransitionComponent
            {...rest}
            key={formatIsoMonth(nextMonth)}
            month={nextMonth}
            dateModifiers={adjacentModifiers}
            preventKeyboardFocus
            isInCurrentMonth={false}
          /> */}
        </div>
      </div>
    );
  }
}

BpkCalendarTransition.propTypes = {
  TransitionComponent: PropTypes.func.isRequired,
  month: PropTypes.instanceOf(Date),
};

const addCalendarGridTransition = TransitionComponent => props => (
  <BpkCalendarTransition TransitionComponent={TransitionComponent} {...props} />
);

export default addCalendarGridTransition;
