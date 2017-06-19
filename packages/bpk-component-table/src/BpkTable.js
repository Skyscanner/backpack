import PropTypes from 'prop-types';
import React from 'react';
import { cssModules } from 'bpk-react-utils';

import STYLES from './bpk-table.scss';

const getClassName = cssModules(STYLES);

const BpkTable = (props) => {
  const classNames = [getClassName('bpk-table')];
  const { children, className, ...rest } = props;
  if (className) { classNames.push(className); }

  return <table className={classNames.join(' ')} {...rest}>{children}</table>;
};

BpkTable.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

BpkTable.defaultProps = {
  className: null,
};

export default BpkTable;
