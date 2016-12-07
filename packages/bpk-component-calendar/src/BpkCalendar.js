import React from 'react';

import DayPicker from './BpkDayPicker';

import { BpkCalendarPrevIcon, BpkCalendarNextIcon } from './BpkCalendarPrevButton';

import './bpk-calendar.scss';


const BpkCalendar = () => {
  const classNames = ['bpk-calendar'];

  const modifiers = {
    // blocked: day => this.isBlocked(day),
    // 'blocked-calendar': day => isDayBlocked(day),
    // 'blocked-out-of-range': day => isOutsideRange(day),
    // valid: day => !this.isBlocked(day),
    // hovered: day => this.isHovered(day),
    selected: day => true,
  };

  // if (props.disabled) { classNames.push('bpk-checkbox--disabled'); }

  return (
    <DayPicker
      modifiers={modifiers}
      enableOutsideDays
      navPrev={<BpkCalendarPrevIcon />}
      navNext={<BpkCalendarNextIcon />}
      className={classNames.join(' ')}
    />
  );
  /* eslint-enable */
};

// BpkCalendar.propTypes = {
//   name: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired,
//   id: PropTypes.string,
//   label: PropTypes.string,
//   value: PropTypes.string,
//   checked: PropTypes.bool,
//   disabled: PropTypes.bool,
// };
//
// BpkCalendar.defaultProps = {
//   id: null,
//   label: null,
//   value: null,
//   checked: false,
//   disabled: false,
// };

export default BpkCalendar;
