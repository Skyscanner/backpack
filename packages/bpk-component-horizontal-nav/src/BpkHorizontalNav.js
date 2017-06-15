import PropTypes from 'prop-types';
import React from 'react';
import { cssModules } from 'bpk-react-utils';

import STYLES from './bpk-horizontal-nav.scss';

const getClassName = cssModules(STYLES);

const BpkHorizontalNav = (props) => {
  const classNames = [getClassName('bpk-horizontal-nav')];
  const listClassNames = [getClassName('bpk-horizontal-nav__list')];
  const { children, className, spaceAround, ...rest } = props;

  // Outer classNames
  if (className) { classNames.push(className); }

  // Inner "list" classNames
  if (spaceAround) { listClassNames.push(getClassName('bpk-horizontal-nav__list--space-around')); }

  return (
    <nav className={classNames.join(' ')} {...rest}>
      <ul className={listClassNames.join(' ')}>{children}</ul>
    </nav>
  );
};

BpkHorizontalNav.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  spaceAround: PropTypes.bool,
};

BpkHorizontalNav.defaultProps = {
  className: null,
  spaceAround: false,
};

export default BpkHorizontalNav;

