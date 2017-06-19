import PropTypes from 'prop-types';
import React from 'react';
import { cssModules } from 'bpk-react-utils';

import STYLES from './bpk-code.scss';

const getClassName = cssModules(STYLES);

const BpkCode = props => <code className={getClassName('bpk-code')}>{props.children}</code>;

BpkCode.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default BpkCode;
