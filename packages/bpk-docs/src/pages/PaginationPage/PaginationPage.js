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

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import BpkPagination from 'bpk-component-pagination';
import paginationReadme from 'bpk-component-pagination/readme.md';

import DocsPageBuilder from './../../components/DocsPageBuilder';
import DocsPageWrapper from './../../components/neo/DocsPageWrapper';
import Paragraph from './../../components/Paragraph';

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

const components = [
  {
    id: 'default',
    title: 'Default',
    blurb: [<Paragraph>This is the default pagination.</Paragraph>],
    examples: [<PaginationContainer pageCount={20} />],
  },
  {
    id: 'visible-range',
    title: 'Visible range',
    blurb: [
      <Paragraph>
        Customize the range of pages to be displayed in the middle. e.g.
        visibleRange={5}
      </Paragraph>,
    ],
    examples: [
      <PaginationContainer
        pageCount={20}
        visibleRange={5}
        selectedPageIndex={6}
      />,
    ],
  },
];

const isNeo = process.env.BPK_NEO;

const blurb = [
  <Paragraph>
    The pagination component is used to indicate a series of related content
    exists across multiple views/pages.
  </Paragraph>,
];

const PaginationPage = ({ ...rest }) => (
  <DocsPageBuilder
    title="Pagination"
    blurb={isNeo ? null : blurb}
    components={components}
    readme={paginationReadme}
    {...rest}
  />
);

const NeoPaginationPage = () => (
  <DocsPageWrapper
    title="Pagination"
    blurb={blurb}
    webSubpage={<PaginationPage wrapped />}
  />
);

export default (isNeo ? NeoPaginationPage : PaginationPage);
