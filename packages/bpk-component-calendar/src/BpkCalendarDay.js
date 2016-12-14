import React, { PropTypes } from 'react';

import './bpk-calendar.scss';

const BpkCalendarDay = (props) => {
  const { date, modifiers } = props;
  const classNames = ['bpk-calendar-day'];

  Object.keys(modifiers).forEach((modifier) => {
    if (modifiers[modifier](date)) { classNames.push(`bpk-calendar-day--${modifier}`); }
  });

  return (
    <div className={classNames.join(' ')}>{ date.getDate() }</div>
  );
};

BpkCalendarDay.propTypes = {
  date: PropTypes.instanceOf(Date),
  modifiers: PropTypes.objectOf(React.PropTypes.func),
};

BpkCalendarDay.defaultProps = {
  date: '2016-12',
  modifiers: {},
};

export default BpkCalendarDay;
