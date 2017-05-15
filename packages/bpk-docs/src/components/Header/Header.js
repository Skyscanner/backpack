import React from 'react';
import PropTypes from 'prop-types';
import { IndexLink } from 'react-router';

import BpkLink from 'bpk-component-link';
import AnimateHeight from 'bpk-animate-height';
import BpkRouterLink from 'bpk-component-router-link';
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

const toNavList = (links, hideOnTablet) => {
  const classNames = ['bpkdocs-header__nav-list'];

  if (hideOnTablet) { classNames.push('bpkdocs-header__nav-list--hide-on-tablet'); }

  return (
    <ul className={classNames.join(' ')}>
      {links.map((link = {}) => (
        <li key={link.to || link.href} className="bpkdocs-header__nav-list-item">
          {link.to
            ? <BpkRouterLink className="bpkdocs-header__nav-list-link" {...link} />
            : <BpkLink className="bpkdocs-header__nav-list-link" {...link} />}
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
              <HamburgerButton
                expanded={expanded}
                onClick={onHamburgerClick}
                className="bpkdocs-header__hamburger"
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
        <BpkGridContainer className="bpkdocs-header__tablet-nav-container">
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
