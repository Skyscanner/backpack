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

import React from 'react';
import renderer from 'react-test-renderer';

import BpkButtonDestructive from './BpkButtonDestructive';

describe('BpkButtonDestructive', () => {
  it('should render correctly', () => {
    const tree = renderer
      .create(<BpkButtonDestructive>My button</BpkButtonDestructive>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "href" attribute', () => {
    const tree = renderer
      .create(<BpkButtonDestructive href="#">My button</BpkButtonDestructive>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "disabled" attribute', () => {
    const tree = renderer
      .create(<BpkButtonDestructive disabled>My button</BpkButtonDestructive>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "large" attribute', () => {
    const tree = renderer
      .create(<BpkButtonDestructive large>My button</BpkButtonDestructive>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with an "iconOnly" attribute', () => {
    const tree = renderer
      .create(<BpkButtonDestructive iconOnly>My button</BpkButtonDestructive>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should respect the class names entered as a string', () => {
    const tree = renderer
      .create(
        <BpkButtonDestructive
          large
          secondary
          className="custom-class-1 custom-class-2"
        >
          My button
        </BpkButtonDestructive>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should add only bpk specific classes if className prop is set to empty string', () => {
    const tree = renderer
      .create(
        <BpkButtonDestructive large className="">
          My button
        </BpkButtonDestructive>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "blank" attribute', () => {
    const tree = renderer
      .create(
        <BpkButtonDestructive href="#" blank>
          My button
        </BpkButtonDestructive>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "rel" attribute', () => {
    const tree = renderer
      .create(
        <BpkButtonDestructive href="#" rel="rel-attr">
          My button
        </BpkButtonDestructive>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "blank" and "rel" attributes', () => {
    const tree = renderer
      .create(
        <BpkButtonDestructive href="#" blank rel="rel-overwrite">
          My button
        </BpkButtonDestructive>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "disabled" and "href" attributes', () => {
    const tree = renderer
      .create(
        <BpkButtonDestructive href="#" disabled>
          My button
        </BpkButtonDestructive>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
