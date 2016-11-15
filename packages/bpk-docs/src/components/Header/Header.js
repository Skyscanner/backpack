import React from 'react';
import { IndexLink } from 'react-router';

import BpkLink from 'bpk-component-link';
import BpkRouterLink from 'bpk-component-router-link';
import { BpkGridContainer, BpkGridRow, BpkGridColumn } from 'bpk-component-grid';

import './header.scss';
import * as ROUTES from '../../constants/routes';

const links = [
  { to: ROUTES.DOCS, children: 'Docs' },
  { to: ROUTES.DOWNLOADS, children: 'Downloads' },
  { href: 'http://git.prod.skyscanner.local/backpack/backpack', children: 'GitLab', blank: true },
];

const Header = () => (
  <header className="bpkdocs-header">
    <BpkGridContainer>
      <BpkGridRow>
        <BpkGridColumn width={6} mobileWidth={3}>
          <IndexLink to={ROUTES.HOME} className="bpkdocs-header__logo-link">
            <span className="visuallyhidden">Backpack</span>
          </IndexLink>
        </BpkGridColumn>
        <BpkGridColumn width={6} mobileWidth={9}>
          <nav>
            <ul className="bpkdocs-header__nav-list">
              {links.map((link = {}) => (
                <li key={link.to || link.href} className="bpkdocs-header__nav-list-item">
                  {link.to ? <BpkRouterLink {...link} /> : <BpkLink {...link} />}
                </li>
              ))}
            </ul>
          </nav>
        </BpkGridColumn>
      </BpkGridRow>
    </BpkGridContainer>
  </header>
);

export default Header;
