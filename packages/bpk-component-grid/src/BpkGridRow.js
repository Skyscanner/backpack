import PropTypes from 'prop-types';
import React from 'react';
import { cssModules } from 'bpk-react-utils';

import STYLES from './bpk-grid-row.scss';

const getClassName = cssModules(STYLES);

const BpkGridRow = (props) => {
  const classNames = [getClassName('bpk-grid__row')];
  const { children, padded, className, ...rest } = props;

  if (padded) { classNames.push(getClassName('bpk-grid__row--padded')); }
  if (className) { classNames.push(className); }

  return <div className={classNames.join(' ')} {...rest}>{children}</div>;
};

BpkGridRow.propTypes = {
  children: PropTypes.node.isRequired,
  padded: PropTypes.bool,
  className: PropTypes.string,
};

BpkGridRow.defaultProps = {
  padded: true,
  className: null,
};

export default BpkGridRow;
