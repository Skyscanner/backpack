import PropTypes from 'prop-types';
import React from 'react';
import { cssModules } from 'bpk-react-utils';

import STYLES from './bpk-code-block.scss';

const getClassName = cssModules(STYLES);

const BpkCodeBlock = ({ children }) => {
  const classNames = ['bpk-code', 'bpk-code--block'].map(className => getClassName(className));

  return (
    <pre className={getClassName('bpk-code__pre')}>
      <code className={classNames.join(' ')}>{children}</code>
    </pre>
  );
};

BpkCodeBlock.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default BpkCodeBlock;
