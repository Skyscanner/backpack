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
import { StyleSheet } from 'react-native';
import renderer from 'react-test-renderer';
import { spacingSm } from 'bpk-tokens/tokens/base.react.native';

import BpkText from './BpkText';
import { TEXT_STYLES } from './common-types';

const commonTests = () => {
  describe('BpkText', () => {
    it('should render correctly', () => {
      const tree = renderer
        .create(
          <BpkText>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          </BpkText>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with `emphasize` prop', () => {
      const tree = renderer
        .create(
          <BpkText emphasize>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          </BpkText>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should support overwriting styles', () => {
      const tree = renderer
        .create(
          <BpkText style={{ color: 'red' }}>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          </BpkText>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    TEXT_STYLES.forEach(textStyle => {
      it(`should render correctly with textStyle="${textStyle}"`, () => {
        const tree = renderer
          .create(
            <BpkText textStyle={textStyle}>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            </BpkText>,
          )
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

    it('should accept valid emphasize prop', () => {
      expect(
        BpkText.propTypes.emphasize(
          {
            children: 'Lorem ipsum.',
            textStyle: 'sm',
            emphasize: true,
            style: null,
          },
          'emphasize',
          'BpkText',
        ),
      ).toEqual(false);
    });

    it('should error if emphasize prop is wrong type', () => {
      expect(
        BpkText.propTypes
          .emphasize(
            {
              children: 'Lorem ipsum.',
              textStyle: 'sm',
              // $FlowFixMe
              emphasize: 'asdf',
              style: null,
            },
            'emphasize',
            'BpkText',
          )
          .toString(),
      ).toEqual(
        'Error: Invalid prop `emphasize` of type `string` supplied to `BpkText`, expected `boolean`.',
      ); // eslint-disable-line max-len
    });

    it('should accept valid style prop', () => {
      expect(
        BpkText.propTypes.style(
          {
            children: 'Lorem ipsum.',
            textStyle: 'base',
            emphasize: false,
            style: StyleSheet.create({
              breakingStyle: {
                margin: spacingSm,
              },
            }).breakingStyle,
          },
          'style',
          'BpkText',
        ),
      ).toEqual(false);
    });

    it('should error on invalid style prop', () => {
      expect(
        BpkText.propTypes
          .style(
            {
              children: 'Lorem ipsum.',
              textStyle: 'base',
              emphasize: false,
              style: StyleSheet.create({
                breakingStyle: {
                  fontWeight: '200',
                },
              }).breakingStyle,
            },
            'style',
            'BpkText',
          )
          .toString(),
      ).toEqual(
        'Error: Invalid prop `style` with `fontWeight` value `200` supplied to `BpkText`. Use `emphasize` prop instead.',
      ); // eslint-disable-line max-len
    });

    it('should return false on undefined style', () => {
      expect(
        BpkText.propTypes.style(
          {
            children: 'Lorem ipsum.',
            textStyle: 'base',
            emphasize: false,
            style: undefined,
          },
          'style',
          'BpkText',
        ),
      ).toBeFalsy();
    });
  });
};

export default commonTests;
