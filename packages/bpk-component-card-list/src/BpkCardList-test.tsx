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

import mockCards from '../testMocks';

import BpkCardList from './BpkCardList';
import {
  ACCESSORY_DESKTOP_TYPES,
  ACCESSORY_MOBILE_TYPES,
  LAYOUTS,
} from './common-types';

const BpkChipGroupRail = jest.fn(() => (
  <div data-testid="mock-chip-group-rail">
    <span>Mock Chip Group Rail</span>
  </div>
));

describe('BpkCardList', () => {
  it('should render correctly with chip group, grid, stack and SectionHeader without header button', () => {
    render(
      <BpkCardList
        title="Title"
        description="Description"
        chipGroup={BpkChipGroupRail()}
        layoutDesktop={LAYOUTS.grid}
        layoutMobile={LAYOUTS.stack}
        cardList={mockCards(2)}
        accessoryDesktop={ACCESSORY_DESKTOP_TYPES.button}
        accessoryMobile={ACCESSORY_MOBILE_TYPES.button}
        buttonContent="Not a Header Button"
        onButtonClick={() => {}}
      />,
    );

    const cardsSection = screen.getByTestId('bpk-card-list-grid-stack');
    const chipGroup = screen.getByTestId('mock-chip-group-rail');
    const headerButton = screen.queryByTestId('bpk-card-list-header-button');
    expect(cardsSection).toBeInTheDocument();
    expect(chipGroup).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(headerButton).not.toBeInTheDocument();
  });

  it('should render correctly with chip group, grid, stack, header button and no accessory', () => {
    render(
      <BpkCardList
        title="Title"
        description="Description"
        chipGroup={BpkChipGroupRail()}
        layoutDesktop={LAYOUTS.grid}
        layoutMobile={LAYOUTS.stack}
        cardList={mockCards(2)}
        buttonContent="Header Button"
        onButtonClick={() => {}}
      />,
    );

    const cardsSection = screen.getByTestId('bpk-card-list-grid-stack');
    const chipGroup = screen.getByTestId('mock-chip-group-rail');
    const headerButton = screen.queryByTestId('bpk-card-list-header-button');
    expect(cardsSection).toBeInTheDocument();
    expect(chipGroup).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(headerButton).toBeInTheDocument();
  });

  it('should not render SectionHeader when title undefined', () => {
    render(
      // @ts-expect-error Intentionally omitting 'title' prop
      <BpkCardList
        description="Description"
        chipGroup={BpkChipGroupRail()}
        layoutDesktop={LAYOUTS.grid}
        layoutMobile={LAYOUTS.stack}
        cardList={mockCards(2)}
        buttonContent="Header Button"
        onButtonClick={() => {}}
      />,
    );

    expect(screen.queryByText('Description')).not.toBeInTheDocument();
    expect(screen.queryByTestId('bpk-card-list-header-button')).not.toBeInTheDocument();
  });

  it('should render SectionHeader when title is an empty string', () => {
    const { container } = render(
      <BpkCardList
        title=""
        description="Description"
        chipGroup={BpkChipGroupRail()}
        layoutDesktop={LAYOUTS.grid}
        layoutMobile={LAYOUTS.stack}
        cardList={mockCards(2)}
        buttonContent="Header Button"
        onButtonClick={() => {}}
      />,
    );

    const heading = container.querySelector('h2');
    expect(heading).toBeInTheDocument();
    expect(heading?.textContent).toBe('');
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByTestId('bpk-card-list-header-button')).toBeInTheDocument();
  });
});
