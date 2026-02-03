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
import { render, screen } from '@testing-library/react';

import mockCards from '../../testMocks';
import { ACCESSORY_DESKTOP_TYPES, LAYOUTS } from '../common-types';

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

  it('should render correctly with row layout and no accessory', () => {
    render(
      <BpkCardListRowRailContainer
        layout={LAYOUTS.row}
        initiallyShownCards={3}
      >
        {mockCards(3)}
      </BpkCardListRowRailContainer>,
    );

    const pagination = screen.queryByTestId('bpk-card-list-row-rail__accessory');
    const container = screen.getByTestId('bpk-card-list-row-rail');
    const carousel = screen.getByTestId('bpk-card-list-row-rail__carousel');

    expect(pagination).not.toBeInTheDocument();
    expect(container).toBeInTheDocument();
    expect(carousel).toBeInTheDocument();
  });

  it('should render correctly with row layout and pagination accessory', () => {
    render(
      <BpkCardListRowRailContainer
        layout={LAYOUTS.row}
        initiallyShownCards={3}
        accessory={ACCESSORY_DESKTOP_TYPES.pagination}
      >
        {mockCards(5)}
      </BpkCardListRowRailContainer>,
    );

    const pagination = screen.queryByTestId('bpk-card-list-row-rail__accessory');
    const container = screen.getByTestId('bpk-card-list-row-rail');
    const carousel = screen.getByTestId('bpk-card-list-row-rail__carousel');

    expect(pagination).toBeInTheDocument();
    expect(container).toBeInTheDocument();
    expect(carousel).toBeInTheDocument();
  });
});
