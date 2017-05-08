import PropTypes from 'prop-types';
import React from 'react';

import './grid-demo-pages.scss';

const Lozenge = ({ children }) => (
  <div className="bpkdocs-grid-demo-pages__lozenge">{children}</div>
);

Lozenge.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Lozenge;
