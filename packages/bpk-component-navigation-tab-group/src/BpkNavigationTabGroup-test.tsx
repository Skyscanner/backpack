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

import BpkNavigationTabGroup, { NAVIGATION_TAB_GROUP_TYPES } from './BpkNavigationTabGroup';

import type { Props } from './BpkNavigationTabGroup';

const tabs: Props['tabs'] = [
  { id: 'air', text: 'Flights', href: '/' },
  { id: 'hotel', text: 'Hotels', href: '/hotel' },
  { id: 'car', text: 'Car hire', href: '/carhire' },
];

const tabsWithAnalytics: Props['tabs'] = [
  { id: 'air', text: 'Flights', href: '/', 'data-Cy':'flight-feature', 'data-analytics-name':'flight' },
  { id: 'hotel', text: 'Hotels', href: '/hotel', 'data-Cy':'hotel-feature', 'data-analytics-name':'hotel' },
  { id: 'car', text: 'Car hire', href: '/carhire', 'data-Cy':'carhire-feature', 'data-analytics-name':'car hire' },
];

describe('BpkNavigationTabGroup', () => {
  beforeEach(() => {
    window.matchMedia = jest.fn().mockImplementation(() => ({
      matches: true,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));
  });

  it('should render correctly', () => {
    render(
      <BpkNavigationTabGroup
        id = "navTest"
        tabs={tabs}
        onItemClick={() => {}}
        selectedIndex={0}
        ariaLabel="Navigation tabs"
      />,
    );
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Navigation tabs');
    expect(screen.getByText('Flights')).toBeInTheDocument();
    expect(screen.getByText('Hotels')).toBeInTheDocument();
    expect(screen.getByText('Car hire')).toBeInTheDocument();
  });

  it('should render selected link', () => {
    render(
      <BpkNavigationTabGroup
        id = "navTest"
        tabs={tabs}
        onItemClick={() => {}}
        selectedIndex={0}
        ariaLabel="Navigation tabs"
      />,
    );

    const selectedTextElement = screen.getByText('Flights');
    const selectedLink = selectedTextElement.closest('a');

    expect(selectedLink).toHaveClass(
      'bpk-navigation-tab-wrap--surface-contrast-selected',
    );
  });

  it('should call onItemClick when a tab is clicked', async () => {
    const user = userEvent.setup();

    const onItemClick = jest.fn();

    render(
      <BpkNavigationTabGroup
        id = "navTest"
        tabs={tabs}
        onItemClick={onItemClick}
        selectedIndex={0}
        ariaLabel="Navigation tabs"
      />,
    );

    await user.click(screen.getByText('Hotels'));

    expect(onItemClick).toHaveBeenCalledTimes(1);
    expect(onItemClick).toHaveBeenCalledWith(
      expect.any(Object),
      { id:'hotel', text: 'Hotels', href: '/hotel' },
      1,
    );
  });

  it('should render correctly when type is CanvasDefault', () => {
    render(
      <BpkNavigationTabGroup
        id = "navTest"
        tabs={tabs}
        onItemClick={() => {}}
        selectedIndex={0}
        type={NAVIGATION_TAB_GROUP_TYPES.CanvasDefault}
        ariaLabel="Navigation tabs"
      />,
    );

    const flightTextElement = screen.getByText('Flights');
    const flightLink = flightTextElement.closest('a');

    expect(flightLink).toHaveClass('bpk-navigation-tab-wrap--canvas-default');
  });

  it('should render correctly props when tab props with data analytics', () => {
    render(
      <BpkNavigationTabGroup
        id = "navTest"
        tabs={tabsWithAnalytics}
        onItemClick={() => {}}
        selectedIndex={0}
        type={NAVIGATION_TAB_GROUP_TYPES.CanvasDefault}
        ariaLabel="Navigation tabs"
      />,
    );

    const flightTextElement = screen.getByText('Flights');
    const flightLink = flightTextElement.closest('a');

    expect(flightLink).toHaveAttribute('id', 'air');
    expect(flightLink).toHaveAttribute('data-cy', 'flight-feature');
    expect(flightLink).toHaveAttribute('data-analytics-name', 'flight');
  });

  it('should render correctly props when tab props without data analytics', () => {
    render(
      <BpkNavigationTabGroup
        id = "navTest"
        tabs={tabs}
        onItemClick={() => {}}
        selectedIndex={0}
        type={NAVIGATION_TAB_GROUP_TYPES.CanvasDefault}
        ariaLabel="Navigation tabs"
      />,
    );

    const flightTextElement = screen.getByText('Flights');
    const flightLink = flightTextElement.closest('a');

    expect(flightLink).toHaveAttribute('id', 'air');
    expect(flightLink).not.toHaveAttribute('data-cy');
    expect(flightLink).not.toHaveAttribute('data-analytics-name');
  });
});
