
import React from 'react';
import { Link } from 'react-router';

import './side-nav-layout.scss';
import { linkPropType, linksPropType, categoryPropType } from './sideNavPropTypes';

const NavLink = (props) => {
  if (props.link.route) {
    return (
      <Link
        className="bpkdocs-side-nav-layout__link"
        activeClassName="bpkdocs-side-nav-layout__link--active"
        to={props.link.route}
      >
        {props.link.children}
      </Link>
    );
  }

  return <span className="bpkdocs-side-nav-layout__pending-link">{props.link.children}</span>;
};

NavLink.propTypes = {
  link: linkPropType.isRequired,
};

const NavListItem = props => (
  <li className="bpkdocs-side-nav-layout__nav-category-list-item">
    <NavLink link={props.link} />
  </li>
);

NavListItem.propTypes = {
  link: linkPropType.isRequired,
};

const NavListCategory = props => (
  <li className="bpkdocs-side-nav-layout__nav-list-item">
    <span className="bpkdocs-side-nav-layout__nav-category-name">{props.link.category}</span>
    <ul className="bpkdocs-side-nav-layout__nav-category-list">
      {props.link.links.map(link => <NavListItem key={link.id} link={link} />)}
    </ul>
  </li>
);

NavListCategory.propTypes = {
  link: categoryPropType.isRequired,
};

const NavList = props => (
  <ul className="bpkdocs-side-nav-layout__nav-list">
    {props.links.map(
      link => (link.category
        ? <NavListCategory key={link.id} link={link} />
        : <NavLink key={link.id} link={link} />
    ))}
  </ul>
);

NavList.propTypes = {
  links: linksPropType.isRequired,
};

export default NavList;
