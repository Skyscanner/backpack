import React, { PropTypes } from 'react'

import BpkRouterLink from 'bpk-component-router-link'

import './side-nav-layout.scss'
import { BpkList, BpkListItem } from 'bpk-component-list'

const toNavLink = (link, key) => link.route
  ? <BpkRouterLink key={key} to={link.route} children={link.children} />
  : <span key={key} className='bpkdocs-side-nav-layout__pending-link'>{link.children}</span>

const toNavList = (links) => (
  <ul className='bpkdocs-side-nav-layout__list-item'>
    {links.map((link, index) => link.category
      ? toNavListCategory(link, index)
      : toNavLink(link, index))
    }
  </ul>
)

const toNavListCategory = (link, key) => (
  <li className='bpkdocs-side-nav-layout__list' key={key}>
    <span className='bpkdocs-side-nav-layout__category'>{link.category}</span>
    <BpkList>{link.links.map(toNavListItem)}</BpkList>
  </li>
)

const toNavListItem = (link, index) => (
  <BpkListItem key={index}>{toNavLink(link)}</BpkListItem>
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
  route: PropTypes.string,
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
