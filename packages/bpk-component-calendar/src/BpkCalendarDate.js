import React, { Component, PropTypes } from 'react';

import CustomPropTypes from './custom-proptypes';
import './bpk-calendar.scss';

// FIXME: Won't work with CSS Modules and is relying on the DOM. Need to find better solution.
const navigatedByMonthNudger = () => document.activeElement.className.indexOf('bpk-calendar-nav__button') !== -1;

class BpkCalendarDate extends Component {
  componentDidMount() {
    if (!this.props.preventKeyboardFocus && this.props.isFocused) {
      // If we got here by clicking the nudger, don't focus this date
      if (!navigatedByMonthNudger()) {
        console.debug('Giving focus after instantiation', this.button);
        this.button.focus();
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.preventKeyboardFocus || navigatedByMonthNudger()) { return; }

    // Giving focus after keyboard navigation
    if (!prevProps.isFocused && this.props.isFocused && this.props.isInCurrentMonth) {
      console.debug('Giving focus after kb navigation', this.button);
      this.button.focus();
      return;
    }

    // Giving focus after changing months with transition
    if (this.props.isFocused && !prevProps.isInCurrentMonth && this.props.isInCurrentMonth) {
      console.debug('Giving focus after moving months', this.button);
      this.button.focus();
    }
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
      isInCurrentMonth,
      ...buttonProps
    } = this.props;
    const classNames = ['bpk-calendar-date'];

    Object.keys(modifiers).forEach((modifier) => {
      if (modifiers[modifier](this.props)) { classNames.push(`bpk-calendar-date--modifier-${modifier}`); }
    });

    if (isFocused) { classNames.push('bpk-calendar-date--focused'); }
    if (isSelected) { classNames.push('bpk-calendar-date--selected'); }
    if (isBlocked) { classNames.push('bpk-calendar-date--blocked'); }
    if (isOutside) { classNames.push('bpk-calendar-date--outside'); }
    if (isToday) { classNames.push('bpk-calendar-date--today'); }

    delete buttonProps.preventKeyboardFocus;

    return (
      <button
        type="button"
        className={classNames.join(' ')}
        aria-label={date.getDate()}
        disabled={isBlocked}
        tabIndex={(isInCurrentMonth && isFocused) ? 0 : -1}
        onClick={onClick}
        onKeyDown={onDateKeyDown}
        aria-pressed={isSelected}
        ref={(button) => { this.button = button; }}
        {...buttonProps}
      ><span aria-hidden="true">{ date.getDate() }</span></button>
    );
  }
}

BpkCalendarDate.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  modifiers: CustomPropTypes.DateModifiers,
  onClick: React.PropTypes.func,
  onDateKeyDown: React.PropTypes.func,

  preventKeyboardFocus: React.PropTypes.bool,
  isInCurrentMonth: React.PropTypes.bool,

  isFocused: React.PropTypes.bool,
  isSelected: React.PropTypes.bool,
  isBlocked: React.PropTypes.bool,
  isOutside: React.PropTypes.bool,
  isToday: React.PropTypes.bool,
};

BpkCalendarDate.defaultProps = {
  modifiers: {},
  onClick: null,
  onDateKeyDown: null,

  preventKeyboardFocus: true,
  isInCurrentMonth: true,

  isFocused: false,
  isSelected: false,
  isBlocked: false,
  isOutside: false,
  isToday: false,
};

export default BpkCalendarDate;
