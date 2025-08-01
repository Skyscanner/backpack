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

import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import mockCards from '../../testMocks';
import { LAYOUTS } from '../common-types';

import BpkCardListRowRailContainer from './BpkCardListRowRailContainer';

describe('BpkCardListRowRailContainer', () => {
  beforeAll(() => {
    global.IntersectionObserver = class IntersectionObserver {
      root = null;

      rootMargin = '';

      thresholds = [];

      observe = jest.fn();

      unobserve = jest.fn();

      disconnect = jest.fn();

      takeRecords() {
        return [];
      }
    };
  });
  
  it('should have no accessibility issues for row and no accessory', async () => {
    const { container } = render(
      <BpkCardListRowRailContainer layout={LAYOUTS.row} initiallyShownCards={3}>
        {mockCards(3)}
      </BpkCardListRowRailContainer>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility issues for row and pagination accessory', async () => {
    const { container } = render(
      <BpkCardListRowRailContainer
        layout={LAYOUTS.row}
        initiallyShownCards={3}
        accessory="pagination"
      >
        {mockCards(5)}
      </BpkCardListRowRailContainer>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
