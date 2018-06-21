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

/* @flow */

import React from 'react';
import renderer from 'react-test-renderer';

import BpkNavigationBar from './BpkNavigationBar';
import BpkNavigationIconButton from './BpkNavigationBarIconButton';

describe('BpkNavigationBar', () => {
  it('should render correctly', () => {
    const tree = renderer
      .create(<BpkNavigationBar id="test" title="test" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with custom class', () => {
    const tree = renderer
      .create(
        <BpkNavigationBar id="test" title="test" className="my-custom-class" />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with arbitrary props', () => {
    const tree = renderer
      .create(
        <BpkNavigationBar id="test" title="test" testID="arbitrary value" />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "leadingButton" attribute', () => {
    const tree = renderer
      .create(
        <BpkNavigationBar
          id="test"
          title="test"
          leadingButton={
            <BpkNavigationIconButton
              icon={() => <span />}
              label="test"
              onClick={() => {}}
            >
              Click Here
            </BpkNavigationIconButton>
          }
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "traillingButton" attribute', () => {
    const tree = renderer
      .create(
        <BpkNavigationBar
          id="test"
          title="test"
          trailingButton={
            <BpkNavigationIconButton
              icon={() => <span />}
              label="test"
              onClick={() => {}}
            >
              Click Here
            </BpkNavigationIconButton>
          }
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with an element for the title attribute', () => {
    const tree = renderer
      .create(
        <BpkNavigationBar
          id="test"
          title={<span>test</span>}
          trailingButton={
            <BpkNavigationIconButton
              icon={() => <span />}
              label="test"
              onClick={() => {}}
            >
              Click Here
            </BpkNavigationIconButton>
          }
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
