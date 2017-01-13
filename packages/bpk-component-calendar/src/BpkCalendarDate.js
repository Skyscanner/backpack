import React, { Component, PropTypes } from 'react';

import CustomPropTypes from './custom-proptypes';
import './bpk-calendar.scss';

class BpkCalendarDate extends Component {
  componentDidMount() {
    if (this.props.focused) {
      // If we got here by clicking the nudger, don't focus this date
      if (document.activeElement.className.indexOf('bpk-calendar-nav__button') === -1) {
        this.button.focus();
      }
    }
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.focused && this.props.focused) {
      this.button.focus();
    }
  }

  render() {
    const { date, modifiers, onClick, onDateKeyDown, focused, ...calendarDateProps } = this.props;
    const classNames = ['bpk-calendar-date'];

    Object.keys(modifiers).forEach((modifier) => {
      if (modifiers[modifier](date)) { classNames.push(`bpk-calendar-date--${modifier}`); }
    });

    const disabled = modifiers.disabled ? modifiers.disabled(date) : false;

    return (
      <button
        type="button"
        className={classNames.join(' ')}
        aria-label={date.getDate()}
        disabled={disabled}
        tabIndex={focused ? 0 : -1}
        onClick={onClick}
        onKeyDown={onDateKeyDown}
        ref={(button) => { this.button = button; }}
        {...calendarDateProps}
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
};

BpkCalendarDate.defaultProps = {
  modifiers: {},
  onClick: null,
  onDateKeyDown: null,
  focused: false,
};

export default BpkCalendarDate;
