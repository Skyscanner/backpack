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
import BpkTable from './BpkTable';

describe('BpkTable', () => {
  it('should render correctly', () => {
    const tree = renderer
      .create(
        <BpkTable>
          <tbody />
        </BpkTable>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "alternate" attribute', () => {
    const tree = renderer
      .create(
        <BpkTable alternate>
          <tbody />
        </BpkTable>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with custom class', () => {
    const tree = renderer
      .create(
        <BpkTable className="my-table">
          <tbody />
        </BpkTable>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
