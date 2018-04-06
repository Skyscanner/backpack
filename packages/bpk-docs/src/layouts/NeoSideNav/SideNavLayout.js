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

import React, { Component, type Node } from 'react';
import { cssModules } from 'bpk-react-utils';
import { Link } from 'react-router';

import SectionsList from './SectionsList';
import NavList from './NavList';
import NavBurgerMenu from './NavBurgerMenu';
import BackpackLogoWhite from '../../static/backpack-logo-white.svg';
import STYLES from './SideNavLayout.scss';
import { type Links } from './common-types';

const getClassName = cssModules(STYLES);

type Props = {
  activeSection: string,
  children: Node,
  links: Links,
};

type State = {
  menuExpanded: boolean,
  burgerExpanded: boolean,
};

export default class SideNavLayout extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      burgerExpanded: false,
      menuExpanded: false,
    };
  }

  onMenuToggle = () => {
    this.setState(prevState => ({
      menuExpanded: !prevState.menuExpanded,
    }));
  };

  onBurgerToggle = () => {
    this.setState(prevState => ({
      burgerExpanded: !prevState.burgerExpanded,
    }));
  };

  render() {
    const { activeSection, children, links } = this.props;
    const { menuExpanded, burgerExpanded } = this.state;

    return (
      <section className={getClassName('bpkdocs-side-nav-layout__wrapper')}>
        <section className={getClassName('bpkdocs-side-nav-layout__sidebar')}>
          <Link to="/">
            <img
              src={`/${BackpackLogoWhite}`}
              className={getClassName('bpkdocs-side-nav-layout__logo')}
              alt="Backpack Logo"
            />
          </Link>
          <div
            className={getClassName('bpkdocs-side-nav-layout__sidebar-content')}
          >
            <SectionsList
              activeSection={activeSection}
              expanded={menuExpanded}
              onMenuToggle={this.onMenuToggle}
              className={getClassName('bpkdocs-side-nav-layout__section-list')}
            />
            <NavList links={links} dimmed={menuExpanded} />
          </div>
        </section>
        <section className={getClassName('bpkdocs-side-nav-layout__content')}>
          {children}
        </section>

        <section
          className={getClassName('bpkdocs-side-nav-layout__mobile-nav')}
        >
          <NavBurgerMenu
            links={links}
            activeSection={activeSection}
            menuExpanded={menuExpanded}
            burgerExpanded={burgerExpanded}
            onBurgerToggle={this.onBurgerToggle}
            onMenuToggle={this.onMenuToggle}
          />
        </section>
      </section>
    );
  }
}
