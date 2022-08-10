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
/* @flow strict */

import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import BpkContentCards from './BpkContentCards';

const headerText = 'Header for the component';
const cards = [
  {
    imageLink: 'http://skyscanner.net/card-1-image-link.jpg',
    imageAlt: '',
    headline: 'Card 1 headline',
    description: 'Card 1 description',
    ctaLink: 'http://skyscanner.net/card-1-cta-link.html',
  },
  {
    imageLink: 'http://skyscanner.net/card-2-image-link.jpg',
    imageAlt: '',
    headline: 'Card 2 headline',
    description: 'Card 2 description',
    ctaLink: 'http://skyscanner.net/card-2-cta-link.html',
  },
  {
    imageLink: 'http://skyscanner.net/card-3-image-link.jpg',
    imageAlt: '',
    headline: 'Card 3 headline',
    description: 'Card 3 description',
    ctaLink: 'http://skyscanner.net/card-3-cta-link.html',
  },
];

describe('BpkContentCards accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues', async () => {
    const { container } = render(
      <BpkContentCards headerText={headerText} cards={cards} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
