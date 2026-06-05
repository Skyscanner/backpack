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

import BpkMultiSelectChipGroup, { CHIP_GROUP_TYPES } from './BpkMultiSelectChipGroup';
import BpkSingleSelectChipGroup from './BpkSingleSelectChipGroup';

const chips = [
  {
    text: 'London',
  },
  {
    text: 'Berlin',
    selected: true,
  },
  {
    text: 'Florence',
  },
  {
    text: 'Stockholm',
    disabled: true,
  }
];

describe('BpkMultiSelectChipGroup accessibility tests', () => {
  beforeEach(() => {
    window.matchMedia = jest.fn().mockImplementation(() => ({
      matches: true,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));
  });

  it('should not have programmatically-detectable accessibility issues when type = rail', async () => {
    const { container } = render(
      <BpkMultiSelectChipGroup
        chips={chips}
        stickyChip={{
          text: 'Sort & Filter'
        }}
        type={CHIP_GROUP_TYPES.rail}
        ariaLabel="Select cities"
        leadingNudgerLabel="Scroll back"
        trailingNudgerLabel="Scroll forward"
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have programmatically-detectable accessibility issues when type = wrap', async () => {
    const { container } = render(
      <BpkMultiSelectChipGroup
        chips={chips}
        type={CHIP_GROUP_TYPES.wrap}
        ariaLabel="Select cities"
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('BpkSingleSelectChipGroup accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues when type = rail', async () => {
    const { container } = render(
      <BpkSingleSelectChipGroup
        chips={chips}
        type={CHIP_GROUP_TYPES.rail}
        selectedIndex={1}
        ariaLabel="Select a city"
        leadingNudgerLabel="Scroll back"
        trailingNudgerLabel="Scroll forward"
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have programmatically-detectable accessibility issues when type = wrap', async () => {
    const { container } = render(
      <BpkSingleSelectChipGroup
        chips={chips}
        type={CHIP_GROUP_TYPES.wrap}
        selectedIndex={1}
        ariaLabel="Select a city"
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
