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

import BpkDropdownChip from './BpkDropdownChip';
import { CHIP_TYPES } from './commonTypes';

// Just a convenience wrapper that includes the default props so we don't
// have to keep writing them for each test.
const TestChip = ({ ...rest }) => (
  <BpkDropdownChip onClick={() => null} accessibilityLabel="Toggle" {...rest}>
    Toggle me
  </BpkDropdownChip>
);

describe('BpkDropdownChip', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<TestChip />);
    expect(asFragment()).toMatchSnapshot();
  });

  Object.values(CHIP_TYPES).forEach((chipType) => {
    it(`should render correctly with type="${chipType}"`, () => {
      const { asFragment } = render(<TestChip type={chipType} />);
      expect(asFragment()).toMatchSnapshot();
    });

    it(`should render correctly with type="${chipType}" and selected`, () => {
      const { asFragment } = render(<TestChip type={chipType} selected />);
      expect(asFragment()).toMatchSnapshot();
    });

    it(`should render correctly with type="${chipType}" and disabled`, () => {
      const { asFragment } = render(<TestChip type={chipType} disabled />);
      expect(asFragment()).toMatchSnapshot();
    });

    it(`should render correctly with type="${chipType}", selected and disabled`, () => {
      const { asFragment } = render(
        <TestChip type={chipType} selected disabled />,
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it(`should render correctly with type="${chipType}" and a leading accessory view`, () => {
      const { asFragment } = render(
        <TestChip
          type={chipType}
          leadingAccessoryView={<span>Leading</span>}
        />,
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  it('should render correctly with a "className" attribute', () => {
    const { asFragment } = render(<TestChip className="custom-class" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
