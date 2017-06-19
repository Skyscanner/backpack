import PropTypes from 'prop-types';
import React from 'react';
import { cssModules } from 'bpk-react-utils';

import STYLES from './bpk-link.scss';

const getClassName = cssModules(STYLES);

const BpkButtonLink = (props) => {
  const {
    children,
    className,
    onClick,
    white,
    ...rest
  } = props;
  const classNames = [getClassName('bpk-link')];

  if (white) { classNames.push(getClassName('bpk-link--white')); }
  if (className) { classNames.push(className); }

  return (
    <button type="button" className={classNames.join(' ')} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

BpkButtonLink.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  white: PropTypes.bool,
};

BpkButtonLink.defaultProps = {
  className: null,
  white: false,
};

export default BpkButtonLink;
