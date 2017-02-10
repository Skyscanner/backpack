import React, { PropTypes } from 'react';

import CustomPropTypes from './custom-proptypes';

/*
  WeekDay - table header cells such as "Mon", "Tue", "Wed"...
*/
const WeekDay = (props) => {
  const {
    weekDay,
    weekendStart,
    weekendEnd,
    Element,
  } = props;
  const classNames = ['bpk-calendar-header__weekday'];

  if (weekDay.isWeekend) {
    classNames.push('bpk-calendar-header__weekday--weekend');
  }
  if (weekendStart) { classNames.push('bpk-calendar-header__weekday--weekend-start'); }
  if (weekendEnd) { classNames.push('bpk-calendar-header__weekday--weekend-end'); }

  return (
    <Element
      className={classNames.join(' ')}
      title={weekDay.name}
    ><span aria-hidden="true">{ weekDay.nameAbbr }</span></Element>
  );
};

WeekDay.propTypes = {
  weekDay: CustomPropTypes.WeekDay.isRequired,
  weekendStart: PropTypes.bool.isRequired,
  weekendEnd: PropTypes.bool.isRequired,
};

const BpkCalendarGridHeader = (props) => {
  const {
    type,
    weekDays,
    showWeekendSeparator,
    weekendStartIndex,
    weekendEndIndex,
    isTableHead,
  } = props;

  const Header = isTableHead ? 'thead' : 'header';
  const List = isTableHead ? 'tr' : 'ol';
  const Item = isTableHead ? 'th' : 'li';

  const classNames = ['bpk-calendar-header'];

  if (isTableHead) { classNames.push('bpk-calendar-header--table-head'); }

  return (
    <Header className={classNames.join(' ')}>
      <List className="bpk-calendar-header__week">
        { weekDays.map((weekDay, index) => (
          <WeekDay
            Element={Item}
            key={index}
            weekDay={weekDay}
            weekendStart={showWeekendSeparator && weekendStartIndex === weekDay.index}
            weekendEnd={showWeekendSeparator && weekendEndIndex === weekDay.index}
          />
        )) }
      </List>
    </Header>
  );
};

export default BpkCalendarGridHeader;
