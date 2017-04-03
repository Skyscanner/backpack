# bpk-component-datepicker

> Backpack datepicker component.

## Installation

```sh
npm install bpk-component-datepicker --save
```

## Usage

```js
import React, { Component } from 'react';
import BpkDatepicker from 'bpk-component-datepicker';
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

    this.handleDateSelect = this.handleDateSelect.bind(this);

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
          title="Departure date"
          getApplicationElement={() => document.getElementById('react-mount')}
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

> **Note:** Because this component uses a modal on mobile viewports, you need to let it know what
  the root element of your application is by returning it's DOM node via the function passed to the
  `getApplicationElement` prop (see the example above) - this is to "hide" your application from
  screenreaders whilst the dateicker is open.

| Property              | PropType             | Required | Default Value        |
| --------------------- | -------------------- | -------- | -------------------- |
| changeMonthLabel      | string               | true     | -                    |
| closeButtonText       | string               | true     | -                    |
| title                 | string               | true     | -                    |
| id                    | string               | true     | -                    |
| getApplicationElement | func                 | true     | -                    |
| date                  | Date                 | true     | -                    |
| daysOfWeek            | object               | true     | -                    |
| formatDate            | func                 | true     | -                    |
| formatDateFull        | func                 | true     | -                    |
| formatMonth           | func                 | true     | -                    |
| DateComponent         | func                 | false    | BpkCalendarDate  (*) |
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
