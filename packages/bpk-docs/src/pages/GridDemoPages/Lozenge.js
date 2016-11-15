import React, { PropTypes } from 'react';

import './grid-demo-pages.scss';

const Lozenge = ({ children }) => (
  <div className="bpkdocs-grid-demo-pages__lozenge">{children}</div>
);

Lozenge.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Lozenge;
