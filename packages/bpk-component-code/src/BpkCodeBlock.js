import PropTypes from 'prop-types';
import React from 'react';

import './bpk-code.scss';

const BpkCodeBlock = props => (
  <pre className="bpk-code__pre">
    <code className="bpk-code bpk-code--block">{props.children}</code>
  </pre>
);

BpkCodeBlock.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default BpkCodeBlock;
