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
import { Component, createRef } from 'react';

import { memoize } from 'lodash';

import {
  colorSagano,
  colorBagan,
  colorPetra,
  colorSkyGray,
} from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import {
  BpkCalendarNav,
  BpkCalendarGridHeader,
  BpkCalendarDate,
  withCalendarState,
  composeCalendar,
  CustomPropTypes,
  CALENDAR_SELECTION_TYPE,
  BpkCalendarGrid,
} from '../../packages/bpk-component-calendar';
import {
  format,
  dateToBoundaries,
  addMonths,
  addDays,
  startOfDay,
} from '../../packages/bpk-component-calendar/src/date-utils';
import {
  weekDays,
  formatMonth,
  formatDateFull,
} from '../../packages/bpk-component-calendar/test-utils';
import BpkDatepicker from '../../packages/bpk-component-datepicker';
import BpkInput, { withOpenEvents } from '../../packages/bpk-component-input';
import { cssModules } from '../../packages/bpk-react-utils';
import { action } from '../bpk-storybook-utils';

import STYLES from './examples.module.scss';

const getClassName = cssModules(STYLES);

const formatDate = (date: any) => format(date, 'dd/MM/yyyy');

const Input = withOpenEvents(BpkInput);

const inputProps = {
  onChange: () => null,
  placeholder: 'placeholder',
  large: true,
};

const inputPropsWithEventHandlers = {
  onClick: action('input onClick'),
  onFocus: action('input onFocus'),
  onBlur: action('input onBlur'),
  onTouchEnd: action('input onTouchEnd'),
  onKeyDown: action('input onKeyDown'),
  onKeyUp: action('input onKeyUp'),
  onChange: () => null,
  placeholder: 'placeholder',
  large: true,
};

class CalendarContainer extends Component {
  constructor(props: any) {
    super(props);

    // @ts-expect-error TS(2339) FIXME: Property 'selectionConfiguration' does not exist o... Remove this comment to see the full error message
    if (this.props.selectionConfiguration.type === 'range') {
      this.state = {
        selectionConfiguration: {
          // @ts-expect-error TS(2339) FIXME: Property 'selectionConfiguration' does not exist o... Remove this comment to see the full error message
          type: this.props.selectionConfiguration.type,
          // @ts-expect-error TS(2339) FIXME: Property 'selectionConfiguration' does not exist o... Remove this comment to see the full error message
          startDate: this.props.selectionConfiguration.startDate,
          // @ts-expect-error TS(2339) FIXME: Property 'selectionConfiguration' does not exist o... Remove this comment to see the full error message
          endDate: this.props.selectionConfiguration.endDate,
        },
      };
    } else {
      this.state = {
        selectionConfiguration: {
          // @ts-expect-error TS(2339) FIXME: Property 'selectionConfiguration' does not exist o... Remove this comment to see the full error message
          type: this.props.selectionConfiguration.type,
          // @ts-expect-error TS(2339) FIXME: Property 'selectionConfiguration' does not exist o... Remove this comment to see the full error message
          date: this.props.selectionConfiguration.date,
        },
      };
    }
  }

