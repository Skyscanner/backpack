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
import { storiesOf } from '@storybook/react';
import BpkPagination from './index';

class PaginationContainer extends Component {
  constructor(props) {
    super();

    this.state = {
      pageIndex: props.selectedPageIndex,
    };
  }

  handleChange(pageIndex) {
    this.setState({ pageIndex });
  }

  render() {
    const { pageCount, visibleRange } = this.props;
    return (
      <div>
        Page {this.state.pageIndex + 1}
        <BpkPagination
          pageCount={pageCount}
          selectedPageIndex={this.state.pageIndex}
          onPageChange={pageIndex => {
            this.handleChange(pageIndex);
          }}
          previousLabel="previous"
          nextLabel="next"
          visibleRange={visibleRange}
          paginationLabel="Pagination Navigation"
          pageLabel={(page, isSelected) =>
            `Go to page ${page}${
              isSelected ? ', this is the current page' : ''
            }.`
          }
        />
      </div>
    );
  }
}
PaginationContainer.propTypes = {
  selectedPageIndex: PropTypes.number,
  pageCount: PropTypes.number.isRequired,
  visibleRange: PropTypes.number,
};

PaginationContainer.defaultProps = {
  visibleRange: 3,
  selectedPageIndex: 0,
};

storiesOf('bpk-component-pagination', module)
  .add('Pagination - default', () => <PaginationContainer pageCount={20} />)
  .add('Pagination - 5 visible pages', () => (
    <PaginationContainer pageCount={20} visibleRange={5} />
  ))
  .add('Pagination - 2 pages', () => <PaginationContainer pageCount={2} />)
  .add('Pagination - single page', () => <PaginationContainer pageCount={1} />);
