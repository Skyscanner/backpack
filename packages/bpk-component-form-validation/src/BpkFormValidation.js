import PropTypes from 'prop-types';
import React from 'react';
import AnimateHeight from 'bpk-animate-height';

import './bpk-form-validation.scss';

const BpkFormValidation = (props) => {
  const classNames = ['bpk-form-validation'];
  const { children, expanded, isCheckbox, className, containerProps, ...rest } = props;

  if (expanded) { classNames.push('bpk-form-validation--appear'); }
  if (isCheckbox) { classNames.push('bpk-form-validation--is-checkbox'); }
  if (className) { classNames.push(className); }

  return (
    <AnimateHeight
      duration={200}
      height={expanded ? 'auto' : 0}
      transitionOverflow="visible"
      {...containerProps}
    >
      <div className="bpk-form-validation__container">
        <div className={classNames.join(' ')} {...rest}>{children}</div>
      </div>
    </AnimateHeight>
  );
};

BpkFormValidation.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  expanded: PropTypes.bool.isRequired,
  isCheckbox: PropTypes.bool,
  className: PropTypes.string,
  containerProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

BpkFormValidation.defaultProps = {
  isCheckbox: false,
  className: null,
  containerProps: {},
};

export default BpkFormValidation;
