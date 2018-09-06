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
import { Link, withRouter } from 'react-router-dom';

import AnimateHeight from 'bpk-animate-height';
import BpkHorizontalNav, {
  BpkHorizontalNavItem,
} from 'bpk-component-horizontal-nav';
import { cssModules } from 'bpk-react-utils';

import BpkRouterLink from 'bpk-component-router-link';
import BpkLink from 'bpk-component-link';

import STYLES from './Header.css';

import * as ROUTES from '../../constants/routes';
import HamburgerButton from './HamburgerButton';

const getClassName = cssModules(STYLES);

const headerLinks = [
  { to: ROUTES.USING_BACKPACK, children: 'Using Backpack' },
  { to: ROUTES.TOKENS, children: 'Tokens' },
  { to: ROUTES.COMPONENTS, children: 'Components' },
  {
    href: 'https://github.com/Skyscanner/backpack',
    children: 'GitHub',
    blank: true,
  },
];

const toNavList = (links, hideOnTablet) => {
  const classNames = [getClassName('bpkdocs-header__nav-list')];

  if (hideOnTablet) {
    classNames.push(getClassName('bpkdocs-header__nav-list--hide-on-tablet'));
  }

  return (
    <BpkHorizontalNav className={classNames.join(' ')}>
      {links.map((link = {}) => (
        <NavItemWithRouter key={link.to || link.href} link={link} />
      ))}
    </BpkHorizontalNav>
  );
};

const NavItemWithRouter = withRouter(props => {
  const { link, router } = props;
  const selected = link.to && router.isActive(link.to);
  const itemProps = {
    selected,
  };
  if (link.to) {
    itemProps.onClick = () => {
      router.push(link.to);
    };
  } else {
    itemProps.href = link.href;
    itemProps.target = link.blank ? '_blank' : '_self';
  }

  return (
    <BpkHorizontalNavItem {...itemProps}>{link.children}</BpkHorizontalNavItem>
  );
});

const Header = props => {
  const { expanded, onHamburgerClick } = props;
  const listClassNames = [
    getClassName('bpkdocs-header__nav-list'),
    getClassName('bpkdocs-header__nav-list--show-on-tablet'),
  ];

  return (
    <header className={getClassName('bpkdocs-header')}>
      <div className={getClassName('bpkdocs-header__wrapper')}>
        <Link
          to={ROUTES.HOME}
          className={getClassName('bpkdocs-header__logo-link')}
        >
          <span className={getClassName('bpkdocs-header__logo-link-text')}>
            Backpack
          </span>
        </Link>
        <nav className={getClassName('bpkdocs-header__hamburger-container')}>
          <HamburgerButton
            expanded={expanded}
            onClick={onHamburgerClick}
            className={getClassName('bpkdocs-header__hamburger')}
          />
          {toNavList(headerLinks, true)}
        </nav>
      </div>
      <AnimateHeight height={expanded ? 'auto' : 0} duration={200}>
        <ul className={listClassNames.join(' ')}>
          {headerLinks.map((link = {}) => (
            <li
              key={link.to || link.href}
              className={getClassName('bpkdocs-header__nav-list-item')}
            >
              {link.to ? (
                <BpkRouterLink
                  className={getClassName('bpkdocs-header__nav-list-link')}
                  {...link}
                />
              ) : (
                <BpkLink
                  className={getClassName('bpkdocs-header__nav-list-link')}
                  {...link}
                />
              )}
            </li>
          ))}
        </ul>
      </AnimateHeight>
    </header>
  );
};

Header.propTypes = {
  expanded: PropTypes.bool.isRequired,
  onHamburgerClick: PropTypes.func.isRequired,
};

export default Header;
