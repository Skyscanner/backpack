/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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

import React from 'react';
import renderer from 'react-test-renderer';
import BpkHeading from './BpkHeading';

describe('BpkHeading', () => {
  it('should render correctly with a "level" attribute equal to "h1"', () => {
    const tree = renderer
      .create(<BpkHeading level="h1">My heading</BpkHeading>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "level" attribute equal to "h2"', () => {
    const tree = renderer
      .create(<BpkHeading level="h2">My heading</BpkHeading>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "level" attribute equal to "h3"', () => {
    const tree = renderer
      .create(<BpkHeading level="h3">My heading</BpkHeading>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "level" attribute equal to "h4"', () => {
    const tree = renderer
      .create(<BpkHeading level="h4">My heading</BpkHeading>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "level" attribute equal to "h5"', () => {
    const tree = renderer
      .create(<BpkHeading level="h5">My heading</BpkHeading>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "level" attribute equal to "h6"', () => {
    const tree = renderer
      .create(<BpkHeading level="h6">My heading</BpkHeading>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "id" attribute', () => {
    const tree = renderer
      .create(
        <BpkHeading level="h1" id="my-id">
          My heading
        </BpkHeading>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
