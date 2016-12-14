import React, { PropTypes } from 'react';

import BpkCalendarGrid from './BpkCalendarGrid';
import { todayModifier } from './modifiers';

const BpkCalendar = (props) => {
  const classNames = ['bpk-calendar'];
  const modifiers = {};

  if (props.highlightToday) { modifiers.today = todayModifier; }

  return (
    <div className={classNames.join(' ')}>
      <div className="visually-hidden">This will be the calendar navigation</div>
      <BpkCalendarGrid
        dayModifiers={modifiers}
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
