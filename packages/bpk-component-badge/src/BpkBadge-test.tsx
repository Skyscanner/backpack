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
// @ts-nocheck

import { render } from '@testing-library/react';

import BpkSmallFlightIcon from '../../bpk-component-icon/sm/flight';

import BpkBadge, { BADGE_TYPES } from './BpkBadge';

import type { BadgeType } from './BpkBadge';

describe('BpkBadge', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<BpkBadge>Promociando</BpkBadge>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "centered"', () => {
    const { asFragment } = render(<BpkBadge centered>Promociando</BpkBadge>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with an icon', () => {
    const { asFragment } = render(
      <BpkBadge>
        <BpkSmallFlightIcon />
        Promociando
      </BpkBadge>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "docked" attribute value equal to "right"', () => {
    const { asFragment } = render(
      <BpkBadge docked="right">Promociando</BpkBadge>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "docked" attribute value equal to "left"', () => {
    const { asFragment } = render(
      <BpkBadge docked="left">Promociando</BpkBadge>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  Object.keys(BADGE_TYPES).forEach((badgeType) => {
    it(`should render correctly with type="${badgeType}"`, () => {
      const { asFragment } = render(
        <BpkBadge type={badgeType as BadgeType}>Promociando</BpkBadge>,
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
