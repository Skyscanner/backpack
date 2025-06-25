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

import BpkSectionListSection from './BpkSectionListSection';

describe('BpkSectionListSection', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <BpkSectionListSection>Hello world</BpkSectionListSection>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "headerText" prop', () => {
    const { asFragment } = render(
      <BpkSectionListSection headerText="Heading">
        Hello world
      </BpkSectionListSection>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with arbitrary props', () => {
    const { asFragment } = render(
      // @ts-expect-error TS(2322): Type '{ children: string; testid: string; }' is no... Remove this comment to see the full error message
      <BpkSectionListSection testid="123">Hello world</BpkSectionListSection>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
