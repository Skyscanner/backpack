import React, { PropTypes } from 'react';

import './bpk-table.scss';

const BpkTable = props => <table className="bpk-table">{props.children}</table>;

BpkTable.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BpkTable;
