import React, { PropTypes } from 'react';

import './bpk-table.scss';

const BpkTableCell = props => <td className="bpk-table__cell">{props.children}</td>;

BpkTableCell.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BpkTableCell;
