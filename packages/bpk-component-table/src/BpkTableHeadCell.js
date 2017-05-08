import PropTypes from 'prop-types';
import React from 'react';

import './bpk-table.scss';

const BpkTableHeadCell = props => <th className="bpk-table__cell bpk-table__cell--head">{props.children}</th>;

BpkTableHeadCell.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BpkTableHeadCell;
