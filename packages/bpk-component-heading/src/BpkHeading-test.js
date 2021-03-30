/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
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

import React from 'react';
import { render } from '@testing-library/react';

import BpkHeading from './BpkHeading';

describe('BpkHeading', () => {
  it('should render correctly with a "level" attribute equal to "h1"', () => {
    const { asFragment } = render(
      <BpkHeading level="h1">My heading</BpkHeading>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "level" attribute equal to "h2"', () => {
    const { asFragment } = render(
      <BpkHeading level="h2">My heading</BpkHeading>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "level" attribute equal to "h3"', () => {
    const { asFragment } = render(
      <BpkHeading level="h3">My heading</BpkHeading>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "level" attribute equal to "h4"', () => {
    const { asFragment } = render(
      <BpkHeading level="h4">My heading</BpkHeading>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "level" attribute equal to "h5"', () => {
    const { asFragment } = render(
      <BpkHeading level="h5">My heading</BpkHeading>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "level" attribute equal to "h6"', () => {
    const { asFragment } = render(
      <BpkHeading level="h6">My heading</BpkHeading>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "id" attribute', () => {
    const { asFragment } = render(
      <BpkHeading level="h1" id="my-id">
        My heading
      </BpkHeading>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
