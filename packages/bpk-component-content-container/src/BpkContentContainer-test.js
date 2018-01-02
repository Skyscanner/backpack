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
import BpkContentContainer from './BpkContentContainer';

describe('BpkContentContainer', () => {
  it('should render correctly', () => {
    const tree = renderer
      .create(
        <BpkContentContainer>
          <h1>Heading</h1>
          <p>My paragraph.</p>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </BpkContentContainer>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "bareHtml" attribute ', () => {
    const tree = renderer
      .create(
        <BpkContentContainer bareHtml>
          <h1>Heading</h1>
          <p>My paragraph.</p>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </BpkContentContainer>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
