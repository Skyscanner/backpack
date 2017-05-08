import PropTypes from 'prop-types';
import React from 'react';

const BpkTableRow = props => <tr>{props.children}</tr>;

BpkTableRow.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BpkTableRow;
