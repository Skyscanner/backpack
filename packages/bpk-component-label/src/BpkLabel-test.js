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
import renderer from 'react-test-renderer';

import BpkLabel from './BpkLabel';

describe('BpkLabel', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<BpkLabel>Origin</BpkLabel>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "white" attribute', () => {
    const tree = renderer.create(<BpkLabel white>Origin</BpkLabel>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "required" attribute', () => {
    const tree = renderer.create(<BpkLabel required>Origin</BpkLabel>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "valid" attribute false', () => {
    const tree = renderer
      .create(<BpkLabel valid={false}>Origin</BpkLabel>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "valid" attribute false and "required" attributes', () => {
    const tree = renderer
      .create(
        <BpkLabel required valid={false}>
          Origin
        </BpkLabel>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly without an asterisk when disabled and required', () => {
    const tree = renderer
      .create(
        <BpkLabel disabled required>
          Origin
        </BpkLabel>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "className" attribute', () => {
    const tree = renderer
      .create(<BpkLabel className="test">Origin</BpkLabel>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
