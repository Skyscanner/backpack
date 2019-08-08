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

import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import * as BREAKPOINTS from 'bpk-tokens/tokens/breakpoints.es6';
import { spacingSm } from 'bpk-tokens/tokens/base.es6';

import BpkImage from './BpkImage';
import BORDER_RADIUS_STYLES from './BpkImageBorderRadiusStyles';

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
          style={{ width: spacingSm }}
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
          style={{ width: spacingSm }}
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

  it('should call onLoadCallback', () => {
    const onLoad = jest.fn();
    const wrapper = mount(
      <BpkImage
        onLoad={onLoad}
        altText="image description"
        width={816}
        height={544}
        src="./path/to/image.jpg"
      />,
    )
      .find('img')
      .simulate('load');
    expect(onLoad.mock.calls.length).toBe(1);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should load even without onLoadCallback', () => {
    const wrapper = mount(
      <BpkImage
        altText="image description"
        width={816}
        height={544}
        src="./path/to/image.jpg"
      />,
    )
      .find('img')
      .simulate('load');
    expect(toJson(wrapper)).toMatchSnapshot();
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

  it('should apply borderRadius', () => {
    const tree = renderer
      .create(
        <BpkImage
          altText="image description"
          width={816}
          height={544}
          src="./path/to/image.jpg"
          borderRadiusStyle={BORDER_RADIUS_STYLES.sm}
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
