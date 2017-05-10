import { Link } from 'react-router';
import PropTypes from 'prop-types';
import React from 'react';
import { BpkGridContainer, BpkGridRow, BpkGridColumn } from 'bpk-component-grid';
import BpkSelect from 'bpk-component-select';
import BpkBreakpoint, { BREAKPOINTS } from 'bpk-component-breakpoint';

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

const toNavSelectItem = (link, index) => (
  <option
    key={index}
    disabled={!link.route}
    value={link.route}
    selected={false}
  >{link.children}</option>
);

const toNavSelectCategory = (link, key) => (
  <optgroup label={link.category} key={key}>
    {link.links.map(toNavSelectItem)}
  </optgroup>
);

// TODO: Add BpkLabel to select

const toNavSelect = (links, context) => (
  <BpkSelect
    id="fruits"
    name="fruits"
    value={context.location.pathname}
    onChange={e => context.router.push(e.target.value)}
  >
    {links.map(
      (link, index) => (link.category ? toNavSelectCategory(link, index) : toNavLink(link, index)),
    )}
  </BpkSelect>
);

export const SideNavLayout = ({ links, children }, context) => (
  <BpkGridContainer>
    <BpkGridRow>
      <BpkGridColumn width={3} tabletWidth={12}>
        <BpkBreakpoint query={BREAKPOINTS.TABLET}>
          {isActive => (isActive ? toNavSelect(links, context) : toNavList(links))}
        </BpkBreakpoint>
      </BpkGridColumn>
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

SideNavLayout.contextTypes = {
  router: React.PropTypes.object,
  location: React.PropTypes.object,
};

export default SideNavLayout;
