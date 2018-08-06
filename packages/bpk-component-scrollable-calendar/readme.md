# bpk-component-scrollable-calendar

> Backpack scrollable calendar component.

## Installation

```sh
npm install bpk-component-scrollable-calendar --save-dev
```

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
