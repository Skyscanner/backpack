import React, { PropTypes } from 'react';
import BpkLabel from 'bpk-component-label';
import BpkFormValidation from 'bpk-component-form-validation';

import './bpk-fieldset.scss';

const BpkFieldset = (props) => {
  const {
    id,
    label,
    control,
    valid,
    validationMessage,
    isCheckbox,
    containerProps = {},
    validationProps,
    ...rest
  } = props;

  const containerClassNames = ['bpk-fieldset'];
  const validationMessageId = `${id}_validation_message`;

  // Explicit check for false primitive value as undefined is
  // treated as neither valid nor invalid
  const isInvalid = valid === false;

  // https://facebook.github.io/react/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized
  const Control = control;

  if (containerProps.className) {
    containerClassNames.push(containerProps.className);
    delete containerProps.className;
  }

  const dynamicControlProps = isCheckbox
    ? { label }
    : { valid };

  return (
    <fieldset className={containerClassNames.join(' ')} {...containerProps}>
      {!isCheckbox && <BpkLabel label={label} htmlFor={id} />}
      <Control
        id={id}
        aria-describedby={validationMessage && isInvalid ? validationMessageId : null}
        {...dynamicControlProps}
        {...rest}
      />
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
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  control: PropTypes.func.isRequired,
  className: PropTypes.string,
  valid: PropTypes.bool,
  validationMessage: PropTypes.string,
  isCheckbox: PropTypes.bool,
  containerProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  validationProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

BpkFieldset.defaultProps = {
  className: null,
  valid: null,
  validationMessage: null,
  isCheckbox: false,
  containerProps: {},
  validationProps: {},
};

export default BpkFieldset;

