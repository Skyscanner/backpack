import React, { PropTypes } from 'react'

import BpkRouterLink from 'bpk-component-router-link'

import './side-nav-layout.scss'
import { BpkList, BpkListItem } from 'bpk-component-list'

export const SideNavLayout = ({ links, children }) => (
  <div className='bpkdocs-side-nav-layout__container'>
    <nav className='bpkdocs-side-nav-layout__nav'>
      <BpkList>
        {links.map((link = {}) => (
          <BpkListItem key={link.route}>
            <BpkRouterLink to={link.route}>
              {link.children}
            </BpkRouterLink>
          </BpkListItem>
        ))}
      </BpkList>
    </nav>
    <div className='bpkdocs-side-nav-layout__content'>
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

export default SideNavLayout
