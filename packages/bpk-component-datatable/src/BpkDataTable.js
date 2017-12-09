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
    let columns = this.props.children.slice();

    if (this.props.dir === 'rtl') {
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

    this.rowClicked = this.rowClicked.bind(this);
    this.rowStyle = this.rowStyle.bind(this);
    this.sort = this.sort.bind(this);
  }

  rowClicked({ index }) {
    if (this.state.rowSelected === index) {
      this.setState({ rowSelected: undefined });
    } else {
      this.setState({ rowSelected: index });
    }
    if (this.props.onRowClick !== undefined) {
      this.props.onRowClick(this.state.rows[index]);
    }
  }

  rowStyle({ index }) {
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
    const { sortedList, sortDirection, sortBy } = this.state;
    const { height } = this.props;

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
        rowClassName={this.rowStyle}
        onRowClick={this.rowClicked}
        sort={this.sort}
        sortBy={sortBy}
        sortDirection={sortDirection}
        gridStyle={{ direction: this.props.dir }}
      >
      {
        this.state.columns.map((child, index) => (
          BpkColumn({ ...child.props, key: index })
        ))
      }
    </Table>
    );
  }

  render() {
    const { width } = this.props;

    if (width !== null) {
      return this.renderTable(width);
    }

    return (
      <AutoSizer disableHeight children={({ width }) => this.renderTable(width)} />
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
