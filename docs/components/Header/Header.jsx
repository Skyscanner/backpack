import React from 'react'
import { IndexLink } from 'react-router'
import CssModules from 'react-css-modules'

import * as ROUTES from '../../constants/routes'

import styles from './header.scss'

import BpkLink from './../../components/BpkLink'

const links = [
  { route: ROUTES.BONDS, children: 'Bonds' },
  { route: ROUTES.ATOMS, children: 'Atoms' },
  { route: ROUTES.MOLECULES, children: 'Molecules' },
  { route: ROUTES.ORGANISMS, children: 'Organisms' }
]

const Header = () => (
  <header styleName='bpkdocs-header'>
    <nav styleName='bpkdocs-header__nav' className='clearfix'>
      <IndexLink to={ROUTES.HOME} styleName='bpkdocs-header__logo-link'>
        <span className='visuallyhidden'>Backpack</span>
      </IndexLink>
      <ul styleName='bpkdocs-header__nav-list'>
        {links.map((link = {}) => (
          <li key={link.route} styleName='bpkdocs-header__nav-list-item'>
            <BpkLink to={link.route}>
              {link.children}
            </BpkLink>
          </li>
        ))}
      </ul>
    </nav>
  </header>
)

export default CssModules(Header, styles)
