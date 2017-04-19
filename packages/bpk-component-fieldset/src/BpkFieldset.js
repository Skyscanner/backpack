import React, { PropTypes } from 'react';
import BpkLabel from 'bpk-component-label';

import './bpk-fieldset.scss';

const BpkFieldset = (props) => {
  const classNames = ['bpk-fieldset'];
  const { className, id, label, control, controlProps, valid, validationMessage, ...rest } = props;
  const Control = control;

  if (className) { classNames.push(className); }

  return (
    <fieldset className={classNames.join(' ')} {...rest}>
      <BpkLabel label={label} htmlFor={id} />
      <Control id={id} valid={valid} {...controlProps} />
      {(validationMessage && !valid) && (
        <div>{validationMessage}</div>
      )}
    </fieldset>
  );
};

BpkFieldset.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  control: PropTypes.func.isRequired,
  controlProps: PropTypes.object,
  className: PropTypes.string,
  valid: PropTypes.bool,
  validationMessage: PropTypes.string,
};

BpkFieldset.defaultProps = {
  controlProps: {},
  className: null,
  valid: null,
  validationMessage: null,
};

export default BpkFieldset;

