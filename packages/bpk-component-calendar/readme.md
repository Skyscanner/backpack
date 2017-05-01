# bpk-component-calendar

> Backpack calendar component.

## Installation

```sh
npm install bpk-component-calendar --save-dev
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
| daysOfWeek            | object               | true     | -                |
| formatDateFull        | func                 | true     | -                |
| formatMonth           | func                 | true     | -                |
| id                    | string               | true     | -                |
| className             | string               | false    | -                |

| dateModifiers         | object               | false    | {}               |
| markOutsideDays       | bool                 | false    | true             |
| markToday             | bool                 | false    | true             |

| maxDate               | Date                 | false    | new Date() + 1yr |
| minDate               | Date                 | false    | new Date()       |
| onDateSelect          | func                 | false    | null             |
| onMonthChange         | func                 | false    | null             |

| showWeekendSeparator  | bool                 | false    | true             |
| weekStartsOn          | number               | false    | 1                |
| selectedDate          | Date                 | false    | null             |

Some of the more complex props and props for sub-components are detailed below.

#### BpkCalendarNav

| Property              | PropType             | Required | Default Value    |
| --------------------- | -------------------- | -------- | ---------------- |
| changeMonthLabel      | string               | true     | -                |
| formatMonth           | func                 | true     | -                |
| id                    | string               | true     | -                |
| maxDate               | Date                 | true     | -                |
| minDate               | Date                 | true     | -                |
| month                 | Date                 | true     | -                |
| onMonthChange         | func                 | false    | null             |

#### BpkCalendarGridHeader

| Property              | PropType             | Required | Default Value    |
| --------------------- | -------------------- | -------- | ---------------- |
| showWeekendSeparator  | bool                 | true     | -                |
| daysOfWeek            | object               | true     | -                |
| weekStartsOn          | number               | true     | -                |
| showWeekendSeparator  | bool                 | false    | false            |

#### BpkCalendarGrid

| Property              | PropType             | Required | Default Value    |
| --------------------- | -------------------- | -------- | ---------------- |
| DateComponent         | func                 | true     | -                |
| daysOfWeek            | object               | true     | -                |
| formatDateFull        | func                 | true     | -                |
| formatMonth           | func                 | true     | -                |
| month                 | Date                 | true     | -                |
| dateModifiers         | object               | false    | {}               |
| focusedDate           | Date                 | false    | null             |
| isKeyboardFocusable   | bool                 | false    | true             |
| markOutsideDays       | bool                 | false    | true             |
| markToday             | bool                 | false    | true             |
| maxDate               | Date                 | false    | new Date() + 1yr |
| minDate               | Date                 | false    | new Date()       |
| onDateClick           | func                 | false    | null             |
| onDateKeyDown         | func                 | false    | null             |
| preventKeyboardFocus  | bool                 | false    | false            |
| selectedDate          | Date                 | false    | null             |
| showWeekendSeparator  | bool                 | false    | true             |
| weekStartsOn          | number               | false    | 1                |

#### BpkCalendarDate

The component used to render the content of a cell in the calendar grid. The following are passed as props:

| Property              | PropType             | Required | Default Value    |
| --------------------- | -------------------- | -------- | ---------------- |
| date                  | Date                 | true     | -                |
| isBlocked             | bool                 | false    | false            |
| isFocused             | bool                 | false    | false            |
| isKeyboardFocusable   | bool                 | false    | true             |
| isOutside             | bool                 | false    | false            |
| isSelected            | bool                 | false    | false            |
| isToday               | bool                 | false    | false            |
| modifiers             | object               | false    | {}               |
| onClick               | func                 | false    | null             |
| onDateKeyDown         | func                 | false    | null             |
| preventKeyboardFocus  | bool                 | false    | true             |

If you want to create your own DateComponent, make sure to adhere to the following rules:

- If you want the calendar to manage a "selected" state, make sure to apply the `onClick` handler.
- If the user can interact with the cell, e.g. focus or select it, make sure it contains a semantically correct element, such as a button
- If you want to keep the feature of keyboard navigation, make sure to apply the `onDateClick` handler and take a peek at `BpkCalendarDate.js` to see how keyboard focus should be dealt with with respect to `tabIndex` etc.
- Don't forget to apply the relevant ARIA attributes for screenreader support

#### Prop details

##### dateModifiers

An object of functions to be called on a date. If a function returns true, the `BpkCalendarDate` component attaches classes to the respective DOM node for purposes of styling.

Example:

```js
const dateModifiers = {
  'pubtime': date => isWeekend(date),
  'tims-birthday': date => date.getDay() === 20 && date.getMonth() === 11,
};
```

The classes attached to the node have the format of `bpk-calendar-date-modifier--${modifier}`, i.e. `bpk-calendar-date-modifier--pubtime`.

##### daysOfWeek

An array of objects describing the days of the week:

```json
[
  {
    "name": "Sunday",
    "nameAbbr": "Sun",
    "index": 0,
    "isWeekend": true
  },
  {
    "name": "Monday",
    "nameAbbr": "Mon",
    "index": 1,
    "isWeekend": false
  },
  {
    "name": "Tuesday",
    "nameAbbr": "Tue",
    "index": 2,
    "isWeekend": false
  },
  ...
]
```

##### formatDateFull

A function to format a full, human-readable date, for example: "Friday, 13th January 2017":

```js
import format from 'date-fns/format';

const formatDateFull = date => format(date, 'dddd, Do MMMM YYYY');
```

##### formatMonth

A function to format a human-readable month, for example: "January 2017":

If you just need to quickly prototype, use the following from [date-fns](https://date-fns.org/docs/format#usage):

```js
import format from 'date-fns/format';

const formatMonth = date => format(date, 'MMMM YYYY');
```

##### weekStartsOn

First day of the week. 0 = Sunday, 1 = Monday, ..., 6 = Saturday.
