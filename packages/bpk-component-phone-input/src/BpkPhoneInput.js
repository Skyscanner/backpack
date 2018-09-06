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

/* @flow */

import React from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'bpk-react-utils';
import BpkInput, { INPUT_TYPES } from 'bpk-component-input';
import BpkSelect from 'bpk-component-select';

import STYLES from './BpkPhoneInput.css';

const getClassName = cssModules(STYLES);

export type Props = {
  dialingCode: string,
  dialingCodeProps: {
    id: string,
    name: string,
    className?: string,
    wrapperClassName?: string,
  },
  dialingCodes: Array<{ code: string, description: string }>,
  id: string,
  name: string,
  onChange: (SyntheticInputEvent<HTMLElement>) => mixed,
  onDialingCodeChange: (SyntheticInputEvent<HTMLElement>) => mixed,
  value: string,
  className: ?string,
  disabled: boolean,
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
    id,
    className,
    name,
    disabled,
    onChange,
    onDialingCodeChange,
    valid,
    value,
    large,
    dialingCode,
    dialingCodes,
    dialingCodeProps,
    wrapperProps,
    ...rest
  } = props;

  const commonProps: CommonProps = {
    valid,
    large: !!large,
    disabled: !!disabled,
  };

  return (
    <span
      {...wrapperProps}
      className={getClassName('bpk-phone-input', wrapperProps.className)}
    >
      <BpkSelect
        {...commonProps}
        {...dialingCodeProps}
        wrapperClassName={getClassName(
          'bpk-phone-input__dialing-code-wrapper',
          dialingCodeProps.wrapperClassName,
        )}
        className={getClassName(
          'bpk-phone-input__dialing-code',
          dialingCodeProps.className,
        )}
        value={dialingCode}
        onChange={onDialingCodeChange}
      >
        {dialingCodes.map(({ code, description, ...extraDialingProps }) => (
          <option key={code} value={code} {...extraDialingProps}>
            {description}
          </option>
        ))}
      </BpkSelect>
      <BpkInput
        {...commonProps}
        {...rest}
        id={id}
        name={name}
        className={getClassName('bpk-phone-input__phone-number', className)}
        value={value}
        type={INPUT_TYPES.number}
        onChange={onChange}
      />
    </span>
  );
};

BpkPhoneInput.propTypes = {
  dialingCode: PropTypes.string.isRequired,
  dialingCodeProps: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  dialingCodes: PropTypes.arrayOf(
    PropTypes.shape({ code: PropTypes.string, description: PropTypes.string }),
  ).isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onDialingCodeChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  large: PropTypes.bool,
  valid: PropTypes.bool,
  wrapperProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

BpkPhoneInput.defaultProps = {
  className: null,
  disabled: false,
  large: false,
  valid: null,
  wrapperProps: {},
};

export default BpkPhoneInput;
