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
import BpkSmallFlightIcon from 'bpk-component-icon/sm/flight';

import BpkBadge, { BADGE_TYPES } from './BpkBadge';

describe('BpkBadge', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<BpkBadge>Promociando</BpkBadge>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "centered"', () => {
    const tree = renderer
      .create(<BpkBadge centered>Promociando</BpkBadge>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with an icon', () => {
    const tree = renderer
      .create(
        <BpkBadge>
          <BpkSmallFlightIcon />
          Promociando
        </BpkBadge>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "docked" attribute value equal to "right"', () => {
    const tree = renderer
      .create(<BpkBadge docked="right">Promociando</BpkBadge>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "docked" attribute value equal to "left"', () => {
    const tree = renderer
      .create(<BpkBadge docked="left">Promociando</BpkBadge>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  Object.keys(BADGE_TYPES).forEach(badgeType => {
    it(`should render correctly with type="${badgeType}"`, () => {
      const tree = renderer
        .create(<BpkBadge type={badgeType}>Promociando</BpkBadge>)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