  render() {
    return (
      <div id="datepicker-element">
        <div id="application-element">
           {/* @ts-expect-error TS(2740) FIXME: Type '{ onDateSelect: (startDate: Date, endDate?: ... Remove this comment to see the full error message */}
          <BpkDatepicker
            {...this.props}
            // @ts-expect-error TS(2322) FIXME: Type 'null' is not assignable to type 'Date | unde... Remove this comment to see the full error message
            onDateSelect={(startDate, endDate = null) => {
              // @ts-expect-error TS(2339) FIXME: Property 'selectionConfiguration' does not exist o... Remove this comment to see the full error message
              if (this.props.selectionConfiguration.type === 'range') {
                if (startDate && !endDate) {
                  this.setState({
                    selectionConfiguration: {
                      // @ts-expect-error TS(2339) FIXME: Property 'selectionConfiguration' does not exist o... Remove this comment to see the full error message
                      type: this.props.selectionConfiguration.type,
                      startDate,
                      endDate: null,
                    },
                  });
                  // @ts-expect-error TS(2554) FIXME: Expected 0 arguments, but got 1.
                  action('Selected day')(startDate);
                }
                if (startDate && endDate) {
                  this.setState({
                    selectionConfiguration: {
                      // @ts-expect-error TS(2339) FIXME: Property 'selectionConfiguration' does not exist o... Remove this comment to see the full error message
                      type: this.props.selectionConfiguration.type,
                      startDate,
                      endDate,
                    },
                  });
                  // @ts-expect-error TS(2554) FIXME: Expected 0 arguments, but got 1.
                  action('Selected end day')(endDate);
                }
              } else {
                this.setState({
                  selectionConfiguration: {
                    // @ts-expect-error TS(2339) FIXME: Property 'selectionConfiguration' does not exist o... Remove this comment to see the full error message
                    type: this.props.selectionConfiguration.type,
                    date: startDate,
                  },
                });
                // @ts-expect-error TS(2554) FIXME: Expected 0 arguments, but got 1.
                action('Selected day')(startDate);
              }
            }}
            // @ts-expect-error TS(2339) FIXME: Property 'selectionConfiguration' does not exist o... Remove this comment to see the full error message
            selectionConfiguration={this.state.selectionConfiguration}
            onMonthChange={action('Changed month')}
            getApplicationElement={() =>
              document.getElementById('application-element')
            }
            renderTarget={() => document.getElementById('datepicker-element')}
          />
        </div>
      </div>
    );
  }
}

// @ts-expect-error TS(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
CalendarContainer.propTypes = {
  selectionConfiguration: CustomPropTypes.SelectionConfiguration,
};

// @ts-expect-error TS(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
CalendarContainer.defaultProps = {
  selectionConfiguration: {
    type: CALENDAR_SELECTION_TYPE.single,
    date: null,
  },
};

const getBackgroundForDate = memoize(
  // @ts-expect-error TS(2345) FIXME: Argument of type 'number' is not assignable to par... Remove this comment to see the full error message
  () => [colorSagano, colorBagan, colorPetra][parseInt(Math.random() * 3, 10)],
);

const ColoredCalendarDate = (props: any) => {
  let style = {};

  if (!props.isFocused && !props.isOutside && !props.isBlocked) {
    style = {
      // @ts-expect-error TS(2554) FIXME: Expected 0 arguments, but got 1.
      backgroundColor: getBackgroundForDate(props.date.getTime()), // stylelint-disable
      color: colorSkyGray,
    };
  }

  return <BpkCalendarDate {...props} style={style} />;
};

