import React, { PropTypes } from 'react';

import './bpk-link.scss';

const BpkButtonLink = (props) => {
  const classNames = ['bpk-link'];

  if (props.white) { classNames.push('bpk-link--white'); }

  return (
    <button
      type="button"
      className={classNames.join(' ')}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

BpkButtonLink.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  white: PropTypes.bool,
};

BpkButtonLink.defaultProps = {
  white: false,
};

export default BpkButtonLink;
