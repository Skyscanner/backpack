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

import PropTypes from 'prop-types';
import React, { type Node } from 'react';
import { cssModules } from 'bpk-react-utils';
import BpkMobileScrollContainer from 'bpk-component-mobile-scroll-container';

import STYLES from './BpkHorizontalNav.css';

const getClassName = cssModules(STYLES);

export type Props = {
  children: Node,
  className: ?string,
  leadingScrollIndicatorClassName: ?string,
  trailingScrollIndicatorClassName: ?string,
};

const BpkHorizontalNav = (props: Props) => {
  const classNames = [getClassName('bpk-horizontal-nav')];
  const {
    children,
    className,
    leadingScrollIndicatorClassName,
    trailingScrollIndicatorClassName,
    ...rest
  } = props;

  // Outer classNames
  if (className) {
    classNames.push(className);
  }

  return (
    <BpkMobileScrollContainer
      innerContainerTagName="nav"
      className={classNames.join(' ')}
      leadingIndicatorClassName={leadingScrollIndicatorClassName}
      trailingIndicatorClassName={trailingScrollIndicatorClassName}
      {...rest}
    >
      <ul className={getClassName('bpk-horizontal-nav__list')}>{children}</ul>
    </BpkMobileScrollContainer>
  );
};

BpkHorizontalNav.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  leadingScrollIndicatorClassName: PropTypes.string,
  trailingScrollIndicatorClassName: PropTypes.string,
};

BpkHorizontalNav.defaultProps = {
  className: null,
  leadingScrollIndicatorClassName: null,
  trailingScrollIndicatorClassName: null,
};

export default BpkHorizontalNav;
