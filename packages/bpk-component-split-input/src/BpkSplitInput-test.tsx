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

import BpkSplitInput from './BpkSplitInput';

const defaultProps = {
  name: 'otpInput',
  id: 'otpInput',
  label: 'otp input',
  onChange: () => {},
  onSubmit: () => {},
};

describe('BpkSplitInput', () => {
  it('should render without crashing', () => {
    const { asFragment } = render(<BpkSplitInput {...defaultProps} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with inputLength param', () => {
    const { asFragment } = render(
      <BpkSplitInput {...defaultProps} inputLength={6} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with large set as false', () => {
    const { asFragment } = render(
      <BpkSplitInput {...defaultProps} large={false} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with placeholder', () => {
    const { asFragment } = render(
      <BpkSplitInput {...defaultProps} placeholder="x" />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
