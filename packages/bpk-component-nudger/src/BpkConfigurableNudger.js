/* eslint-disable react/forbid-prop-types */
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

/* @flow strict */

import PropTypes from 'prop-types';
import React from 'react';

import BpkButtonSecondary from '../../bpk-component-button/BpkButtonSecondary';
import BpkButtonSecondaryOnDark from '../../bpk-component-button/BpkButtonSecondaryOnDark';
import { withButtonAlignment } from '../../bpk-component-icon';
import MinusIcon from '../../bpk-component-icon/sm/minus';
import PlusIcon from '../../bpk-component-icon/sm/plus';
import { cssModules } from '../../bpk-react-utils';

import {
  type CommonProps,
  COMMON_PROP_TYPES,
  COMMON_DEFAULT_PROPS,
} from './common-types';
import STYLES from './BpkNudger.module.scss';

const getClassName = cssModules(STYLES);

const AlignedMinusIcon = withButtonAlignment(MinusIcon);
const AlignedPlusIcon = withButtonAlignment(PlusIcon);

type Props<T> = {
  ...$Exact<CommonProps<T>>,
  inputClassName: ?string,
  formatValue: (T) => string,
  incrementValue: (T) => T,
  decrementValue: (T) => T,
  compareValues: (T, T) => number,
};

const BpkConfigurableNudger = <T>(props: Props<T>) => {
  const {
    buttonType,
    className,
    compareValues,
    decreaseButtonLabel,
    decrementValue,
    formatValue,
    id,
    increaseButtonLabel,
    incrementValue,
    inputClassName,
    max,
    min,
    onChange,
    value,
    ...rest
  } = props;

  const classNames = getClassName('bpk-nudger', className);

  const maxButtonDisabled = compareValues(value, max) >= 0;
  const minButtonDisabled = compareValues(value, min) <= 0;

  const minusIconClassNames = getClassName(
    'bpk-nudger__icon',
    minButtonDisabled && 'bpk-nudger__icon--disabled',
  );
  const plusIconClassNames = getClassName(
    'bpk-nudger__icon',
    maxButtonDisabled && 'bpk-nudger__icon--disabled',
  );
  const inputStyles = getClassName(
    'bpk-nudger__input',
    inputClassName && inputClassName,
    buttonType === 'secondaryOnDark' && 'bpk-nudger__input--secondary-on-dark',
  );

  const ButtonComponent =
    buttonType === 'secondary' ? BpkButtonSecondary : BpkButtonSecondaryOnDark;

  return (
    <div className={classNames}>
      <ButtonComponent
        iconOnly
        onClick={() => onChange(decrementValue(value))}
        disabled={minButtonDisabled}
        title={decreaseButtonLabel}
        aria-controls={id}
        className={getClassName('bpk-nudger__button')}
      >
        <AlignedMinusIcon className={minusIconClassNames} />
      </ButtonComponent>
      {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
      <input
        type="text"
        aria-live="polite"
        readOnly
        value={formatValue(value)}
        id={id}
        className={inputStyles}
        {...rest}
      />
      <ButtonComponent
        iconOnly
        onClick={() => onChange(incrementValue(value))}
        disabled={maxButtonDisabled}
        title={increaseButtonLabel}
        aria-controls={id}
        className={getClassName('bpk-nudger__button')}
      >
        <AlignedPlusIcon className={plusIconClassNames} />
      </ButtonComponent>
    </div>
  );
};

BpkConfigurableNudger.propTypes = {
  ...COMMON_PROP_TYPES,
  compareValues: PropTypes.func.isRequired,
  decrementValue: PropTypes.func.isRequired,
  formatValue: PropTypes.PropTypes.func.isRequired,
  incrementValue: PropTypes.func.isRequired,
  max: PropTypes.any.isRequired,
  min: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
  inputClassName: PropTypes.string,
};

BpkConfigurableNudger.defaultProps = {
  ...COMMON_DEFAULT_PROPS,
  inputClassName: null,
};

export default BpkConfigurableNudger;
