/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2019 Skyscanner Ltd
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

/* @flow strict */

import React from 'react';
import { cssModules } from 'bpk-react-utils';

import BpkConfigurableNudger from './BpkConfigurableNudger';
import {
  type CommonProps,
  COMMON_DEFAULT_PROPS,
  COMMON_PROP_TYPES,
} from './common-types';
import STYLES from './BpkNudger.scss';

type Props = {
  ...$Exact<CommonProps>,
};

const getClassName = cssModules(STYLES);

const BpkNudger = (props: Props) => {
  const { ...rest } = props;

  const compareValues = (a: number, b: number): number => a - b;
  const incrementValue = (a: number): number => a + 1;
  const decrementValue = (a: number): number => a - 1;
  const formatValue = (a: number): string => a.toString();

  return (
    <BpkConfigurableNudger
      inputClassName={getClassName('bpk-nudger__input--numeric')}
      compareValues={compareValues}
      incrementValue={incrementValue}
      decrementValue={decrementValue}
      formatValue={formatValue}
      {...rest}
    />
  );
};

BpkNudger.propTypes = COMMON_PROP_TYPES;

BpkNudger.defaultProps = COMMON_DEFAULT_PROPS;

export default BpkNudger;
