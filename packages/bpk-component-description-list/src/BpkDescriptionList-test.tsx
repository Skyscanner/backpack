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

import BpkDescriptionList from './BpkDescriptionList';

describe('BpkDescriptionList', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <BpkDescriptionList>
        <dt>term</dt>
        <dd>description</dd>
      </BpkDescriptionList>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "className" attribute', () => {
    const { asFragment } = render(
      <BpkDescriptionList className="test-description-list">
        <dt>term</dt>
        <dd>description</dd>
      </BpkDescriptionList>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with other attributes', () => {
    const { asFragment } = render(
      <BpkDescriptionList title="this is a description list">
        <dt>term</dt>
        <dd>description</dd>
      </BpkDescriptionList>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
