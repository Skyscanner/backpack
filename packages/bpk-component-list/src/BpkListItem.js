import React, { PropTypes } from 'react';

import './bpk-list.scss';

const BpkListItem = props => <li className="bpk-list__item">{props.children}</li>;

BpkListItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default BpkListItem;
