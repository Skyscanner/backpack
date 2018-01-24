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

import PropTypes from 'prop-types';
import React, { cloneElement, type Element } from 'react';
import BpkLabel from 'bpk-component-label';
import BpkFormValidation from 'bpk-component-form-validation';
import { cssModules } from 'bpk-react-utils';

import STYLES from './bpk-fieldset.scss';

const getClassName = cssModules(STYLES);

export type Props = {
  // TODO: Should this be something like `Element<typeof BpkInput | typeof BpkCheckbox | typeof BpkSelect>`?
  children: Element<*>,
  label: ?string,
  disabled: boolean,
  valid: ?boolean,
  required: boolean,
  className: ?string,
  validationMessage: ?string,
  isCheckbox: boolean,
  validationProps: {},
};

const BpkFieldset = (props: Props) => {
  const {
    children,
    label,
    className,
    validationMessage,
    valid,
    required,
    isCheckbox,
    validationProps,
    disabled,
    ...rest
  } = props;

  if (!children) {
    return null;
  }

  const classNames = [getClassName('bpk-fieldset')];
  const validationMessageId = `${children.props.id}_validation_message`;

  // Explicit check for false primitive value as undefined is
  // treated as neither valid nor invalid
  const isInvalid = isCheckbox
    ? valid === false
    : children.props.valid === false;

  const childrenProps: {
    required?: boolean,
    'aria-required'?: boolean,
    'aria-describedby'?: string,
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
  }

  const clonedChildren = cloneElement(children, childrenProps);

  if (className) {
    classNames.push(className);
  }

  return (
    <fieldset className={classNames.join(' ')} {...rest}>
      {!isCheckbox && (
        <BpkLabel
          htmlFor={children.props.id}
          required={required}
          disabled={disabled}
        >
          {label}
        </BpkLabel>
      )}
      {clonedChildren}
      {validationMessage && (
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

const labelPropType = (
  props: { isCheckbox?: boolean, label?: ?string },
  propName: string,
) => {
  const { isCheckbox, label } = props;
  if (!label && !isCheckbox) {
    return new Error(
      `\`${propName}\` is required when \`isCheckbox\` is false.`,
    ); // eslint-disable-line max-len
  }
  return false;
};

export const BpkFieldsetPropTypes = {
  children: PropTypes.element.isRequired,
  label: labelPropType,
  disabled: PropTypes.bool,
  valid: PropTypes.bool,
  required: PropTypes.bool,
  className: PropTypes.string,
  validationMessage: PropTypes.string,
  isCheckbox: PropTypes.bool,
  validationProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

BpkFieldset.propTypes = BpkFieldsetPropTypes;

export const BpkFieldsetDefaultPropTypes = {
  label: null,
  disabled: false,
  valid: null,
  required: false,
  className: null,
  validationMessage: null,
  isCheckbox: false,
  validationProps: {},
};
BpkFieldset.defaultProps = BpkFieldsetDefaultPropTypes;

export default BpkFieldset;
