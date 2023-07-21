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

import PropTypes from 'prop-types';

import { cssModules } from '../../bpk-react-utils';

import BpkConfigurableNudger from './BpkConfigurableNudger';
import { type CommonProps } from './common-types';
import STYLES from './BpkNudger.module.scss';

const getClassName = cssModules(STYLES);
const compareValues = (a: number, b: number): number => a - b;
const incrementValue = (currentValue: number): number => currentValue + 1;
const decrementValue = (currentValue: number): number => currentValue - 1;
const formatValue = (currentValue: number): string => currentValue.toString();

const BpkNudger = ({
  buttonType = 'secondary',
  className = null,
  ...rest
}: CommonProps) => (
  <BpkConfigurableNudger
    inputClassName={getClassName('bpk-nudger__input--numeric')}
    compareValues={compareValues}
    incrementValue={incrementValue}
    decrementValue={decrementValue}
    formatValue={formatValue}
    className={className}
    buttonType={buttonType}
    {...rest}
  />
);

export default BpkNudger;
