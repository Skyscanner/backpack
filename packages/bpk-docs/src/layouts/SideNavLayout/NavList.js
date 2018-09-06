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

import React, { Component } from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { cssModules } from 'bpk-react-utils';
import ArrowIcon from 'bpk-component-icon/sm/arrow-right';
import { withRtlSupport } from 'bpk-component-icon';
import NavListFilter, { type Option as FilterOption } from './NavListFilter';
import STYLES from './NavList.css';
import sortLinks from './links-sorter';
import {
  type LinkPropType,
  type CategoryPropType,
  type Category,
} from './common-types';

const getClassName = cssModules(STYLES);

const ArrowIconWithRtl = withRtlSupport(ArrowIcon);

const NavLink = (props: LinkPropType) => {
  const { children, route, tags, ...rest } = props;

  if (route) {
    return (
      <RouterNavLink
        className={getClassName('bpkdocs-side-nav-list__link')}
        activeClassName={getClassName('bpkdocs-side-nav-list__link--active')}
        to={route}
        {...rest}
      >
        <ArrowIconWithRtl
          className={getClassName('bpkdocs-side-nav-list__link-active-icon')}
        />
        {children}
      </RouterNavLink>
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

type NavListCategoryPropType = {
  ...$Exact<CategoryPropType>,
  onClick: ?() => mixed,
  selectedFilter: ?FilterOption,
};

const NavListCategory = (props: NavListCategoryPropType) => (
  <li className={getClassName('bpkdocs-side-nav-list__list-item')}>
    <ul className={getClassName('bpkdocs-side-nav-list__category-list')}>
      {(props.sort ? sortLinks(props.links) : props.links)
        .filter(x => {
          if (!props.selectedFilter || props.selectedFilter === 'all') {
            return true;
          }

          return x.tags && x.tags.indexOf(props.selectedFilter) >= 0;
        })
        .map(link => (
          <NavListItem key={link.id} {...link} onClick={props.onClick} />
        ))}
    </ul>
  </li>
);

type NavListPropTypes = {
  links: Array<Category>,
  supportsFiltering: boolean,
  dimmed: boolean,
  onClick: ?() => mixed,
};

type NavListState = {
  selectedFilter: FilterOption,
};

class NavList extends Component<NavListPropTypes, NavListState> {
  constructor(props: NavListPropTypes) {
    super(props);
    this.state = {
      selectedFilter: 'all',
    };
  }

  onSelectedFilterChange = (selectedFilter: FilterOption) => {
    this.setState({ selectedFilter });
  };

  render() {
    const { dimmed, links, onClick, supportsFiltering } = this.props;

    return (
      <div className={getClassName(dimmed && 'bpkdocs-side-nav-list--dimmed')}>
        {dimmed && (
          <div
            className={getClassName('bpkdocs-side-nav-list__list-overlay')}
          />
        )}
        {supportsFiltering && (
          <NavListFilter
            className={getClassName('bpkdocs-side-nav-list__filter')}
            onSelectedFilterChange={this.onSelectedFilterChange}
            selected={this.state.selectedFilter}
          />
        )}
        <ul className={getClassName('bpkdocs-side-nav-list__list')}>
          {links.map(link => (
            <NavListCategory
              key={link.id}
              {...link}
              onClick={onClick}
              selectedFilter={
                supportsFiltering ? this.state.selectedFilter : null
              }
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default NavList;
