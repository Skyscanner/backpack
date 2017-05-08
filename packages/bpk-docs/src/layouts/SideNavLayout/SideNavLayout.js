import { Link } from 'react-router';
import PropTypes from 'prop-types';
import React from 'react';
import { BpkGridContainer, BpkGridRow, BpkGridColumn } from 'bpk-component-grid';

import './side-nav-layout.scss';

const toNavLink = (link, key) => {
  if (link.route) {
    return (
      <Link
        key={key}
        className="bpkdocs-side-nav-layout__link"
        activeClassName="bpkdocs-side-nav-layout__link--active"
        to={link.route}
      >
        {link.children}
      </Link>
    );
  }

  return <span key={key} className="bpkdocs-side-nav-layout__pending-link">{link.children}</span>;
};

const toNavListItem = (link, index) => (
  <li className="bpkdocs-side-nav-layout__nav-category-list-item" key={index}>{toNavLink(link)}</li>
);

const toNavListCategory = (link, key) => (
  <li className="bpkdocs-side-nav-layout__nav-list-item" key={key}>
    <span className="bpkdocs-side-nav-layout__nav-category-name">{link.category}</span>
    <ul className="bpkdocs-side-nav-layout__nav-category-list">{link.links.map(toNavListItem)}</ul>
  </li>
);

const toNavList = links => (
  <ul className="bpkdocs-side-nav-layout__nav-list">
    {links.map(
      (link, index) => (link.category ? toNavListCategory(link, index) : toNavLink(link, index)),
    )}
  </ul>
);

export const SideNavLayout = ({ links, children }) => (
  <BpkGridContainer>
    <BpkGridRow>
      <BpkGridColumn width={3} tabletWidth={12}>{toNavList(links)}</BpkGridColumn>
      <BpkGridColumn width={9} tabletWidth={12}>{children}</BpkGridColumn>
    </BpkGridRow>
  </BpkGridContainer>
);

const childrenPropType = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node,
]);

const linkPropType = PropTypes.shape({
  route: PropTypes.string,
  children: childrenPropType.isRequired,
});

const linksPropType = PropTypes.arrayOf(PropTypes.oneOfType([
  linkPropType,
  PropTypes.shape({
    category: PropTypes.string.isRequired,
    links: PropTypes.arrayOf(linkPropType).isRequired,
  }),
]));

SideNavLayout.propTypes = {
  children: childrenPropType.isRequired,
  links: linksPropType,
};

export default SideNavLayout;
