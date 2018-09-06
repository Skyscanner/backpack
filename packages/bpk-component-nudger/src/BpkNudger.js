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

import PropTypes from 'prop-types';
import React from 'react';
import BpkButton from 'bpk-component-button';
import { withButtonAlignment } from 'bpk-component-icon';
import MinusIcon from 'bpk-component-icon/sm/minus';
import PlusIcon from 'bpk-component-icon/sm/plus';
import { cssModules } from 'bpk-react-utils';
import clamp from 'lodash.clamp';

import STYLES from './bpk-nudger.css';

const getClassName = cssModules(STYLES);

const AlignedMinusIcon = withButtonAlignment(MinusIcon);
const AlignedPlusIcon = withButtonAlignment(PlusIcon);

const BpkNudger = props => {
  const {
    id,
    min,
    max,
    value,
    onChange,
    className,
    increaseButtonLabel,
    decreaseButtonLabel,
  } = props;
  const classNames = [getClassName('bpk-nudger')];
  if (className) {
    classNames.push(className);
  }

  const adjustedValue = Math.floor(clamp(value, min, max));
  const decreaseDisabled = adjustedValue <= min;
  const increaseDisabled = adjustedValue >= max;

  const minusIconClassNames = [getClassName('bpk-nudger__icon')];
  if (decreaseDisabled) {
    minusIconClassNames.push(getClassName('bpk-nudger__icon--disabled'));
  }
  const plusIconClassNames = [getClassName('bpk-nudger__icon')];
  if (increaseDisabled) {
    plusIconClassNames.push(getClassName('bpk-nudger__icon--disabled'));
  }

  return (
    <div className={classNames.join(' ')}>
      <BpkButton
        secondary
        iconOnly
        onClick={() => onChange(clamp(adjustedValue - 1, min, max))}
        disabled={decreaseDisabled}
        title={decreaseButtonLabel}
        aria-controls={id}
        className={getClassName('bpk-nudger__button')}
      >
        <AlignedMinusIcon className={minusIconClassNames.join(' ')} />
      </BpkButton>
      <input
        type="text"
        aria-live="assertive"
        readOnly
        value={adjustedValue}
        id={id}
        className={getClassName('bpk-nudger__input')}
      />
      <BpkButton
        secondary
        iconOnly
        onClick={() => onChange(clamp(adjustedValue + 1, min, max))}
        disabled={increaseDisabled}
        title={increaseButtonLabel}
        aria-controls={id}
        className={getClassName('bpk-nudger__button')}
      >
        <AlignedPlusIcon className={plusIconClassNames.join(' ')} />
      </BpkButton>
    </div>
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
};

BpkNudger.defaultProps = {
  className: null,
};

export default BpkNudger;
