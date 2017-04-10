import React, { PropTypes } from 'react';

import './bpk-card.scss';

const BpkCardSimple = (props) => {
  const classNames = ['bpk-card'];
  const { children, href, padded, ...rest } = props;

  if (padded) { classNames.push('bpk-card--padded'); }

  const classNameFinal = classNames.join(' ');

  if (href) {
    return <a href={href} className={classNameFinal} {...rest}>{children}</a>;
  }

  return <div role="button" className={classNameFinal} {...rest}>{children}</div>;
};

BpkCardSimple.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  padded: PropTypes.bool,
};

BpkCardSimple.defaultProps = {
  href: null,
  padded: true,
};

export default BpkCardSimple;
