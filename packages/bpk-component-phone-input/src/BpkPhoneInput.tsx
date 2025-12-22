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

import BpkInput, { INPUT_TYPES } from '../../bpk-component-input';
import BpkLabel from '../../bpk-component-label';
import BpkSelect from '../../bpk-component-select';
import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkPhoneInput.module.scss';

const getClassName = cssModules(STYLES);

export type Props = {
  dialingCode: string,
  /**
   * Note that `id`, `name` and `label` are required but more properties can be provided,
   * e.g. `dialingCodeProps={{ id: 'id', name: 'name', label: 'label', className: 'some-class' }}`.
   * All properties will be forwarded to the underlying `BpkSelect` component.
   */
  dialingCodeProps: {
    id: string,
    name: string,
    label: string,
    className?: string,
    wrapperClassName?: string,
  },
  /**
   * Each object **must** have a `code` and `description`, but can have more properties and those
   * will be forwarded the the `option` element they represent.
   * Note that, when using the `dialingCodeMask` option, all `dialingCodes` values must have a `numberPrefix` attribute.
   */
  dialingCodes: Array<{
    code: string,
    description: string,
    numberPrefix: string | null,
  }>,
  id: string,
  name: string,
  label: string,
  onChange: (SyntheticInputEvent<HTMLElement>) => mixed,
  onDialingCodeChange: (SyntheticInputEvent<HTMLElement>) => mixed,
  value: string,
  className: string | null,
  disabled: boolean,
  dialingCodeMask: boolean,
  large: boolean,
  valid: boolean | undefined,
  wrapperProps: { [string]: any },
};

type CommonProps = {
  large: boolean,
  disabled: boolean,
  valid: boolean | undefined,
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
        <div className={getClassName('bpk-phone-input__label')}>
          <BpkLabel
            htmlFor={dialingCodeProps.id}
            disabled={disabled}
          >
            {dialingCodeProps.label}
          </BpkLabel>
        </div>
        { }
        <BpkSelect
          {...commonProps}
          {...dialingCodeProps}
          // TODO: className to be removed
          // eslint-disable-next-line @skyscanner/rules/forbid-component-props
          className={getClassName(dialingCodeProps.className)}
          wrapperClassName={getClassName(dialingCodeProps.wrapperClassName)}
          value={dialingCode}
          onChange={onDialingCodeChange}
        >
          {dialingCodes.map(({ code, description, ...extraDialingProps }) => (
            <option key={code} value={code} {...extraDialingProps}>
              {description}
            </option>
          ))}
        </BpkSelect>
      </div>
      <div className={getClassName('bpk-phone-input__phone-number')}>
        <div className={getClassName('bpk-phone-input__label')}>
          <BpkLabel
            htmlFor={id}
            disabled={disabled}
          >
            {label}
          </BpkLabel>
        </div>
        { }
        <BpkInput
          {...commonProps}
          {...rest}
          id={id}
          name={name}
          value={displayValue}
          type={INPUT_TYPES.tel}
          onChange={handleChange}
          // TODO: className to be removed
          // eslint-disable-next-line @skyscanner/rules/forbid-component-props
          className={getClassName(className)}
        />
      </div>
    </span>
  );
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
