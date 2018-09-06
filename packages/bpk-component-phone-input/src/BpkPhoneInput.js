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
import PropTypes from 'prop-types';
import { cssModules } from 'bpk-react-utils';
import BpkInput, { INPUT_TYPES } from 'bpk-component-input';
import BpkLabel from 'bpk-component-label';
import BpkSelect from 'bpk-component-select';

import STYLES from './BpkPhoneInput.css';

const getClassName = cssModules(STYLES);

export type Props = {
  dialingCodeId: string,
  dialingCodeProps: {
    id: string,
    name: string,
    label: string,
    className?: string,
    wrapperClassName?: string,
  },
  dialingCodes: Array<{ id: string, code: string, description: string }>,
  id: string,
  name: string,
  label: string,
  onChange: (SyntheticInputEvent<HTMLElement>) => mixed,
  onDialingCodeChange: (SyntheticInputEvent<HTMLElement>) => mixed,
  value: string,
  className: ?string,
  disabled: boolean,
  large: boolean,
  valid: ?boolean,
  wrapperProps: { [string]: any },
  flagOnly: ?boolean,
  countryCodeMask: ?boolean,
};

type CommonProps = {
  large: boolean,
  disabled: boolean,
  valid: ?boolean,
};

// This function get the size value of the dialingCode to resize the field correctly
const widthForDialingCode = (large, foundDialingCode) => {
  // This sizeConstant is an average character size for each size of field
  const averageLetterSize = large ? 8 : 6;
  if (foundDialingCode && foundDialingCode.description) {
    // Here we calculate the width for the field (N.B 100 is an assumed padding value)
    return averageLetterSize * foundDialingCode.description.length + 100;
  }
  return averageLetterSize + 100;
};

const BpkPhoneInput = (props: Props) => {
  const {
    id,
    className,
    name,
    label,
    disabled,
    onChange,
    onDialingCodeChange,
    valid,
    value,
    large,
    dialingCodeId,
    dialingCodes,
    dialingCodeProps,
    wrapperProps,
    flagOnly,
    countryCodeMask,
    ...rest
  } = props;

  const commonProps: CommonProps = {
    valid,
    large: !!large,
    disabled: !!disabled,
  };

  let dialingCodeText = '';

  const foundDialingCode = dialingCodes.find(
    dialCodeItem => dialCodeItem.id === dialingCodeId,
  );

  if (foundDialingCode) {
    dialingCodeText = foundDialingCode.code;
  }

  let phoneDisplayValue;

  if (countryCodeMask) {
    if (value.startsWith('+')) {
      if (value.startsWith(`+${dialingCodeText} `)) {
        phoneDisplayValue = value;
      } else if (value.charAt(`+${dialingCodeText}`.length) !== ' ') {
        const phoneNumber = value.slice(`+${dialingCodeText}`.length);
        phoneDisplayValue = `+${dialingCodeText} ${phoneNumber}`;
      } else {
        const phoneValue = value.split(' ')[1];

        phoneDisplayValue = phoneValue
          ? `+${dialingCodeText} ${phoneValue}`
          : `+${dialingCodeText} `;
      }
    } else if (value.includes(dialingCodeText)) {
      phoneDisplayValue = `+${value}`;
    } else {
      phoneDisplayValue = `+${dialingCodeText} ${value}`;
    }
  } else {
    phoneDisplayValue = value;
  }

  return (
    <span
      {...wrapperProps}
      className={getClassName(
        'bpk-phone-input',
        large && 'bpk-phone-input--large',
        wrapperProps.className,
      )}
    >
      <BpkLabel
        htmlFor={dialingCodeProps.id}
        className={getClassName('bpk-phone-input__dialing-code-label')}
        disabled={disabled}
      >
        {dialingCodeProps.label}
      </BpkLabel>
      <BpkSelect
        {...commonProps}
        {...dialingCodeProps}
        className={getClassName(
          'bpk-phone-input__dialing-code',
          dialingCodeProps.className,
        )}
        wrapperClassName={getClassName(dialingCodeProps.wrapperClassName)}
        value={dialingCodeId}
        onChange={onDialingCodeChange}
        imageOnly={flagOnly}
        style={
          !flagOnly
            ? {
                width: `${widthForDialingCode(large, foundDialingCode)}px`,
              }
            : null
        }
      >
        {dialingCodes.map(
          ({ id: codeId, description, ...extraDialingProps }) => (
            <option key={codeId} value={codeId} {...extraDialingProps}>
              {description}
            </option>
          ),
        )}
      </BpkSelect>
      <BpkLabel
        htmlFor={id}
        className={getClassName('bpk-phone-input__phone-number-label')}
        disabled={disabled}
      >
        {label}
      </BpkLabel>
      <BpkInput
        {...commonProps}
        {...rest}
        id={id}
        name={name}
        value={phoneDisplayValue}
        type={INPUT_TYPES.tel}
        onChange={onChange}
        className={getClassName('bpk-phone-input__phone-number', className)}
      />
    </span>
  );
};

BpkPhoneInput.propTypes = {
  dialingCodeId: PropTypes.string.isRequired,
  dialingCodeProps: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
  }).isRequired,
  dialingCodes: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string,
      description: PropTypes.string,
      id: PropTypes.string,
    }),
  ).isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onDialingCodeChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  large: PropTypes.bool,
  valid: PropTypes.bool,
  wrapperProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  flagOnly: PropTypes.bool,
  countryCodeMask: PropTypes.bool,
};

BpkPhoneInput.defaultProps = {
  className: null,
  disabled: false,
  large: false,
  valid: null,
  wrapperProps: {},
  flagOnly: false,
  countryCodeMask: false,
};

export default BpkPhoneInput;
