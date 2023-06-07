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

import { PureComponent } from 'react';

import { cssModules } from '../../bpk-react-utils';

import type {
  DaysOfWeek,
  ReactComponent,
  WeekDay,
  WeekDayKey,
} from './custom-proptypes';
import { orderDaysOfWeek } from './date-utils';
import STYLES from './BpkCalendarGridHeader.module.scss';

const getClassName = cssModules(STYLES);

type Props = DefaultProps & {
  daysOfWeek: DaysOfWeek;
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;
};

type DefaultProps = {
  className?: string | null;
  weekDayKey?: WeekDayKey;
};

type WeekDayProps = {
  Element: ReactComponent;
  weekDay: WeekDay;
  weekDayKey?: WeekDayKey;
};

/*
  WeekDay - table header cells such as "Mon", "Tue", "Wed"...
*/
const WeekDayComponent = ({
  Element,
  weekDay,
  weekDayKey = 'nameAbbr',
}: WeekDayProps) => (
  <Element
    className={getClassName('bpk-calendar-header__weekday')}
    title={weekDay.name}
  >
    <span>{weekDay[weekDayKey]}</span>
  </Element>
);

class BpkCalendarGridHeader extends PureComponent<Props> {
  static defaultProps = {
    className: null,
    weekDayKey: 'nameAbbr',
  };

  render() {
    const { className, weekDayKey, weekStartsOn } = this.props;

    const daysOfWeek = orderDaysOfWeek(this.props.daysOfWeek, weekStartsOn);

    const classNames = [getClassName('bpk-calendar-header')];
    if (className) {
      classNames.push(className);
    }

    return (
      <header className={classNames.join(' ')} aria-hidden>
        <ol className={getClassName('bpk-calendar-header__week')}>
          {daysOfWeek.map((weekDay) => (
            <WeekDayComponent
              Element="li"
              key={weekDay.index}
              weekDay={weekDay}
              weekDayKey={weekDayKey}
            />
          ))}
        </ol>
      </header>
    );
  }
}

export default BpkCalendarGridHeader;
