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

import BpkSectionHeader, { SECTION_TYPES } from './BpkSectionHeader';

import BpkButton from '@backpack/bpk-component-button';


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
        button={<BpkButton onClick={() => jest.fn()}>Action</BpkButton>}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "type" prop', () => {
    const { asFragment } = render(
      <BpkSectionHeader
        title="Section title"
        description="Section title description"
        button={<BpkButton onClick={() => jest.fn()}>Action</BpkButton>}
        type={SECTION_TYPES.onDark}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
