import format from 'date-fns/format';

export const formatDateFull = date => format(date, 'dddd, Do MMMM YYYY');
export const formatDateFullArabic = (date) => {
  const dateString = 'dddd, DD، MMMM، YYYY';
  const newString = dateString.replace('MMMM', date.getUTCFullYear());
  return format(date, newString);
};
export const formatMonth = date => format(date, 'MMMM YYYY');
export const formatMonthArabic = (date) => {
  const months = [
    'يناير',
    'فبراير',
    'مارس',
    'أبريل',
    'مايو',
    'يونيو',
    'يوليو',
    'أغسطس',
    'سبتمبر',
    'أكتوبر',
    'نوفمبر',
    'ديسمبر',
  ];
  return `${months[date.getMonth()]} ${date.getUTCFullYear()}`;
};

export const weekDays = [
  // {
  //   name: 'Sunday',
  //   nameAbbr: 'Sun',
  //   index: 0,
  //   isWeekend: true,
  // },
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
    name: 'Sunday',
    nameAbbr: 'Sun',
    index: 0,
    isWeekend: true,
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

export const weekDaysArabic = [
  {
    name: 'الأحد',
    nameAbbr: 'الأحد',
    nameShort: 'الأحد',
    index: 0,
    cldrKey: 'sun',
    isWeekend: false,
  },
  {
    name: 'الاثنين',
    nameAbbr: 'الاثنين',
    nameShort: 'الاثنين',
    index: 1,
    cldrKey: 'mon',
    isWeekend: false,
  },
  {
    name: 'الثلاثاء',
    nameAbbr: 'الثلاثاء',
    nameShort: 'الثلاثاء',
    index: 2,
    cldrKey: 'tue',
    isWeekend: false,
  },
  {
    name: 'الأربعاء',
    nameAbbr: 'الأربعاء',
    nameShort: 'الأربعاء',
    index: 3,
    cldrKey: 'wed',
    isWeekend: false,
  },
  {
    name: 'الخميس',
    nameAbbr: 'الخميس',
    nameShort: 'الخميس',
    index: 4,
    cldrKey: 'thu',
    isWeekend: false,
  },
  {
    name: 'الجمعة',
    nameAbbr: 'الجمعة',
    nameShort: 'الجمعة',
    index: 5,
    cldrKey: 'fri',
    isWeekend: true,
  },
  {
    name: 'السبت',
    nameAbbr: 'السبت',
    nameShort: 'السبت',
    index: 6,
    cldrKey: 'sat',
    isWeekend: true,
  },
];
