import React, { PropTypes } from 'react'

import BpkRouterLink from 'bpk-component-router-link'

import './side-nav-layout.scss'
import { BpkList, BpkListItem } from 'bpk-component-list'

const toNavLink = (link) => (
  <BpkRouterLink key={link.route} to={link.route}>
    {link.children}
  </BpkRouterLink>
)

const toNavList = (links) => (
  <ul className='bpkdocs-side-nav-layout__list-item'>
    {links.map((link) => link.category
      ? toNavListCategory(link)
      : toNavLink(link))
    }
  </ul>
)

const toNavListCategory = (link) => (
  <li className='bpkdocs-side-nav-layout__list' key={link.category}>
    <span className='bpkdocs-side-nav-layout__category'>{link.category}</span>
    <BpkList>{link.links.map(toNavListItem)}</BpkList>
  </li>
)

const toNavListItem = (link) => (
  <BpkListItem key={link.route}>{toNavLink(link)}</BpkListItem>
)

export const SideNavLayout = ({ links, children }) => (
  <div className='bpkdocs-side-nav-layout__container'>
    <nav className='bpkdocs-side-nav-layout__nav'>{toNavList(links)}</nav>
    <div className='bpkdocs-side-nav-layout__content'>{children}</div>
  </div>
)

const childrenPropType = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node
])

const linkPropType = PropTypes.shape({
  route: PropTypes.string.isRequired,
  children: childrenPropType.isRequired
})

const linksPropType = PropTypes.arrayOf(PropTypes.oneOfType([
  linkPropType,
  PropTypes.shape({
    category: PropTypes.string.isRequired,
    links: PropTypes.arrayOf(linkPropType).isRequired
  })
]))

SideNavLayout.propTypes = {
  children: childrenPropType.isRequired,
  links: linksPropType
}

export default SideNavLayout
