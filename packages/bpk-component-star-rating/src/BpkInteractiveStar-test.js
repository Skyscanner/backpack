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
import { STAR_TYPES } from './BpkStar';
import BpkInteractiveStar from './BpkInteractiveStar';

describe('BpkInteractiveStar', () => {
  it('should render correctly with empty star', () => {
    const tree = renderer
      .create(
        <BpkInteractiveStar
          type={STAR_TYPES.EMPTY}
          label="One star"
          name="stars"
          value={1}
          onClick={() => null}
          onMouseEnter={() => null}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with full star', () => {
    const tree = renderer
      .create(
        <BpkInteractiveStar
          type={STAR_TYPES.FULL}
          label="One star"
          name="stars"
          value={1}
          onClick={() => null}
          onMouseEnter={() => null}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a selected full star', () => {
    const tree = renderer
      .create(
        <BpkInteractiveStar
          type={STAR_TYPES.FULL}
          label="One star"
          name="stars"
          value={1}
          onClick={() => null}
          onMouseEnter={() => null}
          selected
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
