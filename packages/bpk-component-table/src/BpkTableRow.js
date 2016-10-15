import React, { PropTypes } from 'react';

const BpkTableRow = props => <tr>{props.children}</tr>;

BpkTableRow.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BpkTableRow;
