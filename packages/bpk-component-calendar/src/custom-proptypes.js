import { PropTypes } from 'react';

const WeekDay = PropTypes.shape({
  name: PropTypes.string,
  nameAbbr: PropTypes.string,
  index: PropTypes.number,
  isWeekend: PropTypes.bool,
});

const DaysOfWeek = PropTypes.arrayOf(WeekDay);
const DateModifiers = PropTypes.objectOf(PropTypes.func);
const ReactComponent = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.func,
]);

export default {
  DateModifiers,
  DaysOfWeek,
  ReactComponent,
  WeekDay,
};
