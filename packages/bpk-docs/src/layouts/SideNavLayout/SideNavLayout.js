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

import BpkModal from 'bpk-component-modal';
import { cssModules } from 'bpk-react-utils';
import React, { Component, type Node } from 'react';
import BpkBreakpoint, { BREAKPOINTS } from 'bpk-component-breakpoint';

import Sidebar from './Sidebar';
import STYLES from './SideNavLayout.css';
import MainHeroImage from './MainHeroImage';
import { type Category } from './common-types';

const getClassName = cssModules(STYLES);

type Props = {
  activeSection: string,
  children: Node,
  links: Array<Category>,
};

type State = {
  modalOpen: boolean,
  sectionListExpanded: boolean,
  activeSection: string,
};

export default class SideNavLayout extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      modalOpen: false,
      sectionListExpanded: false,
      activeSection: this.props.activeSection,
    };
  }

  onMenuToggle = () => {
    this.setState(prevState => ({
      sectionListExpanded: !prevState.sectionListExpanded,
    }));
  };

  onSectionChange = (activeSection: string) => {
    this.setState(() => ({
      activeSection,
      sectionListExpanded: false,
    }));
  };

  onMobileModalClose = () => {
    this.setState(() => ({ modalOpen: false }));
  };

  onHamburgerClick = () => {
    this.setState(() => ({ modalOpen: true }));
  };

  render() {
    const { children, links } = this.props;
    const { modalOpen, sectionListExpanded, activeSection } = this.state;
    const { hero } = links.filter(link => link.id === activeSection)[0] || {
      hero: null,
    };

    const sidebar = (
      <Sidebar
        activeSection={activeSection}
        links={links}
        sectionListExpanded={sectionListExpanded}
        onMobileModalClose={this.onMobileModalClose}
        onMenuToggle={this.onMenuToggle}
        onSectionChange={this.onSectionChange}
      />
    );

    return (
      <section className={getClassName('bpkdocs-side-nav-layout')}>
        <BpkBreakpoint query={BREAKPOINTS.TABLET}>
          {isTablet =>
            isTablet ? (
              <BpkModal
                id="mobile-nav-menu"
                isOpen={modalOpen}
                onClose={this.onMobileModalClose}
                fullScreen
                showHeader={false}
                getApplicationElement={() =>
                  document.getElementById('pagewrap')
                }
                renderTarget={() => document.getElementById('portal-target')}
                className={getClassName('bpkdocs-side-nav-layout__modal')}
                contentClassName={getClassName(
                  'bpkdocs-side-nav-layout__modal-content',
                )}
                padded={false}
              >
                {sidebar}
              </BpkModal>
            ) : (
              <div
                className={getClassName(
                  'bpkdocs-side-nav-layout__sidebar-destop-wrapper',
                )}
              >
                {sidebar}
              </div>
            )
          }
        </BpkBreakpoint>
        <section className={getClassName('bpkdocs-side-nav-layout__main')}>
          <MainHeroImage
            onHamburgerClick={this.onHamburgerClick}
            heroImage={hero}
          />
          {children}
        </section>
      </section>
    );
  }
}
