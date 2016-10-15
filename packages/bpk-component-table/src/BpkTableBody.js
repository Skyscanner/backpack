import React, { PropTypes } from 'react';

const BpkTableBody = props => <tbody>{props.children}</tbody>;

BpkTableBody.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BpkTableBody;
