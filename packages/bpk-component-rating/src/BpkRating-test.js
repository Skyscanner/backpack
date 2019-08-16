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

import BpkRating from '../index';

describe('BpkRating', () => {
  it('should render correctly', () => {
    const tree = renderer
      .create(
        <BpkRating
          ariaLabel="6.7 Average might recommend"
          title="Average"
          subtitle="Might recommend"
          value={6.7}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should support custom class names', () => {
    const tree = renderer
      .create(
        <BpkRating
          ariaLabel="6.7 Average might recommend"
          title="Average"
          subtitle="Might recommend"
          value={6.7}
          className="custom-classname"
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render with 0 if value is below 0', () => {
    const tree = renderer
      .create(
        <BpkRating
          ariaLabel="-1.3 Low bad option"
          title="Low"
          subtitle="Bad option"
          value={-1.3}
          className="custom-classname"
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render with 10 if value is below 15', () => {
    const tree = renderer
      .create(
        <BpkRating
          ariaLabel="15 Amazing brilliant"
          title="Amazing"
          subtitle="Brilliant"
          value={15}
          className="custom-classname"
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render with 9.0 if value is below 9', () => {
    const tree = renderer
      .create(
        <BpkRating
          ariaLabel="9 Amazing brilliant"
          title="Amazing"
          subtitle="Brilliant"
          value={9}
          className="custom-classname"
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
