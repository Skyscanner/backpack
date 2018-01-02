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
import BpkButtonLink, { themeAttributes } from './BpkButtonLink';

describe('BpkButtonLink', () => {
  it('should render correctly', () => {
    const tree = renderer
      .create(<BpkButtonLink onClick={() => null}>Link</BpkButtonLink>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "className" atribute', () => {
    const tree = renderer
      .create(
        <BpkButtonLink onClick={() => null} className="test-class">
          Link
        </BpkButtonLink>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "white" attribute', () => {
    const tree = renderer
      .create(
        <BpkButtonLink onClick={() => null} white>
          Link
        </BpkButtonLink>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with arbitrary attributes', () => {
    const tree = renderer
      .create(
        <BpkButtonLink onClick={() => null} id="test-id">
          Link
        </BpkButtonLink>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('themeAttributes', () => {
    it('exports the expected themeAttributes', () => {
      expect(themeAttributes).toEqual([
        'linkColor',
        'linkHoverColor',
        'linkActiveColor',
        'linkVisitedColor',
      ]);
    });
  });
});
