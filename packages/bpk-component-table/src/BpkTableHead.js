import PropTypes from 'prop-types';
import React from 'react';

const BpkTableHead = props => <thead>{props.children}</thead>;

BpkTableHead.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BpkTableHead;
