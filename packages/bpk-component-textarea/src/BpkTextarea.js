import PropTypes from 'prop-types';
import React from 'react';
import { cssModules } from 'bpk-react-utils';

import STYLES from './bpk-textarea.scss';

const getClassName = cssModules(STYLES);

const BpkTextarea = (props) => {
  const classNames = [getClassName('bpk-textarea')];
  const { className, ...rest } = props;

  if (className) { classNames.push(className); }

  return <textarea className={classNames.join(' ')} {...rest} />;
};

BpkTextarea.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
};

BpkTextarea.defaultProps = {
  className: null,
};

export default BpkTextarea;
