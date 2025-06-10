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

import BpkCardListRowRail from './BpkCardListRowRailContainer';

describe('BpkCardListRowRail', () => {

  it('should render correctly with row layout and no accessory', () => {
    render(
      <BpkCardListRowRail
        layout={LAYOUTS.row}
        initiallyShownCards={3}
      >
        {mockCards(3)}
      </BpkCardListRowRail>,
    );

    const pagination = screen.getByTestId('bpk-card-list-row-rail__accessory');
    const container = screen.getByTestId('bpk-card-list-row-rail');
    const carousel = screen.getByTestId('bpk-card-list-row-rail__carousel');
    const cards = screen.getAllByTestId(/card-testId-/);

    expect(pagination).not.toBeInTheDocument();
    expect(container).toBeInTheDocument();
    expect(carousel).toBeInTheDocument();
    expect(cards.length).toBe(3);
  });

  it('should render correctly with row layout and pagination accessory', () => {
    render(
      <BpkCardListRowRail
        layout={LAYOUTS.row}
        initiallyShownCards={3}
        accessory={ACCESSORY_DESKTOP_TYPES.pagination}
      >
        {mockCards(5)}
      </BpkCardListRowRail>,
    );

    const pagination = screen.getByTestId('bpk-card-list-row-rail__accessory');
    const container = screen.getByTestId('bpk-card-list-row-rail');
    const carousel = screen.getByTestId('bpk-card-list-row-rail__carousel');
    const cards = screen.getAllByTestId(/card-testId-/);

    expect(pagination).toBeInTheDocument();
    expect(container).toBeInTheDocument();
    expect(carousel).toBeInTheDocument();
    expect(cards.length).toBe(3); 
  });

  it('should render correctly with rail layout', () => {
    render(
      <BpkCardListRowRail
        layout={LAYOUTS.rail}
        initiallyShownCards={2}
        accessory={ACCESSORY_DESKTOP_TYPES.pagination}
      >
        {mockCards(4)}
      </BpkCardListRowRail>,
    );

    const pagination = screen.getByTestId('bpk-card-list-row-rail__accessory');
    const container = screen.getByTestId('bpk-card-list-row-rail');
    const carousel = screen.getByTestId('bpk-card-list-row-rail__carousel');
    const cards = screen.getAllByTestId(/card-testId-/);

    expect(pagination).not.toBeInTheDocument();
    expect(container).toBeInTheDocument();
    expect(carousel).toBeInTheDocument();
    expect(cards.length).toBe(2); 
  });
});
