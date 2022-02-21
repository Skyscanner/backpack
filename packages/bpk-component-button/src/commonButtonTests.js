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

import React from 'react';
import { render } from '@testing-library/react';

const commonButtonTests = (ButtonToTest) => {
  describe('ButtonToTest', () => {
    it('should render correctly', () => {
      const { asFragment } = render(<ButtonToTest>My button</ButtonToTest>);
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render correctly with a "href" attribute', () => {
      const { asFragment } = render(
        <ButtonToTest href="#">My button</ButtonToTest>,
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render correctly with a "disabled" attribute', () => {
      const { asFragment } = render(
        <ButtonToTest disabled>My button</ButtonToTest>,
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render correctly with a "large" attribute', () => {
      const { asFragment } = render(
        <ButtonToTest large>My button</ButtonToTest>,
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render correctly with an "iconOnly" attribute', () => {
      const { asFragment } = render(
        <ButtonToTest iconOnly>My button</ButtonToTest>,
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('should respect the class names entered as a string', () => {
      const { asFragment } = render(
        <ButtonToTest large className="custom-class-1 custom-class-2">
          My button
        </ButtonToTest>,
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('should add only bpk specific classes if className prop is set to empty string', () => {
      const { asFragment } = render(
        <ButtonToTest large className="">
          My button
        </ButtonToTest>,
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render correctly with "blank" attribute', () => {
      const { asFragment } = render(
        <ButtonToTest href="#" blank>
          My button
        </ButtonToTest>,
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render correctly with "rel" attribute', () => {
      const { asFragment } = render(
        <ButtonToTest href="#" rel="rel-attr">
          My button
        </ButtonToTest>,
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render correctly with "blank" and "rel" attributes', () => {
      const { asFragment } = render(
        <ButtonToTest href="#" blank rel="rel-overwrite">
          My button
        </ButtonToTest>,
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render correctly with "disabled" and "href" attributes', () => {
      const { asFragment } = render(
        <ButtonToTest href="#" disabled>
          My button
        </ButtonToTest>,
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });
};

// We export these to reuse them in other tests for buttons.
// eslint-disable-next-line jest/no-export
export default commonButtonTests;
