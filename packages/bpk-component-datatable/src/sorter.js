import _sortBy from 'lodash/sortBy';
import { SortDirection } from 'react-virtualized';

import { getSortIconDirection } from './bpkHeaderRenderer';

const getSortDirection = (
  sortProps,
  newSortBy,
  newSortDirection,
  defaultSortDirection,
) => {
  const { sortBy, sortDirection } = sortProps;
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

class NaiveSorter {
  constructor(props) {
    const sortBy =
      props.children.length > 0
        ? props.children[props.defaultColumnSortIndex].props.dataKey
        : undefined;
    const sortDirection =
      props.children[props.defaultColumnSortIndex].props.defaultSortDirection ||
      SortDirection.ASC;
    this.sortProps = {
      sortBy,
      sortDirection,
      sort: null,
    };
    this.list = props.rows;
    this.sort();
  }

  getRow(index) {
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

  propsChange(nextProps) {
    this.list = nextProps.rows;
    this.sort();
  }

  onHeaderClick(sortBy, eventTarget, column) {
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

class PropSorter {
  constructor(props) {
    this.sortProps = {
      sortBy: props.sortBy,
      sortDirection: props.sortDirection,
      sort: props.sort,
    };
    this.list = props.rows;
    this.rowCount = props.rows.length;
  }

  getRow(index) {
    return this.list[index];
  }

  propsChange(nextProps) {
    this.sortProps = {
      sortBy: nextProps.sortBy,
      sortDirection: nextProps.sortDirection,
      sort: nextProps.sort,
    };
    this.list = nextProps.rows;
  }

  onHeaderClick() {
    return this;
  }
}

const makeSorter = props => {
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
