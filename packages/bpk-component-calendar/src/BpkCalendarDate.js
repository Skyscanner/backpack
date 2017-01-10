import React, { PropTypes } from 'react';

import './bpk-calendar.scss';

const BpkCalendarDate = (props) => {
  const { date, modifiers, onClick, ...calendarDateProps } = props;
  const classNames = ['bpk-calendar-date'];

  Object.keys(modifiers).forEach((modifier) => {
    if (modifiers[modifier](date)) { classNames.push(`bpk-calendar-date--${modifier}`); }
  });

  const selected = modifiers.selected ? modifiers.selected(date) : false;
  const disabled = modifiers.disabled ? modifiers.disabled(date) : false;

  return (
    <button
      type="button"
      className={classNames.join(' ')}
      aria-label={date.getDate()}
      disabled={disabled}
      tabIndex={selected ? 0 : -1}
      onClick={onClick}
      {...calendarDateProps}
    ><span aria-hidden="true">{ date.getDate() }</span></button>
  );
};

BpkCalendarDate.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  modifiers: PropTypes.objectOf(React.PropTypes.func),
  onClick: React.PropTypes.func,
};

BpkCalendarDate.defaultProps = {
  modifiers: {},
  onClick: null,
};

export default BpkCalendarDate;
