/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2020 Skyscanner Ltd
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

import BpkLink, { themeAttributes } from './BpkLink';

describe('BpkLink', () => {
  it('should render correctly with a "href" attribute', () => {
    const tree = renderer.create(<BpkLink href="#">Link</BpkLink>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "className" attribute', () => {
    const tree = renderer
      .create(
        <BpkLink href="#" className="test-class">
          Link
        </BpkLink>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "blank" attribute', () => {
    const tree = renderer
      .create(
        <BpkLink href="#" blank>
          Link (new window)
        </BpkLink>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "rel" attribute', () => {
    const tree = renderer
      .create(
        <BpkLink href="#" blank rel="rel-attr">
          Link (new window)
        </BpkLink>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "blank" and "rel" attributes', () => {
    const tree = renderer
      .create(
        <BpkLink href="#" blank rel="rel-overwrite">
          Link (new window)
        </BpkLink>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "white" attribute', () => {
    const tree = renderer
      .create(
        <BpkLink href="#" white>
          Link
        </BpkLink>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "alternate" attribute', () => {
    const tree = renderer
      .create(
        <BpkLink href="#" alternate>
          Link
        </BpkLink>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with arbitrary attributes', () => {
    const tree = renderer
      .create(
        <BpkLink href="#" id="test-id">
          Link
        </BpkLink>,
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
