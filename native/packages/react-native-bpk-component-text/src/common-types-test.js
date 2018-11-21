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

import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { deprecated } from 'bpk-react-utils';
import { spacingSm } from 'bpk-tokens/tokens/base.react.native';

import { stylePropType, weightPropType, WEIGHT_STYLES } from './common-types';

describe('stylePropType', () => {
  it('should accept valid style prop', () => {
    expect(
      stylePropType(
        {
          children: 'Lorem ipsum.',
          textStyle: 'base',
          weight: WEIGHT_STYLES.regular,
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
      stylePropType(
        {
          children: 'Lorem ipsum.',
          textStyle: 'base',
          weight: WEIGHT_STYLES.regular,
          emphasize: false,
          style: StyleSheet.create({
            breakingStyle: {
              fontWeight: '200',
            },
          }).breakingStyle,
        },
        'style',
        'BpkText',
      ).toString(),
    ).toEqual(
      'Error: Invalid prop `style` with `fontWeight` value `200` supplied to `BpkText`. Use `weight` prop instead.',
    ); // eslint-disable-line max-len
  });

  it('should warn when textStyle="base" and weight="heavy"', () => {
    const consoleWarnFn = jest.fn();
    jest.spyOn(console, 'warn').mockImplementation(consoleWarnFn);

    PropTypes.checkPropTypes(
      { weight: weightPropType },
      {
        textStyle: 'base',
        weight: WEIGHT_STYLES.heavy,
      },
      'weight',
      'BpkText',
    );

    expect(consoleWarnFn.mock.calls.length).toBe(1);
  });

  it('should warn when emphasize prop is used', () => {
    const consoleWarnFn = jest.fn();
    jest.spyOn(console, 'warn').mockImplementation(consoleWarnFn);

    PropTypes.checkPropTypes(
      {
        emphasize: deprecated(PropTypes.bool, 'Use "weight" instead.'),
      },
      {
        emphasize: true,
      },
      'emphasize',
      'BpkText',
    );

    expect(consoleWarnFn.mock.calls.length).toBe(1);
  });

  it('should return false on undefined style', () => {
    expect(
      stylePropType(
        {
          children: 'Lorem ipsum.',
          textStyle: 'base',
          weight: WEIGHT_STYLES.regular,
          emphasize: false,
          style: undefined,
        },
        'style',
        'BpkText',
      ),
    ).toBeFalsy();
  });
});
