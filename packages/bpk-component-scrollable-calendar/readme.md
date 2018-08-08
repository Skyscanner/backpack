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

| Property             | PropType | Required | Default Value    |
| -------------------- | -------- | -------- | ---------------- |
| DateComponent        | func     | true     | -                |
| daysOfWeek           | object   | true     | -                |
| formatDateFull       | func     | true     | -                |
| formatMonth          | func     | true     | -                |
| month                | Date     | true     | -                |
| focusedDate          | Date     | false    | null             |
| isKeyboardFocusable  | bool     | false    | true             |
| markOutsideDays      | bool     | false    | true             |
| markToday            | bool     | false    | true             |
| maxDate              | Date     | false    | new Date() + 1yr |
| minDate              | Date     | false    | new Date()       |
| onDateClick          | func     | false    | null             |
| onDateKeyDown        | func     | false    | null             |
| preventKeyboardFocus | bool     | false    | false            |
| selectedDate         | Date     | false    | null             |
| showWeekendSeparator | bool     | false    | true             |
| weekStartsOn         | number   | false    | 1                |

### BpkScrollableCalendarDate

The BpkScrollableCalendarDate component is used to render the content of a cell
(a single day) inside the calendar grid. It is built on top of BpkCalendarDate
and uses the same props. The only difference is that when isOutside is true,
null is returned in order to only display of specific month in the calendar grid.

| Property             | PropType | Required | Default Value |
| -------------------- | -------- | -------- | ------------- |
| date                 | Date     | true     | -             |
| isBlocked            | bool     | false    | false         |
| isFocused            | bool     | false    | false         |
| isKeyboardFocusable  | bool     | false    | true          |
| isOutside            | bool     | false    | false         |
| isSelected           | bool     | false    | false         |
| isToday              | bool     | false    | false         |
| onClick              | func     | false    | null          |
| onDateKeyDown        | func     | false    | null          |
| preventKeyboardFocus | bool     | false    | true          |
