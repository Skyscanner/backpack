import format from 'date-fns/format';

export const formatDateFull = date => format(date, 'dddd, Do MMMM YYYY');
export const formatMonth = date => format(date, 'MMMM YYYY');
export const formatMonthGerman = (date) => {
  const months = [
    'Januar',
    'Februar',
    'März',
    'April',
    'Mai',
    'Juni',
    'Juli',
    'August',
    'September',
    'Oktober',
    'November',
    'Dezember',
  ];
  return `${months[date.getMonth()]} ${date.getUTCFullYear()}`;
};

export const weekDays = [
  {
    name: 'Sunday',
    nameAbbr: 'Sun',
    index: 0,
    isWeekend: true,
  },
  {
    name: 'Monday',
    nameAbbr: 'Mon',
    index: 1,
    isWeekend: false,
  },
  {
    name: 'Tuesday',
    nameAbbr: 'Tue',
    index: 2,
    isWeekend: false,
  },
  {
    name: 'Wednesday',
    nameAbbr: 'Wed',
    index: 3,
    isWeekend: false,
  },
  {
    name: 'Thursday',
    nameAbbr: 'Thu',
    index: 4,
    isWeekend: false,
  },
  {
    name: 'Friday',
    nameAbbr: 'Fri',
    index: 5,
    isWeekend: false,
  },
  {
    name: 'Saturday',
    nameAbbr: 'Sat',
    index: 6,
    isWeekend: true,
  },
];

export const weekDaysMoreWeekend = [
  {
    name: 'Sunday',
    nameAbbr: 'Sun',
    index: 0,
    isWeekend: true,
  },
  {
    name: 'Monday',
    nameAbbr: 'Mon',
    index: 1,
    isWeekend: false,
  },
  {
    name: 'Tuesday',
    nameAbbr: 'Tue',
    index: 2,
    isWeekend: false,
  },
  {
    name: 'Wednesday',
    nameAbbr: 'Wed',
    index: 3,
    isWeekend: false,
  },
  {
    name: 'Thursday',
    nameAbbr: 'Thu',
    index: 4,
    isWeekend: false,
  },
  {
    name: 'Friday',
    nameAbbr: 'Fri',
    index: 5,
    isWeekend: true,
  },
  {
    name: 'Saturday',
    nameAbbr: 'Sat',
    index: 6,
    isWeekend: true,
  },
];

export const weekDaysGerman = [
  {
    name: 'Sonntag',
    nameAbbr: 'So.',
    index: 0,
    isWeekend: true,
  },
  {
    name: 'Montag',
    nameAbbr: 'Mo.',
    index: 1,
    isWeekend: false,
  },
  {
    name: 'Dienstag',
    nameAbbr: 'Di.',
    index: 2,
    isWeekend: false,
  },
  {
    name: 'Mittwoch',
    nameAbbr: 'Mi.',
    index: 3,
    isWeekend: false,
  },
  {
    name: 'Donnerstag',
    nameAbbr: 'Do.',
    index: 4,
    isWeekend: false,
  },
  {
    name: 'Freitag',
    nameAbbr: 'Fr.',
    index: 5,
    isWeekend: false,
  },
  {
    name: 'Samstag',
    nameAbbr: 'Sa.',
    index: 6,
    isWeekend: true,
  },
];
