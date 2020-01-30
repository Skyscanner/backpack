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

import BpkPaginationNudger from './BpkPaginationNudger';

describe('BpkPaginationNudger', () => {
  it('should display backward nudger', () => {
    const tree = renderer
      .create(
        <BpkPaginationNudger
          label="previous"
          onNudge={() => null}
          forward={false}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should display forward nudger', () => {
    const tree = renderer
      .create(<BpkPaginationNudger label="next" onNudge={() => null} forward />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
