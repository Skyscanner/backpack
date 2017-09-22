/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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
import { IndexLink } from 'react-router';

import BpkLink from 'bpk-component-link';
import AnimateHeight from 'bpk-animate-height';
import BpkRouterLink from 'bpk-component-router-link';
import { BpkGridContainer, BpkGridRow, BpkGridColumn } from 'bpk-component-grid';
import { cssModules } from 'bpk-react-utils';

import STYLES from './Header.scss';
import * as ROUTES from './../../constants/routes';
import HamburgerButton from './HamburgerButton';

const getClassName = cssModules(STYLES);

const headerLinks = [
  { to: ROUTES.USING_BACKPACK, children: 'Using Backpack' },
  { to: ROUTES.STYLE, children: 'Style' },
  { to: ROUTES.TOKENS, children: 'Tokens' },
  { to: ROUTES.COMPONENTS, children: 'Components' },
  { to: ROUTES.RESOURCES, children: 'Resources' },
  { href: 'https://github.com/Skyscanner/backpack', children: 'Github', blank: true },
];

const toNavList = (links, hideOnTablet) => {
  const classNames = [getClassName('bpkdocs-header__nav-list')];

  if (hideOnTablet) { classNames.push(getClassName('bpkdocs-header__nav-list--hide-on-tablet')); }

  return (
    <ul className={classNames.join(' ')}>
      {links.map((link = {}) => (
        <li key={link.to || link.href} className={getClassName('bpkdocs-header__nav-list-item')}>
          {link.to
            ? <BpkRouterLink className={getClassName('bpkdocs-header__nav-list-link')} {...link} />
            : <BpkLink className={getClassName('bpkdocs-header__nav-list-link')} {...link} />}
        </li>
        ))}
    </ul>
  );
};

const Header = (props) => {
  const { expanded, onHamburgerClick } = props;

  return (
    <header className={getClassName('bpkdocs-header')}>
      <BpkGridContainer>
        <BpkGridRow>
          <BpkGridColumn width={2} mobileWidth={6}>
            <IndexLink to={ROUTES.HOME} className={getClassName('bpkdocs-header__logo-link')}>
              <span className={getClassName('bpkdocs-header__logo-link-text')}>Backpack</span>
            </IndexLink>
          </BpkGridColumn>
          <BpkGridColumn width={10} mobileWidth={6}>
            <nav className={getClassName('bpkdocs-header__nav')}>
              <HamburgerButton
                expanded={expanded}
                onClick={onHamburgerClick}
                className={getClassName('bpkdocs-header__hamburger')}
              />
              {toNavList(headerLinks, true)}
            </nav>
          </BpkGridColumn>
        </BpkGridRow>
      </BpkGridContainer>
      <AnimateHeight
        height={expanded ? 'auto' : 0}
        duration={200}
      >
        <BpkGridContainer className={getClassName('bpkdocs-header__tablet-nav-container')}>
          <BpkGridRow>
            <BpkGridColumn width={12} padded={false}>
              <nav>
                {toNavList(headerLinks)}
              </nav>
            </BpkGridColumn>
          </BpkGridRow>
        </BpkGridContainer>
      </AnimateHeight>
    </header>
  );
};


Header.propTypes = {
  expanded: PropTypes.bool.isRequired,
  onHamburgerClick: PropTypes.func.isRequired,
};

export default Header;
