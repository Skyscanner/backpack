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


import { ArgTypes, Markdown } from '@storybook/addon-docs/blocks';


// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import { action } from 'bpk-storybook-utils';

import BpkButton from '../../bpk-component-button';
import { BpkList, BpkListItem } from '../../bpk-component-list';
import {
  BpkSpinner,
  SPINNER_TYPES,
} from '../../bpk-component-spinner';
import { cssModules } from '../../bpk-react-utils';
import readme from '../README.md';

import DataSource, { ArrayDataSource } from './DataSource';
import withInfiniteScroll from './withInfiniteScroll';

import type { Meta } from '@storybook/react';

import STYLES from './BpkInfiniteScroll.stories.module.scss';

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

const List = ({ elements }: { elements: any[] }) => (
  <BpkList className={getClassName('bpk-infinite-scroll-stories__list')}>
    {elements.map((element) => (
      <BpkListItem key={element}>{element}</BpkListItem>
    ))}
  </BpkList>
);

const InfiniteList = withInfiniteScroll(List);

class DelayedDataSource extends ArrayDataSource<any> {
  fetchItems(index: number, nElements: number): Promise<any[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(super.fetchItems(index, nElements)), 500);
    });
  }
}

class InfiniteDataSource extends DataSource<any> {
  elements: any[];

  constructor() {
    super();
    this.elements = [];
  }

  fetchItems(index: number, nElements: number): Promise<any[]> {
    return new Promise((resolve) => {
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
 * at the bottom, which will cause the next story to load all items up to that position.
 * That is not a problem but we want each story to start with a clean state.
 */
const withScrollReset = (story: any) => {
  window.scrollTo(0, 0);
  return story();
};

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
        <BpkButton onClick={onSeeMoreClick}>See more</BpkButton>
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
  const dataSource = new ArrayDataSource<string>(elementsArray);
  return (
    <div>
      <BpkButton
        onClick={() => {
          const newElements: string[] = [];
          const k = Math.floor(Math.random() * 10);
          for (let i = 0; i < 100; i += 1) {
            newElements.push(`Element ${k} ${i}`);
          }
          dataSource.updateData(newElements);
        }}
      >
        Update items
      </BpkButton>
      <div className={getClassName('bpk-infinite-scroll-stories__fixed-panel')}>
        <InfiniteList dataSource={dataSource} />
      </div>
    </div>
  );
};

const ForceUpdateDataExampleEmptyArrayExample = () => {
  const dataSource = new ArrayDataSource<string>([]);
  return (
    <div>
      <BpkButton
        onClick={() => {
          const newElements: string[] = [];
          const k = Math.floor(Math.random() * 10);
          for (let i = 0; i < 100; i += 1) {
            newElements.push(`Element ${k} ${i}`);
          }
          dataSource.updateData(newElements);
        }}
      >
        Update items
      </BpkButton>
      <div className={getClassName('bpk-infinite-scroll-stories__fixed-panel')}>
        <InfiniteList
          dataSource={dataSource}
          seeMoreAfter={0}
          elementsPerScroll={5}
          renderSeeMoreComponent={({ onSeeMoreClick }) => (
            <BpkButton onClick={onSeeMoreClick}>See more</BpkButton>
          )}
        />
      </div>
    </div>
  );
};

const ForceUpdateDataExampleFromNonEmptyToEmptyExample = () => {
  const dataSource = new ArrayDataSource<string>(elementsArray);
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
      <div className={getClassName('bpk-infinite-scroll-stories__fixed-panel')}>
        <InfiniteList
          dataSource={dataSource}
          seeMoreAfter={0}
          elementsPerScroll={5}
          renderSeeMoreComponent={({ onSeeMoreClick }) => (
            <BpkButton onClick={onSeeMoreClick}>See more</BpkButton>
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

const meta: Meta<typeof InfiniteList> = {
  title: 'bpk-component-infinite-scroll',
  component: InfiniteList,
  decorators: [withScrollReset],
  parameters: {
    docs: {
      page: () => (
        <>
          <Markdown>{readme}</Markdown>
          <ArgTypes exclude={['zoomEnabled']} />
        </>
      ),
    },
  },
};

export default meta;

export const Default = {
  render: () => <DefaultExample />,
};

export const PartialLoadLoadMoreAfter15Items = {
  render: () => <StoppingAfterScrollsExample />,
};

export const InfiniteListOfElements = {
  render: () => <InfiniteListOfElementsExample />,
};

export const DifferentNoElementsOnLoadAndOnScroll = {
  render: () => <DifferentNumElementsOnLoadAndScrollExample />,
};

export const Load1ElementPerScroll = {
  render: () => <LoadOneElementPerScrollExample />,
};

export const CustomLoadingItem = {
  render: () => <CustomLoadingItemExample />,
};

export const ForceUpdateData = {
  render: () => <ForceUpdateDataExample />,
};

export const ForceUpdateDataEmptyArrayAndSeeMoreAfter = {
  render: () => <ForceUpdateDataExampleEmptyArrayExample />,
};

export const ForceUpdateDataFromNonEmptyToEmpty = {
  render: () => <ForceUpdateDataExampleFromNonEmptyToEmptyExample />,
};

export const InferDatasourceCompleteWhenLessThanRequestElementsRetrunedByDatasource =
  {
    render: () => <InferDatasourceWhenLessThanRequestElementsExample />,
  };
