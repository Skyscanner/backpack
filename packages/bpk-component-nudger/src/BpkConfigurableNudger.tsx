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

// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import { BpkButtonV2, BUTTON_TYPES } from '../../bpk-component-button';
import { withButtonAlignment } from '../../bpk-component-icon';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import MinusIcon from '../../bpk-component-icon/sm/minus';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import PlusIcon from '../../bpk-component-icon/sm/plus';
import { cssModules } from '../../bpk-react-utils';

import { type CommonProps } from './common-types';
import STYLES from './BpkNudger.module.scss';

const getClassName = cssModules(STYLES);

const AlignedMinusIcon = withButtonAlignment(MinusIcon);
const AlignedPlusIcon = withButtonAlignment(PlusIcon);

type Props = CommonProps & {
  inputClassName?: string | null;
  formatValue: (arg0: any) => string;
  incrementValue: (arg0: any) => string | number;
  decrementValue: (arg0: any) => string | number;
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
  onChange,
  value,
  ...rest
}: Props) => {
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

  return (
    <div className={classNames}>
      <BpkButtonV2
        type={BUTTON_TYPES[buttonType]}
        iconOnly
        onClick={() => onChange(decrementValue(value))}
        disabled={minButtonDisabled}
        title={decreaseButtonLabel}
        aria-controls={id}
        className={getClassName('bpk-nudger__button')}
      >
        <AlignedMinusIcon className={minusIconClassNames} />
      </BpkButtonV2>
      <input
        type="text"
        aria-live="polite"
        readOnly
        value={formatValue(value)}
        id={id}
        className={inputStyles}
        tabIndex={-1}
        {...rest}
      />
      <BpkButtonV2
        type={BUTTON_TYPES[buttonType]}
        iconOnly
        onClick={() => onChange(incrementValue(value))}
        disabled={maxButtonDisabled}
        title={increaseButtonLabel}
        aria-controls={id}
        className={getClassName('bpk-nudger__button')}
      >
        <AlignedPlusIcon className={plusIconClassNames} />
      </BpkButtonV2>
    </div>
  );
};

export default BpkConfigurableNudger;
