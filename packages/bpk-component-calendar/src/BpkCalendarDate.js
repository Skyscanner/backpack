import React, { PropTypes } from 'react';

import './bpk-calendar.scss';

const BpkCalendarDate = (props) => {
  const { date, modifiers } = props;
  const classNames = ['bpk-calendar-date'];

  Object.keys(modifiers).forEach((modifier) => {
    if (modifiers[modifier](date)) { classNames.push(`bpk-calendar-date--${modifier}`); }
  });

  return (
    <div className={classNames.join(' ')}>{ date.getDate() }</div>
  );
};

BpkCalendarDate.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  modifiers: PropTypes.objectOf(React.PropTypes.func),
};

BpkCalendarDate.defaultProps = {
  modifiers: {},
};

export default BpkCalendarDate;
