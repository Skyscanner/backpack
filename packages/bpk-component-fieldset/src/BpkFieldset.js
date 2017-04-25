import React, { cloneElement, PropTypes } from 'react';
import BpkLabel from 'bpk-component-label';
import BpkFormValidation from 'bpk-component-form-validation';

import './bpk-fieldset.scss';

const BpkFieldset = (props) => {
  const classNames = ['bpk-fieldset'];
  const { children, label, className, validationMessage, valid, isCheckbox, validationProps, ...rest } = props;

  if (!children) {
    return null;
  }

  const validationMessageId = `${children.props.id}_validation_message`;

  // Explicit check for false primitive value as undefined is
  // treated as neither valid nor invalid
  const isInvalid = isCheckbox
    ? valid === false
    : children.props.valid === false;

  const ariaProps = validationMessage && isInvalid
      ? { 'aria-describedby': validationMessageId }
      : {};

  const clonedChildren = cloneElement(children, { ...ariaProps });

  if (className) { classNames.push(className); }

  return (
    <fieldset className={classNames.join(' ')} {...rest}>
      {!isCheckbox && (
        <BpkLabel label={label} htmlFor={children.props.id} />
      )}
      {clonedChildren}
      {validationMessage && (
        <BpkFormValidation
          id={validationMessageId}
          expand={isInvalid}
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
  className: PropTypes.string,
  validationMessage: PropTypes.string,
  isCheckbox: PropTypes.bool,
  validationProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

BpkFieldset.defaultProps = {
  label: null,
  valid: null,
  className: null,
  validationMessage: null,
  isCheckbox: false,
  validationProps: {},
};

export default BpkFieldset;

