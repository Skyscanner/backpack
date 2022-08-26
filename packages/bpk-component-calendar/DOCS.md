Default export is `BpkCalendarContainer` - This provides an out of the box calendar.

HOCs -

  - `withCalendarState` default export creates calendar using all our exports to construct component - which keeps track of the calendar state. In theory a custom state manager could be used for the calendar but would require a lot more effort to create and maintain from a consumer perspective.

  - `composeCalendar` - takes 4 input components that can be customised outside of the default exports for custom calendar implementations. Which will then construct a calendar based on the inputs provided or exclude them if they are not passed.
    - `BpkCalendarNav`, `BpkCalenderGridHeader` - are optional components for rendering the calendar
    - `BpkCalendarGrid`, `BpkCalendarDate` - are required for creating the calendar component but can be customised to design requirements.

  - `addCalendarGridTransition` - transitions the weeks grid when changing months, this works by hiding the current month and moving the next or previous month into view.

Calendar components -

  - `BpkCalendarNav` - component used to change the month that is being displayed by using buttons and a select box at the top of the component.

  - `BpkCalendarGrid` - is a table that creates the main calender and provides hidden headings for screen readers - consists of:

    - `BpkCalendarGridHeader` - Is used to display a list of weekday (Sun - Sat) as the headings of the table that is independent from the dates so that it is fixed whilst transitioning through each month view in the calendar.

    - `Week` - This is a container that will take the `DateComponent` to display each of the dates in the calendar

  - `BpkCalendarDate` - is each date cell that would be displayed inside the calendar grid. This would be used to customise how each date cell is displayed e.g. coloured or with special pricing displayed.