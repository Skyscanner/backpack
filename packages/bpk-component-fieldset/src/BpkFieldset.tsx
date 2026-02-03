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

import { cloneElement } from 'react';
import type { ReactElement } from 'react';

// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkFormValidation from '../../bpk-component-form-validation';
import BpkLabel from '../../bpk-component-label';
import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkFieldset.module.scss';

const getClassName = cssModules(STYLES);

type BaseProps = {
  children: ReactElement;
  disabled?: boolean;
  valid?: boolean | null;
  required?: boolean;
  className?: string | null;
  validationMessage?: string | null;
  validationProps?: Record<string, unknown>;
  description?: string | null;
  [rest: string]: any; // Inexact rest. See decisions/inexact-rest.md
};

type CheckboxFieldsetProps = BaseProps & {
  isCheckbox: true;
  /**
   * Optional when `isCheckbox` is true.
   */
  label?: string | null;
};

type NonCheckboxFieldsetProps = BaseProps & {
  /**
   * When `isCheckbox` is false or omitted, `label` is required.
   */
  isCheckbox?: false | undefined;
  label: string;
};

export type Props = CheckboxFieldsetProps | NonCheckboxFieldsetProps;

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
}: Props) => {
  if (!children) {
    return null;
  }

  // Get the child's id, checking both direct props and inputProps
  const childProps = children.props as {
    id?: string;
    inputProps?: { id?: string };
    valid?: boolean | null;
  };

  let childId: string = childProps.id || '';
  if (childProps.inputProps?.id && typeof childProps.inputProps.id === 'string') {
    childId = childProps.inputProps.id;
  }

  const classNames = [getClassName('bpk-fieldset')];
  const validationMessageId = `${childId}_validation_message`;
  const descriptionId = `${childId}_description`;

  const isValid = isCheckbox ? valid : childProps.valid;

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


