import PropTypes from 'prop-types';
import React from 'react';
import { cssModules } from 'bpk-react-utils';
import BpkMobileScrollContainer from 'bpk-component-mobile-scroll-container';

import STYLES from './bpk-horizontal-nav.scss';

const getClassName = cssModules(STYLES);

const BpkHorizontalNav = (props) => {
  const classNames = [getClassName('bpk-horizontal-nav')];
  const { children, className, ...rest } = props;

  // Outer classNames
  if (className) { classNames.push(className); }

  return (
    <BpkMobileScrollContainer
      innerContainerTagName="nav"
      className={classNames.join(' ')}
      {...rest}
    >
      <ul className={getClassName('bpk-horizontal-nav__list')}>{children}</ul>
    </BpkMobileScrollContainer>
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

