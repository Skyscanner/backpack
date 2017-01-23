# bpk-component-datepicker

> Backpack datepicker component.

## Installation

```sh
npm install bpk-component-datepicker --save
```

## Usage

```js
import React from 'react';
import BpkDatepicker from 'bpk-component-datepicker';
import format from 'date-fns/format';

const formatDate = date => format(date, 'DD/MM/YYYY');
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

export default MyComponent = () => (
  <BpkDatepicker
    id="myDatepicker"
    formatDate={formatDate}
    formatDateFull={formatDateFull}
    formatMonth={formatMonth}
    daysOfWeek={weekDays}
    changeMonthLabel="Change month"
    popoverLabel="Select date"
  />
);
```

### Props

For more information on some these props, check the BpkCalendar documentation.

| Property              | PropType             | Required | Default Value        |
| --------------------- | -------------------- | -------- | -------------------- |
| id                    | string               | true     | -                    |
| changeMonthLabel      | string               | true     | -                    |
| daysOfWeek            | object               | true     | -                    |
| formatDate            | func                 | true     | -                    |
| formatDateFull        | func                 | true     | -                    |
| formatMonth           | func                 | true     | -                    |
| popoverLabel          | func                 | true     | -                    |
| inputProps            | object               | false    | {}                   |
| onDateSelect          | func                 | false    | null                 |
| weekStartsOn          | number               | false    | 1                (*) |
| maxDate               | Date                 | false    | new Date() + 1yr (*) |
| minDate               | Date                 | false    | new Date()       (*) |
| DateComponent         | func                 | false    | BpkCalendarDate  (*) |

> (*) Default value is defined on child component
