import React from 'react'
import { IndexLink } from 'react-router'

import './header.scss'
import * as ROUTES from '../../constants/routes'
import BpkLink from './../../components/BpkLink'

const links = [
  { route: ROUTES.BONDS, children: 'Bonds' },
  { route: ROUTES.ATOMS, children: 'Atoms' },
  { route: ROUTES.MOLECULES, children: 'Molecules' },
  { route: ROUTES.ORGANISMS, children: 'Organisms' }
]

const Header = () => (
  <header className='bpkdocs-header'>
    <nav className='bpkdocs-header__nav clearfix'>
      <IndexLink to={ROUTES.HOME} className='bpkdocs-header__logo-link'>
        <span className='visuallyhidden'>Backpack</span>
      </IndexLink>
      <ul className='bpkdocs-header__nav-list'>
        {links.map((link = {}) => (
          <li key={link.route} className='bpkdocs-header__nav-list-item'>
            <BpkLink to={link.route}>
              {link.children}
            </BpkLink>
          </li>
        ))}
      </ul>
    </nav>
  </header>
)

export default Header
