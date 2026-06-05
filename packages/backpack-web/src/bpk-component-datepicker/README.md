# bpk-component-datepicker

> Backpack datepicker component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import { Component } from 'react';
import BpkDatepicker, { CALENDAR_SELECTION_TYPE } from '@skyscanner/backpack-web/bpk-component-datepicker';
import format from 'date-fns/format';

const formatDate = date => format(date, 'dd/MM/yyyy');
const formatDateFull = date => format(date, 'do MMMM yyyy');
const formatMonth = date => format(date, 'MMMM yyyy');
const daysOfWeek = [
  {
    name: 'Sunday',
    nameAbbr: 'Sun',
    index: 0,
    isWeekend: true,
  },
  // ...
];

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      selectionConfiguration: {
        type: CALENDAR_SELECTION_TYPE.single,
        date: null,
      }
    }
  }

  handleDateSelect = (date) => {
    this.setState({
      selectionConfiguration: {
        type: this.props.selectionConfiguration.type,
        date: date,
      },
    });
  }

  render() {
    return (
      <BpkDatepicker
        id="datepicker"
        daysOfWeek={daysOfWeek}
        weekStartsOn={1}
        changeMonthLabel="Change month"
        closeButtonText="Close"
        title="Departure date"
        getApplicationElement={() => document.getElementById('pagewrap')}
        formatDate={formatDate}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        onDateSelect={this.handleDateSelect}
        selectionConfiguration={this.state.selectionConfiguration}
      />
    );
  }
}
```

By default `BpkCalendar` is used but the calendar component is fully configurable through the `calendarComponent` prop.

```js
import { Component } from 'react';
import BpkDatepicker from '@skyscanner/backpack-web/bpk-component-datepicker';
import {
  BpkCalendarNav,
  BpkCalendarGridHeader,
  BpkCalendarGridWithTransition,
  BpkCalendarDate,
  withCalendarState,
  composeCalendar,
} from '@skyscanner/backpack-web/bpk-component-calendar';
import { colorSagano } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

const ColoredCalendarDate = props =>
  <BpkCalendarDate {...props} style={{ backgroundColor: colorSagano }} />;

const CalendarWithColoredDates = withCalendarState(
  composeCalendar(
    BpkCalendarNav,
    BpkCalendarGridHeader,
    BpkCalendarGridWithTransition,
    ColoredCalendarDate,
  ),
);

const CustomPicker = () => (
  <BpkDatepicker
    id="datepicker"
    calendarComponent={CalendarWithColoredDates}
    daysOfWeek={daysOfWeek}
    weekStartsOn={1}
    changeMonthLabel="Change month"
    closeButtonText="Close"
    title="Departure date"
    getApplicationElement={() => document.getElementById('pagewrap')}
    formatDate={formatDate}
    formatMonth={formatMonth}
    formatDateFull={formatDateFull}
    onDateSelect={this.handleDateSelect}
    selectionConfiguration={this.state.selectionConfiguration}
  />
);
```

> **Theming:** In order to theme the modal, a `renderTarget` needs to be supplied as a function which returns a DOM node
> in the scope of a `BpkThemeProvider`.

## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/datepicker/web-QqbdTkly#section-props-91).
