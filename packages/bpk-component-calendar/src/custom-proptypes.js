import { PropTypes } from 'react';

const WeekDay = PropTypes.shape({
  name: PropTypes.string,
  nameAbbr: PropTypes.string,
  index: PropTypes.number,
  isWeekend: PropTypes.bool,
});

const DaysOfWeek = PropTypes.arrayOf(WeekDay);
const DateModifiers = PropTypes.objectOf(PropTypes.func);

export default {
  WeekDay,
  DaysOfWeek,
  DateModifiers,
};
