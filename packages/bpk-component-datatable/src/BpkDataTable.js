/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2019 Skyscanner Ltd
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

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Table, AutoSizer, SortDirection } from 'react-virtualized';
import { cssModules } from 'bpk-react-utils';
import _sortBy from 'lodash/sortBy';
import _omit from 'lodash/omit';

import STYLES from './BpkDataTable.css';
import BpkDataTableColumn from './BpkDataTableColumn';
import hasChildrenOfType from './hasChildrenOfType';
import { getSortIconDirection } from './bpkHeaderRenderer';

const getClassName = cssModules(STYLES);
const omittedTableProps = [
  'rowGetter',
  'rowCount',
  'sortBy',
  'sortDirection',
  'sort',
  'onHeaderClick',
];

const getSortDirection = (
  state,
  newSortBy,
  newSortDirection,
  defaultSortDirection,
) => {
  const { sortBy, sortDirection } = state;
  if (newSortDirection !== null) {
    return newSortDirection;
  }
  if (sortBy === newSortBy) {
    return sortDirection === SortDirection.ASC
      ? SortDirection.DESC
      : SortDirection.ASC;
  }
  return defaultSortDirection;
};

const sortList = ({ sortBy, sortDirection, list }) => {
  const sorted = _sortBy(list, sortBy);
  if (sortDirection === 'DESC') {
    sorted.reverse();
  }
  return sorted;
};

class BpkDataTable extends Component {
  constructor({ rows, children, defaultColumnSortIndex }) {
    super();

    const sortBy =
      children.length > 0
        ? children[defaultColumnSortIndex].props.dataKey
        : undefined;
    const sortDirection =
      children[defaultColumnSortIndex].props.defaultSortDirection ||
      SortDirection.ASC;
    const sortedList = sortList({ sortBy, sortDirection, list: rows });

    this.state = {
      sortedList,
      sortBy,
      sortDirection,
      rowSelected: undefined,
    };
  }

  componentWillReceiveProps({ rows }) {
    if (rows !== this.props.rows) {
      const { sortBy, sortDirection } = this.state;
      const sortedList = sortList({ sortBy, sortDirection, list: rows });
      this.setState({ sortedList, rowSelected: undefined });
    }
  }

  onRowClicked = ({ index }) => {
    if (this.state.rowSelected === index) {
      this.setState({ rowSelected: undefined });
    } else {
      this.setState({ rowSelected: index });
    }
    if (this.props.onRowClick !== undefined) {
      this.props.onRowClick(this.state.sortedList[index]);
    }
  };

  onHeaderClick = ({ dataKey: sortBy, event }) => {
    const column = this.props.children.find(
      child => child.props.dataKey === sortBy,
    );

    if (column.props.disableSort === true) {
      return;
    }

    // See: https://reactjs.org/docs/events.html#event-pooling
    const eventTarget = event.target;

    this.setState(prevState => {
      const sortDirection = getSortDirection(
        prevState,
        sortBy,
        getSortIconDirection(eventTarget),
        column.props.defaultSortDirection || SortDirection.ASC,
      );

      const sortedList = sortList({
        sortBy,
        sortDirection,
        list: this.props.rows,
      });

      return { sortBy, sortDirection, sortedList };
    });
  };

  rowClassName = ({ index }) => {
    const classNames = [getClassName('bpk-data-table__row')];
    if (this.state.rowSelected === index) {
      classNames.push(getClassName('bpk-data-table__row--selected'));
    }
    if (index === -1) {
      classNames.push(getClassName('bpk-data-table__header-row'));
    }
    return classNames;
  };

  renderTable(width) {
    const { sortedList, sortDirection, sortBy } = this.state;

    const { children, className, headerClassName, ...restOfProps } = this.props;

    const classNames = [getClassName('bpk-data-table')];
    if (className) {
      classNames.push(className);
    }

    const headerClassNames = [getClassName('bpk-data-table__header-column')];
    if (headerClassName) {
      headerClassNames.push(headerClassName);
    }

    return (
      <Table
        {...restOfProps}
        className={classNames.join(' ')}
        width={width}
        rowCount={sortedList.length}
        rowGetter={({ index }) => sortedList[index]}
        headerClassName={headerClassNames.join(' ')}
        rowClassName={this.rowClassName}
        onRowClick={this.onRowClicked}
        onHeaderClick={this.onHeaderClick}
        sortBy={sortBy}
        sortDirection={sortDirection}
      >
        {children.map(BpkDataTableColumn.toColumn)}
      </Table>
    );
  }

  render() {
    if (this.props.width !== null) {
      return this.renderTable(this.props.width);
    }

    return (
      <AutoSizer disableHeight>
        {({ width }) => this.renderTable(width)}
      </AutoSizer>
    );
  }
}

BpkDataTable.propTypes = {
  ..._omit(Table.propTypes, omittedTableProps),
  rows: PropTypes.arrayOf(Object).isRequired,
  children: hasChildrenOfType(BpkDataTableColumn),
  width: PropTypes.number,
  headerHeight: PropTypes.number,
  className: PropTypes.string,
  defaultColumnSortIndex: PropTypes.number,
};

BpkDataTable.defaultProps = {
  ...Table.defaultProps,
  width: null,
  headerHeight: 60,
  rowHeight: 60,
  gridStyle: { direction: undefined }, // This is required for rows to automatically respect rtl
  defaultColumnSortIndex: 0,
};

export default BpkDataTable;
