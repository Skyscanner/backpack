/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2019 Skyscanner Ltd
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
/* @flow */

import React from 'react';
import renderer from 'react-test-renderer';
import BpkCodeBlock from './BpkCodeBlock';

describe('BpkCodeBlock', () => {
  it('should render correctly', () => {
    const tree = renderer
      .create(<BpkCodeBlock>npm install react --save-dev</BpkCodeBlock>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "alternate"', () => {
    const tree = renderer
      .create(
        <BpkCodeBlock alternate>npm install react --save-dev</BpkCodeBlock>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with custom "className"', () => {
    const tree = renderer
      .create(
        <BpkCodeBlock className="my-custom-class">
          npm install react --save-dev
        </BpkCodeBlock>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
