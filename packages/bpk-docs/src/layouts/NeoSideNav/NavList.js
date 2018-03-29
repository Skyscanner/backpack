/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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
/* @flow */

import React from 'react';
import { Link } from 'react-router';
import { cssModules } from 'bpk-react-utils';

import STYLES from './NavList.scss';
import sortLinks from './links-sorter';
import {
  type LinkPropType,
  type CategoryPropType,
  type LinksPropType,
} from './common-types';

const getClassName = cssModules(STYLES);

const NavLink = (props: LinkPropType) => {
  if (props.route) {
    return (
      <Link
        className={[getClassName('bpkdocs-side-nav-list__link')].join(' ')}
        activeClassName={getClassName('bpkdocs-side-nav-list__link--active')}
        to={props.route}
      >
        {props.children}
      </Link>
    );
  }

  return (
    <span className={getClassName('bpkdocs-side-nav-list__pending-link')}>
      {props.children}
    </span>
  );
};

const NavListItem = (props: LinkPropType) => (
  <li className={getClassName('bpkdocs-side-nav-list__category-list-item')}>
    <NavLink {...props} />
  </li>
);

const NavListCategory = (props: CategoryPropType) => (
  <li className={getClassName('bpkdocs-side-nav-list__list-item')}>
    <span className={getClassName('bpkdocs-side-nav-list__category-name')}>
      {props.category}
    </span>
    <ul className={getClassName('bpkdocs-side-nav-list__category-list')}>
      {(props.sort ? sortLinks(props.links) : props.links).map(link => (
        <NavListItem key={link.id} {...link} />
      ))}
    </ul>
  </li>
);

type NavListPropTypes = {
  ...$Exact<LinksPropType>,
  dimmed: boolean,
};
const NavList = (props: NavListPropTypes) => {
  const classNames = [getClassName('bpkdocs-side-nav-list__list')];

  if (props.dimmed) {
    classNames.push(getClassName('bpkdocs-side-nav-list__list--dimmed'));
  }

  return (
    <ul className={classNames.join(' ')}>
      {props.dimmed && (
        <div className={getClassName('bpkdocs-side-nav-list__list-overlay')} />
      )}
      {props.links.map(
        link =>
          link.category ? (
            <NavListCategory key={link.id} {...link} />
          ) : (
            <NavLink key={link.id} {...link} />
          ),
      )}
    </ul>
  );
};

export default NavList;
