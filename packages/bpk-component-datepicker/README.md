# bpk-component-datepicker

> Backpack datepicker component.

## Installation

```sh
npm install bpk-component-datepicker --save-dev
```

## Usage

```js
import React, { Component } from 'react';
import BpkDatepicker from 'bpk-component-datepicker';
import format from 'date-fns/format';

const formatDate = date => format(date, 'DD/MM/YYYY');
const formatDateFull = date => format(date, 'do MMMM YYYY');
const formatMonth = date => format(date, 'MMMM YYYY');
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
      selectedDate: null,
    };
  }

  handleDateSelect = date => {
    this.setState({
      selectedDate: date,
    });
  };

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
        date={this.state.selectedDate}
      />
    );
  }
}
```

By default `BpkCalendar` is used but the calendar component is fully configurable through the `calendarComponent` prop.

```js
import React, { Component } from 'react';
import BpkDatepicker from 'bpk-component-datepicker';
import {
  BpkCalendarNav,
  BpkCalendarGridHeader,
  BpkCalendarGridWithTransition,
  BpkCalendarDate,
  withCalendarState,
  composeCalendar,
} from 'bpk-component-calendar';
import { colorSagano } from 'bpk-tokens/tokens/base.es6';

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
    date={this.state.selectedDate}
  />
);
```

> **Theming:** In order to theme the modal, a `renderTarget` needs to be supplied as a function which returns a DOM node
> in the scope of a `BpkThemeProvider`.

## Props

For more information on some these props, check the BpkCalendar documentation.

> **Note:** Because this component uses a modal on mobile viewports, you need to let it know what
> the root element of your application is by returning it's DOM node via the function passed to the
> `getApplicationElement` prop (see the example above) - this is to "hide" your application from
> screen readers whilst the datepicker is open. The `pagewrap` element id is a convention we use internally at Skyscanner. In most cases it should "just work".

| Property              | PropType              | Required | Default Value                       |
| --------------------- | --------------------- | -------- | ----------------------------------- |
| changeMonthLabel      | string                | true     | -                                   |
| closeButtonText       | string                | true     | -                                   |
| title                 | string                | true     | -                                   |
| id                    | string                | true     | -                                   |
| getApplicationElement | func                  | true     | -                                   |
| daysOfWeek            | arrayOf(object)       | true     | -                                   |
| weekStartsOn          | number                | true     | -                                   |
| formatDate            | func                  | true     | -                                   |
| formatDateFull        | func                  | true     | -                                   |
| formatMonth           | func                  | true     | -                                   |
| calendarComponent     | oneOfType(func, node) | false    | BpkCalendar                         |
| date                  | Date                  | false    | null                                |
| dateModifiers         | object                | false    | {} (\*)                             |
| inputProps            | object                | false    | {}                                  |
| markOutsideDays       | bool                  | false    | true (\*)                           |
| markToday             | bool                  | false    | true (\*)                           |
| maxDate               | Date                  | false    | new Date() + 1 year (\*)            |
| minDate               | Date                  | false    | new Date() (\*)                     |
| onDateSelect          | func                  | false    | null                                |
| showWeekendSeparator  | bool                  | false    | true (\*)                           |
| initiallyFocusedDate  | Date                  | false    | null                                |
| renderTarget          | func                  | false    | null                                |
| isOpen                | bool                  | false    | false                               |
| onOpenChange          | func                  | false    | null                                |
| valid                 | bool                  | false    | null                                |

> (\*) Default value is defined on child component

## Theme Props

- `calendarDateTextColor`
- `calendarDateTextHoverColor`
- `calendarDateTextActiveColor`
- `calendarDateTextFocusColor`
- `calendarDateTextSelectedColor`
- `calendarDateSelectedBackgroundColor`
- `calendarDateFocusedBorderColor`
- `calendarNudgerIconColor`
- `calendarNudgerIconHoverColor`
- `calendarNudgerIconActiveColor`
- `linkColor`
- `linkHoverColor`
- `linkActiveColor`
- `linkVisitedColor`
