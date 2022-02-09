import {
  DefaultExample,
  CalendarNavExample,
  CalendarGridHeaderExample,
  CalendarGridExample,
  CalendarGridAndHeaderExample,
  MinDateInThePastExample,
  WeekStartsOnSundayExample,
  HonestWeekendExample,
  WeekdayKeyIsNameNarrow,
  ArabicExample,
  JapaneseExample,
  MinAndMaxDate,
  MarkTodayFalseExample,
  MarkOutsideDaysFalseExample,
  CustomComposedCalendar,
  CustomComposedCalendarSafariBug,
  CustomColors,
  WeekExample,
  FocusedDateInThePastExample,
  RangeDateCalendar,
} from './examples';

export default {
  title: 'bpk-component-calendar',
};

export const BpkCalendarNav = CalendarNavExample;

BpkCalendarNav.story = {
  name: 'BpkCalendarNav',
};

export const BpkCalendarGridHeader = CalendarGridHeaderExample;

BpkCalendarGridHeader.story = {
  name: 'BpkCalendarGridHeader',
};

export const BpkCalendarGrid = CalendarGridExample;

BpkCalendarGrid.story = {
  name: 'BpkCalendarGrid',
};

export const BpkCalendarGridHeaderBpkCalendarGrid =
  CalendarGridAndHeaderExample;

BpkCalendarGridHeaderBpkCalendarGrid.story = {
  name: 'BpkCalendarGridHeader + BpkCalendarGrid',
};

export const CalendarDefault = DefaultExample;

CalendarDefault.story = {
  name: 'Calendar - default',
};

export const CalendarMinDateInThePastFocusingToday = MinDateInThePastExample;

CalendarMinDateInThePastFocusingToday.story = {
  name: 'Calendar - min date in the past, focusing today',
};

export const CalendarWeekStartsOnASunday = WeekStartsOnSundayExample;

CalendarWeekStartsOnASunday.story = {
  name: 'Calendar - Week starts on a Sunday',
};

export const CalendarHonestWeekend = HonestWeekendExample;

CalendarHonestWeekend.story = {
  name: 'Calendar - Honest weekend',
};

export const CalendarWeekDayKeyIsNameNarrow = WeekdayKeyIsNameNarrow;

CalendarWeekDayKeyIsNameNarrow.story = {
  name: 'Calendar - weekDayKey is nameNarrow',
};

export const CalendarArAeLocale = ArabicExample;

CalendarArAeLocale.story = {
  name: 'Calendar - ar-AE locale',
};

export const CalendarJaJpLocale = JapaneseExample;

CalendarJaJpLocale.story = {
  name: 'Calendar - ja-JP locale',
};

export const CalendarSpecifyMinMaxDate = MinAndMaxDate;

CalendarSpecifyMinMaxDate.story = {
  name: 'Calendar - Specify min/max date',
};

export const CalendarDontMarkToday = MarkTodayFalseExample;

CalendarDontMarkToday.story = {
  name: "Calendar - Don't mark today",
};

export const CalendarDontMarkOutsideDays = MarkOutsideDaysFalseExample;

CalendarDontMarkOutsideDays.story = {
  name: "Calendar - Don't mark outside days",
};

export const _CustomComposedCalendar = CustomComposedCalendar;

_CustomComposedCalendar.story = {
  name: 'Custom composed calendar',
};

export const CustomComposedCalendarSafariDstBug =
  CustomComposedCalendarSafariBug;

CustomComposedCalendarSafariDstBug.story = {
  name: 'Custom composed calendar (Safari DST bug)',
};

export const CustomColours = CustomColors;

CustomColours.story = {
  name: 'Custom colours',
};

export const Week = WeekExample;
export const VisualTest = FocusedDateInThePastExample;

VisualTest.story = {
  name: 'Visual test',
};

export const VisualTestRange = RangeDateCalendar;

VisualTestRange.story = {
  name: 'Visual test range',
};
