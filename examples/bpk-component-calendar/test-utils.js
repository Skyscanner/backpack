/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import format from 'date-fns/format';

export const formatDateFull = (date) => format(date, 'EEEE, do MMMM yyyy');
export const formatDateFullArabic = (date) => {
  const dateString = 'EEEE, dd، MMMM، yyyy';
  const newString = dateString.replace('yyyy', date.getUTCFullYear());
  return format(date, newString);
};
export const formatDateFullJapanese = (date) => {
  const dateString = 'Y年M月d日EEEE';
  const newString = dateString.replace('Y', date.getUTCFullYear());
  return format(date, newString);
};
export const formatMonth = (date) => format(date, 'MMMM yyyy');
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
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
};
export const formatMonthJapanese = (date) => {
  const months = [
    '1月',
    '2月',
    '3月',
    '4月',
    '5月',
    '6月',
    '7月',
    '8月',
    '9月',
    '10月',
    '11月',
    '12月',
  ];
  return `${date.getFullYear()}年${months[date.getMonth()]}`;
};

export const weekDays = [
  {
    name: 'Sunday',
    nameAbbr: 'Sun',
    nameNarrow: 'S',
    index: 0,
    isWeekend: true,
  },
  {
    name: 'Monday',
    nameAbbr: 'Mon',
    nameNarrow: 'M',
    index: 1,
    isWeekend: false,
  },
  {
    name: 'Tuesday',
    nameAbbr: 'Tue',
    nameNarrow: 'T',
    index: 2,
    isWeekend: false,
  },
  {
    name: 'Wednesday',
    nameAbbr: 'Wed',
    nameNarrow: 'W',
    index: 3,
    isWeekend: false,
  },
  {
    name: 'Thursday',
    nameAbbr: 'Thu',
    nameNarrow: 'T',
    index: 4,
    isWeekend: false,
  },
  {
    name: 'Friday',
    nameAbbr: 'Fri',
    nameNarrow: 'F',
    index: 5,
    isWeekend: false,
  },
  {
    name: 'Saturday',
    nameAbbr: 'Sat',
    nameNarrow: 'S',
    index: 6,
    isWeekend: true,
  },
];

export const weekDaysMoreWeekend = [
  {
    name: 'Sunday',
    nameAbbr: 'Sun',
    nameNarrow: 'S',
    index: 0,
    isWeekend: true,
  },
  {
    name: 'Monday',
    nameAbbr: 'Mon',
    nameNarrow: 'M',
    index: 1,
    isWeekend: false,
  },
  {
    name: 'Tuesday',
    nameAbbr: 'Tue',
    nameNarrow: 'T',
    index: 2,
    isWeekend: false,
  },
  {
    name: 'Wednesday',
    nameAbbr: 'Wed',
    nameNarrow: 'W',
    index: 3,
    isWeekend: false,
  },
  {
    name: 'Thursday',
    nameAbbr: 'Thu',
    nameNarrow: 'T',
    index: 4,
    isWeekend: false,
  },
  {
    name: 'Friday',
    nameAbbr: 'Fri',
    nameNarrow: 'F',
    index: 5,
    isWeekend: true,
  },
  {
    name: 'Saturday',
    nameAbbr: 'Sat',
    nameNarrow: 'S',
    index: 6,
    isWeekend: true,
  },
];

export const weekDaysArabic = [
  {
    name: 'الأحد',
    nameAbbr: 'الأحد',
    nameShort: 'الأحد',
    nameNarrow: 'ح',
    index: 0,
    cldrKey: 'sun',
    isWeekend: false,
  },
  {
    name: 'الاثنين',
    nameAbbr: 'الاثنين',
    nameShort: 'الاثنين',
    nameNarrow: 'ن',
    index: 1,
    cldrKey: 'mon',
    isWeekend: false,
  },
  {
    name: 'الثلاثاء',
    nameAbbr: 'الثلاثاء',
    nameShort: 'الثلاثاء',
    nameNarrow: 'ث',
    index: 2,
    cldrKey: 'tue',
    isWeekend: false,
  },
  {
    name: 'الأربعاء',
    nameAbbr: 'الأربعاء',
    nameShort: 'الأربعاء',
    nameNarrow: 'ر',
    index: 3,
    cldrKey: 'wed',
    isWeekend: false,
  },
  {
    name: 'الخميس',
    nameAbbr: 'الخميس',
    nameShort: 'الخميس',
    nameNarrow: 'خ',
    index: 4,
    cldrKey: 'thu',
    isWeekend: false,
  },
  {
    name: 'الجمعة',
    nameAbbr: 'الجمعة',
    nameShort: 'الجمعة',
    nameNarrow: 'ج',
    index: 5,
    cldrKey: 'fri',
    isWeekend: true,
  },
  {
    name: 'السبت',
    nameAbbr: 'السبت',
    nameShort: 'السبت',
    nameNarrow: 'س',
    index: 6,
    cldrKey: 'sat',
    isWeekend: true,
  },
];

export const weekDaysJapanese = [
  {
    name: '日曜日',
    nameAbbr: '日',
    nameShort: '日',
    nameNarrow: '日',
    index: 0,
    cldrKey: 'sun',
    isWeekend: true,
  },
  {
    name: '月曜日',
    nameAbbr: '月',
    nameShort: '月',
    nameNarrow: '月',
    index: 1,
    cldrKey: 'mon',
    isWeekend: false,
  },
  {
    name: '火曜日',
    nameAbbr: '火',
    nameShort: '火',
    nameNarrow: '火',
    index: 2,
    cldrKey: 'tue',
    isWeekend: false,
  },
  {
    name: '水曜日',
    nameAbbr: '水',
    nameShort: '水',
    nameNarrow: '水',
    index: 3,
    cldrKey: 'wed',
    isWeekend: false,
  },
  {
    name: '木曜日',
    nameAbbr: '木',
    nameShort: '木',
    nameNarrow: '木',
    index: 4,
    cldrKey: 'thu',
    isWeekend: false,
  },
  {
    name: '金曜日',
    nameAbbr: '金',
    nameShort: '金',
    nameNarrow: '金',
    index: 5,
    cldrKey: 'fri',
    isWeekend: false,
  },
  {
    name: '土曜日',
    nameAbbr: '土',
    nameShort: '土',
    nameNarrow: '土',
    index: 6,
    cldrKey: 'sat',
    isWeekend: true,
  },
];
