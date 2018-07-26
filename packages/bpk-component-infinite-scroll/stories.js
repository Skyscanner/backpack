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

import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import BpkButton from 'bpk-component-button';
import BpkCard from 'bpk-component-card';
import { BpkSpinner, SPINNER_TYPES } from 'bpk-component-spinner';

import withInfiniteScroll, { ArrayDataSource, DataSource } from './index';

const elementsArray = [];

for (let i = 0; i < 100; i += 1) {
  elementsArray.push(`Element ${i}`);
}

const List = props => (
  <div id="list">
    {props.elements.map(element => (
      <BpkCard
        style={{
          margin: '5px',
          height: '100px',
        }}
        key={element}
      >
        {element}
      </BpkCard>
    ))}
  </div>
);

List.propTypes = {
  elements: PropTypes.arrayOf(PropTypes.any).isRequired,
};

const InfiniteList = withInfiniteScroll(List);

class DelayedDataSource extends ArrayDataSource {
  fetchItems(index, nElements) {
    return new Promise(resolve => {
      setTimeout(() => resolve(super.fetchItems(index, nElements)), 500);
    });
  }
}

class InfiniteDataSource extends DataSource {
  constructor() {
    super();
    this.elements = [];
  }

  fetchItems(index, nElements) {
    return new Promise(resolve => {
      for (let i = 0; i < nElements; i += 1) {
        this.elements.push(index + i);
      }
      resolve(this.elements);
    });
  }
}

storiesOf('bpk-component-infinite-scroll', module)
  .add('Default', () => (
    <InfiniteList dataSource={new ArrayDataSource(elementsArray)} />
  ))
  .add('Stopping after 5 scrolls', () => (
    <InfiniteList
      dataSource={new ArrayDataSource(elementsArray)}
      seeMoreAfter={1}
      renderSeeMoreComponent={({ onSeeMoreClick }) => (
        <BpkButton onClick={onSeeMoreClick}>See more</BpkButton>
      )}
    />
  ))
  .add('Infinite list of elements', () => (
    <InfiniteList dataSource={new InfiniteDataSource()} />
  ))
  .add('Load 10 elements per scroll', () => (
    <InfiniteList
      dataSource={new ArrayDataSource(elementsArray)}
      elementsPerScroll={10}
    />
  ))
  .add('Custom loading Item', () => (
    <InfiniteList
      dataSource={new DelayedDataSource(elementsArray)}
      elementsPerScroll={10}
      renderLoadingComponent={() => <BpkSpinner type={SPINNER_TYPES.primary} />}
    />
  ))
  .add('Force update data', () => {
    const dataSource = new ArrayDataSource(elementsArray);
    return (
      <div>
        <BpkButton
          onClick={() => {
            const newElements = [];
            const k = Math.floor(Math.random() * 10);
            for (let i = 0; i < 100; i += 1) {
              newElements.push(`Element ${k} ${i}`);
            }
            dataSource.updateData(newElements);
          }}
        >
          Update items
        </BpkButton>
        <InfiniteList dataSource={dataSource} />
      </div>
    );
  });
