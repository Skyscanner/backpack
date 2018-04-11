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

import { Link } from 'react-router';
import BpkModal from 'bpk-component-modal';
import { cssModules } from 'bpk-react-utils';
import MenuIcon from 'bpk-component-icon/lg/menu';
import React, { Component, type Node } from 'react';
import BpkCloseButton from 'bpk-component-close-button';
import BpkBreakpoint, { BREAKPOINTS } from 'bpk-component-breakpoint';

import NavList from './NavList';
import SectionsList from './SectionsList';
import STYLES from './SideNavLayout.scss';
import { type Links } from './common-types';
import BackpackLogoWhite from '../../static/backpack-logo-white.svg';

const getClassName = cssModules(STYLES);

type Props = {
  activeSection: string,
  children: Node,
  links: Links,
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

    const sidebar = (
      <section className={getClassName('bpkdocs-side-nav-layout__sidebar')}>
        <div
          className={getClassName('bpkdocs-side-nav-layout__sidebar-header')}
        >
          <BpkBreakpoint query={BREAKPOINTS.TABLET}>
            {isTablet =>
              isTablet && (
                <BpkCloseButton
                  label="Close menu"
                  onClick={this.onMobileModalClose}
                  className={getClassName(
                    'bpkdocs-side-nav-layout__close-button',
                  )}
                />
              )
            }
          </BpkBreakpoint>
          <Link
            to="/"
            className={getClassName('bpkdocs-side-nav-layout__logo-link')}
          >
            <img
              src={`/${BackpackLogoWhite}`}
              className={getClassName('bpkdocs-side-nav-layout__logo')}
              alt="Backpack Logo"
            />
          </Link>
        </div>
        <div
          className={getClassName('bpkdocs-side-nav-layout__sidebar-content')}
        >
          <SectionsList
            activeSection={activeSection}
            expanded={sectionListExpanded}
            onMenuToggle={this.onMenuToggle}
            onSectionChange={this.onSectionChange}
            className={getClassName('bpkdocs-side-nav-layout__section-list')}
          />
          <NavList
            links={links.filter(link =>
              [
                activeSection,
                ...(activeSection === 'COMPONENTS'
                  ? ['NATIVE', 'UTILITIES']
                  : []),
              ].includes(link.id),
            )}
            dimmed={sectionListExpanded}
            onClick={this.onMobileModalClose}
          />
        </div>
      </section>
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
                  document.getElementById('application-container')
                }
                renderTarget={() => document.getElementById('portal-target')}
                className={getClassName('bpkdocs-side-nav-layout__modal')}
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
          <div className={getClassName('bpkdocs-side-nav-layout__hero')}>
            <BpkBreakpoint query={BREAKPOINTS.ABOVE_TABLET}>
              {aboveTablet =>
                !aboveTablet && (
                  <BpkCloseButton
                    label="Open menu"
                    onClick={this.onHamburgerClick}
                    customIcon={MenuIcon}
                    className={getClassName(
                      'bpkdocs-side-nav-layout__hamburger',
                    )}
                  />
                )
              }
            </BpkBreakpoint>
          </div>
          {children}
        </section>
      </section>
    );
  }
}
