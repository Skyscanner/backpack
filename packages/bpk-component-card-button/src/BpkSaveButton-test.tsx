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

import BpkSaveButton, { SIZE_TYPES, STYLE_TYPES } from './BpkSaveButton';

describe('BpkSaveButton', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <BpkSaveButton
        checked={false}
        onCheckedChange={() => {}}
        accessibilityLabel="Click to save"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "checked" is true', () => {
    const { asFragment } = render(
      <BpkSaveButton
        checked
        onCheckedChange={() => {}}
        accessibilityLabel="Click to remove save"
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "size" prop', () => {
    const { asFragment } = render(
      <BpkSaveButton
        checked={false}
        onCheckedChange={() => {}}
        accessibilityLabel="Click to save"
        size={SIZE_TYPES.small}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "style" prop', () => {
    const { asFragment } = render(
      <BpkSaveButton
        checked={false}
        onCheckedChange={() => {}}
        accessibilityLabel="Click to save"
        style={STYLE_TYPES.contained}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
