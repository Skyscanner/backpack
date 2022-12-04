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

import React from 'react';

import BpkCarousel from '../../packages/bpk-component-carousel';
import { cssModules } from '../../packages/bpk-react-utils';

import STYLES from './examples.module.scss';

const slideItems = [
  {
    url: 'https://content.skyscnr.com/m/41c355bf68f93d5b/original/ST3-108-MADPT-DNSW-Q222-Social-Silver-Pitch-6.jpg',
    alt: 'People surfing in the ocean',
  },
  {
    url: 'https://content.skyscnr.com/m/50d9dff3186775ad/original/Condor-Homepage-Hero-Option-3.png',
    alt: 'Airplane flying over mountains',
  },
  {
    url: 'https://content.skyscnr.com/m/2e070403cb8488b8/original/shutterstock_1568380735.jpg',
    alt: 'Man on boat in a fjord',
  },

  {
    url: 'https://content.skyscnr.com/96508dbac15a2895b0147dc7e7f9ad30/canadian-rockies-canada.jpg',
    alt: 'canadian rockies canada',
  },
];

const getClassName = cssModules(STYLES);

const CarouselContainer = (props) => (
  <div className={getClassName('bpk-carousel-examples')}>
    <BpkCarousel
      className={getClassName('bpk-carousel-examples__container')}
      accessibilityLabel="This is a carousel"
      {...props}
    >
      {slideItems.map(({ alt, url }) => (
        <img
          src={url}
          alt={alt}
          key={alt}
          className={getClassName('bpk-carousel-examples__img')}
        />
      ))}
    </BpkCarousel>
  </div>
);

const DefaultExample = () => <CarouselContainer />;

const WithoutIndicatorExample = () => (
  <CarouselContainer showIndicator={false} />
);

const FiniteIndicatorExample = () => <CarouselContainer infinite={false} />;

const VisualTestExample = () => (
  <>
    <DefaultExample />
    <WithoutIndicatorExample />
    <FiniteIndicatorExample />
  </>
);

export {
  DefaultExample,
  WithoutIndicatorExample,
  FiniteIndicatorExample,
  VisualTestExample,
};
