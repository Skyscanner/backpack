/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2020 Skyscanner Ltd
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

import PropTypes from 'prop-types';
import React from 'react';
import { cssModules } from 'bpk-react-utils';

import BpkCalendarDate, { propTypes, defaultProps } from './BpkCalendarDate';
import STYLES from './BpkColoredCalendarDate.scss';

const getClassName = cssModules(STYLES);

export const CellType = {
  default: 'default',
  negative: 'negative',
  neutral: 'neutral',
  positive: 'positive',
};

// TODO: Rename cellStyle to cellType
const BpkColoredCalendarDate = props => {
  const { cellType, ...rest } = props;
  const className = getClassName(
    'bpk-colored-calendar-date',
    cellType === CellType.default && 'bpk-colored-calendar-date--default',
    cellType === CellType.positive && 'bpk-colored-calendar-date--positive',
    cellType === CellType.neutral && 'bpk-colored-calendar-date--neutral',
    cellType === CellType.negative && 'bpk-colored-calendar-date--negative',
    props.isFocused && 'bpk-colored-calendar-date--focused',
    props.isSelected && 'bpk-colored-calendar-date--selected',
  );

  return <BpkCalendarDate {...rest} className={className} />;
};

BpkColoredCalendarDate.propTypes = {
  ...propTypes,
  cellType: PropTypes.string,
};
BpkColoredCalendarDate.defaultProps = {
  ...defaultProps,
  cellType: null,
};

export default BpkColoredCalendarDate;
