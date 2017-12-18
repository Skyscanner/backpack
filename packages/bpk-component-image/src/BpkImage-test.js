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
import * as BREAKPOINTS from 'bpk-tokens/tokens/breakpoints.es6';
import BpkImage from './BpkImage';

describe('BpkImage', () => {
  it('should render correctly', () => {
    const tree = renderer
      .create(
        <BpkImage
          altText="image description"
          width={816}
          height={544}
          src="./path/to/image.jpg"
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should accept userland styling', () => {
    const tree = renderer
      .create(
        <BpkImage
          altText="image description"
          width={816}
          height={544}
          style={{ width: 500 }}
          src="./path/to/image.jpg"
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should accept userland className', () => {
    const tree = renderer
      .create(
        <BpkImage
          altText="image description"
          width={816}
          height={544}
          style={{ width: 500 }}
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
        <BpkImage
          loading
          altText="image description"
          width={816}
          height={544}
          src="./path/to/image.jpg"
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should have !inView behavior', () => {
    const tree = renderer
      .create(
        <BpkImage
          inView={false}
          altText="image description"
          width={816}
          height={544}
          src="./path/to/image.jpg"
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should support srcSet', () => {
    /* eslint-disable max-len */
    const srcSet =
      './path/to/image_320px.jpg 320w, ./path/to/image_640px.jpg 640w, ./path/to/image_1640px.jpg 1640w, ./path/to/image_3200px.jpg 3200w';
    const sizes = `(min-width: ${
      BREAKPOINTS.breakpointDesktop
    }) 48rem, (min-width: ${
      BREAKPOINTS.breakpointTablet
    }) calc(100vw - 18rem), calc(100vw - 4.5rem)`;
    /* eslint-enable */

    const tree = renderer
      .create(
        <BpkImage
          altText="image description"
          width={816}
          height={544}
          src="./path/to/image_1640.jpg"
          srcSet={srcSet}
          sizes={sizes}
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
