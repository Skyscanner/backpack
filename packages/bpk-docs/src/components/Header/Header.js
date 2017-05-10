import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { IndexLink } from 'react-router';

import BpkLink from 'bpk-component-link';
import BpkRouterLink from 'bpk-component-router-link';
import { BpkGridContainer, BpkGridRow, BpkGridColumn } from 'bpk-component-grid';
import BpkBreakpoint, { BREAKPOINTS } from 'bpk-component-breakpoint';
import BpkButton from 'bpk-component-button';
import CloseIcon from 'bpk-component-icon/sm/close';
import MenuIcon from 'bpk-component-icon/sm/menu';
import { withButtonAlignment } from 'bpk-component-icon';
import AnimateHeight from 'bpk-animate-height';

import './header.scss';
import * as ROUTES from '../../constants/routes';

const CloseButtonIcon = withButtonAlignment(CloseIcon);
const MenuButtonIcon = withButtonAlignment(MenuIcon);

const headerLinks = [
  { to: ROUTES.USING_BACKPACK, children: 'Using Backpack' },
  { to: ROUTES.DOCS, children: 'Components' },
  { to: ROUTES.PATTERNS, children: 'Patterns' },
  { to: ROUTES.RESOURCES, children: 'Resources' },
  { href: 'http://git.prod.skyscanner.local/backpack/backpack', children: 'GitLab', blank: true },
];

const toHorizontalNav = links => (
  <nav>
    <ul className="bpkdocs-header__nav-list">
      {links.map((link = {}) => (
        <li key={link.to || link.href} className="bpkdocs-header__nav-list-item">
          {link.to ? <BpkRouterLink {...link} /> : <BpkLink {...link} />}
        </li>
      ))}
    </ul>
  </nav>
);

const toVerticalNav = links => (
  <ul className="bpkdocs-header__hamburger-nav-list">
    {links.map((link = {}) => (
      <li key={link.to || link.href} className="bpkdocs-header__hamburger-nav-list-item">
        {link.to ? <BpkRouterLink {...link} /> : <BpkLink {...link} />}
      </li>
    ))}
  </ul>
);

const HamburgerButton = ({
  expanded,
  onClick,
}) => (
  <nav className="bpkdocs-header__hamburger-nav">
    <BpkButton
      link
      className="bpkdocs-header__hamburger-nav-toggle"
      aria-expanded={expanded}
      aria-controls="menu-list"
      onClick={onClick}
      aria-label={expanded ? 'Close menu' : 'Open menu'}
    >{ expanded ? <CloseButtonIcon /> : <MenuButtonIcon /> }</BpkButton>

  </nav>
);

HamburgerButton.propTypes = {
  expanded: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

class Header extends Component {
  constructor() {
    super();

    this.state = { expanded: true };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState(state => ({ expanded: !state.expanded }));
  }

  render() {
    const { expanded } = this.state;

    return (
      <header className="bpkdocs-header">
        <BpkGridContainer>
          <BpkGridRow>
            <BpkGridColumn width={3}>
              <IndexLink to={ROUTES.HOME} className="bpkdocs-header__logo-link">
                <span className="visuallyhidden">Backpack</span>
              </IndexLink>
            </BpkGridColumn>
            <BpkGridColumn width={9}>
              <BpkBreakpoint query={BREAKPOINTS.TABLET}>
                {isActive => (
                  isActive
                    ? <HamburgerButton expanded={expanded} onClick={this.toggleMenu} />
                    : toHorizontalNav(headerLinks)
                  )
                }
              </BpkBreakpoint>
            </BpkGridColumn>
          </BpkGridRow>
        </BpkGridContainer>
        <BpkBreakpoint query={BREAKPOINTS.TABLET}>
          {isActive => (
            isActive ?
              <AnimateHeight
                height={expanded ? 'auto' : 0}
                duration={200}
              >
                <BpkGridContainer>
                  <BpkGridRow className="bpkdocs-header__hamburger-nav-container">
                    <BpkGridColumn width={12} padded={false}>
                      { toVerticalNav(headerLinks) }
                    </BpkGridColumn>
                  </BpkGridRow>
                </BpkGridContainer>
              </AnimateHeight>
            : null
            )
          }
        </BpkBreakpoint>
      </header>
    );
  }
}

export default Header;
