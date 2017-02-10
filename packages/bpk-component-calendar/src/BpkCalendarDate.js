import React, { Component, PropTypes } from 'react';

import CustomPropTypes from './custom-proptypes';
import './bpk-calendar.scss';

const navigatedByMonthNudger = () => document.activeElement.className.indexOf('bpk-calendar-nav__button') !== -1;

class BpkCalendarDate extends Component {
  componentDidMount() {
    if (!this.props.preventKeyboardFocus && this.props.focused) {
      // If we got here by clicking the nudger, don't focus this date
      // TODO: Won't work with CSS Modules and is relying on the DOM. Need to find better solution.
      if (!navigatedByMonthNudger()) {
        console.debug('Giving focus after instantiation', this.button, this.props.month);
        this.button.focus();
      }
    }
  }

  componentDidUpdate(prevProps) {
    /*
    TODO: figure out which transitions we need to handle!
    - Within one month: Navigate within the month; was !focused, is now focused => focus()
    - Changing month: !focused, is now focused; was !focusable, is now focusable => focus()
    - When month is instantiated (componentDidMount) AND is current month, i.e. is focusable & focused => focus();
      - don't do that if month was changed from nudger using keyboard

      next and prev months need to be invisible to aria, and not focusable.

      focused: has a ring around date
      focused && focusable: should receive keyboard focus; tabIndex=0
      but outside months: should have tabIndex=-1

      focusable: if false, class should still be added using modifiers, but tabIndex should be -1 and should not receive
      kb focus
      while animating, all 3 months get focusable = false
    */

    if (this.props.preventKeyboardFocus || navigatedByMonthNudger()) { return; }

    if (!prevProps.focused && this.props.focused && this.props.isInCurrentMonth) {
      console.debug('Giving focus after kb navigation', this.button);
      this.button.focus();
    }
    if (this.props.focused && !prevProps.isInCurrentMonth && this.props.isInCurrentMonth) {
      console.debug('Giving focus after moving months', this.button);
      this.button.focus();
    }
  }

  render() {
    const {
      date,
      month,
      modifiers,
      onClick,
      onDateKeyDown,
      focused,
      isInCurrentMonth,
      ...buttonProps
    } = this.props;
    const classNames = ['bpk-calendar-date'];

    Object.keys(modifiers).forEach((modifier) => {
      if (modifiers[modifier](date, month)) { classNames.push(`bpk-calendar-date--${modifier}`); }
    });

    const disabled = modifiers.disabled ? modifiers.disabled(date, month) : false;
    const selected = modifiers.selected ? modifiers.selected(date, month) : false;

    delete buttonProps.preventKeyboardFocus;

    return (
      <button
        type="button"
        className={classNames.join(' ')}
        aria-label={date.getDate()}
        disabled={disabled}
        tabIndex={(isInCurrentMonth && focused) ? 0 : -1}
        onClick={onClick}
        onKeyDown={onDateKeyDown}
        aria-pressed={selected}
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
  focused: React.PropTypes.bool,
  preventKeyboardFocus: React.PropTypes.bool,

  isInCurrentMonth: React.PropTypes.bool,
};

BpkCalendarDate.defaultProps = {
  modifiers: {},
  onClick: null,
  onDateKeyDown: null,
  focused: false,
  preventKeyboardFocus: true,

  isInCurrentMonth: true,
};

export default BpkCalendarDate;
