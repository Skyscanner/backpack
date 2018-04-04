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

/* @flow */

import React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';
import AnimateAndFade from './AnimateAndFade';

const child = (
  <Text>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</Text>
);

const commonTests = () => {
  // Fake timer is needed to prevent Animation warning during the tests
  jest.useFakeTimers();

  describe('AnimateAndFade', () => {
    it('should render correctly', () => {
      const tree = renderer
        .create(<AnimateAndFade show>{child}</AnimateAndFade>)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly when show is false', () => {
      const tree = renderer
        .create(<AnimateAndFade show={false}>{child}</AnimateAndFade>)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with animateOnEnter', () => {
      const tree = renderer
        .create(
          <AnimateAndFade show animateOnEnter>
            {child}
          </AnimateAndFade>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with animateOnLeave', () => {
      const tree = renderer
        .create(
          <AnimateAndFade show animateOnLeave>
            {child}
          </AnimateAndFade>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
};

export default commonTests;
