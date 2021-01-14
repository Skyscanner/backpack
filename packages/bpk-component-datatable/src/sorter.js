/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
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

/* @flow strict */
import React from 'react';
import _sortBy from 'lodash/sortBy';
import { SortDirection } from 'react-virtualized';

import { getSortIconDirection } from './bpkHeaderRenderer';
import type { Props, SortProps, SortDirectionType } from './common-types';

export type Sorter<Row> = {
  rowCount: number,
  getRow(indext: number): Row,
  propsChange(props: Props<Row>): void,
  onHeaderClick(
    sortBy: string,
    eventTarget: HTMLElement,
    column: any,
  ): Sorter<Row>,
  sortProps: SortProps,
};

const getSortDirection = (
  sortProps: SortProps,
  newSortBy: ?string,
  newSortDirection: ?SortDirectionType,
  defaultSortDirection: SortDirectionType,
): SortDirectionType => {
  const { sortBy, sortDirection } = sortProps;
  if (newSortDirection != null) {
    return newSortDirection;
  }
  if (sortBy === newSortBy) {
    return sortDirection === SortDirection.ASC
      ? SortDirection.DESC
      : SortDirection.ASC;
  }
  return defaultSortDirection;
};

class NaiveSorter<Row> {
  sortProps: SortProps;

  list: Array<Row>;

  sortedList: Array<Row>;

  rowCount: number;

  constructor(props: Props<Row>) {
    const children = React.Children.toArray(props.children);

    const sortBy =
      React.Children.count(props.children) > 0
        ? children[props.defaultColumnSortIndex].props.dataKey
        : undefined;
    const sortDirection =
      children[props.defaultColumnSortIndex].props.defaultSortDirection ||
      SortDirection.ASC;

    this.sortProps = {
      sortBy,
      sortDirection,
      sort: null,
    };
    this.list = props.rows;
    this.sort();
  }

  getRow(index: number): Row {
    return this.sortedList[index];
  }

  sort() {
    const sorted = _sortBy(this.list, this.sortProps.sortBy);
    if (this.sortProps.sortDirection === 'DESC') {
      sorted.reverse();
    }
    this.sortedList = sorted;
    this.rowCount = this.sortedList.length;
  }

  propsChange(nextProps: Props<Row>) {
    this.list = nextProps.rows;
    this.sort();
  }

  onHeaderClick(sortBy: string, eventTarget: HTMLElement, column): Sorter<Row> {
    const sortDirection = getSortDirection(
      this.sortProps,
      sortBy,
      getSortIconDirection(eventTarget),
      column.props.defaultSortDirection || SortDirection.ASC,
    );

    this.sortProps = {
      sortBy,
      sortDirection,
      sort: null,
    };

    this.sort();
    return this;
  }
}

class PropSorter<Row> {
  sortProps: SortProps;

  list: Array<Row>;

  rowCount: number;

  constructor(props: Props<Row>) {
    this.sortProps = {
      sortBy: props.sortBy,
      sortDirection: props.sortDirection,
      sort: props.sort,
    };
    this.list = props.rows;
    this.rowCount = props.rows.length;
  }

  getRow(index: number): Row {
    return this.list[index];
  }

  propsChange(nextProps: Props<Row>) {
    this.sortProps = {
      sortBy: nextProps.sortBy,
      sortDirection: nextProps.sortDirection,
      sort: nextProps.sort,
    };
    this.list = nextProps.rows;
  }

  onHeaderClick(): Sorter<Row> {
    return this;
  }
}

const makeSorter = <Row>(props: Props<Row>): Sorter<Row> => {
  if (
    props.sort !== null &&
    props.sortBy !== null &&
    props.sortDirection !== null
  ) {
    return new PropSorter(props);
  }
  return new NaiveSorter(props);
};

export default makeSorter;
