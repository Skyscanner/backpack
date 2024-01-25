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

import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import { CHIP_GROUP_TYPES } from './BpkChipGroup';
import BpkChipGroupSingleSelect from './BpkChipGroupSingleSelect';

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

describe('BpkChipGroupSingleSelect', () => {
  it('should render correctly with type = rail', () => {
    const { asFragment } = render(<BpkChipGroupSingleSelect chips={chips} type={CHIP_GROUP_TYPES.rail} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with type = wrap', () => {
    const { asFragment } = render(<BpkChipGroupSingleSelect chips={chips} type={CHIP_GROUP_TYPES.wrap} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should call onItemClick when a chip is clicked', async () => {
    const user = userEvent.setup();

    const onItemClick = jest.fn();

    render(
      <BpkChipGroupSingleSelect
        chips={chips}
        type={CHIP_GROUP_TYPES.wrap}
        onItemClick={onItemClick}
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
        type={CHIP_GROUP_TYPES.wrap}
        selectedIndex={1}
      />,
    );

    expect(screen.getByRole('option', { name: 'Berlin' })).toHaveClass('bpk-chip--default-selected')
    expect(screen.getByRole('option', { name: 'London' })).not.toHaveClass('bpk-chip--default-selected')
    expect(screen.getByRole('option', { name: 'Florence' })).not.toHaveClass('bpk-chip--default-selected')
  });

  it('should support custom class names', () => {
    const { asFragment } = render(
      <BpkChipGroupSingleSelect
        chips={chips}
        type={CHIP_GROUP_TYPES.wrap}
        className="custom-classname"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('BpkChipGroupSingleSelectState', () => {
  // TODO
});
