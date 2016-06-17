import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import CssModules from 'react-css-modules'

import styles from './side-nav-layout.scss'

export const SideNavLayout = ({ links, children }) => (
  <div>
    <nav>
      <ul>
        {links.map((link = {}) => (
          <li key={link.route}>
            <Link to={link.route}>
              {link.children}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
    <div>{children}</div>
  </div>
)

SideNavLayout.propTypes = {
  links: PropTypes.array.isRequired,
  children: PropTypes.element.isRequired
}

export default CssModules(SideNavLayout, styles)
