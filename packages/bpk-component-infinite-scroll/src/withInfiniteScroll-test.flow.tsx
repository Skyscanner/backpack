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

/* @flow strict */

import { Component, Fragment } from 'react';

import { ArrayDataSource } from './DataSource';
// @ts-expect-error TS(1192): Module '"/Users/fayexiao/Documents/workspace4/back... Remove this comment to see the full error message
import withInfiniteScroll from './withInfiniteScroll';

const elementsArray = [];

for (let i = 0; i < 5; i += 1) {
  elementsArray.push(`Element ${i}`);
}

type ListProps = {
  elements: Array<any>,
  'aria-label': string,
  // @ts-expect-error TS(8020): JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  onClick?: ?() => void,
};

// We have to turn this into a function as the HOC ignores the props of a function
// another approach could be to put these props in the HOC as they aren't passed through.
/* eslint-disable react/prefer-stateless-function */
class List extends Component<ListProps> {
  static defaultProps: {
    onClick: null,
  };

  render() {
    const { elements, ...rest } = this.props;
    return (
      // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
      // @ts-expect-error TS(2746): This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
      <div id="list" {...rest}>
        // @ts-expect-error TS(2322): Type 'void' is not assignable to type 'ReactNode'.
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
      // @ts-expect-error TS(7006): Parameter 'evt' implicitly has an 'any' type.
      onScroll={(evt) => {}} // eslint-disable-line no-unused-vars
      // @ts-expect-error TS(7006): Parameter 'evt' implicitly has an 'any' type.
      onScrollFinished={(evt) => {}} // eslint-disable-line no-unused-vars
      renderLoadingComponent={() => <div />}
      // @ts-expect-error TS(7006): Parameter 'onClick' implicitly has an 'any' type.
      renderSeeMoreComponent={(onClick) => (
        <button type="button" onClick={onClick}>
          Button
        </button>
      )}
      seeMoreAfter={5}
    />
  </Fragment>
))();
