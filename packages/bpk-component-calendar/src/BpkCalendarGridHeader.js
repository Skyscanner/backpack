/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import { cssModules, deprecated } from '../../bpk-react-utils';

import CustomPropTypes from './custom-proptypes';
import { orderDaysOfWeek } from './date-utils';
import STYLES from './BpkCalendarGridHeader.module.scss';

const getClassName = cssModules(STYLES);

/*
  WeekDay - table header cells such as "Mon", "Tue", "Wed"...
*/
const WeekDay = (props) => {
  const { Element, weekDay, weekDayKey } = props;

  return (
    <Element
      className={getClassName('bpk-calendar-header__weekday')}
      title={weekDay.name}
    >
      <span>{weekDay[weekDayKey]}</span>
    </Element>
  );
};

WeekDay.propTypes = {
  Element: CustomPropTypes.ReactComponent.isRequired,
  weekDay: CustomPropTypes.WeekDay.isRequired,
  weekDayKey: CustomPropTypes.WeekDayKey,
};

WeekDay.defaultProps = {
  weekDayKey: 'nameAbbr',
};

class BpkCalendarGridHeader extends PureComponent {
  render() {
    const { className, isTableHead, weekDayKey, weekStartsOn } = this.props;

    const Header = isTableHead ? 'thead' : 'header';
    const List = isTableHead ? 'tr' : 'ol';
    const Item = isTableHead ? 'th' : 'li';

    const daysOfWeek = orderDaysOfWeek(this.props.daysOfWeek, weekStartsOn);

    const classNames = [getClassName('bpk-calendar-header')];
    if (isTableHead) {
      classNames.push(getClassName('bpk-calendar-header--table-head'));
    }
    if (className) {
      classNames.push(className);
    }

    return (
      <Header className={classNames.join(' ')} aria-hidden>
        <List className={getClassName('bpk-calendar-header__week')}>
          {daysOfWeek.map((weekDay) => (
            <WeekDay
              Element={Item}
              key={weekDay.index}
              weekDay={weekDay}
              weekDayKey={weekDayKey}
            />
          ))}
        </List>
      </Header>
    );
  }
}

BpkCalendarGridHeader.propTypes = {
  daysOfWeek: CustomPropTypes.DaysOfWeek.isRequired,
  weekStartsOn: PropTypes.number.isRequired,
  isTableHead: PropTypes.bool,
  className: PropTypes.string,
  weekDayKey: CustomPropTypes.WeekDayKey,
  // eslint-disable-next-line react/require-default-props,react/no-unused-prop-types
  showWeekendSeparator: deprecated(
    PropTypes.bool,
    'The showWeekendSeparator prop in BpkCalendarGridHeader is now deprecated as no longer part of the calendar, so is no longer required',
  ),
};

BpkCalendarGridHeader.defaultProps = {
  isTableHead: false,
  className: null,
  weekDayKey: 'nameAbbr',
};

export default BpkCalendarGridHeader;
