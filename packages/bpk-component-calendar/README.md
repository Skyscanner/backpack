# bpk-component-calendar

> Backpack calendar component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import { Component } from 'react';
import BpkCalendar, {
  CALENDAR_SELECTION_TYPE,
} from '@skyscanner/backpack-web/bpk-component-calendar';
import BpkInput, {
  INPUT_TYPES,
} from '@skyscanner/backpack-web/bpk-component-input';
import format from 'date-fns/format';

const formatDateFull = (date) => format(date, 'EEEE, do MMMM yyyy');
const formatMonth = (date) => format(date, 'MMMM yyyy');
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
      },
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
      <div>
        <BpkInput
          id="dateInput"
          type={INPUT_TYPES.text}
          name="date"
          value={(this.state.selectionConfiguration.date || '').toString()}
          placeholder="Departure date"
        />
        <BpkCalendar
          id="calendar"
          onDateSelect={this.handleDateSelect}
          formatMonth={formatMonth}
          formatDateFull={formatDateFull}
          daysOfWeek={daysOfWeek}
          weekStartsOn={1}
          changeMonthLabel="Change month"
          nextMonthLabel="Next month"
          previousMonthLabel="Previous month"
          selectionConfiguration={this.state.selectionConfiguration}
        />
      </div>
    );
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
withCalendarState(
  composeCalendar(
    BpkCalendarNav,
    BpkCalendarGridHeader,
    TransitioningBpkCalendarGrid,
    BpkCalendarDate,
  ),
);
```

### Building a custom calendar

A custom calendar can be created by swapping out any default component for an alternative:

```js
composeCalendar(MyNavigation, MyHeader, MyGrid, MyDate);
```

The navigation and header components are optional. If they are not needed, the arguments to `composeCalendar` should be set to `null`:

```js
composeCalendar(null, null, MyGrid, MyDate);
```

In many cases, you might want to keep most of the components and replace only one or two:

```js
composeCalendar(BpkCalendarNav, BpkCalendarGridHeader, BpkCalendarGrid, MyDate);
```

Finally, focus management and support for keyboard input can be added using `withCalendarState`:

```js
withCalendarState(
  composeCalendar(
    BpkCalendarNav,
    BpkCalendarGridHeader,
    BpkCalendarGrid,
    MyDate,
  ),
);
```

> When implementing a replacement for any of the default calendar components, make sure it
> implements the same API and provides all the relevant accessibility
> properties, such as ARIA attributes and `tabIndex`.

### BpkCalendarGridHeader

The BpkCalendarGridHeader component displays the header of `BpkCalendarGrid`, listing
the days of the week. This is needed as a separate component, as the header should stay
in place while the rest of the grid transitions when changing months.


### BpkCalendarDate

The BpkCalendarDate component is used to render the content of a cell
(a single day) inside the calendar grid.