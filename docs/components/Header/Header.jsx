import React from 'react'
import { IndexLink, Link } from 'react-router'

import * as routes from '../../constants/routes'
import styles from './header.scss'
import LivingStylesLogo from '../../svgs/LivingStylesLogo.jsx'

const links = [
  { route: routes.ROUTE_COLOURS, children: 'Colours' },
  { route: routes.ROUTE_ICONS, children: 'Icons' },
  { route: routes.ROUTE_FORMS, children: 'Forms' },
  { route: routes.ROUTE_UNITS, children: 'Units' },
  { route: routes.ROUTE_LOGOS, children: 'Logos' },
  { route: routes.ROUTE_SPINNERS, children: 'Spinners' },
  { route: routes.ROUTE_BREAKPOINTS, children: 'Breakpoints' },
  { route: routes.ROUTE_BASE_STYLESHEET, children: 'Base Stylesheet' }
]

const Header = () => (
  <header className={styles.background}>
    <nav className={styles.nav}>
      <IndexLink to={routes.ROUTE_HOME} className={styles.logoLink}>
        <LivingStylesLogo className={styles.logo} />
      </IndexLink>
      <ul className={styles.navList}>
        {links.map((link = {}) => (
          <li key={link.route} className={styles.navListItem}>
            <Link to={link.route} className={styles.navLink} activeClassName={styles.navLinkActive}>
              {link.children}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  </header>
)

export default Header
