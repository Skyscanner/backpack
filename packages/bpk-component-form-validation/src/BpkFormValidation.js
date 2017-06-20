import PropTypes from 'prop-types';
import React from 'react';
import AnimateHeight from 'bpk-animate-height';
import { cssModules } from 'bpk-react-utils';

import STYLES from './bpk-form-validation.scss';

const getClassName = cssModules(STYLES);

const BpkFormValidation = (props) => {
  const classNames = [getClassName('bpk-form-validation')];
  const { children, expanded, isCheckbox, className, containerProps, ...rest } = props;

  if (expanded) { classNames.push(getClassName('bpk-form-validation--appear')); }
  if (isCheckbox) { classNames.push(getClassName('bpk-form-validation--is-checkbox')); }
  if (className) { classNames.push(className); }

  return (
    <AnimateHeight
      duration={200}
      height={expanded ? 'auto' : 0}
      transitionOverflow="visible"
      {...containerProps}
    >
      <div className={getClassName('bpk-form-validation__container')}>
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
