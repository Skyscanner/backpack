# bpk-component-calendar

> Backpack calendar component.

## Installation

```sh
npm install bpk-component-calendar --save
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
      <div>
        <BpkInput
          id='dateInput'
          type={INPUT_TYPES.TEXT}
          name='date'
          value={this.state.selectedDate.toString()}
          placeholder='Departure date'
        />
        <BpkCalendar
          id='calendar'
          onDateSelect={this.handleDateSelect}
          formatMonth={formatMonth}
          formatDateFull={formatDateFull}
          daysOfWeek={daysOfWeek}
          changeMonthLabel="Change month"
          date={this.state.selectedDate}
        />
      </div>
    )
  }
}
```

### Props

| Property              | PropType             | Required | Default Value    |
| --------------------- | -------------------- | -------- | ---------------- |
| changeMonthLabel      | string               | true     | -                |
| date                  | Date                 | true     | -                |
| daysOfWeek            | object               | true     | -                |
| formatDateFull        | func                 | true     | -                |
| formatMonth           | func                 | true     | -                |
| id                    | string               | true     | -                |
| className             | string               | false    | -                |
| DateComponent         | func                 | false    | BpkCalendarDate  |
| dateModifiers         | object               | false    | {}               |
| markOutsideDays       | bool                 | false    | true             |
| markToday             | bool                 | false    | true             |
| maxDate               | Date                 | false    | new Date() + 1yr |
| minDate               | Date                 | false    | new Date()       |
| onDateSelect          | func                 | false    | null             |
| showWeekendSeparator  | bool                 | false    | true             |
| weekStartsOn          | number               | false    | 1                |

Some of the more complex props are explained below.

#### DateComponent

The component used to render the content of a cell in the calendar grid. The following are passed as props:

| Property              | PropType             | Required | Default Value    |
| --------------------- | -------------------- | -------- | ---------------- |
| date                  | Date                 | true     | -                |
| modifiers             | object               | false    | {}               |
| onClick               | func                 | false    | null             |
| onDateKeyDown         | func                 | false    | null             |
| focused               | bool                 | false    | false            |

If you want to create your own DateComponent, make sure to adhere to the following rules:

- If you want the calendar to manage a "selected" state, make sure to apply the `onClick` handler.
- If the user can interact with the cell, e.g. focus or select it, make sure it contains a semantically correct element, such as a button
- If you want to keep the feature of keyboard navigation, make sure to apply the `onDateClick` handler and take a peek at `BpkCalendarDate.js` to see how keyboard focus should be dealt with with respect to `tabIndex` etc.
- Don't forget to apply the relevant ARIA attributes for screenreader support

#### dateModifiers

An object of functions to be called on a date. If a function returns true, the `BpkCalendarDate` component attaches classes to the respective DOM node for purposes of styling.

Example:

```js
const dateModifiers = {
  'pubtime': date => isWeekend(date),
  'tims-birthday': date => date.getDay() === 20 && date.getMonth() === 11,
};
```

The classes attached to the node have the format of `bpk-calendar-date-modifier--${modifier}`, i.e. `bpk-calendar-date-modifier--pubtime`.

#### daysOfWeek

An array of objects describing the days of the week. This can be fed directly through CLDR data from the culture service (see the [Culture Service test harness](http://cs.uk1.prod.skyscanner.local/testharness/cldr.html)).

The prop takes the value of the CLDR response data's key `supplemental.weekDate.daysOfWeek`:

```json
[
  {
    "name": "Monday",
    "nameAbbr": "Mon",
    "nameShort": "Mo",
    "index": 1,
    "cldrKey": "mon",
    "isWeekend": false
  },
  {
    "name": "Tuesday",
    "nameAbbr": "Tue",
    "nameShort": "Tu",
    "index": 2,
    "cldrKey": "tue",
    "isWeekend": false
  },
  ...
  {
    "name": "Sunday",
    "nameAbbr": "Sun",
    "nameShort": "Su",
    "index": 0,
    "cldrKey": "sun",
    "isWeekend": true
  }
]
```

Of each object, only the following keys are required: `index`, `name`, `nameAbbr`, `isWeekend`. It does not matter if you use `daysOfWeek` or `daysOfWeekUnordered`, as the calendar sorts them based on their index property and the value of the `weekStartsOn` prop.

#### formatDateFull

A function to format a full, human-readable date, for example: "Friday, 13th January 2017". Skyscanner apps in production should use the `full` format provided by the [Scaffolding JavaScript API](http://readthedocs.prod.aws.skyscnr.com/docs/web-platform-web-platform-docs/en/latest/scaffolding-javascript-api/pages/Skyscanner.Api.html#skyscanner-api-localisation):

```js
var formatDateFull = Skyscanner.Api.localisation.formatDate(new Date(), 'full');
// eg. Tuesday, 13 October 2015
```

If you just need to quickly prototype, use the following from [date-fns](https://date-fns.org/docs/format#usage):

```js
import format from 'date-fns/format';

const formatDateFull = date => format(date, 'dddd, Do MMMM YYYY');
```

#### formatMonth

A function to format a human-readable month, for example: "January 2017". Skyscanner apps in production should use the `yearMonth` format provided by the [Scaffolding JavaScript API](http://readthedocs.prod.aws.skyscnr.com/docs/web-platform-web-platform-docs/en/latest/scaffolding-javascript-api/pages/Skyscanner.Api.html#skyscanner-api-localisation):

```js
var formatMonth = Skyscanner.Api.localisation.formatDate(new Date(), 'yearMonth');
// eg. October 2015
```

If you just need to quickly prototype, use the following from [date-fns](https://date-fns.org/docs/format#usage):

```js
import format from 'date-fns/format';

const formatMonth = date => format(date, 'MMMM YYYY');
```

#### weekStartsOn

First day of the week. 0 = Sunday, 1 = Monday, ..., 6 = Saturday.

### Translation

If building a Skyscanner product, the following translation strings are recommended.

| Property              | Translation key               | English          |
| --------------------- | ----------------------------- | ---------------- |
| changeMonthLabel      | bpk_calendar_changeMonthLabel | Change month     |
