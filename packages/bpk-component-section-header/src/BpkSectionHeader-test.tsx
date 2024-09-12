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

import { BpkButtonV2 } from '../../bpk-component-button';

import BpkSectionHeader, { SECTION_TYPES } from './BpkSectionHeader';

describe('BpkSectionHeader', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<BpkSectionHeader title="Section title" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "description" prop', () => {
    const { asFragment } = render(
      <BpkSectionHeader
        title="Section title"
        description="Section title description"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with an "button" prop', () => {
    const { asFragment } = render(
      <BpkSectionHeader
        title="Section title"
        description="Section title description"
        button={<BpkButtonV2 onClick={() => jest.fn()}>Action</BpkButtonV2>}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "type" prop', () => {
    const { asFragment } = render(
      <BpkSectionHeader
        title="Section title"
        description="Section title description"
        button={<BpkButtonV2 onClick={() => jest.fn()}>Action</BpkButtonV2>}
        type={SECTION_TYPES.onDark}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
