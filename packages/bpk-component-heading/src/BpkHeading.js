import PropTypes from 'prop-types';
import React from 'react';

import './bpk-heading.scss';

const BpkHeading = (props) => {
  const classNames = [`bpk-heading-${props.level}`];

  if (props.className) { classNames.push(props.className); }
  if (!props.bottomMargin) { classNames.push('bpk-heading--no-bottom-margin'); }

  return (
    <props.level className={classNames.join(' ')} id={props.id}>
      {props.children}
    </props.level>
  );
};

BpkHeading.propTypes = {
  children: PropTypes.node.isRequired,
  level: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']).isRequired,
  className: PropTypes.string,
  id: PropTypes.string,
  bottomMargin: PropTypes.bool,
};

BpkHeading.defaultProps = {
  className: null,
  id: null,
  bottomMargin: true,
};

export default BpkHeading;
