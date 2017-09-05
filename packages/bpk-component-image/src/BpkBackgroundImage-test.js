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
import BpkBackgroundImage from './BpkBackgroundImage';

describe('BpkBackgroundImage', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkBackgroundImage
        style={{
          width: '100%',
          height: '20rem',
        }}
        src="./path/to/image.jpg"
      >
        <div style={{ opacity: 0.7, marginLeft: 35, paddingTop: 25 }} />
      </BpkBackgroundImage >,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should have loading behavior', () => {
    const tree = renderer.create(
      <BpkBackgroundImage
        loading
        style={{
          width: '100%',
          height: '20rem',
        }}
        imageStyle={{
          width: '100%',
          height: '100%',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: '50% 50%',
        }}
        src="./path/to/image.jpg"
      >
        <div style={{ opacity: 0.7, marginLeft: 35, paddingTop: 25 }} />
      </BpkBackgroundImage >,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should have !included behavior', () => {
    const tree = renderer.create(
      <BpkBackgroundImage
        included={false}
        style={{
          width: '100%',
          height: '20rem',
        }}
        imageStyle={{
          width: '100%',
          height: '100%',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: '50% 50%',
        }}
        src="./path/to/image.jpg"
      >
        <div style={{ opacity: 0.7, marginLeft: 35, paddingTop: 25 }} />
      </BpkBackgroundImage >,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
