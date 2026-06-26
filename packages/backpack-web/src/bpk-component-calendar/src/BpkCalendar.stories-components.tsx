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

import type { CSSProperties, ComponentType, MouseEvent as ReactMouseEvent } from 'react';
import { Component } from 'react';

import { addMonths } from 'date-fns/addMonths';

import {
  colorWhite,
  colorPanjin,
  colorSkyGrayTint06,
  colorSkyGrayTint04,
  colorMonteverde,
} from '@skyscanner/bpk-foundations-web/tokens/base.es6';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import { action } from 'bpk-storybook-utils';

import BpkCalendar, {
  BpkCalendarGrid,
  BpkCalendarGridHeader,
  withCalendarState,
  composeCalendar,
  CALENDAR_SELECTION_TYPE,
} from '..';
import BpkButton from '../../bpk-component-button';
import {
  withButtonAlignment,
  withRtlSupport,
} from '../../bpk-component-icon';
import SmallLongArrowLeftIcon from '../../bpk-component-icon/sm/long-arrow-left';
import SmallLongArrowRightIcon from '../../bpk-component-icon/sm/long-arrow-right';

import { formatMonth, formatDateFull, weekDays } from './BpkCalendar.stories-test-utils';
import {
  dateToBoundaries,
  startOfDay,
  addDays,
} from './date-utils';

import type { SelectionConfiguration } from './custom-proptypes';

const LeftIcon = withButtonAlignment(withRtlSupport(SmallLongArrowLeftIcon));
const RightIcon = withButtonAlignment(withRtlSupport(SmallLongArrowRightIcon));

type DirectionNavProps = {
  direction: string;
  month: Date;
  onMonthChange: (
    event: ReactMouseEvent<HTMLButtonElement>,
    { month, source }: { month: Date; source: string },
  ) => void;
};

const withDirection =
  (Nav: ComponentType<DirectionNavProps>, direction: string) =>
  (props: DirectionNavProps) => <Nav {...props} direction={direction} />;

type CalendarDateProps = {
  date: Date;
  isOutside?: boolean;
  isBlocked?: boolean;
  isSelected?: boolean;
  prices: number[];
};

const withPrices =
  (DateComponent: ComponentType<CalendarDateProps>, prices: number[]) =>
  (props: CalendarDateProps) => <DateComponent {...props} prices={prices} />;

const prices = [
  125, 56, 75, 57, 78, 92, 133, 90, 148, 80, 122, 67, 70, 123, 77, 66, 64, 56,
  105, 138, 52, 70, 106, 139, 88, 97, 73, 114, 119, 141, 118,
];

const MyCalendarNav = ({ direction, month, onMonthChange }: DirectionNavProps) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
  >
    <strong>{direction}</strong>
    <div>
      <BpkButton
        iconOnly
        onClick={(event: ReactMouseEvent<HTMLButtonElement>) =>
          onMonthChange(event, { month: addMonths(month, -1), source: 'PREV' })
        }
      >
        <LeftIcon fill={colorWhite} />
      </BpkButton>
      &nbsp;
      <BpkButton
        iconOnly
        onClick={(event: ReactMouseEvent<HTMLButtonElement>) =>
          onMonthChange(event, { month: addMonths(month, 1), source: 'NEXT' })
        }
      >
        <RightIcon fill={colorWhite} />
      </BpkButton>
    </div>
  </div>
);

const MyCalendarDate = (props: CalendarDateProps) => {
  const cx: CSSProperties = {
    textAlign: 'center',
    fontSize: '0.8em',
    color: props.isOutside || props.isBlocked ? colorSkyGrayTint06 : 'inherit',
    backgroundColor: props.isSelected ? colorSkyGrayTint04 : 'inherit',
  };
  const priceCx: CSSProperties = {
    color: colorPanjin,
  };
  const day = props.date.getDate();
  const price = props.prices[day - 1];
  if (price < 100) {
    priceCx.color = colorMonteverde;
  }
  return (
    <div style={cx}>
      <div>{day}</div>
      {props.isOutside || props.isBlocked ? null : (
        <div style={priceCx}>£{price}</div>
      )}
    </div>
  );
};

const MyDepartCalendar = withCalendarState(
  composeCalendar(
    withDirection(MyCalendarNav, 'Depart'),
    BpkCalendarGridHeader,
    BpkCalendarGrid,
    withPrices(MyCalendarDate, prices),
  ),
);

