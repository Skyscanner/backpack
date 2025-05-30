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

import { getByText, render, screen } from '@testing-library/react';

import mockCards from '../testMocks';

import BpkCardList from './BpkCardList';
import { ACCESSORY_DESKTOP_TYPES, ACCESSORY_MOBILE_TYPES, LAYOUTS } from './common-types';

describe('BpkCardList', () => {
  it('should render correctly with grid, stack and no accessory', () => {
    render(
      <BpkCardList
        title="Title"
        description="Description"
        layoutDesktop={LAYOUTS.grid}
        layoutMobile={LAYOUTS.stack}
        cardList={mockCards(2)}
      />,
    );

    const cardsSection = screen.getByTestId('bpk-card-list--card-list')
      .firstChild?.firstChild;
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(cardsSection?.childNodes.length).toBe(2);
  });

  it('should render correctly with grid, stack, header button and no accessory', () => {
    render(
      <BpkCardList
        title="Title"
        description="Description"
        layoutDesktop={LAYOUTS.grid}
        layoutMobile={LAYOUTS.stack}
        cardList={mockCards(2)}
        buttonText="Header Button"
        buttonHref="#"
        onButtonClick={() => {}}
      />,
    );

    const header = screen.getByTestId('bpk-card-list').firstElementChild;
    const cardsSection = screen.getByTestId('bpk-card-list--card-list')
      .firstChild?.firstChild;
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(
      getByText(header as HTMLElement, 'Header Button'),
    ).toBeInTheDocument();
    expect(cardsSection?.childNodes.length).toBe(2);
  });

  it('should render correctly with grid, stack and expand accessory', () => {
    render(
      <BpkCardList
        title="Title"
        description="Description"
        layoutDesktop={LAYOUTS.grid}
        layoutMobile={LAYOUTS.stack}
        cardList={mockCards(2)}
        accessoryDesktop={ACCESSORY_DESKTOP_TYPES.Expand}
        accessoryMobile={ACCESSORY_MOBILE_TYPES.Expand}
        expandText="Expand"
      />,
    );

    const cardsAndAccessorySection = screen.getByTestId(
      'bpk-card-list--card-list',
    ).firstChild;
    const cardsSection = cardsAndAccessorySection?.firstChild;
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Expand')).toBeInTheDocument();
    expect(cardsSection?.childNodes.length).toBe(2);
    expect(
      getByText(cardsAndAccessorySection as HTMLElement, 'Expand'),
    ).toBeInTheDocument();
  });

  it('should render correctly with grid, stack and button accessory', () => {
    render(
      <BpkCardList
        title="Title"
        description="Description"
        layoutDesktop={LAYOUTS.grid}
        layoutMobile={LAYOUTS.stack}
        cardList={mockCards(2)}
        accessoryDesktop={ACCESSORY_DESKTOP_TYPES.Button}
        accessoryMobile={ACCESSORY_MOBILE_TYPES.Button}
        buttonText="Button"
        onButtonClick={() => {}}
      />,
    );

    const cardsAndAccessorySection = screen.getByTestId(
      'bpk-card-list--card-list',
    ).firstChild;
    const cardsSection = cardsAndAccessorySection?.firstChild;

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Button')).toBeInTheDocument();
    expect(cardsSection?.childNodes.length).toBe(2);
    expect(
      getByText(cardsAndAccessorySection as HTMLElement, 'Button'),
    ).toBeInTheDocument();
  });
});
