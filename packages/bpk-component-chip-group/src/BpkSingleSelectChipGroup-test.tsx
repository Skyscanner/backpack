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

import { CHIP_GROUP_TYPES } from './BpkMultiSelectChipGroup';
import BpkSingleSelectChipGroup from './BpkSingleSelectChipGroup';

const defaultProps = {
  type: CHIP_GROUP_TYPES.wrap,
  ariaLabel: 'a11y label',
};

describe('BpkSingleSelectChipGroup', () => {
  beforeEach(() => {
    window.matchMedia = jest.fn().mockImplementation(() => ({
      matches: true,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));
  });

  const chips = [
    {
      text: 'London',
    },
    {
      text: 'Berlin',
    },
    {
      text: 'Florence',
    },
    {
      text: 'Stockholm',
    },
  ];

  it('should call onItemClick when a chip is clicked', async () => {
    const user = userEvent.setup();

    const onItemClick = jest.fn();

    render(
      <BpkSingleSelectChipGroup
        chips={chips}
        onItemClick={onItemClick}
        {...defaultProps}
      />,
    );

    await user.click(screen.getByText('Berlin'));

    expect(onItemClick).toHaveBeenCalledTimes(1);
    expect(onItemClick).toHaveBeenCalledWith({ text: 'Berlin' }, true, 1);
  });

  it('Should use selectedIndex prop to determine selected chip', async () => {
    const chipsWithSelected = [
      {
        text: 'London',
        selected: true,
      },
      {
        text: 'Berlin',
        selected: false,
      },
      {
        text: 'Florence',
        selected: true,
      },
    ];

    render(
      <BpkSingleSelectChipGroup
        chips={chipsWithSelected}
        selectedIndex={1}
        {...defaultProps}
      />,
    );

    expect(screen.getByRole('radio', { name: 'Berlin' })).toHaveClass(
      'bpk-chip--default-selected',
    );
    expect(screen.getByRole('radio', { name: 'London' })).not.toHaveClass(
      'bpk-chip--default-selected',
    );
    expect(screen.getByRole('radio', { name: 'Florence' })).not.toHaveClass(
      'bpk-chip--default-selected',
    );
  });
});
