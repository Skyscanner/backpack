import React from 'react'
import { IndexLink } from 'react-router'

import BpkLink from 'bpk-component-link'
import BpkRouterLink from 'bpk-component-router-link'

import './header.scss'
import * as ROUTES from '../../constants/routes'

const links = [
  { to: ROUTES.DOCS, children: 'Docs' },
  { to: ROUTES.DOWNLOADS, children: 'Downloads' },
  { href: 'http://git.prod.skyscanner.local/backpack/backpack', children: 'GitLab', blank: true }
]

const Header = () => (
  <header className='bpkdocs-header'>
    <nav className='bpkdocs-header__nav clearfix'>
      <IndexLink to={ROUTES.HOME} className='bpkdocs-header__logo-link'>
        <span className='visuallyhidden'>Backpack</span>
      </IndexLink>
      <ul className='bpkdocs-header__nav-list'>
        {links.map((link = {}) => (
          <li key={link.to || link.href} className='bpkdocs-header__nav-list-item'>
            {link.to
              ? <BpkRouterLink {...link} />
              : <BpkLink {...link} />
            }
          </li>
        ))}
      </ul>
    </nav>
  </header>
)

export default Header
