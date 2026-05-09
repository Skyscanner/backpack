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

import { Component } from 'react';

// @ts-expect-error Untyped import
import BpkPagination from './BpkPagination';

import type { Meta } from '@storybook/react';

type PaginationContainerProps = {
  selectedPageIndex?: number;
  pageCount: number;
  visibleRange?: number;
};

type PaginationContainerState = {
  pageIndex: number;
};

class PaginationContainer extends Component<PaginationContainerProps, PaginationContainerState> {
  static defaultProps = {
    visibleRange: 3,
    selectedPageIndex: 0,
  };

  constructor(props: PaginationContainerProps) {
    super(props);

    this.state = {
      pageIndex: props.selectedPageIndex || 0,
    };
  }

  handleChange(pageIndex: number) {
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
          onPageChange={(pageIndex: number) => {
            this.handleChange(pageIndex);
          }}
          previousLabel="previous"
          nextLabel="next"
          visibleRange={visibleRange}
          paginationLabel="Pagination Navigation"
          pageLabel={(page: number, isSelected: boolean) =>
            `Go to page ${page}${
              isSelected ? ', this is the current page' : ''
            }.`
          }
        />
      </div>
    );
  }
}

const DefaultPaginationExample = () => <PaginationContainer pageCount={20} />;

const FivePagesPaginationExample = () => (
  <PaginationContainer pageCount={20} visibleRange={5} />
);

const LargePagesPaginationExample = () => (
  <PaginationContainer pageCount={2222} />
);

const TwoPagesPaginationExample = () => <PaginationContainer pageCount={2} />;

const SinglePaginationExample = () => <PaginationContainer pageCount={1} />;

const VisibleRangeExample = () => (
  <PaginationContainer pageCount={20} visibleRange={5} selectedPageIndex={6} />
);

const meta = {
  title: 'bpk-component-pagination',
  component: BpkPagination,
} satisfies Meta;

export default meta;

export const PaginationDefault = {
  render: () => <DefaultPaginationExample />,
};

export const Pagination5VisiblePages = {
  render: () => <FivePagesPaginationExample />,
};

export const PaginationManyPages = {
  render: () => <LargePagesPaginationExample />,
};

export const Pagination2Pages = {
  render: () => <TwoPagesPaginationExample />,
};

export const PaginationSinglePage = {
  render: () => <SinglePaginationExample />,
};

export const PaginationVisibleExample = {
  render: () => <VisibleRangeExample />,
};

export const VisualTest = {
  render: () => <DefaultPaginationExample />,
};

export const VisualTestWithZoom = {
  render: () => <DefaultPaginationExample />,
  args: {
    zoomEnabled: true,
  },
};
