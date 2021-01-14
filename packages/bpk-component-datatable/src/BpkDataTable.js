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

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Table, AutoSizer } from 'react-virtualized';
import { cssModules } from 'bpk-react-utils';
import _omit from 'lodash/omit';

import STYLES from './BpkDataTable.scss';
import BpkDataTableColumn from './BpkDataTableColumn';
import hasChildrenOfType from './hasChildrenOfType';
import makeSorter, { type Sorter } from './sorter';
import type { Props } from './common-types';

const getClassName = cssModules(STYLES);
const omittedTableProps = ['rowGetter', 'rowCount', 'onHeaderClick'];

type State<Row> = {
  sorter: Sorter<Row>,
  rowSelected: ?number,
};

class BpkDataTable<Row> extends Component<Props<Row>, State<Row>> {
  static defaultProps = {
    ...Table.defaultProps,
    width: null,
    headerHeight: 60,
    rowHeight: 60,
    gridStyle: { direction: undefined }, // This is required for rows to automatically respect rtl
    defaultColumnSortIndex: 0,
    sort: null,
    sortBy: null,
    sortDirection: null,
  };

  constructor(props: Props<Row>) {
    super();

    this.state = {
      sorter: makeSorter(props),
      rowSelected: undefined,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: Props<Row>) {
    if (nextProps.rows !== this.props.rows) {
      this.state.sorter.propsChange(nextProps);
    }
  }

  onRowClicked = ({ index }: { index: number }) => {
    if (this.state.rowSelected === index) {
      this.setState({ rowSelected: undefined });
    } else {
      this.setState({ rowSelected: index });
    }
    if (this.props.onRowClick !== undefined) {
      this.props.onRowClick(this.state.sorter.getRow(index));
    }
  };

  onHeaderClick = ({
    dataKey: sortBy,
    event,
  }: {
    dataKey: string,
    event: SyntheticEvent<HTMLDivElement>,
  }) => {
    const column = React.Children.toArray(this.props.children).find(
      child => child.props.dataKey === sortBy,
    );

    if (!column) {
      return;
    }

    if (column.props.disableSort === true) {
      return;
    }

    // See: https://reactjs.org/docs/events.html#event-pooling
    const eventTarget = event.currentTarget;

    this.setState(prevState => ({
      sorter: prevState.sorter.onHeaderClick(sortBy, eventTarget, column),
    }));
  };

  rowClassName = (consumerClassName: ?string, { index }: { index: number }) => {
    const classNames = [getClassName('bpk-data-table__row')];
    if (this.state.rowSelected === index) {
      classNames.push(getClassName('bpk-data-table__row--selected'));
    }
    if (this.props.onRowClick !== undefined) {
      classNames.push(getClassName('bpk-data-table__row--clickable'));
    }
    if (index === -1) {
      classNames.push(getClassName('bpk-data-table__header-row'));
    }
    if (consumerClassName) {
      classNames.push(consumerClassName);
    }
    return classNames;
  };

  renderTable(width: ?number) {
    const {
      children,
      className,
      headerClassName,
      rowClassName,
      sort,
      ...restOfProps
    } = this.props;

    const classNames = [getClassName('bpk-data-table')];
    if (className) {
      classNames.push(className);
    }

    const headerClassNames = [getClassName('bpk-data-table__header-column')];
    if (headerClassName) {
      headerClassNames.push(headerClassName);
    }

    return (
      // $FlowFixMe[cannot-spread-inexact]
      <Table
        {...restOfProps}
        className={classNames.join(' ')}
        width={width}
        rowCount={this.state.sorter.rowCount}
        rowGetter={({ index }) => this.state.sorter.getRow(index)}
        headerClassName={headerClassNames.join(' ')}
        rowClassName={row => this.rowClassName(rowClassName, row)}
        onRowClick={this.onRowClicked}
        onHeaderClick={this.onHeaderClick}
        {...this.state.sorter.sortProps}
      >
        {React.Children.map(children, BpkDataTableColumn.toColumn)}
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
  sort: PropTypes.func,
  sortBy: PropTypes.string,
  sortDirection: PropTypes.oneOf('ASC', 'DESC'),
};

export default BpkDataTable;
