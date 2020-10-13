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
/* @flow strict */

import React from 'react';
import renderer from 'react-test-renderer';

import BpkOverlay, { BORDER_RADIUS_STYLES, OVERLAY_TYPES } from './BpkOverlay';

describe('BpkOverlay', () => {
  it('should render correctly', () => {
    const tree = renderer
      .create(
        <BpkOverlay>
          <span>Backpack</span>
        </BpkOverlay>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with foregroundContent', () => {
    const tree = renderer
      .create(
        <BpkOverlay foregroundContent={<span>Skyscanner</span>}>
          <span>Backpack</span>
        </BpkOverlay>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  Object.keys(OVERLAY_TYPES).map(overlayType =>
    it(`should render correctly with overlayType={${overlayType}}`, () => {
      const tree = renderer
        .create(
          <BpkOverlay overlayType={overlayType}>
            <span>Backpack</span>
          </BpkOverlay>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    }),
  );

  Object.keys(BORDER_RADIUS_STYLES).map(borderRadiusStyle =>
    it(`should render correctly with borderRadiusStyle={${borderRadiusStyle}}`, () => {
      const tree = renderer
        .create(
          <BpkOverlay borderRadiusStyle={borderRadiusStyle}>
            <span>Backpack</span>
          </BpkOverlay>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    }),
  );

  it('should support custom class names', () => {
    const tree = renderer
      .create(
        <BpkOverlay className="custom-classname">
          <span>Backpack</span>
        </BpkOverlay>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should support arbitrary props', () => {
    const tree = renderer
      .create(
        <BpkOverlay testID="123">
          <span>Backpack</span>
        </BpkOverlay>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
