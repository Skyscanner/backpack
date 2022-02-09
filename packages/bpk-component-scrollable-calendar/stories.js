import {
  DefaultExample,
  WeekStartsOnSix,
  WithFocusedDate,
  TallContainer,
  SingleMonth,
  WeekStartsOnSunday,
  HonestWeekend,
  ArabicLocale,
  JapaneseLocale,
  DifferentMinMaxDates,
  DontMarkToday,
  ScrollableCalendarDate,
  ScrollableCalendarGrid,
  ScrollableCalendarGridList,
  PastCalendar,
  RangeExample,
  SplitWeekRangeExample,
} from './examples';

export default {
  title: 'bpk-component-scrollable-calendar',
};

export const ScrollableCalendarDefault = DefaultExample;

ScrollableCalendarDefault.story = {
  name: 'Scrollable Calendar - default',
};

export const ScrollableCalendarRange = RangeExample;

ScrollableCalendarRange.story = {
  name: 'Scrollable Calendar - range',
};

export const ScrollableCalendarWeekSplitAcross2MonthsRange =
  SplitWeekRangeExample;

ScrollableCalendarWeekSplitAcross2MonthsRange.story = {
  name: 'Scrollable Calendar - Week split across 2 months range',
};

export const ScrollableCalendarWeekStartsOn6 = WeekStartsOnSix;

ScrollableCalendarWeekStartsOn6.story = {
  name: 'Scrollable Calendar - week starts on 6',
};

export const ScrollableCalendarWithFocusedDate = WithFocusedDate;

ScrollableCalendarWithFocusedDate.story = {
  name: 'Scrollable Calendar - with focused date',
};

export const ScrollableCalendarInATallContainer = TallContainer;

ScrollableCalendarInATallContainer.story = {
  name: 'Scrollable Calendar in a tall container',
};

export const ScrollableCalendarWithASingleMonth = SingleMonth;

ScrollableCalendarWithASingleMonth.story = {
  name: 'Scrollable Calendar with a single month',
};

export const ScrollableCalendarWeekStartsOnASunday = WeekStartsOnSunday;

ScrollableCalendarWeekStartsOnASunday.story = {
  name: 'Scrollable Calendar - Week starts on a Sunday',
};

export const ScrollableCalendarHonestWeekend = HonestWeekend;

ScrollableCalendarHonestWeekend.story = {
  name: 'Scrollable Calendar - Honest weekend',
};

export const ScrollableCalendarArAeLocale = ArabicLocale;

ScrollableCalendarArAeLocale.story = {
  name: 'Scrollable Calendar - ar-AE locale',
};

export const ScrollableCalendarJaJpLocale = JapaneseLocale;

ScrollableCalendarJaJpLocale.story = {
  name: 'Scrollable Calendar - ja-JP locale',
};

export const ScrollableCalendarDifferentMinMaxDate = DifferentMinMaxDates;

ScrollableCalendarDifferentMinMaxDate.story = {
  name: 'Scrollable Calendar - Different min/max date',
};

export const ScrollableCalendarDontMarkToday = DontMarkToday;

ScrollableCalendarDontMarkToday.story = {
  name: "Scrollable Calendar - Don't mark today",
};

export const _PastCalendar = PastCalendar;
export const BpkScrollableCalendarDate = ScrollableCalendarDate;

BpkScrollableCalendarDate.story = {
  name: 'BpkScrollableCalendarDate',
};

export const BpkScrollableCalendarGrid = ScrollableCalendarGrid;

BpkScrollableCalendarGrid.story = {
  name: 'BpkScrollableCalendarGrid',
};

export const BpkScrollableCalendarGridList = ScrollableCalendarGridList;

BpkScrollableCalendarGridList.story = {
  name: 'BpkScrollableCalendarGridList',
};

export const VisualTest = DefaultExample;

VisualTest.story = {
  name: 'Visual test',
};

export const VisualTestRange = RangeExample;

VisualTestRange.story = {
  name: 'Visual test range',
};
