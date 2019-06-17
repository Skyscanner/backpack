/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2019 Skyscanner Ltd
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

/* @flow strict */

import React from 'react';
import renderer from 'react-test-renderer';

import BpkText from './BpkText';

describe('BpkText', () => {
  it('should render correctly', () => {
    const tree = renderer
      .create(
        <BpkText>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus.
        </BpkText>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with `bold`', () => {
    const tree = renderer
      .create(
        <BpkText bold>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus.
        </BpkText>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with tageName="h1", textStyle="xxl"', () => {
    const tree = renderer
      .create(
        <BpkText textStyle="xxl" tagName="h1">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus.
        </BpkText>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with tageName="text"', () => {
    const tree = renderer
      .create(
        <BpkText tagName="text">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus.
        </BpkText>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should pass down unknown props', () => {
    const tree = renderer
      .create(
        // eslint-disable-next-line backpack/use-tokens
        <BpkText style={{ color: 'red' }}>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus.
        </BpkText>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  ['xs', 'sm', 'base', 'lg', 'xl', 'xxl'].forEach(textStyle => {
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
});
