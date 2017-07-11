import PropTypes from 'prop-types';
import React from 'react';
import { cssModules } from 'bpk-react-utils';

import STYLES from './bpk-horizontal-nav-item.scss';

const getClassName = cssModules(STYLES);

const BpkHorizontalNavItem = (props) => {
  const classNames = [getClassName('bpk-horizontal-nav__item')];
  const innerClassNames = [getClassName('bpk-horizontal-nav__link')];
  const { children, className, selected, spaceAround, href, ...rest } = props;

  // Outer classNames
  if (spaceAround) { classNames.push(getClassName('bpk-horizontal-nav__item--space-around')); }

  // Inner classNames
  if (selected) { innerClassNames.push(getClassName('bpk-horizontal-nav__link--selected')); }
  if (className) { innerClassNames.push(className); }

  const clickableElement = href
    ? <a href={href} className={innerClassNames.join(' ')} aria-disabled={selected} {...rest}>{children}</a>
    : <button type="button" className={innerClassNames.join(' ')} disabled={selected} {...rest}>{children}</button>;

  return (
    <li
      role="tab"
      aria-selected={selected ? 'true' : 'false'}
      className={classNames.join(' ')}
    >
      {clickableElement}
    </li>
  );
};

BpkHorizontalNavItem.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  selected: PropTypes.bool,
  spaceAround: PropTypes.bool,
  href: PropTypes.string,
};

BpkHorizontalNavItem.defaultProps = {
  className: null,
  selected: false,
  spaceAround: false,
  href: null,
};

export default BpkHorizontalNavItem;
