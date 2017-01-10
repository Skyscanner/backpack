import React, { PropTypes } from 'react';

import './bpk-link.scss';

const BpkButtonLink = (props) => {
  const {
    children,
    className,
    onClick,
    white,
    ...rest
  } = props;
  const classNames = ['bpk-link'];

  if (white) { classNames.push('bpk-link--white'); }
  if (className) { classNames.push(className); }

  return (
    <button type="button" className={classNames.join(' ')} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

BpkButtonLink.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  white: PropTypes.bool,
};

BpkButtonLink.defaultProps = {
  className: null,
  white: false,
};

export default BpkButtonLink;
