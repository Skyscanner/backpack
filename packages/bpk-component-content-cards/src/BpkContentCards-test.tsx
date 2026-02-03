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
// @ts-nocheck

import type { ComponentProps } from 'react';

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import BpkContentCards from './BpkContentCards';

describe('Content Card widget', () => {
  const contentContainerTestProps: ComponentProps<typeof BpkContentCards> = {
    heading: 'Header for the component',
    cards: [
      {
        image: {
          url: 'http://skyscanner.net/card-1-image-link.jpg',
          alt: 'People surfing in the ocean',
        },
        headline: 'Card 1 headline',
        description: 'Card 1 description',
        href: 'http://skyscanner.net/card-1-cta-link.html',
      },
      {
        image: {
          url: 'http://skyscanner.net/card-2-image-link.jpg',
          alt: 'Man on boat in a fjord',
        },
        headline: 'Card 2 headline',
        description: 'Card 2 description',
        href: 'http://skyscanner.net/card-2-cta-link.html',
      },
      {
        image: {
          url: 'http://skyscanner.net/card-3-image-link.jpg',
          alt: 'Airplane flying over mountains',
        },
        headline: 'Card 3 headline',
        description: 'Card 3 description',
        href: 'http://skyscanner.net/card-3-cta-link.html',
      },
    ],
  };

  it('renders correctly with 1 card', async () => {
    const { asFragment } = render(
      <BpkContentCards
        heading={contentContainerTestProps.heading}
        cards={contentContainerTestProps.cards.slice(0, 1)}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly with 2 cards', async () => {
    const { asFragment } = render(
      <BpkContentCards
        heading={contentContainerTestProps.heading}
        cards={contentContainerTestProps.cards.slice(0, 2)}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly with 3 cards', async () => {
    const { asFragment } = render(
      <BpkContentCards
        heading={contentContainerTestProps.heading}
        cards={contentContainerTestProps.cards}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the title, the headline and the description for each card', async () => {
    render(
      <BpkContentCards
        heading={contentContainerTestProps.heading}
        cards={contentContainerTestProps.cards}
      />,
    );

    const expectedElements = [
      'Header for the component',
      'Card 1 headline',
      'Card 1 description',
      'Card 2 headline',
      'Card 2 description',
      'Card 3 headline',
      'Card 3 description',
    ];

    expectedElements.forEach((element) =>
      expect(screen.getByText(element)).toBeTruthy(),
    );
  });

  it('does not render anything if the cards are not defined', () => {
    const { container } = render(
      <BpkContentCards
        heading={contentContainerTestProps.heading}
        cards={[]}
      />,
    );

    expect(container.firstChild).toBe(null);
  });
});
