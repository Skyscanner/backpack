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

import BpkSectionListItem from './BpkSectionListItem';

describe('BpkSectionListItem', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <BpkSectionListItem>Hello world</BpkSectionListItem>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "href" prop', () => {
    const { asFragment } = render(
      <BpkSectionListItem href="#">Hello world</BpkSectionListItem>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with an "onClick" prop', () => {
    const { asFragment } = render(
      <BpkSectionListItem onClick={jest.fn()}>Hello world</BpkSectionListItem>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a custom className', () => {
    const { asFragment } = render(
      <BpkSectionListItem className="custom-class">
        Hello world
      </BpkSectionListItem>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with arbitrary props', () => {
    const { asFragment } = render(
      <BpkSectionListItem testid="123">Hello world</BpkSectionListItem>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
