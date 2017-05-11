import React from 'react';
import PropTypes from 'prop-types';
import { IndexLink } from 'react-router';

import BpkLink from 'bpk-component-link';
import AnimateHeight from 'bpk-animate-height';
import BpkRouterLink from 'bpk-component-router-link';
import BpkBreakpoint, { BREAKPOINTS } from 'bpk-component-breakpoint';
import { BpkGridContainer, BpkGridRow, BpkGridColumn } from 'bpk-component-grid';

import './Header.scss';
import * as ROUTES from './../../constants/routes';
import HamburgerButton from './HamburgerButton';

const headerLinks = [
  { to: ROUTES.USING_BACKPACK, children: 'Using Backpack' },
  { to: ROUTES.DOCS, children: 'Components' },
  { to: ROUTES.PATTERNS, children: 'Patterns' },
  { to: ROUTES.RESOURCES, children: 'Resources' },
  { href: 'http://git.prod.skyscanner.local/backpack/backpack', children: 'GitLab', blank: true },
];

const toNavList = (links, isTablet) => {
  const itemClassNames = ['bpkdocs-header__nav-list-item'];

  if (isTablet) {
    itemClassNames.push('bpkdocs-header__nav-list-item--tablet');
  }

  return (
    <ul className="bpkdocs-header__nav-list">
      {links.map((link = {}) => (
        <li key={link.to || link.href} className={itemClassNames.join(' ')}>
          {link.to ? <BpkRouterLink {...link} /> : <BpkLink {...link} />}
        </li>
      ))}
    </ul>
  );
};

const Header = (props) => {
  const { expanded, onHamburgerClick } = props;

  return (
    <header className="bpkdocs-header">
      <BpkGridContainer>
        <BpkGridRow>
          <BpkGridColumn width={3} mobileWidth={6}>
            <IndexLink to={ROUTES.HOME} className="bpkdocs-header__logo-link">
              <span className="visuallyhidden">Backpack</span>
            </IndexLink>
          </BpkGridColumn>
          <BpkGridColumn width={9} mobileWidth={6}>
            <nav className="bpkdocs-header__nav">
              <BpkBreakpoint query={BREAKPOINTS.TABLET}>
                {isTablet => (
                  isTablet
                    ? <HamburgerButton expanded={expanded} onClick={onHamburgerClick} />
                    : toNavList(headerLinks, isTablet)
                )}
              </BpkBreakpoint>
            </nav>
          </BpkGridColumn>
        </BpkGridRow>
      </BpkGridContainer>
      <BpkBreakpoint query={BREAKPOINTS.TABLET}>
        {isTablet => (
          isTablet ?
            <AnimateHeight
              height={expanded ? 'auto' : 0}
              duration={200}
            >
              <BpkGridContainer>
                <BpkGridRow>
                  <BpkGridColumn width={12} padded={false} className="bpkdocs-header__tablet-nav-container">
                    <nav>
                      {toNavList(headerLinks, true)}
                    </nav>
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
};

Header.propTypes = {
  expanded: PropTypes.bool.isRequired,
  onHamburgerClick: PropTypes.func.isRequired,
};

export default Header;
