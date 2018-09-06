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

import React from 'react';
import PropTypes from 'prop-types';
import MenuIcon from 'bpk-component-icon/sm/menu';
import CloseIcon from 'bpk-component-icon/sm/close';
import { withButtonAlignment } from 'bpk-component-icon';
import { cssModules } from 'bpk-react-utils';

import STYLES from './HamburgerButton.css';

const getClassName = cssModules(STYLES);

const CloseButtonIcon = withButtonAlignment(CloseIcon);
const MenuButtonIcon = withButtonAlignment(MenuIcon);

const HamburgerButton = props => {
  const classNames = [getClassName('bpkdocs-hamburger-button')];
  const { expanded, onClick, className, ...rest } = props;

  if (className) {
    classNames.push(className);
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames.join(' ')}
      aria-expanded={expanded}
      aria-label={expanded ? 'Close menu' : 'Open menu'}
      {...rest}
    >
      {expanded ? <CloseButtonIcon /> : <MenuButtonIcon />}
    </button>
  );
};

HamburgerButton.propTypes = {
  expanded: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

HamburgerButton.defaultProps = {
  className: null,
};

export default HamburgerButton;
