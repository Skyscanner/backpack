/*
 * Backpack - Skyscanner's Design Systrem
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
import withInfiniteScroll, {
  onItemsFetch,
} from 'bpk-component-infinite-scroll';
import BpkButton from 'bpk-component-button';
import { BpkSpinner, SPINNER_TYPES } from 'bpk-component-spinner';
import { cssModules } from 'bpk-react-utils';
import { BpkList, BpkListItem } from 'bpk-component-list';

import infiniteScrollReadme from '../../../../bpk-component-infinite-scroll/readme.md';

import DocsPageBuilder from '../../components/DocsPageBuilder';
import IntroBlurb from '../../components/IntroBlurb';

import STYLES from './InfiniteScrollPage.scss';
import DocsPageWrapper from '../../components/DocsPageWrapper';

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
  <BpkList className={getClassName('bpk-docs-infinite-scroll-page__list')}>
    {elements.map(element => (
      <BpkListItem key={element}>{element}</BpkListItem>
    ))}
  </BpkList>
);

List.propTypes = {
  elements: PropTypes.arrayOf(PropTypes.any).isRequired,
};

const FixedHeightPanel = ({ children }) => (
  <div className={getClassName('bpk-docs-infinite-scroll-page__fixed-panel')}>
    {children}
  </div>
);

FixedHeightPanel.propTypes = {
  children: PropTypes.node.isRequired,
};

const CustomSeeMore = ({ onSeeMoreClick }) => (
  <div
    className={getClassName('bpk-docs-infinite-scroll-page__custom-component')}
  >
    <BpkButton onClick={onSeeMoreClick}>See More</BpkButton>
  </div>
);

CustomSeeMore.propTypes = {
  onSeeMoreClick: PropTypes.func.isRequired,
};

const CustomLoading = () => (
  <div
    className={getClassName('bpk-docs-infinite-scroll-page__custom-component')}
  >
    <BpkSpinner type={SPINNER_TYPES.primary} />
  </div>
);

const InfiniteList = withInfiniteScroll(List);
const defaultFetch = onItemsFetch(elementsArray);

const components = [
  {
    id: 'default',
    title: 'Default',
    blurb: 'Loads five more list items upon reaching the bottom of the list.',
    examples: [
      <FixedHeightPanel>
        <InfiniteList
          onItemsFetch={(index, nElements) =>
            new Promise(resolve => {
              setTimeout(() => {
                const elements = [];
                for (let i = 0; i < nElements; i += 1) {
                  elements.push(`Item ${index + i}`);
                }
                resolve(elements);
              }, 10);
            })
          }
        />
      </FixedHeightPanel>,
    ],
  },
  {
    id: 'one-element-per-scroll',
    title: 'One element per scroll',
    blurb: 'Loads one more list item upon reaching the bottom of the list.',
    examples: [
      <FixedHeightPanel>
        <InfiniteList onItemsFetch={defaultFetch} elementsPerScroll={1} />
      </FixedHeightPanel>,
    ],
  },
  {
    id: 'partial-load',
    title: 'Partial load',
    blurb:
      'After 15 items have loaded, a button must be pressed to load more items.',
    examples: [
      <FixedHeightPanel>
        <InfiniteList
          onItemsFetch={defaultFetch}
          elementsPerScroll={5}
          seeMoreAfter={2}
          renderSeeMoreComponent={CustomSeeMore}
        />
      </FixedHeightPanel>,
    ],
  },
  {
    id: 'custom-loading',
    title: 'Custom loading component',
    blurb: [],
    examples: [
      <FixedHeightPanel>
        <InfiniteList
          onItemsFetch={(index, nElements) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve(defaultFetch(index, nElements));
              }, 500);
            })
          }
          elementsPerScroll={5}
          renderLoadingComponent={CustomLoading}
        />
      </FixedHeightPanel>,
    ],
  },
];

const blurb = [
  <IntroBlurb>
    This higher-order component is used to wrap a list component and add the
    functionality to allow that list to load more elements as the user scrolls.
  </IntroBlurb>,
];

const InfiniteScrollSubpage = () => (
  <DocsPageBuilder
    title="Infinite scroll"
    components={components}
    readme={infiniteScrollReadme}
    wrapped
  />
);

const InfiniteScrollPage = () => (
  <DocsPageWrapper
    title="Infinite scroll"
    blurb={blurb}
    webSubpage={<InfiniteScrollSubpage />}
  />
);

export default InfiniteScrollPage;
