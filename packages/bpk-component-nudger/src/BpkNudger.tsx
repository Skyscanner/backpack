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

import { useRef } from 'react';

import BpkButton, { BUTTON_TYPES } from '../../bpk-component-button';
import { withButtonAlignment } from '../../bpk-component-icon';
import MinusIcon from '../../bpk-component-icon/sm/minus';
import PlusIcon from '../../bpk-component-icon/sm/plus';
import BpkLabel from '../../bpk-component-label';
import BpkText, { TEXT_STYLES } from '../../bpk-component-text';
import { cssModules, setNativeValue } from '../../bpk-react-utils';

import { type CommonProps } from './common-types';

import STYLES from './BpkNudger.module.scss';

const getClassName = cssModules(STYLES);
const compareValues = (a: number, b: number): number => a - b;

const BpkNudger = ({
  buttonType = 'secondary',
  className = null,
  decreaseButtonLabel,
  icon,
  id,
  increaseButtonLabel,
  inputClassName,
  max,
  min,
  name,
  onValueChange,
  step = 1,
  subtitle,
  title,
  value,
  ...rest
}: CommonProps) => {
  // Ensure that the minimum value is 0 or greater it's not designed to handle negative values.
  const minimum = min < 0 ? 0 : min;
  const containerClassNames = getClassName(title && 'bpk-nudger__container');
  const inputClassNames = getClassName(
    'bpk-nudger__input',
    'bpk-nudger__input--numeric',
    inputClassName && inputClassName,
    buttonType === 'secondaryOnDark' && 'bpk-nudger__input--secondary-on-dark',
  );
  const nudgerClassNames = getClassName('bpk-nudger', className);

  const maxButtonDisabled = compareValues(value, max) >= 0;
  const minButtonDisabled = compareValues(value, minimum) <= 0;

  const AlignedMinusIcon = withButtonAlignment(MinusIcon);
  const AlignedPlusIcon = withButtonAlignment(PlusIcon);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const incrementValue = (currentValue: number): number => currentValue + step;
  const decrementValue = (currentValue: number): number => currentValue - step;
  const valueLimitter = (element: HTMLInputElement): void => {
    if (element.valueAsNumber < minimum) {
      onValueChange(minimum);
      setNativeValue(element, minimum, false);
    } else if (element.valueAsNumber > max) {
      onValueChange(max);
      setNativeValue(element, max, false);
    }
    if (element.valueAsNumber >= minimum && element.valueAsNumber <= max) {
      onValueChange(element.valueAsNumber);
    }
  };

  return (
    <div className={containerClassNames}>
      {title && (
        <div className={getClassName('bpk-nudger__label')}>
          <BpkLabel htmlFor={id}>{icon}</BpkLabel>
          <span
            // For a11y on IOS, role='text' forces label to be read in full. More info: https://axesslab.com/text-splitting/
            // eslint-disable-next-line jsx-a11y/aria-role
            role="text"
            className={getClassName('bpk-nudger__label--title-subtitle')}
          >
            <BpkText textStyle={TEXT_STYLES.heading5}>{title}</BpkText>
            {subtitle && (
              <span className={getClassName('bpk-nudger__label--subtitle')}>
                <BpkText>{subtitle}</BpkText>
              </span>
            )}
          </span>
        </div>
      )}
      <div className={nudgerClassNames}>
        <BpkButton
          type={BUTTON_TYPES[buttonType]}
          iconOnly
          onClick={() => {
            if (Number.isNaN(value)) {
              onValueChange(minimum);
              inputRef.current && setNativeValue(inputRef.current, minimum);
              return;
            }
            const newValue = decrementValue(value);
            onValueChange(newValue);
            // We want to maintain native input events across our form components. Along with react updating
            // the value attribute we can set it via native handlers and emit a "change" event.
            inputRef.current && setNativeValue(inputRef.current, newValue);
          }}
          disabled={minButtonDisabled}
          title={decreaseButtonLabel}
          aria-controls={id}
        >
          <AlignedMinusIcon />
        </BpkButton>
        <input
          type="number"
          aria-live="polite"
          defaultValue={value}
          id={id}
          ref={inputRef}
          name={name || id}
          step={step}
          onInput={(event) => {
            const inputElement = event.target as HTMLInputElement;
            if (
              !inputElement.validity.valid && // allow the removal of a value
              Number.isNaN(inputElement.valueAsNumber)
            ) {
              // set prev value if entry invalid
              onValueChange(value);
              setNativeValue(inputElement, value, false);
            }
            valueLimitter(inputElement);
          }}
          className={inputClassNames}
          {...rest}
        />
        <BpkButton
          type={BUTTON_TYPES[buttonType]}
          iconOnly
          onClick={() => {
            if (Number.isNaN(value)) {
              onValueChange(max);
              inputRef.current && setNativeValue(inputRef.current, max);
              return;
            }
            const newValue = incrementValue(value);
            onValueChange(newValue);
            // We want to maintain native input events across our form components. Along with react updating
            // the value attribute we can set it via native handlers and emit a "change" event.
            inputRef.current && setNativeValue(inputRef.current, newValue);
          }}
          disabled={maxButtonDisabled}
          title={increaseButtonLabel}
          aria-controls={id}
        >
          <AlignedPlusIcon />
        </BpkButton>
      </div>
    </div>
  );
};

export default BpkNudger;
