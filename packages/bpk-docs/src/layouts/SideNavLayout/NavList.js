/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import { Link } from 'react-router';
import { cssModules } from 'bpk-react-utils';

import STYLES from './nav-list.scss';
import sortLinks from './links-sorter';
import { linkPropType, linksPropType, categoryPropType } from './sideNavPropTypes';

const getClassName = cssModules(STYLES);

const NavLink = (props) => {
  if (props.link.route) {
    return (
      <Link
        className={getClassName('bpkdocs-side-nav-list__link')}
        activeClassName={getClassName('bpkdocs-side-nav-list__link--active')}
        to={props.link.route}
      >
        {props.link.children}
      </Link>
    );
  }

  return <span className={getClassName('bpkdocs-side-nav-list__pending-link')}>{props.link.children}</span>;
};

NavLink.propTypes = {
  link: linkPropType.isRequired,
};

const NavListItem = props => (
  <li className={getClassName('bpkdocs-side-nav-list__category-list-item')}>
    <NavLink link={props.link} />
  </li>
);

NavListItem.propTypes = {
  link: linkPropType.isRequired,
};

const NavListCategory = props => (
  <li className={getClassName('bpkdocs-side-nav-list__list-item')}>
    <span className={getClassName('bpkdocs-side-nav-list__category-name')}>{props.link.category}</span>
    <ul className={getClassName('bpkdocs-side-nav-list__category-list')}>
      {(props.link.sort
        ? sortLinks(props.link.links)
        : props.link.links
      ).map(link => <NavListItem key={link.id} link={link} />)}
    </ul>
  </li>
);

NavListCategory.propTypes = {
  link: categoryPropType.isRequired,
};

const NavList = props => (
  <ul className={getClassName('bpkdocs-side-nav-list__list')}>
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
