import React from 'react'
import { IndexLink, Link } from 'react-router'
import CssModules from 'react-css-modules'

import styles from './header.scss'

import * as routes from '../../constants/routes'

const links = [
  { route: routes.ROUTE_ATOMS, children: 'Atoms' },
  { route: routes.ROUTE_MOLECULES, children: 'Molecules' },
  { route: routes.ROUTE_ORGANISMS, children: 'Organisms' }
]

const Header = () => (
  <header styleName='header'>
    <nav styleName='header__nav'>
      <IndexLink to={routes.ROUTE_HOME} styleName='header__logo-link'>Backpack</IndexLink>
      <ul styleName='header__nav-list'>
        {links.map((link = {}) => (
          <li key={link.route} styleName='header__nav-list-item'>
            <Link to={link.route} styleName='header__nav-link' activeClassName='header__nav-link-active'>
              {link.children}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  </header>
)

export default CssModules(Header, styles)
