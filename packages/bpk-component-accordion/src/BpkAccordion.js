import PropTypes from 'prop-types';
import React from 'react';

import './bpk-accordion.scss';

const BpkAccordion = (props) => {
  const classNames = ['bpk-accordion'];
  const { children, className, ...rest } = props;

  if (className) { classNames.push(className); }

  return (
    <dl className={classNames.join(' ')} {...rest}>
      {children}
    </dl>
  );
};

BpkAccordion.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

BpkAccordion.defaultProps = {
  className: null,
};

export default BpkAccordion;
