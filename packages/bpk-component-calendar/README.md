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
  constructor () {
    super();


    this.state = {
      selectedDate: null
    }
  }

  handleDateSelect = (date) => {
    this.setState({
      selectedDate: date
    });
  }

  render () {
    return (
      <div>
        <BpkInput
          id='dateInput'
          type={INPUT_TYPES.text}
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
          weekStartsOn={1}
          changeMonthLabel="Change month"
          nextMonthLabel="Next month"
          previousMonthLabel="Previous month"
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

| Property              | PropType             | Required            | Default Value    |
| --------------------- | -------------------- | ------------------- | ---------------- |
| daysOfWeek            | object               | true                | -                |
| formatDateFull        | func                 | true                | -                |
| formatMonth           | func                 | true                | -                |
| id                    | string               | true                | -                |
| weekStartsOn          | number               | true                | -                |
| changeMonthLabel      | string               | if Nav !== null     | -                |
| nextMonthLabel        | string               | if Nav !== null     | -                |
| previousMonthLabel    | string               | if Nav !== null     | -                |
| className             | string               | false               | null             |
| fixedWidth            | bool                 | false               | true             |
| gridClassName         | string               | false               | null             |
| initiallyFocusedDate  | Date                 | false               | null             |
| markOutsideDays       | bool                 | false               | true             |
| markToday             | bool                 | false               | true             |
| maxDate               | Date                 | false               | new Date() + 1 year |
| minDate               | Date                 | false               | new Date()       |
| onDateSelect          | func                 | false               | null             |
| onMonthChange         | func                 | false               | null             |
| selectedDate          | Date                 | false               | null             |
| showWeekendSeparator  | bool                 | false               | true             |
| navProps              | object               | false               | null             |
| headerProps           | object               | false               | null             |
| gridProps             | object               | false               | null             |
| dateProps             | object               | false               | null             |
| weekDayKey            | string               | false               | nameAbbr         |

Some of the more complex props and props for sub-components are detailed below.

### BpkCalendarNav

The BpkCalendarNav component is used to change the month that is being displayed by using
buttons and a select box.

| Property              | PropType             | Required | Default Value    |
| --------------------- | -------------------- | -------- | ---------------- |
| changeMonthLabel      | string               | true     | -                |
| nextMonthLabel        | string               | true     | -                |
| previousMonthLabel    | string               | true     | -                |
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
| weekDayKey            | string               | false    | nameAbbr         |

### BpkCalendarGrid

The BpkCalendarGrid component displays a month as a table.

| Property              | PropType             | Required | Default Value    |
| --------------------- | -------------------- | -------- | ---------------- |
| DateComponent         | func                 | true     | -                |
| daysOfWeek            | array(object)        | true     | -                |
| formatDateFull        | func                 | true     | -                |
| formatMonth           | func                 | true     | -                |
| month                 | Date                 | true     | -                |
| weekStartsOn          | number               | true     | -                |
| focusedDate           | Date                 | false    | null             |
| isKeyboardFocusable   | bool                 | false    | true             |
| markOutsideDays       | bool                 | false    | true             |
| markToday             | bool                 | false    | true             |
| maxDate               | Date                 | false    | new Date() + 1 year |
| minDate               | Date                 | false    | new Date()       |
| onDateClick           | func                 | false    | null             |
| onDateKeyDown         | func                 | false    | null             |
| preventKeyboardFocus  | bool                 | false    | false            |
| selectedDate          | Date                 | false    | null             |
| showWeekendSeparator  | bool                 | false    | true             |

### BpkCalendarDate

The BpkCalendarDate component is used to render the content of a cell
(a single day) inside the calendar grid.

| Property              | PropType             | Required | Default Value    |
| --------------------- | -------------------- | -------- | ---------------- |
| date                  | Date                 | true     | -                |
| cellType              | oneOf(CELL_TYPES.default, CELL_TYPES.positive, CELL_TYPES.neutral, CELL_TYPES.negative)                     | false    | null             |
| isBlocked             | bool                 | false    | false            |
| isFocused             | bool                 | false    | false            |
| isKeyboardFocusable   | bool                 | false    | true             |
| isOutside             | bool                 | false    | false            |
| isSelected            | bool                 | false    | false            |
| isToday               | bool                 | false    | false            |
| onClick               | func                 | false    | null             |
| onDateKeyDown         | func                 | false    | null             |
| preventKeyboardFocus  | bool                 | false    | true             |
| style                 | object               | false    | null             |

#### `cellType` prop

This prop determines what the colour date cell is to be displayed.

- `CELL_TYPES.positive` - sets the calendar cell to `Monteverde`
- `CELL_TYPES.neutral` - sets the calendar cell to `Erfoud`
- `CELL_TYPES.negative` - sets the calendar cell to `Panjin`
- `CELL_TYPES.default` - sets the calendar cell to `Sky Gray Tint 02`

### Prop details

#### daysOfWeek

An array of objects describing the days of the week:

```json
[
  {
    "name": "Sunday",
    "nameAbbr": "Sun",
    "nameNarrow": "S",
    "index": 0,
    "isWeekend": true
  },
  {
    "name": "Monday",
    "nameAbbr": "Mon",
    "nameNarrow": "M",
    "index": 1,
    "isWeekend": false
  },
  {
    "name": "Tuesday",
    "nameAbbr": "Tue",
    "nameNarrow": "T",
    "index": 2,
    "isWeekend": false
  },
  ...
]
```

#### weekDayKey

Key to be used to pick the desired weekDay format from the `daysOfWeek` object, for example: `nameAbbr` or `nameNarrow`.

#### fixedWidth

If set to true (default), it sets a fixed width on the calendar container. This is necessary to support
transitions and to create the right size for the Datepicker component.

If set to false, the calendar is of fluid width and will take up the space of its parent container.

#### formatDateFull

A function to format a full, human-readable date, for example: "Monday, 8th January 2018":

```js
import format from 'date-fns/format';

const formatDateFull = date => format(date, 'EEEE, do MMMM yyyy');
```

#### formatMonth

A function to format a human-readable month, for example: "January 2018":

If you just need to quickly prototype, use the following from [`date-fns`](https://date-fns.org/docs/format#usage):

```js
import format from 'date-fns/format';

const formatMonth = date => format(date, 'MMMM yyyy');
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

#### navProps, headerProps, gridProps, dateProps

These are useful if your custom implementation of one of these components requires additional properties. They will be passed, unmodified, to the respective component.

## Theme Props

* `calendarDateTextColor`
* `calendarDateTextHoverColor`
* `calendarDateTextActiveColor`
* `calendarDateTextFocusColor`
* `calendarDateTextSelectedColor`
* `calendarDateSelectedBackgroundColor`
* `calendarDateFocusedBorderColor`
* `calendarNudgerIconColor`
* `calendarNudgerIconHoverColor`
* `calendarNudgerIconActiveColor`