const MyReturnCalendar = withCalendarState(
  composeCalendar(
    withDirection(MyCalendarNav, 'Return'),
    BpkCalendarGridHeader,
    BpkCalendarGrid,
    withPrices(MyCalendarDate, prices),
  ),
);

type MonthViewCalendarProps = {
  minDate?: Date;
  maxDate?: Date;
  departureDate?: Date;
  returnDate?: Date;
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;
};

type MonthViewCalendarState = {
  departDate: Date;
  returnDate: Date;
};

class MonthViewCalendar extends Component<MonthViewCalendarProps, MonthViewCalendarState> {
  constructor(props: MonthViewCalendarProps) {
    super(props);
    const {
      departureDate = startOfDay(addDays(new Date(), 1)),
      returnDate = startOfDay(addDays(new Date(), 4)),
    } = props;
    this.state = {
      departDate: departureDate,
      returnDate,
    };
  }

  render() {
    const {
      maxDate = startOfDay(addMonths(new Date(), 12)),
      minDate = startOfDay(new Date()),
      ...rest
    } = this.props;
    return (
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <MyDepartCalendar
          id="myCalendar"
          formatMonth={formatMonth}
          formatDateFull={formatDateFull}
          daysOfWeek={weekDays}
          changeMonthLabel="Change month"
          previousMonthLabel="Go to previous month"
          nextMonthLabel="Go to next month"
          date={this.state.departDate}
          fixedWidth={false}
          onDateSelect={(departDate: Date) => {
            this.setState((prevState) => ({
              departDate,
              returnDate: dateToBoundaries(
                prevState.returnDate,
                departDate,
                maxDate,
              ),
            }));
          }}
          {...rest}
        />
        <div
          style={{
            flexShrink: 1,
            margin: '0 2rem',
            borderRight: `1px solid ${colorSkyGrayTint06}`,
          }}
        />
        <MyReturnCalendar
          id="myCalendar"
          formatMonth={formatMonth}
          formatDateFull={formatDateFull}
          daysOfWeek={weekDays}
          changeMonthLabel="Change month"
          previousMonthLabel="Go to previous month"
          nextMonthLabel="Go to next month"
          date={this.state.returnDate}
          fixedWidth={false}
          onDateSelect={(returnDate: Date) => {
            this.setState((prevState) => ({
              returnDate,
              departDate: dateToBoundaries(
                prevState.departDate,
                minDate,
                returnDate,
              ),
            }));
          }}
          {...rest}
        />
      </div>
    );
  }
}

type CalendarContainerProps = {
  selectionConfiguration?: SelectionConfiguration;
  [key: string]: any;
};

type CalendarContainerState = {
  selectionConfiguration: SelectionConfiguration;
};

class CalendarContainer extends Component<CalendarContainerProps, CalendarContainerState> {
  constructor(props: CalendarContainerProps) {
    super(props);
    const {
      selectionConfiguration = {
        type: CALENDAR_SELECTION_TYPE.single,
        date: null,
      },
    } = props;

    if (selectionConfiguration.type === 'range') {
      this.state = {
        selectionConfiguration: {
          type: selectionConfiguration.type,
          startDate: selectionConfiguration.startDate,
          endDate: selectionConfiguration.endDate,
        },
      };
    } else {
      this.state = {
        selectionConfiguration: {
          type: selectionConfiguration.type,
          date: selectionConfiguration.date,
        },
      };
    }
  }

  render() {
    return (
      <BpkCalendar
        {...(this.props as any)}
        onDateSelect={(startDate: Date, endDate: Date | null = null) => {
          const { selectionConfiguration } = this.props;
          if (selectionConfiguration?.type === 'range') {
            if (startDate && !endDate) {
              this.setState({
                selectionConfiguration: {
                  type: selectionConfiguration.type,
                  startDate,
                  endDate: null,
                },
              });
              action('Selected day')(startDate);
            }
            if (startDate && endDate) {
              this.setState({
                selectionConfiguration: {
                  type: selectionConfiguration.type,
                  startDate,
                  endDate,
                },
              });
              action('Selected end day')(endDate);
            }
          } else {
            this.setState({
              selectionConfiguration: {
                type: selectionConfiguration?.type ?? CALENDAR_SELECTION_TYPE.single,
                date: startDate,
              },
            });
            action('Selected day')(startDate);
          }
        }}
        selectionConfiguration={this.state.selectionConfiguration}
        onMonthChange={action('Changed month')}
      />
    );
  }
}

export default CalendarContainer;
export { MonthViewCalendar };
