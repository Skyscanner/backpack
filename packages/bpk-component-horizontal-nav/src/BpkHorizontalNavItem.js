/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* @flow */

import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'bpk-react-utils';

import STYLES from './bpk-horizontal-nav-item.scss';

const getClassName = cssModules(STYLES);

export type Props = {
  children: Node,
  selected: boolean,
  spaceAround: boolean,
  href: ?string,
  className: ?string,
};

const BpkHorizontalNavItem = (props: Props) => {
  const classNames = [getClassName('bpk-horizontal-nav__item')];
  const innerClassNames = [getClassName('bpk-horizontal-nav__link')];
  const { children, className, selected, spaceAround, href, ...rest } = props;

  // Outer classNames
  if (spaceAround) {
    classNames.push(getClassName('bpk-horizontal-nav__item--space-around'));
  }

  // Inner classNames
  if (selected) {
    innerClassNames.push(getClassName('bpk-horizontal-nav__link--selected'));
  }
  if (className) {
    innerClassNames.push(className);
  }

  const clickableElement = href ? (
    <a
      href={href}
      className={innerClassNames.join(' ')}
      aria-disabled={selected}
      {...rest}
    >
      {children}
    </a>
  ) : (
    <button
      type="button"
      className={innerClassNames.join(' ')}
      disabled={selected}
      {...rest}
    >
      {children}
    </button>
  );

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

const themeAttributes = [
  'horizontalNavLinkColor',
  'horizontalNavLinkHoverColor',
  'horizontalNavLinkActiveColor',
  'horizontalNavLinkSelectedColor',
  'horizontalNavBarSelectedColor',
];

export { themeAttributes };

export default BpkHorizontalNavItem;
