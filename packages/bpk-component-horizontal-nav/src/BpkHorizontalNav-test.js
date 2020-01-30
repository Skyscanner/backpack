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

import BpkHorizontalNav from './BpkHorizontalNav';

describe('BpkHorizontalNav', () => {
  it('should render correctly', () => {
    const tree = renderer
      .create(<BpkHorizontalNav>My nav content.</BpkHorizontalNav>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with custom "className" prop', () => {
    const tree = renderer
      .create(
        <BpkHorizontalNav className="my-custom-class-name">
          My nav content.
        </BpkHorizontalNav>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with custom "leadingScrollIndicatorClassName" prop', () => {
    const tree = renderer
      .create(
        <BpkHorizontalNav leadingScrollIndicatorClassName="my-custom-class-name">
          My nav content.
        </BpkHorizontalNav>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with custom "trailingScrollIndicatorClassName" prop', () => {
    const tree = renderer
      .create(
        <BpkHorizontalNav trailingScrollIndicatorClassName="my-custom-class-name">
          My nav content.
        </BpkHorizontalNav>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with arbitrary props', () => {
    const tree = renderer
      .create(
        <BpkHorizontalNav
          data-arbitrary-1="arbirary-value-1"
          data-arbitrary-2="arbirary-value-2"
        >
          My nav content.
        </BpkHorizontalNav>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
