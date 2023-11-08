# bpk-component-scrollable-calendar

> Backpack scrollable calendar component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import { Component } from 'react';
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

## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/scrollable-calendar/web-d4kJ1LSd#section-props-00).
