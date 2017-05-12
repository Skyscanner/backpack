import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import BpkSelect from 'bpk-component-select';
import BpkFieldset from 'bpk-component-fieldset';
import { BpkGridContainer, BpkGridRow, BpkGridColumn } from 'bpk-component-grid';
import { Link, browserHistory, PropTypes as RouterPropTypes } from 'react-router';

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
  >{link.children}</option>
);

const toNavSelectCategory = (link, key) => (
  <optgroup label={link.category} key={key}>
    {link.links.map(toNavSelectItem)}
  </optgroup>
);

const getCategoryName = (links, location) => {
  const reducer = (prev, link) => {
    const toCategory = innerLink => Object.assign({}, innerLink, { category: link.category });
    return prev.concat(link.links.map(toCategory));
  };

  const reducedLinks = links.reduce(reducer, []);

  return (_.find(reducedLinks, { route: location.pathname }) || {}).category || '';
};

const toNavSelect = (links, location) => (
  <BpkFieldset label={getCategoryName(links, location)}>
    <BpkSelect
      id="fruits"
      name="fruits"
      value={location.pathname}
      onChange={e => browserHistory.push(e.target.value)}
    >
      {links.map(
          (link, index) => (link.category ? toNavSelectCategory(link, index) : toNavLink(link, index)),
        )}
    </BpkSelect>
  </BpkFieldset>
  );

export const SideNavLayout = ({ children, links, location }) => (
  <BpkGridContainer>
    <BpkGridRow>
      <BpkGridColumn width={12} padded={false} className="bpkdocs-side-nav-layout__nav-select-container">
        {toNavSelect(links, location)}
      </BpkGridColumn>
      <BpkGridColumn width={3} className="bpkdocs-side-nav-layout__nav-list-container">
        {toNavList(links)}
      </BpkGridColumn>
      <BpkGridColumn width={9} tabletWidth={12}>{children}</BpkGridColumn>
    </BpkGridRow>
  </BpkGridContainer>
);

const linkPropType = PropTypes.shape({
  route: PropTypes.string,
  children: PropTypes.node.isRequired,
});

const linksPropType = PropTypes.arrayOf(PropTypes.oneOfType([
  linkPropType,
  PropTypes.shape({
    category: PropTypes.string.isRequired,
    links: PropTypes.arrayOf(linkPropType).isRequired,
  }),
]));

SideNavLayout.propTypes = {
  children: PropTypes.node.isRequired,
  links: linksPropType.isRequired,
  location: PropTypes.shape(RouterPropTypes.locationShape).isRequired,
};

export default SideNavLayout;
