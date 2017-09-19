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

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import BpkText, { TEXT_STYLES } from './BpkText';

jest.mock('react-native', () => {
  const reactNative = require.requireActual('react-native');
  jest
    .spyOn(reactNative.Platform, 'select')
    .mockImplementation(obj => obj.ios || obj.default);
  reactNative.Platform.OS = 'ios';

  return reactNative;
});


describe('iOS', () => {
  describe('BpkText', () => {
    it('should render correctly', () => {
      const tree = renderer.create(
        <BpkText>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus.
        </BpkText>,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with `emphasize` prop', () => {
      const tree = renderer.create(
        <BpkText emphasize>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus.
        </BpkText>,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with `emphasize` & `textStyle` equal to `xxl`', () => {
      const tree = renderer.create(
        <BpkText emphasize textStyle="xxl">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus.
        </BpkText>,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should ignore user defined fontWeight', () => {
      const tree = renderer.create(
        <BpkText style={{ fontWeight: '900' }}>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus.
        </BpkText>,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should support overwriting styles', () => {
      const tree = renderer.create(
        <BpkText style={{ color: 'red' }}>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus.
        </BpkText>,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    TEXT_STYLES.forEach((textStyle) => {
      it(`should render correctly with textStyle="${textStyle}"`, () => {
        const tree = renderer.create(
          <BpkText textStyle={textStyle}>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
            et magnis dis parturient montes, nascetur ridiculus mus.
          </BpkText>,
        ).toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });
});
