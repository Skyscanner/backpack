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

import { BpkButtonV2 } from '../../packages/bpk-component-button';
import withInfiniteScroll, {
  ArrayDataSource,
  DataSource,
} from '../../packages/bpk-component-infinite-scroll';
import { BpkList, BpkListItem } from '../../packages/bpk-component-list';
import {
  BpkSpinner,
  SPINNER_TYPES,
} from '../../packages/bpk-component-spinner';
import { cssModules } from '../../packages/bpk-react-utils';
import { action } from '../bpk-storybook-utils';

import STYLES from './examples.module.scss';

const getClassName = cssModules(STYLES);

const elementsArray = [
  'Item 1',
  'Item 2',
  'Item 3',
  'Item 4',
  'Item 5',
  'Item 6',
  'Item 7',
  'Item 8',
  'Item 9',
  'Item 10',
  'Item 11',
  'Item 12',
  'Item 13',
  'Item 14',
  'Item 15',
  'Item 16',
  'Item 17',
  'Item 18',
  'Item 19',
  'Item 20',
];

const List = ({ elements }) => (
  <BpkList className={getClassName('bpk-infinite-scroll-stories__list')}>
    {elements.map((element) => (
      <BpkListItem key={element}>{element}</BpkListItem>
    ))}
  </BpkList>
);

const InfiniteList = withInfiniteScroll(List);

class DelayedDataSource extends ArrayDataSource {
  fetchItems(index, nElements) {
    return new Promise((resolve) => {
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
    return new Promise((resolve) => {
      for (let i = index; i < index + nElements; i += 1) {
        this.elements.push(i);
      }
      resolve(this.elements.slice(index, index + nElements));
    });
  }
}

const DefaultExample = () => (
  <div className={getClassName('bpk-infinite-scroll-stories__fixed-panel')}>
    <InfiniteList
      dataSource={new ArrayDataSource(elementsArray)}
      onScrollFinished={action('scroll finished')}
      onScroll={action('onScroll')}
      aria-label="Inifinite list"
    />
  </div>
);

const StoppingAfterScrollsExample = () => (
  <div className={getClassName('bpk-infinite-scroll-stories__fixed-panel')}>
    <InfiniteList
      dataSource={new ArrayDataSource(elementsArray)}
      elementsPerScroll={5}
      seeMoreAfter={2}
      renderSeeMoreComponent={({ onSeeMoreClick }) => (
        <BpkButtonV2 onClick={onSeeMoreClick}>See more</BpkButtonV2>
      )}
    />
  </div>
);

const InfiniteListOfElementsExample = () => (
  <div className={getClassName('bpk-infinite-scroll-stories__fixed-panel')}>
    <InfiniteList dataSource={new InfiniteDataSource()} />
  </div>
);

const DifferentNumElementsOnLoadAndScrollExample = () => (
  <div className={getClassName('bpk-infinite-scroll-stories__fixed-panel')}>
    <InfiniteList
      dataSource={new InfiniteDataSource()}
      initiallyLoadedElements={4}
      elementsPerScroll={2}
    />
  </div>
);

const LoadOneElementPerScrollExample = () => (
  <div className={getClassName('bpk-infinite-scroll-stories__fixed-panel')}>
    <InfiniteList
      dataSource={new ArrayDataSource(elementsArray)}
      elementsPerScroll={1}
    />
  </div>
);

const CustomLoadingItemExample = () => (
  <div className={getClassName('bpk-infinite-scroll-stories__fixed-panel')}>
    <InfiniteList
      dataSource={new DelayedDataSource(elementsArray)}
      elementsPerScroll={10}
      renderLoadingComponent={() => (
        <div
          className={getClassName(
            'bpk-infinite-scroll-stories__custom-component',
          )}
        >
          <BpkSpinner type={SPINNER_TYPES.primary} />
        </div>
      )}
    />
  </div>
);

const ForceUpdateDataExample = () => {
  const dataSource = new ArrayDataSource(elementsArray);
  return (
    <div>
      <BpkButtonV2
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
      </BpkButtonV2>
      <div className={getClassName('bpk-infinite-scroll-stories__fixed-panel')}>
        <InfiniteList dataSource={dataSource} />
      </div>
    </div>
  );
};

const ForceUpdateDataExampleEmptyArrayExample = () => {
  const dataSource = new ArrayDataSource([]);
  return (
    <div>
      <BpkButtonV2
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
      </BpkButtonV2>
      <div className={getClassName('bpk-infinite-scroll-stories__fixed-panel')}>
        <InfiniteList
          dataSource={dataSource}
          seeMoreAfter={0}
          elementsPerScroll={5}
          renderSeeMoreComponent={({ onSeeMoreClick }) => (
            <BpkButtonV2 onClick={onSeeMoreClick}>See more</BpkButtonV2>
          )}
        />
      </div>
    </div>
  );
};

const ForceUpdateDataExampleFromNonEmptyToEmptyExample = () => {
  const dataSource = new ArrayDataSource(elementsArray);
  return (
    <div>
      <BpkButtonV2
        onClick={() => {
          dataSource.updateData([]);
        }}
      >
        Clear data
      </BpkButtonV2>
      <BpkButtonV2
        onClick={() => {
          dataSource.updateData(elementsArray);
        }}
      >
        Add data
      </BpkButtonV2>
      <div className={getClassName('bpk-infinite-scroll-stories__fixed-panel')}>
        <InfiniteList
          dataSource={dataSource}
          seeMoreAfter={0}
          elementsPerScroll={5}
          renderSeeMoreComponent={({ onSeeMoreClick }) => (
            <BpkButtonV2 onClick={onSeeMoreClick}>See more</BpkButtonV2>
          )}
        />
      </div>
    </div>
  );
};

const InferDatasourceWhenLessThanRequestElementsExample = () => {
  const raiseLoadingAction = action('loading');
  return (
    <div className={getClassName('bpk-infinite-scroll-stories__fixed-panel')}>
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
};

export {
  DefaultExample,
  StoppingAfterScrollsExample,
  InfiniteListOfElementsExample,
  DifferentNumElementsOnLoadAndScrollExample,
  LoadOneElementPerScrollExample,
  CustomLoadingItemExample,
  ForceUpdateDataExample,
  ForceUpdateDataExampleEmptyArrayExample,
  ForceUpdateDataExampleFromNonEmptyToEmptyExample,
  InferDatasourceWhenLessThanRequestElementsExample,
};
