import PropTypes from 'prop-types';
import React from 'react';

import './bpk-horizontal-nav.scss';

const BpkHorizontalNav = (props) => {
  const classNames = ['bpk-horizontal-nav'];
  const listClassNames = ['bpk-horizontal-nav__list'];
  const { children, className, spaceAround, ...rest } = props;

  // Outer classNames
  if (className) { classNames.push(className); }

  // Inner "list" classNames
  if (spaceAround) { listClassNames.push('bpk-horizontal-nav__list--space-around'); }

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

