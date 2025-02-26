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

import mockCards from '../testMocks';

import BpkCardList from './BpkCardList';
import { LAYOUTS } from './common-types';

describe('BpkCardList', () => {
  it('should not have any accessibility issues with grid, stack and no accessory', async () => {
    const { container } = render(
      <BpkCardList
        title="Title"
        description="Description"
        layoutDesktop={LAYOUTS.grid}
        layoutMobile={LAYOUTS.stack}
        cardList={mockCards(2)}
      />,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have any accessibility issues with grid, stack, header button and no accessory', async () => {
    const { container } = render(
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

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have any accessibility issues with grid, stack, expand accessory', async () => {
    const { container } = render(
      <BpkCardList
        title="Title"
        description="Description"
        layoutDesktop={LAYOUTS.grid}
        layoutMobile={LAYOUTS.stack}
        cardList={mockCards(2)}
        accessory="expand"
        expandText="Expand"
      />,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have any accessibility issues with grid, stack, button accessory', async () => {
    const { container } = render(
      <BpkCardList
        title="Title"
        description="Description"
        layoutDesktop={LAYOUTS.grid}
        layoutMobile={LAYOUTS.stack}
        cardList={mockCards(2)}
        accessory="button"
        buttonText="Button"
        onButtonClick={() => {}}
      />,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
