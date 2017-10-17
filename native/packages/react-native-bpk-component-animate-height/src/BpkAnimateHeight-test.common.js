/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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
import BpkText from '../../react-native-bpk-component-text';
import BpkAnimateHeight from './BpkAnimateHeight';

const commonTests = () => {
  describe('BpkAnimateHeight', () => {
    const animateHeightContent = (
      <BpkText>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus.
        </BpkText>
    );

    it('should render correctly collapsed', () => {
      const tree = renderer.create(
        <BpkAnimateHeight
          expanded={false}
        >
          {animateHeightContent}
        </BpkAnimateHeight>).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly expanded', () => {
      const tree = renderer.create(
        <BpkAnimateHeight
          expanded
        >
          {animateHeightContent}
        </BpkAnimateHeight>).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with n children', () => {
      const tree = renderer.create(
        <BpkAnimateHeight
          expanded
        >
          {animateHeightContent}
          {animateHeightContent}
        </BpkAnimateHeight>,
        ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with user styling padding', () => {
      const tree = renderer.create(
        <BpkAnimateHeight
          expanded
          style={{ marginBottom: 12 }}
        >
          {animateHeightContent}
        </BpkAnimateHeight>).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
};
export default commonTests;
