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

import type { ReactElement } from 'react';

import { isBefore, isSameDay } from './date-utils';

type Props = {
  endDate: Date;
  startDate: Date;
};

const DateType = () => (props: Props) => {
  const { endDate, startDate } = props;

  // No range selected
  if (!startDate && !endDate) {
    return null;
  }

  // End date without a start date is not allowed
  if (!startDate && endDate) {
    return new Error(`Cannot specify \`endDate\` without \`startDate\`.`);
  }

  // Start date without an end date is always valid
  if (startDate && !endDate) {
    return null;
  }

  // Start date cannot be after end date
  if (isBefore(endDate, startDate) && !isSameDay(endDate, startDate)) {
    return new Error(
      `Start date \`${startDate}\` cannot be after end date \`${endDate}\`.`,
    );
  }

  return null;
};

export const CALENDAR_SELECTION_TYPE = {
  single: 'single',
  range: 'range',
} as const;

export type SelectionConfigurationSingle = {
  type: typeof CALENDAR_SELECTION_TYPE.single;
  date: Date | null;
};

export type SelectionConfigurationRange = {
  type: typeof CALENDAR_SELECTION_TYPE.range;
  startDate: Date;
  endDate: Date;
};

export type SelectionConfiguration =
  | SelectionConfigurationSingle
  | SelectionConfigurationRange;

export type WeekDay = {
  name: string;
  nameAbbr: string;
  index: number;
  isWeekend: boolean;
  [key: string]: any;
};

export type WeekDayKey = string;
export type DaysOfWeek = WeekDay[];
export type DateModifiers = { [key: string]: Function };
export type ReactComponent = string | ((props: any) => ReactElement);
