/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
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

const commonButtonTests = ButtonToTest => {
  describe('ButtonToTest', () => {
    it('should render correctly', () => {
      const tree = renderer
        .create(<ButtonToTest>My button</ButtonToTest>)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with a "href" attribute', () => {
      const tree = renderer
        .create(<ButtonToTest href="#">My button</ButtonToTest>)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with a "disabled" attribute', () => {
      const tree = renderer
        .create(<ButtonToTest disabled>My button</ButtonToTest>)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with a "large" attribute', () => {
      const tree = renderer
        .create(<ButtonToTest large>My button</ButtonToTest>)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with an "iconOnly" attribute', () => {
      const tree = renderer
        .create(<ButtonToTest iconOnly>My button</ButtonToTest>)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should respect the class names entered as a string', () => {
      const tree = renderer
        .create(
          <ButtonToTest
            large
            secondary
            className="custom-class-1 custom-class-2"
          >
            My button
          </ButtonToTest>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should add only bpk specific classes if className prop is set to empty string', () => {
      const tree = renderer
        .create(
          <ButtonToTest large className="">
            My button
          </ButtonToTest>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with "blank" attribute', () => {
      const tree = renderer
        .create(
          <ButtonToTest href="#" blank>
            My button
          </ButtonToTest>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with "rel" attribute', () => {
      const tree = renderer
        .create(
          <ButtonToTest href="#" rel="rel-attr">
            My button
          </ButtonToTest>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with "blank" and "rel" attributes', () => {
      const tree = renderer
        .create(
          <ButtonToTest href="#" blank rel="rel-overwrite">
            My button
          </ButtonToTest>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with "disabled" and "href" attributes', () => {
      const tree = renderer
        .create(
          <ButtonToTest href="#" disabled>
            My button
          </ButtonToTest>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
};

export default commonButtonTests;
