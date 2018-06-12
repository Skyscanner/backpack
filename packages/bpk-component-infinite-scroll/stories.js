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

import withInfiniteScroll, { onItemsFetch } from './index';

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

storiesOf('bpk-component-infinite-scroll', module)
  .add('Default', () => (
    <InfiniteList onItemsFetch={onItemsFetch(elementsArray)} />
  ))
  .add('Stopping after 5 scrolls', () => (
    <InfiniteList
      onItemsFetch={onItemsFetch(elementsArray)}
      seeMoreAfter={5}
      renderSeeMoreComponent={({ onSeeMoreClick }) => (
        <BpkButton onClick={onSeeMoreClick}>See more</BpkButton>
      )}
    />
  ))
  .add('Infinite list of elements', () => (
    <InfiniteList
      onItemsFetch={(index, nElements) =>
        new Promise(resolve => {
          const newElements = [];
          for (let i = 0; i < nElements; i += 1) {
            newElements.push(index + i);
          }
          resolve(newElements);
        })
      }
    />
  ))
  .add('Load 10 elements per scroll', () => (
    <InfiniteList
      onItemsFetch={onItemsFetch(elementsArray)}
      elementsPerScroll={10}
    />
  ))
  .add('Custom loading Item', () => {
    const fetchMore = onItemsFetch(elementsArray);
    const delayed = (...args) =>
      new Promise(resolve => {
        setTimeout(() => resolve(fetchMore(...args)), 500);
      });
    return (
      <InfiniteList
        onItemsFetch={delayed}
        elementsPerScroll={10}
        renderLoadingComponent={() => (
          <BpkSpinner type={SPINNER_TYPES.primary} />
        )}
      />
    );
  });
