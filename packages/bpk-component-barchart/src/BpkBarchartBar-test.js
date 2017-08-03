/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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
import BpkBarchartBar from './BpkBarchartBar';

describe('BpkBarchartBar', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkBarchartBar
        x={10}
        y={10}
        width={20}
        height={100}
        label="Bar"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render with an onClick handler', () => {
    const tree = renderer.create(
      <BpkBarchartBar
        x={10}
        y={10}
        width={20}
        height={100}
        label="Bar"
        onClick={() => null}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render as an outlier', () => {
    const tree = renderer.create(
      <BpkBarchartBar
        x={10}
        y={10}
        width={20}
        height={100}
        label="Bar"
        outlier
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render as selected', () => {
    const tree = renderer.create(
      <BpkBarchartBar
        x={10}
        y={10}
        width={20}
        height={100}
        label="Bar"
        selected
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render as aria-pressed if onClick present and selected', () => {
    const tree = renderer.create(
      <BpkBarchartBar
        x={10}
        y={10}
        width={20}
        height={100}
        label="Bar"
        selected
        onClick={() => null}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render with "padding" prop', () => {
    const tree = renderer.create(
      <BpkBarchartBar
        x={10}
        y={10}
        width={20}
        height={100}
        label="Bar"
        padding={0.2}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
