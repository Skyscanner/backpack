# bpk-component-scrollable-calendar

> Backpack scrollable calendar component.

## Installation

```sh
npm install bpk-component-scrollable-calendar --save-dev
```

### BpkScrollableCalendarGrid

The BpkScrollableCalendarGrid component displays a month as a table.
Above this table it displays the month's name in a `BpkText`. When
used with `BpkScrollableCalendarDate`, it only displays days from
that specific month. It is built on top of BpkCalendarGrid and
uses the same props.

[Please refer to the props of BpkCalendarGrid here](https://backpack.github.io/components/calendar?platform=web#props).

### BpkScrollableCalendarDate

The BpkScrollableCalendarDate component is used to render the content of a cell
(a single day) inside the calendar grid. It is built on top of BpkCalendarDate
and uses the same props. The only difference is that when isOutside is true,
null is returned in order to only display of specific month in the calendar grid.

[Please refer to the props of BpkCalendarDate here](https://backpack.github.io/components/calendar?platform=web#props).
