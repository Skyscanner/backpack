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
    name: 'Sunday',
    nameAbbr: 'Sun',
    index: 0,
    isWeekend: true,
  },
  // ...
];

export default class App extends Component {
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
      <div>
        <BpkInput
          id='dateInput'
          type={INPUT_TYPES.TEXT}
          name='date'
          value={(this.state.selectedDate || '').toString()}
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

### Component structure

A calendar is composed of four basic components: a month navigation, a grid header, a grid, and the date components.

These components are all stateless and can be composed into a calendar using the `composeCalendar` higher-order component.

Another higher-order component, `withCalendarState`, can be used to provide focus management and keyboard navigation.

The default export of this package uses the following set of components:

| Calendar component | Default                      |
| ------------------ | ---------------------------- |
| Month navigation   | BpkCalendarNav               |
| Grid header        | BpkCalendarGridHeader        |
| Grid               | TransitioningBpkCalendarGrid |
| Date               | BpkCalendarDate              |

Composition and state are implemented using the aforementioned higher-order components:

```js
withCalendarState(composeCalendar(
  BpkCalendarNav,
  BpkCalendarGridHeader,
  TransitioningBpkCalendarGrid,
  BpkCalendarDate,
))
```

### Building a custom calendar

A custom calendar can be created by swapping out any default component for an alternative:

```js
composeCalendar(
  MyNavigation,
  MyHeader,
  MyGrid,
  MyDate,
)
```

The navigation and header components are optional. If they are not needed, the arguments to `composeCalendar` should be set to `null`:

```js
composeCalendar(
  null,
  null,
  MyGrid,
  MyDate,
)
```

In many cases, you might want to keep most of the components and replace only one or two:

```js
composeCalendar(
  BpkCalendarNav,
  BpkCalendarGridHeader,
  BpkCalendarGrid,
  MyDate,
)
```

Finally, focus management and support for keyboard input can be added using `withCalendarState`:

```js
withCalendarState(composeCalendar(
  BpkCalendarNav,
  BpkCalendarGridHeader,
  BpkCalendarGrid,
  MyDate,
))
```

> When implementing a replacement for any of the default calendar components, make sure it
> implements the same API (props see below) and provides all the relevant accessibility
> properties, such as ARIA attributes and `tabIndex`.

## Props

| Property              | PropType             | Required | Default Value    |
| --------------------- | -------------------- | -------- | ---------------- |
| changeMonthLabel      | string               | true     | -                |
| daysOfWeek            | object               | true     | -                |
| formatDateFull        | func                 | true     | -                |
| formatMonth           | func                 | true     | -                |
| id                    | string               | true     | -                |
| className             | string               | false    | null             |
| fixedWidth            | bool                 | false    | true             |
| markOutsideDays       | bool                 | false    | true             |
| markToday             | bool                 | false    | true             |
| maxDate               | Date                 | false    | new Date() + 1yr |
| minDate               | Date                 | false    | new Date()       |
| onDateSelect          | func                 | false    | null             |
| onMonthChange         | func                 | false    | null             |
| showWeekendSeparator  | bool                 | false    | true             |
| selectedDate          | Date                 | false    | null             |
| weekStartsOn          | number               | false    | 1                |
| initiallyFocusedDate  | Date                 | false    | null             |

Some of the more complex props and props for sub-components are detailed below.

### BpkCalendarNav

The BpkCalendarNav component is used to change the month that is being displayed by using
buttons and a select box.

| Property              | PropType             | Required | Default Value    |
| --------------------- | -------------------- | -------- | ---------------- |
| changeMonthLabel      | string               | true     | -                |
| formatMonth           | func                 | true     | -                |
| id                    | string               | true     | -                |
| maxDate               | Date                 | true     | -                |
| minDate               | Date                 | true     | -                |
| month                 | Date                 | true     | -                |
| onMonthChange         | func                 | false    | null             |
| disabled              | bool                 | false    | false            |

### BpkCalendarGridHeader

The BpkCalendarGridHeader component displays the header of `BpkCalendarGrid`, listing
the days of the week. This is needed as a separate component, as the header should stay
in place while the rest of the grid transitions when changing months.

| Property              | PropType             | Required | Default Value    |
| --------------------- | -------------------- | -------- | ---------------- |
| showWeekendSeparator  | bool                 | true     | -                |
| daysOfWeek            | object               | true     | -                |
| weekStartsOn          | number               | true     | -                |
| showWeekendSeparator  | bool                 | false    | false            |
| className             | string               | false    | null             |

### BpkCalendarGrid

The BpkCalendarGrid component displays a month as a table.

| Property              | PropType             | Required | Default Value    |
| --------------------- | -------------------- | -------- | ---------------- |
| DateComponent         | func                 | true     | -                |
| daysOfWeek            | object               | true     | -                |
| formatDateFull        | func                 | true     | -                |
| formatMonth           | func                 | true     | -                |
| month                 | Date                 | true     | -                |
| focusedDate           | Date                 | false    | null             |
| isKeyboardFocusable   | bool                 | false    | true             |
| markOutsideDays       | bool                 | false    | true             |
| markToday             | bool                 | false    | true             |
| maxDate               | Date                 | false    | new Date() + 1yr |
| minDate               | Date                 | false    | new Date()       |
| onDateClick           | func                 | false    | null             |
| onDateKeyDown         | func                 | false    | null             |
| onDateMouseDown       | func                 | false    | null             |
| preventKeyboardFocus  | bool                 | false    | false            |
| selectedDate          | Date                 | false    | null             |
| showWeekendSeparator  | bool                 | false    | true             |
| weekStartsOn          | number               | false    | 1                |

### BpkCalendarDate

The BpkCalendarDate component is used to render the content of a cell
(a single day) inside the calendar grid.

| Property              | PropType             | Required | Default Value    |
| --------------------- | -------------------- | -------- | ---------------- |
| date                  | Date                 | true     | -                |
| isBlocked             | bool                 | false    | false            |
| isFocused             | bool                 | false    | false            |
| isKeyboardFocusable   | bool                 | false    | true             |
| isOutside             | bool                 | false    | false            |
| isSelected            | bool                 | false    | false            |
| isToday               | bool                 | false    | false            |
| onClick               | func                 | false    | null             |
| onDateKeyDown         | func                 | false    | null             |
| onMouseDown           | func                 | false    | null             |
| preventKeyboardFocus  | bool                 | false    | true             |

### Prop details

#### daysOfWeek

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

#### fixedWidth

If set to true (default), it sets a fixed width on the calendar container. This is necessary to support
transitions and to create the right size for the Datepicker component.

If set to false, the calendar is of fluid width and will take up the space of its parent container.

#### formatDateFull

A function to format a full, human-readable date, for example: "Friday, 13th January 2017":

```js
import format from 'date-fns/format';

const formatDateFull = date => format(date, 'dddd, Do MMMM YYYY');
```

#### formatMonth

A function to format a human-readable month, for example: "January 2017":

If you just need to quickly prototype, use the following from [date-fns](https://date-fns.org/docs/format#usage):

```js
import format from 'date-fns/format';

const formatMonth = date => format(date, 'MMMM YYYY');
```

#### weekStartsOn

First day of the week. 0 = Sunday, 1 = Monday, ..., 6 = Saturday.

#### onMonthChange

```javascript
const onMonthChange = (event, {
  month: <Date>, // The first day of the selected month
  source: <string>, // One of `PREV`, `NEXT`, `SELECT`, `GRID`
}) => {
  ...
}
```

#### initiallyFocusedDate

Sets the date that is focused initially, this prop has no effect if `selectedDate` or the deprecated `date` prop are specified in which case the date specified in those props is focused. If no selected date is set and `initiallyFocusedDate` is not set the focused date is the `minDate`(defaults to today if it has not been explicitly set).


