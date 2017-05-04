import React, { PropTypes } from 'react';

import './bpk-textarea.scss';

const BpkTextarea = (props) => {
  const classNames = ['bpk-textarea'];
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
