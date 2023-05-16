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

import BpkButtonV2 from './BpkButton';
import type { ButtonType } from './common-types';
import { SIZE_TYPES, BUTTON_TYPES } from './common-types';

describe('BpkButtonV2', () => {
  Object.keys(BUTTON_TYPES).forEach((buttonType) => {
    it(`should render correctly with type="${buttonType}"`, () => {
      const { asFragment } = render(
        <BpkButtonV2 type={buttonType as ButtonType}>
          {buttonType} button
        </BpkButtonV2>,
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  it('should render correctly with a "href" attribute', () => {
    const { asFragment } = render(
      <BpkButtonV2 href="#">My button</BpkButtonV2>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "disabled" attribute', () => {
    const { asFragment } = render(
      <BpkButtonV2 disabled>My button</BpkButtonV2>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with large size', () => {
    const { asFragment } = render(
      <BpkButtonV2 size={SIZE_TYPES.large}>My button</BpkButtonV2>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with an "iconOnly" attribute', () => {
    const { asFragment } = render(
      <BpkButtonV2 iconOnly>My button</BpkButtonV2>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly a "large", "secondary" button', () => {
    const { asFragment } = render(
      <BpkButtonV2 size={SIZE_TYPES.large} type={BUTTON_TYPES.secondary}>
        My button
      </BpkButtonV2>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should respect the class names entered as a string', () => {
    const { asFragment } = render(
      <BpkButtonV2 className="custom-class-1 custom-class-2">
        My button
      </BpkButtonV2>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should add only bpk specific classes if className prop is set to empty string', () => {
    const { asFragment } = render(
      <BpkButtonV2 className="">My button</BpkButtonV2>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "blank" attribute', () => {
    const { asFragment } = render(
      <BpkButtonV2 href="#" blank>
        My button
      </BpkButtonV2>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "rel" attribute', () => {
    const { asFragment } = render(
      <BpkButtonV2 href="#" rel="rel-attr">
        My button
      </BpkButtonV2>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "blank" and "rel" attributes', () => {
    const { asFragment } = render(
      <BpkButtonV2 href="#" blank rel="rel-overwrite">
        My button
      </BpkButtonV2>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "disabled" and "href" attributes', () => {
    const { asFragment } = render(
      <BpkButtonV2 href="#" disabled>
        My button
      </BpkButtonV2>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
