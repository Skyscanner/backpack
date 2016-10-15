import React, { PropTypes } from 'react';

const BpkTableHead = props => <thead>{props.children}</thead>;

BpkTableHead.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BpkTableHead;
