/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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

import React from 'react';
import { cssModules } from 'bpk-react-utils';
import BpkText from 'bpk-component-text';
import format from 'date-fns/format';
import {
  BpkCalendarGrid,
  BpkCalendarGridPropTypes,
} from 'bpk-component-calendar';

import STYLES from './bpk-scrollable-calendar-grid.scss';

const getClassName = cssModules(STYLES);

const BpkScrollableCalendarGrid = props => {
  const { month, className, ...rest } = props;

  const classNames = getClassName('bpk-scrollable-calendar-grid', className);
  if (className) {
    classNames.push(className);
  }

  return (
    <div className={classNames}>
      <BpkText
        className={getClassName('bpk-scrollable-calendar-grid__title')}
        tagName="h1"
        textStyle="lg"
      >
        {format(month, 'MMMM')}
      </BpkText>
      <BpkCalendarGrid month={month} {...rest} />
    </div>
  );
};

BpkScrollableCalendarGrid.propTypes = {
  ...BpkCalendarGridPropTypes,
};

export default BpkScrollableCalendarGrid;
