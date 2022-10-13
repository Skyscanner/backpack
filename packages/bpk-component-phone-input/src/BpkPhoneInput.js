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

import React from 'react';
import PropTypes from 'prop-types';

import { cssModules } from '../../bpk-react-utils';
import BpkInput, { INPUT_TYPES } from '../../bpk-component-input';
import BpkLabel from '../../bpk-component-label';
import BpkSelect from '../../bpk-component-select';

import STYLES from './BpkPhoneInput.module.scss';

const getClassName = cssModules(STYLES);

export type Props = {
  dialingCode: string,
  dialingCodeProps: {
    id: string,
    name: string,
    label: string,
    className?: string,
    wrapperClassName?: string,
  },
  dialingCodes: Array<{
    code: string,
    description: string,
    numberPrefix: ?string,
  }>,
  id: string,
  name: string,
  label: string,
  onChange: (SyntheticInputEvent<HTMLElement>) => mixed,
  onDialingCodeChange: (SyntheticInputEvent<HTMLElement>) => mixed,
  value: string,
  className: ?string,
  disabled: boolean,
  dialingCodeMask: boolean,
  large: boolean,
  valid: ?boolean,
  wrapperProps: { [string]: any },
};

type CommonProps = {
  large: boolean,
  disabled: boolean,
  valid: ?boolean,
};

const BpkPhoneInput = (props: Props) => {
  const {
    className,
    dialingCode,
    dialingCodeMask,
    dialingCodeProps,
    dialingCodes,
    disabled,
    id,
    label,
    large,
    name,
    onChange,
    onDialingCodeChange,
    valid,
    value,
    wrapperProps,
    ...rest
  } = props;

  const commonProps: CommonProps = {
    valid,
    large: !!large,
    disabled: !!disabled,
  };

  const dialingCodeDefinition = dialingCodes.find(
    (dialingCodeDef) => dialingCodeDef.code === dialingCode,
  );
  if (!dialingCodeDefinition) {
    throw new Error(
      `BpkPhoneInput: A valid value must be provided for the "dialingCode" prop. The provided value for "dialingCode" (${dialingCode}) does not match any definitions in the "dialingCodes" prop`,
    );
  }

  const { numberPrefix } = dialingCodeDefinition;

  let displayValue = value;

  if (dialingCodeMask && numberPrefix) {
    displayValue = `${numberPrefix} ${value}`;
  }

  const handleChange = (e) => {
    if (!onChange) {
      return;
    }

    if (!dialingCodeMask) {
      onChange(e);
      return;
    }

    if (!numberPrefix) {
      onChange(e);
    }

    if (numberPrefix) {
      let { value: newValue } = e.target;

      if (newValue.indexOf(`${numberPrefix} `) > -1) {
        const number = newValue.slice(numberPrefix.length + 1);
        newValue = number;
      }

      e.target.value = newValue;
    }
    onChange(e);
  };

  return (
    <span
      {...wrapperProps}
      className={getClassName('bpk-phone-input', wrapperProps.className)}
    >
      <div>
        <BpkLabel
          htmlFor={dialingCodeProps.id}
          disabled={disabled}
          className={getClassName('bpk-phone-input__label')}
        >
          {dialingCodeProps.label}
        </BpkLabel>
        {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
        <BpkSelect
          {...commonProps}
          {...dialingCodeProps}
          className={getClassName(dialingCodeProps.className)}
          wrapperClassName={getClassName(dialingCodeProps.wrapperClassName)}
          value={dialingCode}
          onChange={onDialingCodeChange}
        >
          {dialingCodes.map(({ code, description, ...extraDialingProps }) => (
            // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
            <option key={code} value={code} {...extraDialingProps}>
              {description}
            </option>
          ))}
        </BpkSelect>
      </div>
      <div className={getClassName('bpk-phone-input__phone-number')}>
        <BpkLabel
          htmlFor={id}
          disabled={disabled}
          className={getClassName('bpk-phone-input__label')}
        >
          {label}
        </BpkLabel>
        {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
        <BpkInput
          {...commonProps}
          {...rest}
          id={id}
          name={name}
          value={displayValue}
          type={INPUT_TYPES.tel}
          onChange={handleChange}
          className={getClassName(className)}
        />
      </div>
    </span>
  );
};

BpkPhoneInput.propTypes = {
  dialingCode: PropTypes.string.isRequired,
  dialingCodeProps: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    className: PropTypes.string,
    wrapperClassName: PropTypes.string,
  }).isRequired,
  dialingCodes: PropTypes.arrayOf(
    PropTypes.shape({ code: PropTypes.string, description: PropTypes.string }),
  ).isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onDialingCodeChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  dialingCodeMask: PropTypes.bool,
  disabled: PropTypes.bool,
  large: PropTypes.bool,
  valid: PropTypes.bool,
  wrapperProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

BpkPhoneInput.defaultProps = {
  className: null,
  disabled: false,
  dialingCodeMask: false,
  large: false,
  valid: null,
  wrapperProps: {},
};

export default BpkPhoneInput;
