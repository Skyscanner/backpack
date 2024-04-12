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

import BpkChipGroup, { BpkChipGroupState, CHIP_COMPONENT, CHIP_GROUP_TYPES } from './BpkChipGroup';

const defaultProps = {
  type: CHIP_GROUP_TYPES.wrap,
  ariaLabel: 'a11y label',
}

describe('BpkChipGroup', () => {
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
    }
  ];

  it('should render correctly with type = rail', () => {
    const { asFragment } = render(<BpkChipGroup {...defaultProps} chips={chips} type={CHIP_GROUP_TYPES.rail} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with type = wrap', () => {
    const { asFragment } = render(<BpkChipGroup {...defaultProps} chips={chips} type={CHIP_GROUP_TYPES.wrap} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with sticky chip', () => {
    const { asFragment } = render(
      <BpkChipGroup
        stickyChip={{
          text: 'Sort & Filter'
        }}
        chips={chips}
        type={CHIP_GROUP_TYPES.rail}
        ariaLabel="Filter cities"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with all chip component types', () => {
    const alternativeChips = [
      {
        text: 'London',
        component: CHIP_COMPONENT.dismissible,
      },
      {
        text: 'Berlin',
        component: CHIP_COMPONENT.dropdown,
      },
      {
        text: 'Florence',
        component: CHIP_COMPONENT.selectable,
      },
    ];

    const { asFragment } = render(
      <BpkChipGroup
        chips={alternativeChips}
        {...defaultProps}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should call onClick property of chip when clicked', async () => {
    const user = userEvent.setup();

    const onClick = jest.fn();

    render(
      <BpkChipGroup
        chips={[
          {
            text: 'London',
            onClick,
          },
          {
            text: 'Berlin',
            onClick,
          }
        ]}
        {...defaultProps}
      />,
    );

    await user.click(screen.getByText('Berlin'));

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(true, 1);
  });
});

describe('BpkChipGroupState', () => {
  const chips = [
    {
      text: 'London',
      onClick: jest.fn(),
    },
    {
      text: 'Berlin',
      onClick: jest.fn(),
    }, {
      text: 'New York',
      onClick: jest.fn(),
    }
  ];

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should select a chip when clicked', async () => {
    const user = userEvent.setup();

    render(
      <BpkChipGroupState
        chips={chips}
        {...defaultProps}
      />,
    );

    const chip = screen.getByRole('option', { name: 'Berlin' });
    await user.click(chip);

    expect(chip).toHaveClass('bpk-chip--default-selected');
  });

  it('should allow multiple chips to be selected', async () => {
    const user = userEvent.setup();

    render(
      <BpkChipGroupState
        chips={chips}
        {...defaultProps}
      />,
    );

    const berlinChip = screen.getByRole('option', { name: 'Berlin' });
    const londonChip = screen.getByRole('option', { name: 'London' });

    await user.click(berlinChip);
    await user.click(londonChip);

    expect(berlinChip).toHaveClass('bpk-chip--default-selected');
    expect(londonChip).toHaveClass('bpk-chip--default-selected');
  });

  it('should unselect a chip when selected and clicked', async () => {
    const user = userEvent.setup();

    render(
      <BpkChipGroupState
        chips={chips}
        {...defaultProps}
      />,
    );

    const chip = screen.getByRole('option', { name: 'Berlin' });
    await user.click(chip);

    expect(chip).toHaveClass('bpk-chip--default-selected');

    await user.click(chip);

    expect(chip).not.toHaveClass('bpk-chip--default-selected');
  });

  it('should call onclick with the selected chip and index when clicked', async () => {
    const user = userEvent.setup();

    render(
      <BpkChipGroupState
        chips={chips}
        {...defaultProps}
      />,
    );

    await user.click(screen.getByRole('option', { name: 'Berlin' }));

    const { onClick } = chips[1];

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(true, 1);
  });

  it('should allow chips to be selected initially when passed in chips array', () => {
    render(
      <BpkChipGroupState
        chips={[{
          text: 'London',
          onClick: jest.fn(),
        },
        {
          text: 'Berlin',
          onClick: jest.fn(),
          selected: true,
        }]}
        {...defaultProps}
      />,
    );

    const chip = screen.getByRole('option', { name: 'Berlin' });

    expect(chip).toHaveClass('bpk-chip--default-selected');
  });
});
