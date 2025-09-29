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

import type { ReactElement } from 'react';
import { cloneElement } from 'react';

// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkFormValidation from '../../bpk-component-form-validation';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkLabel from '../../bpk-component-label';
import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkFieldset.module.scss';

const getClassName = cssModules(STYLES);

export interface BpkFieldsetProps {
  // Child element - typically BpkInput, BpkCheckbox, BpkSelect, etc.
  children: ReactElement<any>;
  label?: string | null;
  disabled?: boolean;
  valid?: boolean | null;
  required?: boolean;
  className?: string | null;
  validationMessage?: string | null;
  isCheckbox?: boolean;
  validationProps?: Record<string, any>;
  description?: string | null;
}

const BpkFieldset = ({
  children,
  className = null,
  description = null,
  disabled = false,
  isCheckbox = false,
  label = null,
  required = false,
  valid = null,
  validationMessage = null,
  validationProps = {},
  ...rest
}: BpkFieldsetProps) => {
  if (!children) {
    return null;
  }

  // Extract the child's ID, handling both direct id prop and inputProps.id
  let childId: string = children.props.id;
  if (
    children.props.inputProps &&
    children.props.inputProps.id &&
    typeof children.props.inputProps.id === 'string'
  ) {
    childId = children.props.inputProps.id;
  }

  const classNames = [getClassName('bpk-fieldset')];
  const validationMessageId = `${childId}_validation_message`;
  const descriptionId = `${childId}_description`;

  const isValid = isCheckbox ? valid : children.props.valid;

  // Explicit check for false primitive value as undefined is
  // treated as neither valid nor invalid
  const isInvalid = isValid === false;

  const childrenProps: {
    required?: boolean;
    'aria-required'?: boolean;
    'aria-describedby'?: string;
    disabled?: boolean;
  } = {
    disabled,
  };

  if (isCheckbox) {
    childrenProps.required = required;
  } else {
    childrenProps['aria-required'] = required;
  }

  if (validationMessage && isInvalid) {
    childrenProps['aria-describedby'] = validationMessageId;
  } else if (description) {
    childrenProps['aria-describedby'] = descriptionId;
  }

  const clonedChildren = cloneElement(children, childrenProps);

  if (className) {
    classNames.push(className);
  }

  return (
    <fieldset className={classNames.join(' ')} {...rest}>
      {!isCheckbox && (
        <div className={getClassName('bpk-fieldset__label')}>
          <BpkLabel
            htmlFor={childId}
            required={required}
            disabled={disabled}
            valid={isValid}
          >
            {label}
          </BpkLabel>
        </div>
      )}
      {clonedChildren}
      {description && (
        <span
          className={getClassName('bpk-fieldset__description')}
          id={descriptionId}
        >
          {description}
        </span>
      )}
      {!disabled && validationMessage && (
        <BpkFormValidation
          id={validationMessageId}
          expanded={isInvalid}
          isCheckbox={isCheckbox}
          {...validationProps}
        >
          {validationMessage}
        </BpkFormValidation>
      )}
    </fieldset>
  );
};

export default BpkFieldset;
