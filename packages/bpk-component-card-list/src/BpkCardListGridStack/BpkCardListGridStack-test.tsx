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
import userEvent from '@testing-library/user-event';

import mockCards from '../../testMocks';
import { ACCESSORY_TYPES, LAYOUTS } from '../common-types';

import BpkCardListGridStack from './BpkCardListGridStack';

describe('BpkCardListGridStack', () => {
  it('should render correctly with grid and no accessory', () => {
    render(
      <BpkCardListGridStack layout={LAYOUTS.grid} initiallyShownCards={3}>
        {mockCards(3)}
      </BpkCardListGridStack>,
    );

    const cards = screen.getByTestId('bpk-card-list-grid-stack__content');
    expect(cards.childNodes.length).toBe(3);
  });

  it('should render correctly with stack and no accessory', () => {
    render(
      <BpkCardListGridStack layout={LAYOUTS.stack} initiallyShownCards={3}>
        {mockCards(3)}
      </BpkCardListGridStack>,
    );

    const cards = screen.getByTestId('bpk-card-list-grid-stack__content');
    expect(cards.childNodes.length).toBe(3);
  });

  it('should render correctly with expand accessory', () => {
    render(
      <BpkCardListGridStack
        layout={LAYOUTS.grid}
        accessory={ACCESSORY_TYPES.Expand}
        initiallyShownCards={3}
        expandText="Show more"
      >
        {mockCards(3)}
      </BpkCardListGridStack>,
    );

    const container = screen.getByTestId('bpk-card-list-grid-stack');
    const cards = screen.getByTestId('bpk-card-list-grid-stack__content');
    expect(cards.childNodes.length).toBe(3);
    expect(container.lastChild).toHaveRole('button');
    expect(container.lastChild).toHaveTextContent('Show more');
  });

  it('should render correctly with button accessory', () => {
    render(
      <BpkCardListGridStack
        layout={LAYOUTS.grid}
        accessory={ACCESSORY_TYPES.Button}
        buttonText="Explore more"
        onButtonClick={() => {}}
        initiallyShownCards={3}
      >
        {mockCards(3)}
      </BpkCardListGridStack>,
    );

    const container = screen.getByTestId('bpk-card-list-grid-stack');
    const cards = screen.getByTestId('bpk-card-list-grid-stack__content');
    const accessory = container.lastChild;
    expect(cards.childNodes.length).toBe(3);
    expect(accessory?.firstChild).toHaveRole('button');
    expect(accessory).toHaveTextContent('Explore more');
  });

  it('should show and hide cards when expand button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <BpkCardListGridStack
        layout={LAYOUTS.grid}
        accessory={ACCESSORY_TYPES.Expand}
        initiallyShownCards={3}
        expandText="Show more"
      >
        {mockCards(6)}
      </BpkCardListGridStack>,
    );

    const container = screen.getByTestId('bpk-card-list-grid-stack');
    const cards = screen.getByTestId('bpk-card-list-grid-stack__content');
    const accessory = container.lastChild;
    expect(cards.childNodes.length).toBe(3);
    expect(accessory).toHaveRole('button');
    expect(accessory).toHaveTextContent('Show more');

    await user.click(accessory as HTMLElement);
    expect(cards.childNodes.length).toBe(6);

    await user.click(accessory as HTMLElement);
    expect(cards.childNodes.length).toBe(3);
  });
});
