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
import BpkButton from './BpkButton';

describe('BpkButton', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<BpkButton>My button</BpkButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "href" attribute', () => {
    const tree = renderer
      .create(<BpkButton href="#">My button</BpkButton>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "secondary" attribute', () => {
    const tree = renderer
      .create(<BpkButton secondary>My button</BpkButton>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "destructive" attribute', () => {
    const tree = renderer
      .create(<BpkButton destructive>My button</BpkButton>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "selected" attribute', () => {
    const tree = renderer
      .create(<BpkButton selected>My button</BpkButton>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "disabled" attribute', () => {
    const tree = renderer
      .create(<BpkButton disabled>My button</BpkButton>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "large" attribute', () => {
    const tree = renderer
      .create(<BpkButton large>My button</BpkButton>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "link" attribute', () => {
    const tree = renderer
      .create(<BpkButton link>My button</BpkButton>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with an "iconOnly" attribute', () => {
    const tree = renderer
      .create(<BpkButton iconOnly>My button</BpkButton>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "large" and "secondary" attributes', () => {
    const tree = renderer
      .create(
        <BpkButton large secondary>
          My button
        </BpkButton>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should respect the class names entered as a string', () => {
    const tree = renderer
      .create(
        <BpkButton large secondary className="custom-class-1 custom-class-2">
          My button
        </BpkButton>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should add only bpk specific classes if className prop is set to empty string', () => {
    const tree = renderer
      .create(
        <BpkButton large secondary className="">
          My button
        </BpkButton>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
