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

import { CHIP_GROUP_TYPES } from './BpkChipGroup';
import BpkChipGroupSingleSelect, { BpkChipGroupSingleSelectState } from './BpkChipGroupSingleSelect';

const defaultProps = {
  type: CHIP_GROUP_TYPES.wrap,
  ariaLabel: 'a11y label',
}

describe('BpkChipGroupSingleSelect', () => {
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
    }
  ];

  it('should render correctly with type = rail', () => {
    const { asFragment } = render(
      <BpkChipGroupSingleSelect
        chips={chips}
        type={CHIP_GROUP_TYPES.rail}
        ariaLabel="Filter cities"
        leadingNudgerLabel="Scroll back"
        trailingNudgerLabel="Scroll forward"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with type = wrap', () => {
    const { asFragment } = render(<BpkChipGroupSingleSelect chips={chips} type={CHIP_GROUP_TYPES.wrap} ariaLabel="Filter cities" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should call onItemClick when a chip is clicked', async () => {
    const user = userEvent.setup();

    const onItemClick = jest.fn();

    render(
      <BpkChipGroupSingleSelect
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
      <BpkChipGroupSingleSelect
        chips={chipsWithSelected}
        selectedIndex={1}
        {...defaultProps}
      />,
    );

    expect(screen.getByRole('radio', { name: 'Berlin' })).toHaveClass('bpk-chip--default-selected')
    expect(screen.getByRole('radio', { name: 'London' })).not.toHaveClass('bpk-chip--default-selected')
    expect(screen.getByRole('radio', { name: 'Florence' })).not.toHaveClass('bpk-chip--default-selected')
  });
});

describe('BpkChipGroupSingleSelectState', () => {
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
  ];

  it('should select a chip when clicked', async () => {
    const user = userEvent.setup();

    render(
      <BpkChipGroupSingleSelectState
        chips={chips}
        {...defaultProps}
      />,
    );

    const chip = screen.getByRole('radio', { name: 'Berlin' });

    await user.click(chip);

    expect(chip).toHaveClass('bpk-chip--default-selected');
  });

  it('should only allow one chip to be selected', async () => {
    const user = userEvent.setup();

    render(
      <BpkChipGroupSingleSelectState
        chips={chips}
        {...defaultProps}
      />,
    );

    const berlinChip = screen.getByRole('radio', { name: 'Berlin' });

    await user.click(berlinChip);

    expect(berlinChip).toHaveClass('bpk-chip--default-selected');

    const londonChip = screen.getByRole('radio', { name: 'London' });

    await user.click(londonChip);

    expect(londonChip).toHaveClass('bpk-chip--default-selected');
    expect(berlinChip).not.toHaveClass('bpk-chip--default-selected');
  });

  it('should deselect a chip when selected and clicked', async () => {
    const user = userEvent.setup();

    render(
      <BpkChipGroupSingleSelectState
        chips={chips}
        {...defaultProps}
      />,
    );

    const chip = screen.getByRole('radio', { name: 'Berlin' });

    await user.click(chip);

    expect(chip).toHaveClass('bpk-chip--default-selected');

    await user.click(chip);

    expect(chip).not.toHaveClass('bpk-chip--default-selected');
  });

  it('should call onItemClick with the correct params when clicked', async () => {
    const user = userEvent.setup();

    const onItemClick = jest.fn();

    render(
      <BpkChipGroupSingleSelectState
        chips={chips}
        onItemClick={onItemClick}
        {...defaultProps}
      />,
    );

    await user.click(screen.getByRole('radio', { name: 'Berlin' }));

    expect(onItemClick).toHaveBeenCalledTimes(1);
    expect(onItemClick).toHaveBeenCalledWith(chips[1], true, 1);
  });

  it('should have initiallySelectedIndex selected before interaction', () => {
    render(
      <BpkChipGroupSingleSelectState
        chips={chips}
        initiallySelectedIndex={1}
        {...defaultProps}
      />,
    );

    const chip = screen.getByRole('radio', { name: 'Berlin' });

    expect(chip).toHaveClass('bpk-chip--default-selected');
  });
});
