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
import BpkImage from './BpkImage';

describe('BpkImage', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkImage
        altText="image description"
        width={816}
        height={544}
        src="./path/to/image.jpg"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should accept userland styling', () => {
    const tree = renderer.create(
      <BpkImage
        altText="image description"
        width={816}
        height={544}
        style={{ width: 500 }}
        src="./path/to/image.jpg"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should accept userland className', () => {
    const tree = renderer.create(
      <BpkImage
        altText="image description"
        width={816}
        height={544}
        style={{ width: 500 }}
        className="userland-classname"
        src="./path/to/image.jpg"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should have loading behavior', () => {
    const tree = renderer.create(
      <BpkImage
        loading
        altText="image description"
        width={816}
        height={544}
        src="./path/to/image.jpg"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should have inView behavior', () => {
    const tree = renderer.create(
      <BpkImage
        inView={false}
        altText="image description"
        width={816}
        height={544}
        src="./path/to/image.jpg"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should support srcSet', () => {
    const tree = renderer.create(
      <BpkImage
        inView={false}
        altText="image description"
        width={816}
        height={544}
        srcSet={`./path/to/image_280.jpg 280w,
          ./path/to/image_320.jpg 320w,
          ./path/to/image_480.jpg 460w,
          ./path/to/image_520.jpg 520w,
          ./path/to/image_800.jpg 800w,
          ./path/to/image_1024.jpg 1024w`}
        // If the viewport is wider than 1000px, then this image will
        // take up ≈765px of the viewport. Otherwise, it will take
        // up ≈ the full-width (100%) of the viewport.
        sizes={'(min-width: 1150px) 765px, calc(100vw - 48px)'}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
