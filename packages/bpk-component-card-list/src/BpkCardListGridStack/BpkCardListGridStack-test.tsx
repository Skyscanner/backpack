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

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import mockCards from '../../testMocks';
import { ACCESSORY_DESKTOP_TYPES, LAYOUTS } from '../common-types';

import BpkCardListGridStack from './BpkCardListGridStack';

describe('BpkCardListGridStack', () => {
  it('should render correctly with grid and no accessory', () => {
    render(
      <BpkCardListGridStack layout={LAYOUTS.grid} initiallyShownCards={3}>
        {mockCards(6)}
      </BpkCardListGridStack>,
    );

    const initialCards = screen.getByTestId(
      'bpk-card-list-grid-stack__initial-content',
    );
    const accessoryButton = screen.queryByTestId(
      'bpk-card-list__accessory-button',
    );
    const expandButton = screen.queryByTestId(
      'bpk-card-list__accessory-expand-button',
    );
    expect(initialCards.childNodes.length).toBe(6);
    expect(accessoryButton).not.toBeInTheDocument();
    expect(expandButton).not.toBeInTheDocument();
  });

  it('should render correctly with stack and no accessory', () => {
    render(
      <BpkCardListGridStack layout={LAYOUTS.stack} initiallyShownCards={3}>
        {mockCards(6)}
      </BpkCardListGridStack>,
    );

    const initialCards = screen.getByTestId(
      'bpk-card-list-grid-stack__initial-content',
    );
    const accessoryButton = screen.queryByTestId(
      'bpk-card-list__accessory-button',
    );
    const expandButton = screen.queryByTestId(
      'bpk-card-list__accessory-expand-button',
    );
    expect(initialCards.childNodes.length).toBe(6);
    expect(accessoryButton).not.toBeInTheDocument();
    expect(expandButton).not.toBeInTheDocument();
  });

  it('should render correctly with expand accessory', () => {
    render(
      <BpkCardListGridStack
        layout={LAYOUTS.grid}
        accessory={ACCESSORY_DESKTOP_TYPES.expand}
        initiallyShownCards={3}
        expandText="Show more"
      >
        {mockCards(9)}
      </BpkCardListGridStack>,
    );

    const expandButton = screen.getByTestId(
      'bpk-card-list__accessory-expand-button',
    );
    expect(expandButton).toBeInTheDocument();
    expect(expandButton).toHaveRole('button');
  });

  it('should render correctly with button accessory', () => {
    render(
      <BpkCardListGridStack
        layout={LAYOUTS.grid}
        accessory={ACCESSORY_DESKTOP_TYPES.button}
        buttonContent="Explore more"
        onButtonClick={() => {}}
        initiallyShownCards={3}
      >
        {mockCards(6)}
      </BpkCardListGridStack>,
    );

    const initialCards = screen.getByTestId(
      'bpk-card-list-grid-stack__initial-content',
    );
    const accessoryButton = screen.getByTestId(
      'bpk-card-list__accessory-button',
    );
    expect(initialCards.childNodes.length).toBe(6);
    expect(accessoryButton).toBeInTheDocument();
    expect(accessoryButton).toHaveRole('button');
  });

  it('should show and hide cards when expand button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <BpkCardListGridStack
        layout={LAYOUTS.grid}
        accessory={ACCESSORY_DESKTOP_TYPES.expand}
        initiallyShownCards={3}
        expandText="Show more"
      >
        {mockCards(9)}
      </BpkCardListGridStack>,
    );

    const hiddenCards = screen.getByTestId(
      'bpk-card-list-grid-stack__expanded-content',
    );
    const expandButton = screen.getByTestId(
      'bpk-card-list__accessory-expand-button',
    );
    expect(hiddenCards.childNodes.length).toBe(0);
    expect(expandButton).toHaveRole('button');

    await user.click(expandButton);
    expect(hiddenCards.childNodes.length).toBe(6);

    const expandButtonClose = screen.getByTestId(
      'bpk-card-list__accessory-expand-button',
    );

    await user.click(expandButtonClose);
    expect(hiddenCards.childNodes.length).toBe(0);
  });
});
