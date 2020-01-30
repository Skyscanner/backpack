/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2020 Skyscanner Ltd
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
import { spacingSm } from 'bpk-tokens/tokens/base.es6';

import BpkBackgroundImage from './BpkBackgroundImage';

describe('BpkBackgroundImage', () => {
  it('should render correctly', () => {
    const tree = renderer
      .create(
        <BpkBackgroundImage
          width={612}
          height={408}
          style={{
            width: '100%',
            height: '20rem',
          }}
          src="./path/to/image.jpg"
        >
          <div
            style={{
              opacity: 0.7,
              marginLeft: spacingSm,
              paddingTop: spacingSm,
            }}
          />
        </BpkBackgroundImage>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should accept userland className', () => {
    const tree = renderer
      .create(
        <BpkBackgroundImage
          width={816}
          height={544}
          style={{
            width: '100%',
            height: '20rem',
          }}
          className="userland-classname"
          src="./path/to/image.jpg"
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should have loading behavior', () => {
    const tree = renderer
      .create(
        <BpkBackgroundImage
          loading
          width={612}
          height={408}
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
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should have inView behavior', () => {
    const tree = renderer
      .create(
        <BpkBackgroundImage
          inView={false}
          width={612}
          height={408}
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
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
