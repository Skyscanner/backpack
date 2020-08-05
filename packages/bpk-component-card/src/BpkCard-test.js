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

/* @flow strict */

import React from 'react';
import renderer from 'react-test-renderer';

import BpkCard from './BpkCard';

describe('BpkCard', () => {
  it('should render correctly', () => {
    const tree = renderer
      .create(
        <BpkCard>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus.
        </BpkCard>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with an "href" attribute', () => {
    const tree = renderer
      .create(
        <BpkCard href="//www.skyscanner.net">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus.
        </BpkCard>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "href" and "blank" attributes', () => {
    const tree = renderer
      .create(
        <BpkCard href="//www.skyscanner.net" blank>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus.
        </BpkCard>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "padded" attribute equal to "false"', () => {
    const tree = renderer
      .create(
        <BpkCard padded={false}>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus.
        </BpkCard>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "className" attribute', () => {
    const tree = renderer
      .create(
        <BpkCard className="custom-class">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus.
        </BpkCard>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
