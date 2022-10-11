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
import React, { cloneElement, type Element } from 'react';

import BpkLabel from '../../bpk-component-label';
import BpkFormValidation from '../../bpk-component-form-validation';
import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkFieldset.module.scss';

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
  description: ?string,
};

const BpkFieldset = (props: Props) => {
  const {
    children,
    className,
    description,
    disabled,
    isCheckbox,
    label,
    required,
    valid,
    validationMessage,
    validationProps,
    ...rest
  } = props;

  if (!children) {
    return null;
  }

  // $FlowIgnore[prop-missing] - As children could be any element and might not have a value which is safe
  let childId: string = children.props.id;
  if (
    // Flow is being dumb here and doesn't let us do this check, even though it's perfectly safe!
    // $FlowIgnore[prop-missing]
    // $FlowIgnore[sketchy-null-mixed]
    children.props.inputProps &&
    // $FlowIgnore[sketchy-null-mixed]
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
  } else if (description) {
    childrenProps['aria-describedby'] = descriptionId;
  }

  const clonedChildren = cloneElement(children, childrenProps);

  if (className) {
    classNames.push(className);
  }

  return (
    // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
    <fieldset className={classNames.join(' ')} {...rest}>
      {!isCheckbox && (
        <BpkLabel
          className={getClassName('bpk-fieldset__label')}
          htmlFor={childId}
          required={required}
          disabled={disabled}
          valid={isValid}
        >
          {/* $FlowIgnore[incompatible-type] - As this prop is only required when isCheckbox is false our labelPropType handles checking this is null or not. */}
          {label}
        </BpkLabel>
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
        // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
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
    );
  }
  return false;
};

export const propTypes = {
  children: PropTypes.element.isRequired,
  label: labelPropType,
  disabled: PropTypes.bool,
  valid: PropTypes.bool,
  required: PropTypes.bool,
  className: PropTypes.string,
  validationMessage: PropTypes.string,
  isCheckbox: PropTypes.bool,
  validationProps: PropTypes.object,
  description: PropTypes.string,
};

export const defaultProps = {
  label: null,
  disabled: false,
  valid: null,
  required: false,
  className: null,
  validationMessage: null,
  isCheckbox: false,
  validationProps: {},
  description: null,
};

BpkFieldset.propTypes = { ...propTypes };
BpkFieldset.defaultProps = { ...defaultProps };

export default BpkFieldset;
