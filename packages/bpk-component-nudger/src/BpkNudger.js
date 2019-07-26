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

import PropTypes from 'prop-types';
import React from 'react';

import BpkConfigurableNudger from './BpkConfigurableNudger';

type Props = {
  id: string,
  min: number,
  max: number,
  value: number,
  onChange: <T>(T) => void,
  className: ?string,
  increaseButtonLabel: string,
  decreaseButtonLabel: string,
  buttonType: string,
};

const BpkNudger = (props: Props) => {
  const {
    id,
    min,
    max,
    value,
    onChange,
    className,
    increaseButtonLabel,
    decreaseButtonLabel,
    buttonType,
  } = props;

  const compareValues = (a: number, b: number): number => a - b;
  const incrementValue = (a: number): number => a + 1;
  const decrementValue = (a: number): number => a - 1;
  const formatValue = (a: number): number => a;

  return (
    <BpkConfigurableNudger
      id={id}
      min={min}
      max={max}
      value={value}
      onChange={onChange}
      className={className}
      increaseButtonLabel={increaseButtonLabel}
      decreaseButtonLabel={decreaseButtonLabel}
      buttonType={buttonType}
      compareValues={compareValues}
      incrementValue={incrementValue}
      decrementValue={decrementValue}
      formatValue={formatValue}
    />
  );
};

BpkNudger.propTypes = {
  id: PropTypes.string.isRequired,
  decreaseButtonLabel: PropTypes.string.isRequired,
  increaseButtonLabel: PropTypes.string.isRequired,
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  buttonType: PropTypes.oneOf(['secondary', 'outline']),
};

BpkNudger.defaultProps = {
  className: null,
  buttonType: 'secondary',
};

export default BpkNudger;
