/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
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
import { Component } from 'react';

import BpkPagination from '../../packages/bpk-component-pagination';

class PaginationContainer extends Component {
  constructor(props: any) {
    // @ts-expect-error TS(2554) FIXME: Expected 1-2 arguments, but got 0.
    super();

    this.state = {
      pageIndex: props.selectedPageIndex,
    };
  }

  handleChange(pageIndex: any) {
    this.setState({ pageIndex });
  }

  render() {
    // @ts-expect-error TS(2339) FIXME: Property 'pageCount' does not exist on type 'Reado... Remove this comment to see the full error message
    const { pageCount, visibleRange } = this.props;
    return (
      <div>
        {/* @ts-expect-error TS(2339) FIXME: Property 'pageIndex' does not exist on type 'Reado... Remove this comment to see the full error message */}
        Page {this.state.pageIndex + 1}
        <BpkPagination
          pageCount={pageCount}
          // @ts-expect-error TS(2339) FIXME: Property 'pageIndex' does not exist on type 'Reado... Remove this comment to see the full error message
          selectedPageIndex={this.state.pageIndex}
          onPageChange={(pageIndex) => {
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
// @ts-expect-error TS(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
PaginationContainer.propTypes = {
  selectedPageIndex: PropTypes.number,
  pageCount: PropTypes.number.isRequired,
  visibleRange: PropTypes.number,
};

// @ts-expect-error TS(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
PaginationContainer.defaultProps = {
  visibleRange: 3,
  selectedPageIndex: 0,
};

// @ts-expect-error TS(2322) FIXME: Type '{ pageCount: number; }' is not assignable to... Remove this comment to see the full error message
const DefaultPaginationExample = () => <PaginationContainer pageCount={20} />;

const FivePagesPaginationExample = () => (
  // @ts-expect-error TS(2322) FIXME: Type '{ pageCount: number; visibleRange: number; }... Remove this comment to see the full error message
  <PaginationContainer pageCount={20} visibleRange={5} />
);

const LargePagesPaginationExample = () => (
  // @ts-expect-error TS(2322) FIXME: Type '{ pageCount: number; }' is not assignable to... Remove this comment to see the full error message
  <PaginationContainer pageCount={2222} />
);

// @ts-expect-error TS(2322) FIXME: Type '{ pageCount: number; }' is not assignable to... Remove this comment to see the full error message
const TwoPagesPaginationExample = () => <PaginationContainer pageCount={2} />;

// @ts-expect-error TS(2322) FIXME: Type '{ pageCount: number; }' is not assignable to... Remove this comment to see the full error message
const SinglePaginationExample = () => <PaginationContainer pageCount={1} />;

const VisibleRangeExample = () => (
  // @ts-expect-error TS(2322) FIXME: Type '{ pageCount: number; visibleRange: number; s... Remove this comment to see the full error message
  <PaginationContainer pageCount={20} visibleRange={5} selectedPageIndex={6} />
);

export {
  DefaultPaginationExample,
  FivePagesPaginationExample,
  LargePagesPaginationExample,
  TwoPagesPaginationExample,
  SinglePaginationExample,
  VisibleRangeExample,
};
