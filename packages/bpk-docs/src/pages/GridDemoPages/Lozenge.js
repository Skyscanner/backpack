import PropTypes from 'prop-types';
import React from 'react';
import { cssModules } from 'bpk-react-utils';

import STYLES from './grid-demo-pages.scss';

const getClassName = cssModules(STYLES);

const Lozenge = ({ children }) => (
  <div className={getClassName('bpkdocs-grid-demo-pages__lozenge')}>{children}</div>
);

Lozenge.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Lozenge;
