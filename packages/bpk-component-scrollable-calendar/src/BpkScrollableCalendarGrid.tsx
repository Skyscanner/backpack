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
// @ts-nocheck

import type { ElementType, ReactNode } from 'react';

import { BpkCalendarGrid } from '../../bpk-component-calendar';
import BpkText, { TEXT_STYLES } from '../../bpk-component-text';
import { cssModules } from '../../bpk-react-utils';

import type { BpkCalendarGridProps } from '../../bpk-component-calendar';

import STYLES from './BpkScrollableCalendarGrid.module.scss';

const getClassName = cssModules(STYLES);

type Props = Partial<BpkCalendarGridProps> & {
  DateComponent: ElementType;
  month: Date;
  formatDateFull: (date: Date) => Date | string;
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  formatMonth: (date: Date) => ReactNode | string;
};
const BpkScrollableCalendarGrid = ({
  className,
  formatMonth,
  ignoreOutsideDate,
  month,
  ...rest
}: Props) => {
  const classNames = getClassName('bpk-scrollable-calendar-grid', className);

  return (
    <div className={classNames}>
      <span className={getClassName('bpk-scrollable-calendar-grid__title')}>
        <BpkText tagName="h2" textStyle={TEXT_STYLES.heading4}>
          {formatMonth(month)}
        </BpkText>
      </span>
      <BpkCalendarGrid
        month={month}
        ignoreOutsideDate
        formatMonth={formatMonth}
        {...rest}
      />
    </div>
  );
};

export default BpkScrollableCalendarGrid;
