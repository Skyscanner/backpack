import React, { cloneElement, PropTypes } from 'react';
import BpkLabel from 'bpk-component-label';
import BpkFormValidation from 'bpk-component-form-validation';

import './bpk-fieldset.scss';

const BpkFieldset = (props) => {
  const {
    children,
    label,
    className,
    validationMessage,
    valid,
    required,
    isCheckbox,
    validationProps,
    ...rest
  } = props;

  if (!children) {
    return null;
  }

  const classNames = ['bpk-fieldset'];
  const validationMessageId = `${children.props.id}_validation_message`;

  // Explicit check for false primitive value as undefined is
  // treated as neither valid nor invalid
  const isInvalid = isCheckbox
    ? valid === false
    : children.props.valid === false;

  const childrenProps = {
    'aria-required': required,
  };

  if (isCheckbox && required) {
    childrenProps.required = true;
  }

  if (validationMessage && isInvalid) {
    childrenProps['aria-describedby'] = validationMessageId;
  }

  const clonedChildren = cloneElement(children, childrenProps);

  if (className) { classNames.push(className); }

  return (
    <fieldset className={classNames.join(' ')} {...rest}>
      {!isCheckbox && (
        <BpkLabel htmlFor={children.props.id} required={required}>{label}</BpkLabel>
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

BpkFieldset.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string,
  valid: PropTypes.bool,
  required: PropTypes.bool,
  className: PropTypes.string,
  validationMessage: PropTypes.string,
  isCheckbox: PropTypes.bool,
  validationProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

BpkFieldset.defaultProps = {
  label: null,
  valid: null,
  required: false,
  className: null,
  validationMessage: null,
  isCheckbox: false,
  validationProps: {},
};

export default BpkFieldset;

