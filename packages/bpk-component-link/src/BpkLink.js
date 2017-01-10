import React, { PropTypes } from 'react';

import './bpk-link.scss';

const BpkLink = (props) => {
  const {
    children,
    className,
    href,
    onClick,
    blank,
    white,
    ...rest
  } = props;

  const classNames = ['bpk-link'];
  const target = blank ? '_blank' : null;

  if (white) { classNames.push('bpk-link--white'); }
  if (className) { classNames.push(className); }

  return (
    <a className={classNames.join(' ')} href={href} onClick={onClick} target={target} {...rest}>
      {children}
    </a>
  );
};

BpkLink.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  blank: PropTypes.bool,
  white: PropTypes.bool,
};

BpkLink.defaultProps = {
  className: null,
  onClick: null,
  blank: false,
  white: false,
};

export default BpkLink;
