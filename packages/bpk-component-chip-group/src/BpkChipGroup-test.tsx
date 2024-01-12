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
/* @flow strict */

import { render } from '@testing-library/react';

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

  // it('should support arbitrary props', () => {
  //   const { asFragment } = render(
  //     <BpkChipGroup
  //       chips={chips}
  //       type={CHIP_GROUP_TYPES.wrap}
  //       testid="123"
  //     />
  //   );
  //   expect(asFragment()).toMatchSnapshot();
  // });
});

describe('BpkChipGroupState', () => {
  // TODO
});
