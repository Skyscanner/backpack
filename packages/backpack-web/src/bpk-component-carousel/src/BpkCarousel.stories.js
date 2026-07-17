/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2022 Skyscanner Ltd
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

import { VARIANT } from '../../bpk-component-page-indicator';
import readme from '../README.md';


import BpkCarousel from './BpkCarousel';

const imageUrls = [
  'https://content.skyscnr.com/m/7470cf6a4ee49c26/original/Carousel-placeholder-4.jpg',
  'https://content.skyscnr.com/m/183e7ddaaca13b16/original/Carousel-placeholder-2.jpg',
  'https://content.skyscnr.com/m/f8b42e98e2b79a6/original/Carousel-placeholder-3.jpg',
  'https://content.skyscnr.com/m/51c4c9dd04c8dc95/original/Carousel-placeholder-1.jpg',
];

const imagesList = imageUrls.map((url) => (
  <div>
    <img src={url} alt="hotel bedroom" />
  </div>
));

const DefaultExample = () => (
  <div
    style={{
      maxWidth: '800px',
      width: '100%',
      margin: 'auto',
    }}
  >
    <BpkCarousel images={imagesList} bottom={16} showPageIndicatorNav />
  </div>
);

const WithCarouselPageIndicatorExample = () => (
  <div
    style={{
      maxWidth: '800px',
      width: '100%',
      margin: 'auto',
    }}
  >
    <BpkCarousel
      images={imagesList}
      pageIndicatorVariant={VARIANT.carousel}
      bottom={16}
      showPageIndicatorNav
    />
  </div>
);

const SingleImageExample = () => (
  <div
    style={{
      maxWidth: '800px',
      width: '100%',
      margin: 'auto',
    }}
  >
    <BpkCarousel images={[imagesList[0]]} bottom={16} />
  </div>
);

const MixedExample = () => (
  <div>
    <DefaultExample />
    <br />
    <WithCarouselPageIndicatorExample />
  </div>
);

const meta = {
  title: 'bpk-component-carousel',
  component: BpkCarousel,
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

export const WithCarouselPageIndicator = {
  render: () => <WithCarouselPageIndicatorExample />,
};

export const SingleImage = {
  render: () => <SingleImageExample />,
};

export const VisualTest = {
  render: () => <MixedExample />,
};

export const VisualTestWithZoom = {
  render: () => <MixedExample />,
  args: {
    zoomEnabled: true,
  },
};
