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

import React from 'react';
import { cssModules } from 'bpk-react-utils';
import { Link } from 'react-router';
import BpkModal from 'bpk-component-modal';
import MenuIcon from 'bpk-component-icon/lg/menu';
import CloseIcon from 'bpk-component-icon/lg/close';
import { withButtonAlignment } from 'bpk-component-icon';

import SectionsList from './SectionsList';
import NavList from './NavList';
import BackpackLogoWhite from '../../static/backpack-logo-white.svg';
import STYLES from './NavBurgerMenu.scss';
import { type Links } from './common-types';

const CloseButtonIcon = withButtonAlignment(CloseIcon);
const MenuButtonIcon = withButtonAlignment(MenuIcon);

const getClassName = cssModules(STYLES);

type Props = {
  activeSection: string,
  links: Links,
  menuExpanded: boolean,
  burgerExpanded: boolean,
  onBurgerToggle: () => mixed,
  onMenuToggle: () => mixed,
};

const NavBurgerMenu = (props: Props) => {
  const {
    activeSection,
    links,
    burgerExpanded,
    menuExpanded,
    onBurgerToggle,
    onMenuToggle,
  } = props;

  const burgerButton = (
    <button
      type="button"
      onClick={onBurgerToggle}
      className={getClassName('bpkdocs-nav-burger-menu__burger-button')}
      aria-expanded={burgerExpanded}
      aria-controls="menu-list"
      aria-label={burgerExpanded ? 'Close menu' : 'Open menu'}
    >
      {burgerExpanded ? (
        <CloseButtonIcon
          className={getClassName(
            'bpkdocs-nav-burger-menu__burger-button--icon',
          )}
        />
      ) : (
        <MenuButtonIcon
          className={getClassName(
            'bpkdocs-nav-burger-menu__burger-button--icon',
          )}
        />
      )}
    </button>
  );

  if (!burgerExpanded) {
    return burgerButton;
  }

  return (
    <div>
      <BpkModal
        id="mobile-nav-menu"
        isOpen={burgerExpanded}
        onClose={() => {
          onBurgerToggle();
        }}
        fullScreen
        showHeader={false}
        getApplicationElement={() =>
          document.getElementById('application-container')
        }
        renderTarget={() => document.getElementById('portal-target')}
        className={getClassName('bpkdocs-nav-burger-menu__dialog')}
      >
        <section className={getClassName('bpkdocs-nav-burger-menu__wrapper')}>
          <section className={getClassName('bpkdocs-nav-burger-menu__sidebar')}>
            <Link to="/">
              <img
                src={`/${BackpackLogoWhite}`}
                className={getClassName('bpkdocs-nav-burger-menu__logo')}
                alt="Backpack Logo"
              />
            </Link>
            <div
              className={getClassName(
                'bpkdocs-nav-burger-menu__sidebar-content',
              )}
            >
              <SectionsList
                activeSection={activeSection}
                expanded={menuExpanded}
                onMenuToggle={onMenuToggle}
                className={getClassName(
                  'bpkdocs-nav-burger-menu__section-list',
                )}
              />
              <NavList
                onSelect={() => {
                  onBurgerToggle();
                }}
                links={links}
                dimmed={menuExpanded}
              />
            </div>
          </section>
        </section>
        {burgerButton}
      </BpkModal>
    </div>
  );
};

export default NavBurgerMenu;
