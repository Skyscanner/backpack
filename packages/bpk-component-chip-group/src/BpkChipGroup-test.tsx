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

import BpkSelectableChip, { BpkDismissibleChip, BpkDropdownChip } from '../../bpk-component-chip';

import BpkChipGroup, { CHIP_GROUP_TYPES } from './BpkChipGroup';

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

describe('BpkChipGroup', () => {
  it('should render correctly with type = rail', () => {
    const { asFragment } = render(<BpkChipGroup chips={chips} type={CHIP_GROUP_TYPES.rail} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with type = wrap', () => {
    const { asFragment } = render(<BpkChipGroup chips={chips} type={CHIP_GROUP_TYPES.wrap} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should support custom class names', () => {
    const { asFragment } = render(
      <BpkChipGroup
        chips={chips}
        type={CHIP_GROUP_TYPES.wrap}
        className="custom-classname"
      />,
    );
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
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with all chip component types', () => {
    const alternativeChips = [
      {
        text: 'London',
        component: BpkDismissibleChip,
      },
      {
        text: 'Berlin',
        component: BpkDropdownChip,
      },
      {
        text: 'Florence',
        component: BpkSelectableChip,
      },
    ];

    const { asFragment } = render(
      <BpkChipGroup
        chips={alternativeChips}
        type={CHIP_GROUP_TYPES.wrap}
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
        type={CHIP_GROUP_TYPES.wrap}
      />,
    );

    await user.click(screen.getByText('Berlin'));

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(true, 1);
  });

  it('should render nudger when on desktop', () => {
    // TODO
  });

  it('should not render nudger when on mobile', () => {
    // TODO
  });

});

describe('BpkChipGroupState', () => {
  // TODO
});
