import React, { PropTypes } from 'react';

import './bpk-paragraph.scss';

const BpkParagraph = (props) => {
  const classNames = ['bpk-paragraph'];
  const { className, ...rest } = props;

  if (className) { classNames.push(className); }

  return <p className={classNames.join(' ')} {...rest} />;
};

BpkParagraph.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

BpkParagraph.defaultProps = {
  className: null,
};

export default BpkParagraph;

