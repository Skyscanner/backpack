import React, { PropTypes } from 'react';
import BpkLabel from 'bpk-component-label';
import AnimateHeight from 'bpk-animate-height';

import './bpk-fieldset.scss';

const BpkFieldset = (props) => {
  const classNames = ['bpk-fieldset'];
  const { className, id, label, control, valid, validationMessage, ...rest } = props;
  const Control = control;
  const isCheckbox = Control.name === 'BpkCheckbox';

  if (className) { classNames.push(className); }

  const magicProps = isCheckbox ? { label } : { valid };

  return (
    <fieldset className={classNames.join(' ')}>
      {!isCheckbox && <BpkLabel label={label} htmlFor={id} />}
      <Control
        id={id}
        aria-describedby={validationMessage && valid === false ? `${id}_message` : null}
        {...magicProps}
        {...rest}
      />
      {validationMessage && (
        <AnimateHeight
          duration={200}
          height={valid === false ? 'auto' : 0}
          transitionOverflow="visible"
        >
          <span
            id={`${id}_message`}
            className={`bpk-form-validation ${valid === false ? 'bpk-form-validation--appear' : ''}`}
          >
            {validationMessage}
          </span>
        </AnimateHeight>
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
};

BpkFieldset.defaultProps = {
  className: null,
  valid: null,
  validationMessage: null,
};

export default BpkFieldset;

