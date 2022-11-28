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

import React from 'react';
import { render } from '@testing-library/react';

import BpkOverlay, { OVERLAY_LEVELS, OVERLAY_TYPES } from './BpkOverlay';

describe('BpkOverlay', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <BpkOverlay>
        <span>Backpack</span>
      </BpkOverlay>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with foregroundContent', () => {
    const { asFragment } = render(
      <BpkOverlay foregroundContent={<span>Skyscanner</span>}>
        <span>Backpack</span>
      </BpkOverlay>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  Object.keys(OVERLAY_TYPES).map((overlayType) =>
    Object.keys(OVERLAY_LEVELS).map((overlayLevel) =>
      it(`should render correctly with overlayType={${overlayType}} & overlayLevel={${overlayLevel}}`, () => {
        const { asFragment } = render(
          <BpkOverlay overlayType={overlayType} overlayLevel={overlayLevel}>
            <span>Backpack</span>
          </BpkOverlay>,
        );
        expect(asFragment()).toMatchSnapshot();
      }),
    ),
  );

  it('should support custom class names', () => {
    const { asFragment } = render(
      <BpkOverlay className="custom-classname">
        <span>Backpack</span>
      </BpkOverlay>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should support arbitrary props', () => {
    const { asFragment } = render(
      <BpkOverlay testid="123">
        <span>Backpack</span>
      </BpkOverlay>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
