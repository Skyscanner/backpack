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

import { render } from '@testing-library/react';

import BpkHorizontalNavItem, { themeAttributes } from './BpkHorizontalNavItem';

describe('BpkHorizontalNavItem', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      // @ts-expect-error TS(2769): No overload matches this call.
      <BpkHorizontalNavItem>My nav item content</BpkHorizontalNavItem>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with custom "className" prop', () => {
    const { asFragment } = render(
      // @ts-expect-error TS(2769): No overload matches this call.
      <BpkHorizontalNavItem className="my-custom-class">
        My nav item content
      </BpkHorizontalNavItem>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "type" prop', () => {
    const { asFragment } = render(
      // @ts-expect-error TS(2769): No overload matches this call.
      <BpkHorizontalNavItem type="light">One</BpkHorizontalNavItem>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with an "href" prop', () => {
    const { asFragment } = render(
      // @ts-expect-error TS(2769): No overload matches this call.
      <BpkHorizontalNavItem href="#">My nav item content</BpkHorizontalNavItem>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "selected" prop', () => {
    const { asFragment } = render(
      // @ts-expect-error TS(2769): No overload matches this call.
      <BpkHorizontalNavItem selected>My nav item content</BpkHorizontalNavItem>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "disabled" prop', () => {
    const { asFragment } = render(
      // @ts-expect-error TS(2769): No overload matches this call.
      <BpkHorizontalNavItem disabled>My nav item content</BpkHorizontalNavItem>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "spaceAround" prop', () => {
    const { asFragment } = render(
      // @ts-expect-error TS(2769): No overload matches this call.
      <BpkHorizontalNavItem spaceAround>
        My nav item content.
      </BpkHorizontalNavItem>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with arbitrary props', () => {
    const { asFragment } = render(
      // @ts-expect-error TS(2769): No overload matches this call.
      <BpkHorizontalNavItem
        data-arbitrary-1="arbirary-value-1"
        data-arbitrary-2="arbirary-value-2"
      >
        My nav content.
      </BpkHorizontalNavItem>,
    );
    expect(asFragment()).toMatchSnapshot();
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
