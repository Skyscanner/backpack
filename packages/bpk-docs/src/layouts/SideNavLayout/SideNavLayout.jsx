import React, { PropTypes } from 'react'

import './side-nav-layout.scss'
import { BpkList, BpkListItem } from 'bpk-component-list'
import BpkLink from './../../components/BpkLink'

export const SideNavLayout = ({ links, children }) => (
  <div className='bpkdocs-side-nav-layout__container'>
    <nav className='bpkdocs-side-nav-layout__nav'>
      <BpkList>
        {links.map((link = {}) => (
          <BpkListItem key={link.route}>
            <BpkLink to={link.route}>
              {link.children}
            </BpkLink>
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
