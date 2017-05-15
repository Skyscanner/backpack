import PropTypes from 'prop-types';
import React from 'react';
import { Link, PropTypes as RouterPropTypes } from 'react-router';

import './bpk-router-link.scss';

const BpkRouterLink = (props) => {
  const classNames = ['bpk-router-link'];
  const { children, to, className, ...rest } = props;

  if (className) { classNames.push(className); }

  return (
    <Link
      className={classNames.join(' ')}
      activeClassName="bpk-router-link--active"
      to={to}
      {...rest}
    >
      {children}
    </Link>
  );
};

BpkRouterLink.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.oneOfType([
    PropTypes.shape(RouterPropTypes.locationShape),
    PropTypes.string,
  ]).isRequired,
  className: PropTypes.string,
};

BpkRouterLink.defaultProps = {
  className: null,
};

export default BpkRouterLink;
