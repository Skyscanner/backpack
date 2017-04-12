import React, { PropTypes } from 'react';

import './bpk-horizontal-nav.scss';

const BpkHorizontalNav = (props) => {
  const classNames = ['bpk-horizontal-nav'];
  const { children, className, ...rest } = props;

  if (className) { classNames.push(className); }

  return (
    <nav className={classNames.join(' ')} {...rest}>
      <ul className="bpk-horizontal-nav__list">{children}</ul>
    </nav>
  );
};

BpkHorizontalNav.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

BpkHorizontalNav.defaultProps = {
  className: null,
};

export default BpkHorizontalNav;

