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
import { Link } from 'react-router-dom';
import { cssModules } from 'bpk-react-utils';
import BpkCloseButton from 'bpk-component-close-button';
import BpkBreakpoint, { BREAKPOINTS } from 'bpk-component-breakpoint';

import NavList from './NavList';
import STYLES from './Sidebar.css';
import SectionsList from './SectionsList';
import { type Category } from './common-types';
import BackpackLogoWhite from '../../static/backpack-logo-white.svg';

const getClassName = cssModules(STYLES);

type Props = {
  activeSection: string,
  links: Array<Category>,
  sectionListExpanded: boolean,
  onMobileModalClose: () => mixed,
  onMenuToggle: () => mixed,
  onSectionChange: (activeSection: string) => mixed,
};

export default (props: Props) => {
  const {
    activeSection,
    links,
    sectionListExpanded,
    onMobileModalClose,
    onMenuToggle,
    onSectionChange,
  } = props;

  return (
    <nav className={getClassName('bpkdocs-sidebar')}>
      <div className={getClassName('bpkdocs-sidebar__header')}>
        <BpkBreakpoint query={BREAKPOINTS.TABLET}>
          {isTablet =>
            isTablet && (
              <BpkCloseButton
                label="Close menu"
                onClick={onMobileModalClose}
                className={getClassName('bpkdocs-sidebar__close-button')}
              />
            )
          }
        </BpkBreakpoint>
        <Link to="/" className={getClassName('bpkdocs-sidebar__logo-link')}>
          <img
            src={`/${BackpackLogoWhite}`}
            className={getClassName('bpkdocs-sidebar__logo')}
            alt="Backpack Logo"
          />
        </Link>
      </div>
      <div className={getClassName('bpkdocs-sidebar__content')}>
        <SectionsList
          activeSection={activeSection}
          expanded={sectionListExpanded}
          onMenuToggle={onMenuToggle}
          onSectionChange={onSectionChange}
          className={getClassName('bpkdocs-sidebar__section-list')}
        />
        <NavList
          links={links.filter(link => [activeSection].indexOf(link.id) !== -1)}
          dimmed={sectionListExpanded}
          onClick={onMobileModalClose}
          supportsFiltering={activeSection === 'COMPONENTS'}
        />
      </div>
    </nav>
  );
};
