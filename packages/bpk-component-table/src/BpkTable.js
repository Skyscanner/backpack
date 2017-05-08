import PropTypes from 'prop-types';
import React from 'react';

import './bpk-table.scss';

const BpkTable = props => <table className="bpk-table">{props.children}</table>;

BpkTable.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BpkTable;
