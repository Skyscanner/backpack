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



import { Component, Fragment } from 'react';

import { ArrayDataSource } from './DataSource';
import withInfiniteScroll from './withInfiniteScroll';

const elementsArray = [];

for (let i = 0; i < 5; i += 1) {
  elementsArray.push(`Element ${i}`);
}


// We have to turn this into a function as the HOC ignores the props of a function
// another approach could be to put these props in the HOC as they aren't passed through.
/* eslint-disable react/prefer-stateless-function */

interface ListProps {
  elements: string[];
  onClick?: (() => void) | null;
}

class List extends Component<ListProps> {
  static defaultProps;

  render() {
    const { elements, ...rest } = this.props;
    return (
      // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
      <div id="list" {...rest}>
        {elements.forEach((element) => (
          <div key={element}>{element}</div>
        ))}
      </div>
    );
  }
}
/* eslint-enable react/prefer-stateless-function */

List.defaultProps = {
  onClick: null,
};

const InfiniteList = withInfiniteScroll(List);

(() => (
  <Fragment>
    {/* $FlowExpectedError[prop-missing] */}
    <InfiniteList dataSource={new ArrayDataSource([])} />

    {/* $FlowExpectedError[prop-missing] */}
    <InfiniteList aria-label="infinite list" />

    {/* $FlowExpectedError[incompatible-type] */}
    <InfiniteList dataSource={new ArrayDataSource([])} aria-label={null} />

    {/* Test default props */}
    <InfiniteList
      dataSource={new ArrayDataSource([])}
      aria-label="infinite list"
    />

    {/* Test all props */}
    <InfiniteList
      dataSource={new ArrayDataSource([])}
      aria-label="infinite list"
      onClick={() => {}}
      elementsPerScroll={5}
      initiallyLoadedElements={1}
      loaderIntersectionTrigger="small"
      onScroll={() => {}}
      onScrollFinished={() => {}}
      renderLoadingComponent={() => <div />}
      renderSeeMoreComponent={(onClick) => (
        <button type="button" onClick={onClick}>
          Button
        </button>
      )}
      seeMoreAfter={5}
    />
  </Fragment>
))();
