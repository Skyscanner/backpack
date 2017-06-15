import PropTypes from 'prop-types';
import React from 'react';
import { cssModules } from 'bpk-react-utils';

import STYLES from './bpk-horizontal-nav-item.scss';

const getClassName = cssModules(STYLES);

const BpkHorizontalNavItem = (props) => {
  const classNames = [getClassName('bpk-horizontal-nav__link')];
  const { children, className, selected, href, ...rest } = props;

  if (selected) { classNames.push(getClassName('bpk-horizontal-nav__link--selected')); }
  if (className) { classNames.push(className); }

  const clickableElement = href
    ? <a href={href} className={classNames.join(' ')} aria-disabled={selected} {...rest}>{children}</a>
    : <button type="button" className={classNames.join(' ')} disabled={selected} {...rest}>{children}</button>;

  return <li className={getClassName('bpk-horizontal-nav__item')}>{clickableElement}</li>;
};

BpkHorizontalNavItem.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  selected: PropTypes.bool,
  href: PropTypes.string,
};

BpkHorizontalNavItem.defaultProps = {
  className: null,
  selected: false,
  href: null,
};

export default BpkHorizontalNavItem;
