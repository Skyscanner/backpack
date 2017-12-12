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

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Table, AutoSizer } from 'react-virtualized';
import { cssModules } from 'bpk-react-utils';
import _sortBy from 'lodash/sortBy';

import STYLES from './bpk-data-table.scss';
import { BpkColumn } from './BpkColumn';

const getClassName = cssModules(STYLES);

const sortList = ({ sortBy, sortDirection, list }) => {
  const sorted = _sortBy(list, sortBy);
  if (sortDirection === 'DESC') {
    sorted.reverse();
  }
  return sorted;
};

class BpkDataTable extends Component {
  constructor(props) {
    super(props);

    const sortBy = 'name';
    const sortDirection = 'ASC';
    const sortedList = sortList({ sortBy, sortDirection, list: props.rows });
    const columns = props.children.slice();

    if (props.dir === 'rtl') {
      columns.reverse();
    }

    this.state = {
      sortedList,
      sortBy,
      sortDirection,
      columns,
      rows: props.rows,
      rowSelected: undefined,
    };

    this.onRowClicked = this.onRowClicked.bind(this);
    this.rowClassName = this.rowClassName.bind(this);
    this.sort = this.sort.bind(this);
  }

  componentWillReceiveProps({ rows }) {
    if (rows !== this.state.rows) {
      const { sortBy, sortDirection } = this.state;
      const sortedList = sortList({ sortBy, sortDirection, list: rows });
      this.setState({ rows, sortedList, rowSelected: undefined });
    }
  }

  onRowClicked({ index }) {
    if (this.state.rowSelected === index) {
      this.setState({ rowSelected: undefined });
    } else {
      this.setState({ rowSelected: index });
    }
    if (this.props.onRowClick !== undefined) {
      this.props.onRowClick(this.state.rows[index]);
    }
  }

  rowClassName({ index }) {
    const classNames = [getClassName('bpk-data-table__row')];
    if (this.state.rowSelected === index) {
      classNames.push(getClassName('bpk-data-table__row--selected'));
    }
    if (index === -1) {
      classNames.push(getClassName('bpk-data-table__headerRow'));
    }
    return classNames;
  }

  sort({ sortBy, sortDirection }) {
    const sortedList = sortList({ sortBy, sortDirection, list: this.state.rows });

    this.setState({ sortBy, sortDirection, sortedList });
  }

  renderTable(width) {
    const {
      sortedList,
      sortDirection,
      sortBy,
      columns,
    } = this.state;
    const { height, dir } = this.props;

    return (
      <Table
        className={getClassName('bpk-data-table')}
        width={width}
        height={height}
        headerHeight={60}
        rowHeight={60}
        rowCount={sortedList.length}
        rowGetter={({ index }) => sortedList[index]}
        headerClassName={getClassName('bpk-data-table__headerColumn')}
        rowClassName={this.rowClassName}
        onRowClick={this.onRowClicked}
        sort={this.sort}
        sortBy={sortBy}
        sortDirection={sortDirection}
        gridStyle={{ direction: dir }}
      >
        {
        columns.map((child, index) => (
          BpkColumn({ ...child.props, key: index })
        ))
        }
      </Table>
    );
  }

  render() {
    if (this.props.width !== null) {
      return this.renderTable(this.props.width);
    }

    return (
      <AutoSizer disableHeight>{({ width }) => this.renderTable(width)}</AutoSizer>
    );
  }
}

BpkDataTable.propTypes = {
  rows: PropTypes.arrayOf(Object).isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  height: PropTypes.number.isRequired,
  onRowClick: PropTypes.func,
  width: PropTypes.number,
  dir: PropTypes.string,
};

BpkDataTable.defaultProps = {
  onRowClick: null,
  width: null,
  dir: 'ltr',
};

export default BpkDataTable;
