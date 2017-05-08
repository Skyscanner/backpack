import PropTypes from 'prop-types';
import React from 'react';

import './bpk-table.scss';

const BpkTableCell = props => <td className="bpk-table__cell">{props.children}</td>;

BpkTableCell.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BpkTableCell;
