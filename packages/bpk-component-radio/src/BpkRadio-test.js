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
import BpkRadio from './BpkRadio';

describe('BpkRadio', () => {
  it('should render correctly', () => {
    const tree = renderer
      .create(<BpkRadio name="radio" label="Direct" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with id attribute', () => {
    const tree = renderer
      .create(<BpkRadio id="radio" name="radio" label="Direct" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with checked attribute', () => {
    const tree = renderer
      .create(<BpkRadio name="radio" label="Direct" checked />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with disabled attribute', () => {
    const tree = renderer
      .create(<BpkRadio name="radio" label="Direct" disabled />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with white attribute', () => {
    const tree = renderer
      .create(<BpkRadio name="radio" label="Direct" white />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with value attribute', () => {
    const tree = renderer
      .create(<BpkRadio name="radio" label="Direct" value="my-value" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
