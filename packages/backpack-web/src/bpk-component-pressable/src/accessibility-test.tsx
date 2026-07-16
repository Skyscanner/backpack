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

import BpkPressable from './BpkPressable';

describe('BpkPressable accessibility tests', () => {
  it('has no violations in button mode', async () => {
    const { container } = render(<BpkPressable>Press me</BpkPressable>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations in button mode when disabled', async () => {
    const { container } = render(<BpkPressable disabled>Disabled</BpkPressable>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations in button mode with aria-label', async () => {
    const { container } = render(
      <BpkPressable aria-label="Open settings">
        <span aria-hidden="true">⚙</span>
      </BpkPressable>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations in anchor mode', async () => {
    const { container } = render(
      <BpkPressable as="a" href="/flights">
        Flights
      </BpkPressable>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations in anchor mode when opening in a new tab', async () => {
    const { container } = render(
      <BpkPressable as="a" href="/flights" blank>
        Flights (opens in new tab)
      </BpkPressable>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
