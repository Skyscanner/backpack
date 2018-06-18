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

import React from 'react';
import renderer from 'react-test-renderer';
import { colorWhite } from 'bpk-tokens/tokens/base.es6';

import BpkThemeProvider from './BpkThemeProvider';

describe('BpkThemeProvider', () => {
  it('should render correctly', () => {
    const tree = renderer
      .create(
        <BpkThemeProvider
          theme={{ color: colorWhite }}
          themeAttributes={['color']}
        >
          <p>Lorem Ipsum</p>
        </BpkThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with arbitrary props', () => {
    const tree = renderer
      .create(
        <BpkThemeProvider
          theme={{ color: colorWhite }}
          themeAttributes={['color']}
          id="arbitrary"
        >
          <p>Lorem Ipsum</p>
        </BpkThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should correctly flatten the themeAttribute prop', () => {
    const tree = renderer
      .create(
        <BpkThemeProvider
          theme={{ color: colorWhite, background: 'black' }}
          themeAttributes={[['color'], ['background']]}
        >
          <p>Lorem Ipsum</p>
        </BpkThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render without theming when theme is missing attributes', () => {
    jest.spyOn(console, 'error').mockImplementation(() => jest.fn());
    const tree = renderer
      .create(
        <BpkThemeProvider theme={{}} themeAttributes={['color']}>
          <p>Lorem Ipsum</p>
        </BpkThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should strip out extraneous theme attributes', () => {
    jest.spyOn(console, 'error').mockImplementation(() => jest.fn());
    const tree = renderer
      .create(
        <BpkThemeProvider
          theme={{ a: 'a', color: colorWhite }}
          themeAttributes={['color']}
        >
          <p>Lorem Ipsum</p>
        </BpkThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should warn about missing theme attributes', () => {
    expect(
      BpkThemeProvider.propTypes
        .themeAttributes(
          {
            theme: {},
            themeAttributes: ['one'],
          },
          'themeAttributes',
          'BpkThemeProvider',
        )
        .toString(),
    ).toEqual(
      'Error: BpkThemeProvider: To apply theming, the theme prop must include `one` (missing `one`)',
    ); // eslint-disable-line max-len
  });

  it('should warn about extraneous theme attributes', () => {
    expect(
      BpkThemeProvider.propTypes
        .themeAttributes(
          {
            theme: { one: 'a', two: 'a' },
            themeAttributes: ['one'],
          },
          'themeAttributes',
          'BpkThemeProvider',
        )
        .toString(),
    ).toEqual(
      'Error: BpkThemeProvider: Extraneous theme attributes supplied: `two`.',
    ); // eslint-disable-line max-len
  });
});
