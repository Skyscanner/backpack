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

import BpkDescriptionTerm from './BpkDescriptionTerm';

describe('BpkDescriptionTerm', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <BpkDescriptionTerm>Term</BpkDescriptionTerm>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "className" attribute', () => {
    const { asFragment } = render(
      <BpkDescriptionTerm className="test-term">Term</BpkDescriptionTerm>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a other attributes', () => {
    const { asFragment } = render(
      <BpkDescriptionTerm title="this is a term">Term</BpkDescriptionTerm>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
