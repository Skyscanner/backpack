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

import { useRef } from 'react';

import { BpkButtonV2, BUTTON_TYPES } from '../../bpk-component-button';
import { withButtonAlignment } from '../../bpk-component-icon';
import MinusIcon from '../../bpk-component-icon/sm/minus';
import PlusIcon from '../../bpk-component-icon/sm/plus';
import { cssModules, setNativeValue } from '../../bpk-react-utils';

import { type CommonProps } from './common-types';

import STYLES from './BpkNudger.module.scss';

const getClassName = cssModules(STYLES);

const AlignedMinusIcon = withButtonAlignment(MinusIcon);
const AlignedPlusIcon = withButtonAlignment(PlusIcon);

type Props = CommonProps & {
  inputClassName?: string | null;
  /**
   * A simple function that will allow you to set the format of the display value e.g. local dates or times.
   */
  formatValue: (arg0: any) => string;
  /**
   * Function that handle the incrementing of the current selected value.
   */
  incrementValue: (arg0: any) => string | number;
  /**
   * Function that handle the decrementing of the current selected value.
   */
  decrementValue: (arg0: any) => string | number;
  /**
   * Given `a` and `b`:
   *   - If `a` is less than `b` then `compareValues(a, b)` should return a value less than `0`
   *   - If  `a` and `b` are equal then `compareValues(a, b)` should return exactly `0`
   *   - If `a` is greater than `b` then `compareValues(a, b)` should return a value greater than `0`
   * We use this along with the `min` and `max` values to determine when we should disable the increment and decrement buttons. This is inspired by the `compareFunction` in [Array.prototype.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Description)
   */
  compareValues: (arg0: any, arg1: any) => number;
};

const BpkConfigurableNudger = ({
  buttonType = 'secondary',
  className = null,
  compareValues,
  decreaseButtonLabel,
  decrementValue,
  formatValue,
  id,
  increaseButtonLabel,
  incrementValue,
  inputClassName = null,
  max,
  min,
  name,
  onChange,
  value,
  ...rest
}: Props) => {
  const classNames = getClassName('bpk-nudger', className);

  const maxButtonDisabled = compareValues(value, max) >= 0;
  const minButtonDisabled = compareValues(value, min) <= 0;

  const inputStyles = getClassName(
    'bpk-nudger__input',
    inputClassName && inputClassName,
    buttonType === 'secondaryOnDark' && 'bpk-nudger__input--secondary-on-dark',
  );
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className={classNames}>
      <BpkButtonV2
        type={BUTTON_TYPES[buttonType]}
        iconOnly
        onClick={() => {
          const newValue = decrementValue(value);
          onChange(newValue);
          // We want to maintain native input events across our form components. Along with react updating
          // the value attribute we can set it via native handlers and emit a "change" event.
          inputRef.current && setNativeValue(inputRef.current, `${newValue}`);
        }}
        disabled={minButtonDisabled}
        title={decreaseButtonLabel}
        aria-controls={id}
      >
        <AlignedMinusIcon />
      </BpkButtonV2>
      <input
        type="text"
        aria-live="polite"
        defaultValue={formatValue(value)}
        id={id}
        ref={inputRef}
        name={name || id}
        onChange={(event) => onChange(parseInt(event?.target.value, 10))}
        className={inputStyles}
        {...rest}
      />
      <BpkButtonV2
        type={BUTTON_TYPES[buttonType]}
        iconOnly
        onClick={() => {
          const newValue = incrementValue(value);
          onChange(newValue);
          // We want to maintain native input events across our form components. Along with react updating
          // the value attribute we can set it via native handlers and emit a "change" event.
          inputRef.current && setNativeValue(inputRef.current, `${newValue}`);
        }}
        disabled={maxButtonDisabled}
        title={increaseButtonLabel}
        aria-controls={id}
      >
        <AlignedPlusIcon />
      </BpkButtonV2>
    </div>
  );
};

export default BpkConfigurableNudger;
