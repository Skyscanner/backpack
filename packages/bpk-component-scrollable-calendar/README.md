# bpk-component-scrollable-calendar

> Backpack scrollable calendar component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import React, { Component } from 'react';
import { DateUtils } from '@skyscanner/backpack-web/bpk-component-calendar';
import BpkScrollableCalendar, { CALENDAR_SELECTION_TYPE } from '@skyscanner/backpack-web/bpk-component-scrollable-calendar';
import format from 'date-fns/format';

const formatDateFull = date => format(date, 'EEEE, do MMMM yyyy');
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
    };
  }

  handleDateSelect = (date) => {
    this.setState({
      selectionConfiguration: {
        type: this.props.selectionConfiguration.type,
        date: date,
      },
    });
  };

  render() {
    return (
      <BpkScrollableCalendar
        id="calendar"
        onDateSelect={this.handleDateSelect}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        daysOfWeek={daysOfWeek}
        weekStartsOn={1}
        selectionConfiguration={this.state.selectionConfiguration}
        // Subtract one day from today's date to make today selectable by default
        minDate={DateUtils.addDays(new Date(), -1)}
        maxDate={DateUtils.addMonths(new Date(), 12)}
      />
    );
  }
}
```

### BpkScrollableCalendarGridList

This component is the main scrollable grid of months for the scrollable calendar.
It is composed of `BpkScrollableCalendarGrid` elements. It uses all the same props
as `BpkCalendarGrid`, but in addition `minDate` and `maxDate` are required to build
the actual list.

[Please refer to the props of BpkCalendarGrid here](https://backpack.github.io/components/calendar/?platform=web#bpkcalendargrid).

| Property | PropType | Required | Default Value |
| -------- | -------- | -------- | ------------- |
| maxDate  | Date     | true     | -             |
| minDate  | Date     | true     | -             |

### BpkScrollableCalendarGrid

The BpkScrollableCalendarGrid component displays a month as a table.
Above this table it displays the month's name in a `BpkText`. When
used with `BpkScrollableCalendarDate`, it only displays days from
that specific month. It is built on top of BpkCalendarGrid and
uses the same props.

[Please refer to the props of BpkCalendarGrid here](https://backpack.github.io/components/calendar/?platform=web#bpkcalendargrid).

### BpkScrollableCalendarDate

The BpkScrollableCalendarDate component is used to render the content of a cell
(a single day) inside the calendar grid. It is built on top of BpkCalendarDate
and uses the same props. The only difference is that when isOutside is true,
null is returned in order to only display of specific month in the calendar grid.

[Please refer to the props of BpkCalendarDate here](https://backpack.github.io/components/calendar?platform=web#bpkcalendardate).
