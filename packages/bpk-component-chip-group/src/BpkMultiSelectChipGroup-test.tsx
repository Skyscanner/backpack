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
import '@testing-library/jest-dom';

import BpkMultiSelectChipGroup, {
  CHIP_GROUP_TYPES,
} from './BpkMultiSelectChipGroup';

const defaultProps = {
  type: CHIP_GROUP_TYPES.wrap,
  ariaLabel: 'a11y label',
};

describe('BpkMultiSelectChipGroup', () => {
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
      selected: true,
    },
    {
      text: 'Florence',
    },
    {
      text: 'Stockholm',
    },
  ];

  it('should render selected chip', () => {
    render(
      <BpkMultiSelectChipGroup
        {...defaultProps}
        chips={chips}
        type={CHIP_GROUP_TYPES.wrap}
      />,
    );

    const chip = screen.getByRole('checkbox', { name: 'Berlin' });

    expect(chip).toHaveClass('bpk-chip--default-selected');
  });

  it('should render correctly with sticky chip', () => {
    render(
      <BpkMultiSelectChipGroup
        stickyChip={{
          text: 'Sort & Filter',
        }}
        chips={chips}
        type={CHIP_GROUP_TYPES.rail}
        ariaLabel="Filter cities"
        leadingNudgerLabel="Scroll back"
        trailingNudgerLabel="Scroll forward"
      />,
    );
    expect(screen.getByRole('button', { name: 'Sort & Filter' })).toBeVisible();
  });

  it('should call onClick property of chip when clicked', async () => {
    const user = userEvent.setup();

    const onClick = jest.fn();

    render(
      <BpkMultiSelectChipGroup
        chips={[
          {
            text: 'London',
            onClick,
          },
          {
            text: 'Berlin',
            onClick,
          },
        ]}
        {...defaultProps}
      />,
    );

    await user.click(screen.getByText('Berlin'));

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(true, 1);
  });
});
