# bpk-component-datepicker

> Backpack datepicker component.

## Installation

```sh
npm install bpk-component-datepicker --save
```

## Usage

```js
import React, { Component } from 'react';
import BpkCalendar from 'bpk-component-calendar';
import BpkInput, { INPUT_TYPES } from 'bpk-component-input';
import format from 'date-fns/format';

const formatDateFull = date => format(date, 'dddd, Do MMMM YYYY');
const formatMonth = date => format(date, 'MMMM YYYY');
const daysOfWeek = [
  {
    "name": "Monday",
    "nameAbbr": "Mon",
    "index": 1,
    "isWeekend": false
  },
  // ...
];

class App extends Component {
  constructor () {
    super();

    this.onDateSelect = this.onDateSelect.bind(this);

    this.state = {
      selectedDate: null
    }
  }

  handleDateSelect(date) {
    this.setState({
      selectedDate: date
    });
  }

  render () {
    return (
      <BpkDatepicker
          id='datepicker'
          daysOfWeek={daysOfWeek}
          changeMonthLabel="Change month"
          closeButtonText="Close"
          popoverLabel="Departure date"
          formatDate={formatDate}
          formatMonth={formatMonth}
          formatDateFull={formatDateFull}
          onDateSelect={this.handleDateSelect}
          date={this.state.selectedDate}
        />
    )
  }
}
```

### Props

For more information on some these props, check the BpkCalendar documentation.

| Property              | PropType             | Required | Default Value        |
| --------------------- | -------------------- | -------- | -------------------- |
| changeMonthLabel      | string               | true     | -                    |
| closeButtonText       | string               | true     | -                    |
| daysOfWeek            | object               | true     | -                    |
| formatDate            | func                 | true     | -                    |
| formatDateFull        | func                 | true     | -                    |
| formatMonth           | func                 | true     | -                    |
| id                    | string               | true     | -                    |
| popoverLabel          | func                 | true     | -                    |
| DateComponent         | func                 | false    | BpkCalendarDate  (*) |
| date                  | Date                 | false    | null             (*) |
| dateModifiers         | object               | false    | {}               (*) |
| inputProps            | object               | false    | {}                   |
| markOutsideDays       | bool                 | false    | true             (*) |
| markToday             | bool                 | false    | true             (*) |
| maxDate               | Date                 | false    | new Date() + 1yr (*) |
| minDate               | Date                 | false    | new Date()       (*) |
| onDateSelect          | func                 | false    | null                 |
| showWeekendSeparator  | bool                 | false    | true             (*) |
| weekStartsOn          | number               | false    | 1                (*) |

> (*) Default value is defined on child component
