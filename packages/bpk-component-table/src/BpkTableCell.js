import PropTypes from 'prop-types';
import React from 'react';
import { cssModules } from 'bpk-react-utils';

import STYLES from './bpk-table.scss';

const getClassName = cssModules(STYLES);

const BpkTableCell = props => <td className={getClassName('bpk-table__cell')}>{props.children}</td>;

BpkTableCell.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BpkTableCell;
