import React, { PropTypes } from 'react';

import CustomPropTypes from './custom-proptypes';
import { getFirstDayOfWeekend, getLastDayOfWeekend, orderDaysOfWeek } from './date-utils';

/*
  WeekDay - table header cells such as "Mon", "Tue", "Wed"...
*/
const WeekDay = (props) => {
  const {
    weekDay,
    isFirstDayOfWeekend,
    isLastDayOfWeekend,
    Element,
  } = props;
  const classNames = ['bpk-calendar-header__weekday'];

  if (weekDay.isWeekend) {
    classNames.push('bpk-calendar-header__weekday--weekend');

    if (isFirstDayOfWeekend) { classNames.push('bpk-calendar-header__weekday--weekend-start'); }
    if (isLastDayOfWeekend) { classNames.push('bpk-calendar-header__weekday--weekend-end'); }
  }

  return (
    <Element
      className={classNames.join(' ')}
      title={weekDay.name}
    ><span aria-hidden="true">{ weekDay.nameAbbr }</span></Element>
  );
};

WeekDay.propTypes = {
  Element: CustomPropTypes.ReactComponent.isRequired,
  weekDay: CustomPropTypes.WeekDay.isRequired,
  isFirstDayOfWeekend: PropTypes.bool.isRequired,
  isLastDayOfWeekend: PropTypes.bool.isRequired,
};

const BpkCalendarGridHeader = (props) => {
  const {
    isTableHead,
    showWeekendSeparator,
    weekStartsOn,
  } = props;

  const Header = isTableHead ? 'thead' : 'header';
  const List = isTableHead ? 'tr' : 'ol';
  const Item = isTableHead ? 'th' : 'li';

  const daysOfWeek = orderDaysOfWeek(props.daysOfWeek, weekStartsOn);

  const firstDayOfWeekendIndex = getFirstDayOfWeekend(daysOfWeek);
  const lastDayOfWeekendIndex = getLastDayOfWeekend(daysOfWeek);

  const classNames = ['bpk-calendar-header'];
  if (isTableHead) { classNames.push('bpk-calendar-header--table-head'); }

  return (
    <Header className={classNames.join(' ')}>
      <List className="bpk-calendar-header__week">
        { daysOfWeek.map(weekDay => (
          <WeekDay
            Element={Item}
            key={weekDay.index}
            weekDay={weekDay}
            isFirstDayOfWeekend={showWeekendSeparator && firstDayOfWeekendIndex === weekDay.index}
            isLastDayOfWeekend={showWeekendSeparator && lastDayOfWeekendIndex === weekDay.index}
          />
        )) }
      </List>
    </Header>
  );
};

BpkCalendarGridHeader.propTypes = {
  showWeekendSeparator: PropTypes.bool.isRequired,
  daysOfWeek: CustomPropTypes.DaysOfWeek.isRequired,
  weekStartsOn: PropTypes.number.isRequired,
  isTableHead: PropTypes.bool,
};

BpkCalendarGridHeader.defaultProps = {
  isTableHead: false,
};

export default BpkCalendarGridHeader;
