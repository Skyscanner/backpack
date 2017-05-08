import PropTypes from 'prop-types';
import React from 'react';

const BpkTableBody = props => <tbody>{props.children}</tbody>;

BpkTableBody.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BpkTableBody;
