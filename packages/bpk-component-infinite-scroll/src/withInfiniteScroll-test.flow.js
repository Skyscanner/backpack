/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2019 Skyscanner Ltd
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

import React from 'react';

import withInfiniteScroll from './withInfiniteScroll';
import { ArrayDataSource } from './DataSource';

const elementsArray = [];

for (let i = 0; i < 5; i += 1) {
  elementsArray.push(`Element ${i}`);
}

type ListProps = {
  elements: Array<any>,
  'aria-label': string,
  onClick?: ?() => void,
};

const List = ({ elements, ...rest }: ListProps) => (
  <div id="list" {...rest}>
    {elements.forEach(element => (
      <div key={element}>{element}</div>
    ))}
  </div>
);

List.defaultProps = {
  onClick: null,
};

const InfiniteList = withInfiniteScroll(List);

(() => (
  <React.Fragment>
    {/* $ExpectError (aria-label is required) */}
    <InfiniteList dataSource={new ArrayDataSource([])} />

    {/* $ExpectError (dataSource is required) */}
    <InfiniteList aria-label="infinite list" />

    {/* $ExpectError (incompatible type) */}
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
      onScroll={evt => {}} // eslint-disable-line
      onScrollFinished={evt => {}} // eslint-disable-line
      renderLoadingComponent={() => <div />}
      renderSeeMoreComponent={onClick => (
        <button type="button" onClick={onClick} />
      )}
      seeMoreAfter={5}
    />
  </React.Fragment>
))();
