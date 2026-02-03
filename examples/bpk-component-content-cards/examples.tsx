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
import type { ComponentProps } from 'react';

import BpkContentCards from '../../packages/bpk-component-content-cards';

const contentCardProps: ComponentProps<typeof BpkContentCards> = {
  heading: 'Your ultimate Greece guide',
  cards: [
    {
      image: {
        url: 'https://content.skyscnr.com/m/2e070403cb8488b8/original/shutterstock_1568380735.jpg',
        alt: 'Man on boat in a fjord',
      },
      headline: 'Discover your Grecian getaway',
      description:
        'From city exploring to remote-island hoping, discover a side to Greece that makes up your dream getaway.',
      href: 'https://www.skyscanner.net',
    },
    {
      image: {
        url: 'https://content.skyscnr.com/m/56a748936cd8aca2/original/Greece-YunanAdasi-GreekIslands-Food-ea76e3a0194c5f0ebcf3-jpg.jpg',
        alt: 'Plate of traditional Greek seafood',
      },
      headline: 'Try the food of the Gods',
      description:
        'Greece gave us the Gyros. A vessel of bread lifting chips from plate to mouth. It doesn’t get godlier than this.',
      href: 'https://www.skyscanner.net',
    },
    {
      image: {
        url: 'https://content.skyscnr.com/m/50d9dff3186775ad/original/Condor-Homepage-Hero-Option-3.png',
        alt: 'Airplane flying over mountains',
      },
      headline: 'Our top 10 Greek islands',
      description:
        'There are islands for everything. You can party, relax, chill, eat and hike, and that’s just Santorini.',
      href: 'https://www.skyscanner.net',
    },
  ],
};

const WithOneCardExample = () => (
  <BpkContentCards
    heading={contentCardProps.heading}
    cards={contentCardProps.cards.slice(0, 1)}
  />
);

const WithTwoCardsExample = () => (
  <BpkContentCards
    heading={contentCardProps.heading}
    cards={contentCardProps.cards.slice(0, 2)}
  />
);

const WithThreeCardsExample = () => (
  <BpkContentCards
    heading={contentCardProps.heading}
    cards={contentCardProps.cards}
  />
);

export { WithOneCardExample, WithTwoCardsExample, WithThreeCardsExample };
