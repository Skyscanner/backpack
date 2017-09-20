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

import { StyleSheet } from 'react-native';
import BpkText from './BpkText';

describe('BpkText', () => {
  it('should accept valid emphasize prop', () => {
    expect(BpkText.propTypes.emphasize({
      textStyle: 'sm',
      emphasize: true,
    }, 'emphasize', 'BpkText')).toEqual(false);
  });

  it('should error if emphasize prop is wrong type', () => {
    expect(BpkText.propTypes.emphasize({
      textStyle: 'sm',
      emphasize: 'asdf',
    }, 'emphasize', 'BpkText').toString()).toEqual('Error: Invalid prop `emphasize` of type `string` supplied to `BpkText`, expected `boolean`.'); // eslint-disable-line max-len
  });

  it('should error on invalid emphasize prop', () => {
    expect(BpkText.propTypes.emphasize({
      textStyle: 'xxl',
      emphasize: true,
    }, 'emphasize', 'BpkText').toString()).toEqual('Error: Invalid prop `emphasize` of value `true` supplied to `BpkText`. `textStyle` value of `xxl` cannot be emphasized.'); // eslint-disable-line max-len
  });

  it('should accept valid style prop', () => {
    expect(BpkText.propTypes.style({
      style: StyleSheet.create({
        breakingStyle: {
          margin: 10,
        },
      }).breakingStyle,
    }, 'style', 'BpkText')).toEqual(false);
  });

  it('should error on invalid style prop', () => {
    expect(BpkText.propTypes.style({
      style: StyleSheet.create({
        breakingStyle: {
          fontWeight: '200',
        },
      }).breakingStyle,
    }, 'style', 'BpkText').toString()).toEqual('Error: Invalid prop `style` with `fontWeight` value `200` supplied to `BpkText`. Use `emphasize` prop instead.'); // eslint-disable-line max-len
  });
});
