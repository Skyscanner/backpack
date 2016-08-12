import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import './side-nav-layout.scss'

const toNavLink = (link, key) => {
  if (link.route) {
    return <Link
      key={key}
      className='bpkdocs-side-nav-layout__link'
      activeClassName='bpkdocs-side-nav-layout__link--active'
      to={link.route} children={link.children}
    />
  }

  return <span key={key} className='bpkdocs-side-nav-layout__pending-link'>{link.children}</span>
}

const toNavList = (links) => (
  <ul className='bpkdocs-side-nav-layout__nav-list'>
    {links.map((link, index) => link.category
      ? toNavListCategory(link, index)
      : toNavLink(link, index))
    }
  </ul>
)

const toNavListCategory = (link, key) => (
  <li key={key}>
    <span className='bpkdocs-side-nav-layout__nav-category-name'>{link.category}</span>
    <ul className='bpkdocs-side-nav-layout__nav-category-list'>{link.links.map(toNavListItem)}</ul>
  </li>
)

const toNavListItem = (link, index) => (
  <li className='bpkdocs-side-nav-layout__nav-category-list-item' key={index}>{toNavLink(link)}</li>
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
