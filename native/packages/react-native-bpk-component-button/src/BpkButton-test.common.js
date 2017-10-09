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

import { Image } from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import BpkThemeProvider from 'react-native-bpk-theming';

import BpkButton, { propTypes, BUTTON_TYPES } from './BpkButton';

const onPressFn = jest.fn();
const commonTests = () => {
  jest.mock('Image', () => 'Image');

  describe('BpkButton', () => {
    it('should render correctly', () => {
      const tree = renderer.create(
        <BpkButton title="Lorem ipsum" onPress={onPressFn} />,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should support the "large" property', () => {
      const tree = renderer.create(
        <BpkButton large title="Lorem ipsum" onPress={onPressFn} />,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('should support the "large" and secondary property', () => {
      const tree = renderer.create(
        <BpkButton large title="Lorem ipsum" type="secondary" onPress={onPressFn} />,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should support the "selected" property', () => {
      const tree = renderer.create(
        <BpkButton selected title="Lorem ipsum" onPress={onPressFn} />,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('should support the "iconOnly" and "large" property', () => {
      const tree = renderer.create(
        <BpkButton iconOnly large icon title="Lorem ipsum" onPress={onPressFn} />,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('should support the "icon" and "large" property', () => {
      const tree = renderer.create(
        <BpkButton icon large title="Lorem ipsum" onPress={onPressFn} />,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should support the "disabled" property', () => {
      const tree = renderer.create(
        <BpkButton disabled title="Lorem ipsum" onPress={onPressFn} />,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should support having an icon as well as a title', () => {
      const tree = renderer.create(
        <BpkButton
          icon={<Image source="../rightarrow_360.png" />}
          title="Lorem ipsum"
          onPress={onPressFn}
        />,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('should support having only an icon', () => {
      const tree = renderer.create(
        <BpkButton
          title="Lorem ipsum"
          icon={<Image source="../rightarrow_360.png" />}
          iconOnly
          onPress={onPressFn}
        />,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should support overwriting styles', () => {
      const tree = renderer.create(
        <BpkButton title="Lorem ipsum" onPress={onPressFn} style={{ width: 100 }} />,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    BUTTON_TYPES.forEach((buttonType) => {
      it(`should render correctly with type="${buttonType}"`, () => {
        const tree = renderer.create(
          <BpkButton type={buttonType} title="Lorem ipsum" onPress={onPressFn} />,
        ).toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

    it('should accept iconOnly prop when icon prop is supplied', () => {
      expect(propTypes.icon({
        iconOnly: true,
        icon: <Image />,
      }, 'icon', 'BpkButton')).toBeFalsy();
    });

    it('should accept iconOnly prop when icon prop is supplied', () => {
      expect(propTypes.icon({
        iconOnly: true,
      }, 'icon', 'BpkButton').toString()).toEqual('Error: Invalid prop `icon` supplied to `BpkButton`. When `iconOnly` is enabled, `icon` must be supplied.'); // eslint-disable-line max-len
    });

    it('should reject theme property when some theme attributes are omitted', () => { // eslint-disable-line max-len
      expect(propTypes.theme({
        type: 'primary',
        theme: {},
      }, 'theme', 'BpkButton').toString()).toEqual('Error: Invalid prop `theme` supplied to `BpkButton`. For buttons of type `primary`, the `theme` prop must include `buttonPrimaryTextColor, buttonPrimaryGradientStartColor, buttonPrimaryGradientEndColor`'); // eslint-disable-line max-len
    });

    it('should accept theme property when correct attributes are supplied', () => { // eslint-disable-line max-len
      expect(propTypes.theme({
        type: 'primary',
        theme: {
          buttonPrimaryGradientStartColor: 'red',
          buttonPrimaryGradientEndColor: 'green',
          buttonPrimaryTextColor: 'blue',
        },
      }, 'theme', 'BpkButton')).toBeFalsy();
    });

    it('should throw an error for invalid button type', () => {
      jest.spyOn(console, 'error').mockImplementation(() => jest.fn());
      expect(() => renderer.create(
        <BpkButton
          title="Lorem ipsum"
          type="silly"
          onPress={onPressFn}
        />,
      )).toThrow('"silly" is not a valid button type. Valid types are primary, featured, secondary, destructive');
    });
  });

  describe('BpkButtonThemed', () => {
    it('should render correctly', () => {
      const theme = {
        buttonPrimaryTextColor: 'red',
        buttonPrimaryGradientStartColor: 'green',
        buttonPrimaryGradientEndColor: 'blue',
      };
      const tree = renderer.create(
        <BpkThemeProvider theme={theme}>
          <BpkButton title="Lorem ipsum" type="primary" onPress={onPressFn} />
        </BpkThemeProvider>,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
};

export default commonTests;
