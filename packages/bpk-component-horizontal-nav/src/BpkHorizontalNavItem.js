/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2019 Skyscanner Ltd
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
/* @flow strict */

import React, { Component, type Node } from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'bpk-react-utils';

import STYLES from './BpkHorizontalNavItem.css';

const getClassName = cssModules(STYLES);

export type Props = {
  children: Node,
  selected: boolean,
  spaceAround: boolean,
  disabled: boolean,
  href: ?string,
  className: ?string,
};

// In order to be able to access refs on the HorizontalNavItems, they need to be a fully defined
// React Component class.
// eslint-disable-next-line react/prefer-stateless-function
class BpkHorizontalNavItem extends Component<Props> {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    selected: PropTypes.bool,
    spaceAround: PropTypes.bool,
    href: PropTypes.string,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    className: null,
    selected: false,
    spaceAround: false,
    href: null,
    disabled: false,
  };

  render() {
    const {
      children,
      className,
      disabled,
      href,
      selected,
      spaceAround,
      ...rest
    } = this.props;

    const classNames = getClassName(
      'bpk-horizontal-nav__item',
      spaceAround && 'bpk-horizontal-nav__item--space-around',
    );
    const innerClassNames = getClassName(
      'bpk-horizontal-nav__link',
      selected && 'bpk-horizontal-nav__link--selected',
      disabled && 'bpk-horizontal-nav__link--disabled',
      className,
    );

    const clickableElement = href ? (
      <a
        href={href}
        className={innerClassNames}
        aria-disabled={selected || disabled}
        {...rest}
      >
        {children}
      </a>
    ) : (
      <button
        type="button"
        className={innerClassNames}
        disabled={selected || disabled}
        {...rest}
      >
        {children}
      </button>
    );

    return (
      <li
        role="tab"
        aria-selected={selected ? 'true' : 'false'}
        className={classNames}
      >
        {clickableElement}
      </li>
    );
  }
}

const themeAttributes = [
  'horizontalNavLinkColor',
  'horizontalNavLinkHoverColor',
  'horizontalNavLinkActiveColor',
  'horizontalNavLinkSelectedColor',
  'horizontalNavBarSelectedColor',
];

export { themeAttributes };

export default BpkHorizontalNavItem;
