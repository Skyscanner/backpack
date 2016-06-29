import React, { PropTypes } from 'react'
import CssModules from 'react-css-modules'

import styles from './side-nav-layout.scss'

import BpkLink from './../../components/BpkLink'
import BpkList from './../../components/BpkList'

export const SideNavLayout = ({ links, children }) => (
  <div styleName='bpkdocs-side-nav-layout__container'>
    <nav styleName='bpkdocs-side-nav-layout__nav'>
      <BpkList>
        {links.map((link = {}) => (
          <BpkLink key={link.route} to={link.route}>
            {link.children}
          </BpkLink>
        ))}
      </BpkList>
    </nav>
    <div styleName='bpkdocs-side-nav-layout__content'>
      {children}
    </div>
  </div>
)

SideNavLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  links: PropTypes.array.isRequired
}

export default CssModules(SideNavLayout, styles)
