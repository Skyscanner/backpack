import React, { PropTypes } from 'react';

import isSaturday from 'date-fns/is_saturday';
import isSunday from 'date-fns/is_sunday';

import getCalendarMonthWeeks from './utils';
import BpkCalendarDay from './BpkCalendarDay';
import { todayModifier, disabledModifier } from './modifiers';
import './bpk-calendar.scss';

const defaultRenderDate = (date, modifiers) => <BpkCalendarDay date={date} modifiers={modifiers} />;

const BpkCalendarGrid = (props) => {
  const calendarClassNames = ['bpk-calendar'];

  const renderWeekHeader = (weekDays, weekStartsOn) => {
    const reorderedWeekDays = [
      ...props.weekDays.slice(weekStartsOn),
      ...props.weekDays.slice(0, weekStartsOn),
    ];
    return reorderedWeekDays.map(day => (
      <th
        key={day}
        className="bpk-calendar__header-cell"
      >{ day }</th>
    ));
  };

  const renderWeekDay = (date) => {
    const dayClassNames = ['bpk-calendar__date'];

    if (isSaturday(date)) { dayClassNames.push('bpk-calendar__date--weekend-start'); }
    if (isSunday(date)) { dayClassNames.push('bpk-calendar__date--weekend-end'); }

    // TODO: To be dealt with in BPK-374
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <td
        key={date.toDateString()}
        className={dayClassNames.join(' ')}
        onClick={() => {
          if (props.onClickDate) { props.onClickDate(date); }
        }}
      >
        { props.renderDate(date, props.dayModifiers) }
      </td>
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  };
  const renderWeek = (week, index) => (
    <tr
      key={index}
      className="bpk-calendar__week"
    >{ week.map(renderWeekDay) }</tr>
  );

  return (
    <table className={calendarClassNames.join(' ')}>
      <thead>
        <tr className="bpk-calendar__header">
          { renderWeekHeader(props.weekDays, props.weekStartsOn) }
        </tr>
      </thead>
      <tbody>
        { getCalendarMonthWeeks(props.month, props.weekStartsOn).map(renderWeek) }
      </tbody>
    </table>
  );
};

BpkCalendarGrid.propTypes = {
  month: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
  renderDate: PropTypes.func,
  weekDays: PropTypes.arrayOf(PropTypes.string),
  weekStartsOn: PropTypes.number,
  dayModifiers: BpkCalendarDay.propTypes.modifiers,
  onClickDate: PropTypes.func,
};

BpkCalendarGrid.defaultProps = {
  month: new Date(),
  renderDate: defaultRenderDate,
  weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  weekStartsOn: 1,
  dayModifiers: {},
};

export default BpkCalendarGrid;
