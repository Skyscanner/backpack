/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
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
import { cssModules } from 'bpk-react-utils';

import CustomPropTypes from './custom-proptypes';
import {
  getFirstDayOfWeekend,
  getLastDayOfWeekend,
  orderDaysOfWeek,
} from './date-utils';
import STYLES from './BpkCalendarGridHeader.scss';

const getClassName = cssModules(STYLES);

/*
  WeekDay - table header cells such as "Mon", "Tue", "Wed"...
*/
const WeekDay = props => {
  const {
    weekDay,
    weekDayKey,
    isFirstDayOfWeekend,
    isLastDayOfWeekend,
    Element,
  } = props;
  const classNames = [getClassName('bpk-calendar-header__weekday')];

  if (weekDay.isWeekend) {
    classNames.push(getClassName('bpk-calendar-header__weekday--weekend'));

    if (isFirstDayOfWeekend) {
      classNames.push(
        getClassName('bpk-calendar-header__weekday--weekend-start'),
      );
    }
    if (isLastDayOfWeekend) {
      classNames.push(
        getClassName('bpk-calendar-header__weekday--weekend-end'),
      );
    }
  }

  return (
    <Element className={classNames.join(' ')} title={weekDay.name}>
      <span aria-hidden="true">{weekDay[weekDayKey]}</span>
    </Element>
  );
};

WeekDay.propTypes = {
  Element: CustomPropTypes.ReactComponent.isRequired,
  weekDay: CustomPropTypes.WeekDay.isRequired,
  weekDayKey: CustomPropTypes.WeekDayKey,
  isFirstDayOfWeekend: PropTypes.bool.isRequired,
  isLastDayOfWeekend: PropTypes.bool.isRequired,
};

WeekDay.defaultProps = {
  weekDayKey: 'nameAbbr',
};

class BpkCalendarGridHeader extends PureComponent {
  render() {
    const {
      isTableHead,
      showWeekendSeparator,
      weekStartsOn,
      weekDayKey,
      className,
    } = this.props;

    const Header = isTableHead ? 'thead' : 'header';
    const List = isTableHead ? 'tr' : 'ol';
    const Item = isTableHead ? 'th' : 'li';

    const daysOfWeek = orderDaysOfWeek(this.props.daysOfWeek, weekStartsOn);

    const firstDayOfWeekendIndex = getFirstDayOfWeekend(daysOfWeek);
    const lastDayOfWeekendIndex = getLastDayOfWeekend(daysOfWeek);

    const classNames = [getClassName('bpk-calendar-header')];
    if (isTableHead) {
      classNames.push(getClassName('bpk-calendar-header--table-head'));
    }
    if (className) {
      classNames.push(className);
    }

    return (
      <Header className={classNames.join(' ')}>
        <List className={getClassName('bpk-calendar-header__week')}>
          {daysOfWeek.map(weekDay => (
            <WeekDay
              Element={Item}
              key={weekDay.index}
              weekDay={weekDay}
              weekDayKey={weekDayKey}
              isFirstDayOfWeekend={
                showWeekendSeparator && firstDayOfWeekendIndex === weekDay.index
              }
              isLastDayOfWeekend={
                showWeekendSeparator && lastDayOfWeekendIndex === weekDay.index
              }
            />
          ))}
        </List>
      </Header>
    );
  }
}

BpkCalendarGridHeader.propTypes = {
  showWeekendSeparator: PropTypes.bool.isRequired,
  daysOfWeek: CustomPropTypes.DaysOfWeek.isRequired,
  weekStartsOn: PropTypes.number.isRequired,
  isTableHead: PropTypes.bool,
  className: PropTypes.string,
  weekDayKey: CustomPropTypes.WeekDayKey,
};

BpkCalendarGridHeader.defaultProps = {
  isTableHead: false,
  className: null,
  weekDayKey: 'nameAbbr',
};

export default BpkCalendarGridHeader;
