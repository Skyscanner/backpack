import PropTypes from 'prop-types';
import React from 'react';
import { cssModules } from 'bpk-react-utils';

import STYLES from './bpk-table.scss';

const getClassName = cssModules(STYLES);

const BpkTableHeadCell = props =>
  <th
    className={['bpk-table__cell', 'bpk-table__cell--head'].map(getClassName).join(' ')}
  >
    {props.children}
  </th>;

BpkTableHeadCell.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BpkTableHeadCell;