ColoredCalendarDate.propTypes = {
  isFocused: PropTypes.bool.isRequired,
  isOutside: PropTypes.bool.isRequired,
  isBlocked: PropTypes.bool.isRequired,
  date: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

class ReturnDatepicker extends Component {
  maxDate: any;

  minDate: any;

  constructor() {
    // @ts-expect-error TS(2554) FIXME: Expected 1-2 arguments, but got 0.
    super();

    this.minDate = startOfDay(new Date());
    this.maxDate = startOfDay(addMonths(new Date(), 12));
    this.state = {
      departDate: startOfDay(addDays(new Date(), 1)),
      returnDate: startOfDay(addDays(new Date(), 4)),
      isReturnPickerOpen: false,
    };
  }

  render() {
    return (
      <div id="datepicker-element">
        <div
          className={getClassName('bpk-datepicker__container')}
          id="application-element"
        >
          <div className={getClassName('bpk-datepicker__container--item')}>
            <BpkDatepicker
              id="depart"
              closeButtonText="Close"
              daysOfWeek={weekDays}
              weekStartsOn={1}
              changeMonthLabel="Change month"
              previousMonthLabel="Go to previous month"
              nextMonthLabel="Go to next month"
              title="Departure date"
              getApplicationElement={() =>
                document.getElementById('application-element')
              }
              renderTarget={() => document.getElementById('datepicker-element')}
              formatDate={formatDate}
              formatMonth={formatMonth}
              formatDateFull={formatDateFull}
              inputProps={inputProps}
              selectionConfiguration={{
                type: CALENDAR_SELECTION_TYPE.single,
                // @ts-expect-error TS(2339) FIXME: Property 'departDate' does not exist on type 'Read... Remove this comment to see the full error message
                date: this.state.departDate,
              }}
              onDateSelect={(departDate) => {
                this.setState((prevState) => ({
                  departDate,
                  returnDate: dateToBoundaries(
                    // @ts-expect-error TS(2339) FIXME: Property 'returnDate' does not exist on type 'Read... Remove this comment to see the full error message
                    prevState.returnDate,
                    departDate,
                    this.maxDate,
                  ),
                  isReturnPickerOpen: true,
                }));
                // @ts-expect-error TS(2554) FIXME: Expected 0 arguments, but got 1.
                action('Selected departure date')(departDate);
              }}
              onMonthChange={action('Changed month')}
            />
          </div>
          <div className={getClassName('bpk-datepicker__container--item')}>
            <BpkDatepicker
              id="return"
              closeButtonText="Close"
              daysOfWeek={weekDays}
              weekStartsOn={1}
              changeMonthLabel="Change month"
              previousMonthLabel="Go to previous month"
              nextMonthLabel="Go to next month"
              title="Return date"
              getApplicationElement={() =>
                document.getElementById('application-element')
              }
              renderTarget={() => document.getElementById('datepicker-element')}
              formatDate={formatDate}
              formatMonth={formatMonth}
              formatDateFull={formatDateFull}
              inputProps={inputProps}
              selectionConfiguration={{
                type: CALENDAR_SELECTION_TYPE.single,
                // @ts-expect-error TS(2339) FIXME: Property 'returnDate' does not exist on type 'Read... Remove this comment to see the full error message
                date: this.state.returnDate,
              }}
              onDateSelect={(returnDate) => {
                this.setState((prevState) => ({
                  returnDate,
                  departDate: dateToBoundaries(
                    // @ts-expect-error TS(2339) FIXME: Property 'departDate' does not exist on type 'Read... Remove this comment to see the full error message
                    prevState.departDate,
                    this.minDate,
                    returnDate,
                  ),
                }));
                // @ts-expect-error TS(2554) FIXME: Expected 0 arguments, but got 1.
                action('Selected return date')(returnDate);
              }}
              onOpenChange={(isOpen) => {
                this.setState({
                  isReturnPickerOpen: isOpen,
                });
              }}
              onMonthChange={action('Changed month')}
              // @ts-expect-error TS(2339) FIXME: Property 'isReturnPickerOpen' does not exist on ty... Remove this comment to see the full error message
              isOpen={this.state.isReturnPickerOpen}
            />
          </div>
        </div>
      </div>
    );
  }
}

class MultipleInputDatepicker extends Component {
  ref: any;

  constructor(props: any) {
    super(props);

    this.ref = createRef();
    this.state = {
      selectionConfiguration: {
        type: CALENDAR_SELECTION_TYPE.range,
        startDate: new Date(2020, 3, 8),
        endDate: new Date(2020, 3, 15),
      },
      isOpen: false,
    };
  }

  onOpen = () => {
    this.setState({
      isOpen: true,
    });
  };

  onClose = () => {
    this.setState({
      isOpen: false,
    });
  };

  render() {
    const inputStyles = {
      display: 'inline-block',
      verticalAlign: 'bottom',
      width: '50%',
    };

    const inputs = (
      <div ref={this.ref}>
        <Input
          id="departure-date"
          name="departure-date"
          value={
            // @ts-expect-error TS(2339) FIXME: Property 'selectionConfiguration' does not exist o... Remove this comment to see the full error message
            this.state.selectionConfiguration.startDate
              // @ts-expect-error TS(2339) FIXME: Property 'selectionConfiguration' does not exist o... Remove this comment to see the full error message
              ? formatDate(this.state.selectionConfiguration.startDate)
              : ''
          }
          aria-live="polite"
          aria-atomic="true"
          aria-label={
            // @ts-expect-error TS(2339) FIXME: Property 'selectionConfiguration' does not exist o... Remove this comment to see the full error message
            this.state.selectionConfiguration.startDate
              // @ts-expect-error TS(2339) FIXME: Property 'selectionConfiguration' does not exist o... Remove this comment to see the full error message
              ? formatDate(this.state.selectionConfiguration.startDate)
              : ''
          }
          onOpen={this.onOpen}
          // @ts-expect-error TS(2339) FIXME: Property 'isOpen' does not exist on type 'Readonly... Remove this comment to see the full error message
          isOpen={this.state.isOpen}
          style={inputStyles}
          dockedFirst
        />
        <Input
          id="arrival-date"
          name="arrival-date"
          value={
            // @ts-expect-error TS(2339) FIXME: Property 'selectionConfiguration' does not exist o... Remove this comment to see the full error message
            this.state.selectionConfiguration.endDate
              // @ts-expect-error TS(2339) FIXME: Property 'selectionConfiguration' does not exist o... Remove this comment to see the full error message
              ? formatDate(this.state.selectionConfiguration.endDate)
              : ''
          }
          aria-live="polite"
          aria-atomic="true"
          aria-label={
            // @ts-expect-error TS(2339) FIXME: Property 'selectionConfiguration' does not exist o... Remove this comment to see the full error message
            this.state.selectionConfiguration.endDate
              // @ts-expect-error TS(2339) FIXME: Property 'selectionConfiguration' does not exist o... Remove this comment to see the full error message
              ? formatDate(this.state.selectionConfiguration.endDate)
              : ''
          }
          onOpen={this.onOpen}
          // @ts-expect-error TS(2339) FIXME: Property 'isOpen' does not exist on type 'Readonly... Remove this comment to see the full error message
          isOpen={this.state.isOpen}
          style={inputStyles}
          dockedLast
        />
      </div>
    );

    return (
      <div id="datepicker-element">
        <div id="application-element">
          <BpkDatepicker
            {...this.props}
            id="myDatepicker"
            closeButtonText="Close"
            daysOfWeek={weekDays}
            weekStartsOn={1}
            changeMonthLabel="Change month"
            previousMonthLabel="Go to previous month"
            nextMonthLabel="Go to next month"
            title="Departure date"
            formatDate={formatDate}
            formatMonth={formatMonth}
            formatDateFull={formatDateFull}
            minDate={new Date(2020, 3, 1)}
            onClose={this.onClose}
            // @ts-expect-error TS(2339) FIXME: Property 'isOpen' does not exist on type 'Readonly... Remove this comment to see the full error message
            isOpen={this.state.isOpen}
            inputComponent={inputs}
            // @ts-expect-error TS(2322) FIXME: Type 'null' is not assignable to type 'Date | unde... Remove this comment to see the full error message
            onDateSelect={(startDate, endDate = null) => {
              if (startDate && !endDate) {
                this.setState({
                  selectionConfiguration: {
                    type: CALENDAR_SELECTION_TYPE.range,
                    startDate,
                    endDate: null,
                  },
                });
                // @ts-expect-error TS(2554) FIXME: Expected 0 arguments, but got 1.
                action('Selected day')(startDate);
              }
              if (startDate && endDate) {
                this.setState({
                  selectionConfiguration: {
                    type: CALENDAR_SELECTION_TYPE.range,
                    startDate,
                    endDate,
                  },
                });
                this.onClose();
                // @ts-expect-error TS(2554) FIXME: Expected 0 arguments, but got 1.
                action('Selected end day')(endDate);
              }
            }}
            // @ts-expect-error TS(2339) FIXME: Property 'selectionConfiguration' does not exist o... Remove this comment to see the full error message
            selectionConfiguration={this.state.selectionConfiguration}
            onMonthChange={action('Changed month')}
            getApplicationElement={() =>
              document.getElementById('application-element')
            }
            renderTarget={() => document.getElementById('datepicker-element')}
          />
        </div>
      </div>
    );
  }
}

const DefaultExample = () => (
  <div id="application-element">
    <CalendarContainer
      // @ts-expect-error TS(2322) FIXME: Type '{ id: string; closeButtonText: string; daysO... Remove this comment to see the full error message
      id="myDatepicker"
      closeButtonText="Close"
      daysOfWeek={weekDays}
      weekStartsOn={1}
      changeMonthLabel="Change month"
      previousMonthLabel="Go to previous month"
      nextMonthLabel="Go to next month"
      title="Departure date"
      formatDate={formatDate}
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      selectionConfiguration={{
        type: CALENDAR_SELECTION_TYPE.single,
        date: new Date(),
      }}
    />
  </div>
);

const RangeExample = () => (
  <div id="application-element">
    <CalendarContainer
      // @ts-expect-error TS(2322) FIXME: Type '{ id: string; closeButtonText: string; daysO... Remove this comment to see the full error message
      id="myDatepicker"
      closeButtonText="Close"
      daysOfWeek={weekDays}
      weekStartsOn={1}
      changeMonthLabel="Change month"
      previousMonthLabel="Go to previous month"
      nextMonthLabel="Go to next month"
      title="Departure date"
      formatDate={formatDate}
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      selectionConfiguration={{
        type: 'range',
        startDate: new Date(2022, 9, 6),
        endDate: new Date(2022, 9, 15),
      }}
    />
  </div>
);

const OpenOnFirstRenderExample = () => (
  <div id="application-element">
    <CalendarContainer
      // @ts-expect-error TS(2322) FIXME: Type '{ id: string; closeButtonText: string; daysO... Remove this comment to see the full error message
      id="myDatepicker"
      closeButtonText="Close"
      daysOfWeek={weekDays}
      weekStartsOn={1}
      changeMonthLabel="Change month"
      previousMonthLabel="Go to previous month"
      nextMonthLabel="Go to next month"
      title="Departure date"
      formatDate={formatDate}
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      selectionConfiguration={{
        type: CALENDAR_SELECTION_TYPE.single,
        date: new Date(),
      }}
      isOpen
    />
  </div>
);

const MinDateInPastExample = () => (
  <div id="application-element">
    <CalendarContainer
      // @ts-expect-error TS(2322) FIXME: Type '{ id: string; closeButtonText: string; daysO... Remove this comment to see the full error message
      id="myDatepicker"
      closeButtonText="Close"
      daysOfWeek={weekDays}
      weekStartsOn={1}
      changeMonthLabel="Change month"
      previousMonthLabel="Go to previous month"
      nextMonthLabel="Go to next month"
      title="Departure date"
      formatDate={formatDate}
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      minDate={new Date(2011, 1, 2)}
      initiallyFocusedDate={new Date()}
    />
  </div>
);

const WithoutDateSetExample = () => (
  <div id="application-element">
    <CalendarContainer
      // @ts-expect-error TS(2322) FIXME: Type '{ id: string; closeButtonText: string; daysO... Remove this comment to see the full error message
      id="myDatepicker"
      closeButtonText="Close"
      daysOfWeek={weekDays}
      weekStartsOn={1}
      changeMonthLabel="Change month"
      previousMonthLabel="Go to previous month"
      nextMonthLabel="Go to next month"
      title="Departure date"
      formatDate={formatDate}
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
    />
  </div>
);

const PassingPropsExample = () => (
  <div id="application-element">
    <CalendarContainer
      // @ts-expect-error TS(2322) FIXME: Type '{ id: string; closeButtonText: string; daysO... Remove this comment to see the full error message
      id="myDatepicker"
      closeButtonText="Close"
      daysOfWeek={weekDays}
      weekStartsOn={1}
      changeMonthLabel="Change month"
      previousMonthLabel="Go to previous month"
      nextMonthLabel="Go to next month"
      title="Departure date"
      formatDate={formatDate}
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      inputProps={inputPropsWithEventHandlers}
    />
  </div>
);

const DepartReturnExample = () => <ReturnDatepicker />;

const CustomComponentExample = () => {
  const CalendarWithColoredDates = withCalendarState(
    composeCalendar(
      BpkCalendarNav,
      BpkCalendarGridHeader,
      BpkCalendarGrid,
      ColoredCalendarDate,
    ),
  );

  return (
    <div id="application-element">
      <CalendarContainer
        // @ts-expect-error TS(2322) FIXME: Type '{ id: string; closeButtonText: string; daysO... Remove this comment to see the full error message
        id="myDatepicker"
        closeButtonText="Close"
        daysOfWeek={weekDays}
        weekStartsOn={1}
        changeMonthLabel="Change month"
        previousMonthLabel="Go to previous month"
        nextMonthLabel="Go to next month"
        title="Departure date"
        formatDate={formatDate}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        calendarComponent={CalendarWithColoredDates}
      />
    </div>
  );
};

const InvalidExample = () => (
  <div id="application-element">
    <CalendarContainer
      // @ts-expect-error TS(2322) FIXME: Type '{ id: string; closeButtonText: string; daysO... Remove this comment to see the full error message
      id="myDatepicker"
      closeButtonText="Close"
      daysOfWeek={weekDays}
      weekStartsOn={1}
      changeMonthLabel="Change month"
      previousMonthLabel="Go to previous month"
      nextMonthLabel="Go to next month"
      title="Departure date"
      formatDate={formatDate}
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      selectionConfiguration={{
        type: CALENDAR_SELECTION_TYPE.single,
        date: new Date(),
      }}
      valid={false}
    />
  </div>
);

const MultipleRangeInputExample = () => <MultipleInputDatepicker />;

const DefaultVisualExample = () => (
  <div id="application-element">
    <CalendarContainer
      // @ts-expect-error TS(2322) FIXME: Type '{ id: string; closeButtonText: string; daysO... Remove this comment to see the full error message
      id="myDatepicker"
      closeButtonText="Close"
      daysOfWeek={weekDays}
      weekStartsOn={1}
      changeMonthLabel="Change month"
      previousMonthLabel="Go to previous month"
      nextMonthLabel="Go to next month"
      title="Departure date"
      formatDate={formatDate}
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      selectionConfiguration={{
        type: CALENDAR_SELECTION_TYPE.single,
        date: new Date(2020, 3, 19),
      }}
      minDate={new Date(2020, 3, 1)}
      initiallyFocusedDate={new Date(2020, 3, 19)}
      isOpen
    />
  </div>
);

const VisualRangeExample = () => (
    <div id="application-element">
      <CalendarContainer
        // @ts-expect-error TS(2322) FIXME: Type '{ id: string; closeButtonText: string; daysO... Remove this comment to see the full error message
        id="myDatepicker"
        closeButtonText="Close"
        daysOfWeek={weekDays}
        weekStartsOn={1}
        changeMonthLabel="Change month"
        previousMonthLabel="Go to previous month"
        nextMonthLabel="Go to next month"
        title="Departure date"
        formatDate={formatDate}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        selectionConfiguration={{
          type: 'range',
          startDate: new Date(2020, 3, 8),
          endDate: new Date(2020, 3, 15),
        }}
        minDate={new Date(2020, 3, 1)}
        isOpen
      />
    </div>
);

export {
  DefaultExample,
  RangeExample,
  OpenOnFirstRenderExample,
  MinDateInPastExample,
  WithoutDateSetExample,
  PassingPropsExample,
  DepartReturnExample,
  CustomComponentExample,
  InvalidExample,
  MultipleRangeInputExample,
  DefaultVisualExample,
  VisualRangeExample,
};
