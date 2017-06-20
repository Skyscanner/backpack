import PropTypes from 'prop-types';
import React from 'react';

import './bpk-blockquote.scss';

const BpkBlockquote = props => <blockquote className="bpk-blockquote">{props.children}</blockquote>;

BpkBlockquote.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default BpkBlockquote;
