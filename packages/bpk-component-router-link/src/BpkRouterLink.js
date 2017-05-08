import RouterPropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router';

import './bpk-router-link.scss';

const BpkRouterLink = props => (
  <Link
    className="bpk-router-link"
    activeClassName="bpk-router-link--active"
    to={props.to}
    onClick={props.onClick}
  >
    {props.children}
  </Link>
);

BpkRouterLink.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  to: PropTypes.oneOfType([
    PropTypes.shape(RouterPropTypes.locationShape),
    PropTypes.string,
  ]).isRequired,
  onClick: PropTypes.func,
};

BpkRouterLink.defaultProps = {
  onClick: null,
};

export default BpkRouterLink;
