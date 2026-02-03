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

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import BpkContentCard from './BpkContentCard';

describe('Content Card widget', () => {
  const horizontalCardTestProps: ComponentProps<typeof BpkContentCard> = {
    card: {
      image: {
        url: 'http://skyscanner.net/card-1-image-link.jpg',
        alt: 'People surfing in the ocean',
      },
      headline: 'Card 1 headline',
      description: 'Card 1 description',
      href: 'http://skyscanner.net/card-1-cta-link.html',
    },
    layout: 'HORIZONTAL',
  };

  const verticalCardTestProps: ComponentProps<typeof BpkContentCard> = {
    card: {
      image: {
        url: 'http://skyscanner.net/card-1-image-link.jpg',
        alt: 'People surfing in the ocean',
      },
      headline: 'Card 1 headline',
      description: 'Card 1 description',
      href: 'http://skyscanner.net/card-1-cta-link.html',
    },
    layout: 'VERTICAL',
  };

  it('renders horizontal card correctly', async () => {
    const { asFragment } = render(
      <BpkContentCard
        card={horizontalCardTestProps.card}
        layout={horizontalCardTestProps.layout}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders vertical card correctly', async () => {
    const { asFragment } = render(
      <BpkContentCard
        card={verticalCardTestProps.card}
        layout={verticalCardTestProps.layout}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the headline and the description for the card', async () => {
    render(
      <BpkContentCard
        card={horizontalCardTestProps.card}
        layout={horizontalCardTestProps.layout}
      />,
    );

    const expectedElements = ['Card 1 headline', 'Card 1 description'];

    expectedElements.forEach((element) =>
      expect(screen.getByText(element)).toBeVisible(),
    );
  });
});
