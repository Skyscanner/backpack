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
import BpkHorizontalNavItem, { themeAttributes } from './BpkHorizontalNavItem';

describe('BpkHorizontalNavItem', () => {
  it('should render correctly', () => {
    const tree = renderer
      .create(<BpkHorizontalNavItem>My nav item content</BpkHorizontalNavItem>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with custom "className" prop', () => {
    const tree = renderer
      .create(
        <BpkHorizontalNavItem className="my-custom-class">
          My nav item content
        </BpkHorizontalNavItem>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with an "href" prop', () => {
    const tree = renderer
      .create(
        <BpkHorizontalNavItem href="#">
          My nav item content
        </BpkHorizontalNavItem>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "selected" prop', () => {
    const tree = renderer
      .create(
        <BpkHorizontalNavItem selected>
          My nav item content
        </BpkHorizontalNavItem>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "spaceAround" prop', () => {
    const tree = renderer
      .create(
        <BpkHorizontalNavItem spaceAround>
          My nav item content.
        </BpkHorizontalNavItem>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "stretch" prop', () => {
    const tree = renderer
      .create(
        <BpkHorizontalNavItem stretch>
          My nav item content.
        </BpkHorizontalNavItem>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with arbitrary props', () => {
    const tree = renderer
      .create(
        <BpkHorizontalNavItem
          data-arbitrary-1="arbirary-value-1"
          data-arbitrary-2="arbirary-value-2"
        >
          My nav content.
        </BpkHorizontalNavItem>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('themeAttributes', () => {
    it('exports the expected themeAttributes', () => {
      expect(themeAttributes).toEqual([
        'horizontalNavLinkColor',
        'horizontalNavLinkHoverColor',
        'horizontalNavLinkActiveColor',
        'horizontalNavLinkSelectedColor',
        'horizontalNavBarSelectedColor',
      ]);
    });
  });
});
