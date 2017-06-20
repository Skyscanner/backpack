import PropTypes from 'prop-types';
import React from 'react';
import { cssModules } from 'bpk-react-utils';

import STYLES from './bpk-table.scss';

const getClassName = cssModules(STYLES);

const BpkTable = props => <table className={getClassName('bpk-table')}>{props.children}</table>;

BpkTable.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BpkTable;
