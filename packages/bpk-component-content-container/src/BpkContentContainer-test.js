/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
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
import { render } from '@testing-library/react';

import BpkContentContainer from './BpkContentContainer';

describe('BpkContentContainer', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <BpkContentContainer>
        <h1>Heading</h1>
        <p>My paragraph.</p>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </BpkContentContainer>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "bareHtml" attribute', () => {
    const { asFragment } = render(
      <BpkContentContainer bareHtml>
        <h1>Heading</h1>
        <p>My paragraph.</p>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </BpkContentContainer>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "bareHtml" and "alternate" attributes', () => {
    const { asFragment } = render(
      <BpkContentContainer bareHtml alternate>
        <h1>Heading</h1>
        <p>My paragraph.</p>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </BpkContentContainer>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a custom "className" attribute', () => {
    const { asFragment } = render(
      <BpkContentContainer className="my-test-class">
        <h1>Heading</h1>
        <p>My paragraph.</p>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </BpkContentContainer>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
