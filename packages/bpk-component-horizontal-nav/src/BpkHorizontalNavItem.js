/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
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

import PropTypes from 'prop-types';
import { Component } from 'react';
import type { Node } from 'react';


import { HORIZONTAL_NAV_TYPES } from './BpkHorizontalNav';

import STYLES from './BpkHorizontalNavItem.module.scss';

import { cssModules } from '@backpack/bpk-react-utils';

const getClassName = cssModules(STYLES);

export type Props = {
  children: Node,
  disabled: boolean,
  selected: boolean,
  spaceAround: boolean,
  type: $Keys<typeof HORIZONTAL_NAV_TYPES>,
  className: ?string,
  href: ?string,
};

// In order to be able to access refs on the HorizontalNavItems, they need to be a fully defined
// React Component class.
// eslint-disable-next-line react/prefer-stateless-function
class BpkHorizontalNavItem extends Component<Props> {
  render() {
    const {
      children,
      className,
      disabled,
      href,
      selected,
      spaceAround,
      type,
      ...rest
    } = this.props;

    const classNames = getClassName(
      'bpk-horizontal-nav__item',
      spaceAround && 'bpk-horizontal-nav__item--space-around',
    );
    const innerClassNames = getClassName(
      'bpk-horizontal-nav__link',
      `bpk-horizontal-nav__link--${type}`,
      selected && `bpk-horizontal-nav__link--${type}-selected`,
      disabled && `bpk-horizontal-nav__link--${type}-disabled`,
      className,
    );

    const clickableElement = href ? (
      // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
      <a
        href={href}
        className={innerClassNames}
        aria-disabled={disabled}
        role="tab"
        aria-selected={selected ? 'true' : 'false'}
        {...rest}
      >
        {children}
      </a>
    ) : (
      // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
      <button
        type="button"
        className={innerClassNames}
        disabled={disabled}
        role="tab"
        aria-selected={selected ? 'true' : 'false'}
        {...rest}
      >
        {children}
      </button>
    );

    return <div className={classNames}>{clickableElement}</div>;
  }
}

BpkHorizontalNavItem.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  /**
   * **Note:**
   * "disabled" and "selected" are mutually exclusive for true values, i.e. only one of them can be true for a given nav item.
   */
  disabled: PropTypes.bool,
  href: PropTypes.string,
  /**
   * **Note:**
   * "disabled" and "selected" are mutually exclusive for true values, i.e. only one of them can be true for a given nav item.
   */
  selected: PropTypes.bool,
  spaceAround: PropTypes.bool,
  type: PropTypes.oneOf(Object.keys(HORIZONTAL_NAV_TYPES)),
};

BpkHorizontalNavItem.defaultProps = {
  className: null,
  disabled: false,
  href: null,
  selected: false,
  spaceAround: false,
  type: HORIZONTAL_NAV_TYPES.default,
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
