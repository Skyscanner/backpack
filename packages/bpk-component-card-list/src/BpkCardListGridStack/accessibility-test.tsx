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
import { ACCESSORY_DESKTOP_TYPES, LAYOUTS } from '../common-types';

import BpkCardListGridStack from './BpkCardListGridStack';

describe('BpkCardListGridStack', () => {
  it('should have no accessibility issues for grid and no accessory', async () => {
    const { container } = render(
      <BpkCardListGridStack layout={LAYOUTS.grid} initiallyShownCards={3}>
        {mockCards(3)}
      </BpkCardListGridStack>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility issues for stack and no accessory', async () => {
    const { container } = render(
      <BpkCardListGridStack layout={LAYOUTS.stack} initiallyShownCards={3}>
        {mockCards(3)}
      </BpkCardListGridStack>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility issues for expand accessory', async () => {
    const { container } = render(
      <BpkCardListGridStack
        layout={LAYOUTS.grid}
        accessory={ACCESSORY_DESKTOP_TYPES.expand}
        initiallyShownCards={3}
        expandText="Show more"
      >
        {mockCards(3)}
      </BpkCardListGridStack>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility issues for button accessory', async () => {
    const { container } = render(
      <BpkCardListGridStack
        layout={LAYOUTS.grid}
        accessory={ACCESSORY_DESKTOP_TYPES.button}
        initiallyShownCards={3}
        buttonContent="Show more"
        onButtonClick={() => {}}
      >
        {mockCards(3)}
      </BpkCardListGridStack>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
