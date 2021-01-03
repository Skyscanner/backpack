/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
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
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import BpkButton from 'bpk-component-button';
import BpkCard from 'bpk-component-card';
import { BpkSpinner, SPINNER_TYPES } from 'bpk-component-spinner';

import withInfiniteScroll, { ArrayDataSource, DataSource } from './index';

const elementsArray: Array<any> = [];

for (let i = 0; i < 100; i += 1) {
  elementsArray.push(`Element ${i}`);
}

type ListProps = {
  elements: Array<any>,
  'aria-label': ?string, // defined just to test flow definition with extra props
};

const List = ({ elements, ...rest }: ListProps) => (
  <div {...rest}>
    {elements.map(element => (
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
  'aria-label': PropTypes.string.isRequired,
};

List.defaultProps = {
  'aria-label': null,
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
  elements: Array<any>;

  constructor() {
    super();
    this.elements = [];
  }

  fetchItems(index, nElements) {
    return new Promise(resolve => {
      for (let i = index; i < index + nElements; i += 1) {
        this.elements.push(i);
      }
      resolve(this.elements.slice(index, index + nElements));
    });
  }
}

/*
 * Scrolls back to the top before rendering the story.
 * We do this because when stories change the scroll position will (probably) be
 * at the botton, which will cause the next story to load all items up to that position.
 * That is not a problem but we want each story to start with a clean state.
 */
const withScrollReset = story => {
  window.scrollTo(0, 0);
  return story();
};

storiesOf('bpk-component-infinite-scroll', module)
  .addDecorator(withScrollReset)
  .add('Default', () => (
    <InfiniteList
      dataSource={new ArrayDataSource(elementsArray)}
      onScrollFinished={action('scroll finished')}
      onScroll={action('onScroll')}
      aria-label="Inifinite list"
    />
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
  .add('Different no. elements on load and on scroll', () => (
    <InfiniteList
      dataSource={new InfiniteDataSource()}
      initiallyLoadedElements={4}
      elementsPerScroll={2}
    />
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
  })
  .add('Force update data - Empty array and see more after', () => {
    const dataSource = new ArrayDataSource([]);
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
        <InfiniteList
          dataSource={dataSource}
          seeMoreAfter={0}
          elementsPerScroll={5}
          renderSeeMoreComponent={({ onSeeMoreClick }) => (
            <BpkButton onClick={onSeeMoreClick}>See more</BpkButton>
          )}
        />
      </div>
    );
  })
  .add('Force update data - From non empty to empty', () => {
    const dataSource = new ArrayDataSource(elementsArray);
    return (
      <div>
        <BpkButton
          onClick={() => {
            dataSource.updateData([]);
          }}
        >
          Clear data
        </BpkButton>
        <BpkButton
          onClick={() => {
            dataSource.updateData(elementsArray);
          }}
        >
          Add data
        </BpkButton>
        <InfiniteList
          dataSource={dataSource}
          seeMoreAfter={0}
          elementsPerScroll={5}
          renderSeeMoreComponent={({ onSeeMoreClick }) => (
            <BpkButton onClick={onSeeMoreClick}>See more</BpkButton>
          )}
        />
      </div>
    );
  })
  .add(
    'Infer datasource complete when less than request elements retruned by datasource',
    () => {
      const raiseLoadingAction = action('loading');
      return (
        <div>
          <InfiniteList
            dataSource={new DelayedDataSource(elementsArray)}
            seeMoreAfter={20}
            elementsPerScroll={7}
            onScrollFinished={action('scroll finished')}
            renderLoadingComponent={() => {
              raiseLoadingAction();
              return <div>Loading</div>;
            }}
          />
        </div>
      );
    },
  );
