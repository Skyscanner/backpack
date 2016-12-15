import React, { PropTypes } from 'react';

import BpkCalendarGrid from './BpkCalendarGrid';
import { todayModifier } from './utils';
import './bpk-calendar.scss';

const BpkCalendar = (props) => {
  const classNames = ['bpk-calendar'];
  const modifiers = {};

  if (props.highlightToday) { modifiers.today = todayModifier; }

  return (
    <div className={classNames.join(' ')}>
      <div className="visually-hidden">This will be the calendar navigation</div>
      <BpkCalendarGrid
        dateModifiers={modifiers}
      />
    </div>
  );
};

BpkCalendar.propTypes = {
  highlightToday: PropTypes.bool,
};

BpkCalendar.defaultProps = {
  highlightToday: false,
};

export default BpkCalendar;
