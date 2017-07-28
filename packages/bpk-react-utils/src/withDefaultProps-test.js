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

import withDefaultProps from './withDefaultProps';

const TestComponent = 'TestComponent';

describe('withDefaultProps', () => {
  it('should render correctly', () => {
    const Component = withDefaultProps(TestComponent, { a: 1, b: 2, c: { d: 3 } });
    const tree = renderer.create(
      <Component>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
        sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </Component>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should merge classNames', () => {
    const Component = withDefaultProps(TestComponent, { a: 1, b: 2, c: { d: 3 }, className: 'a' });
    const tree = renderer.create(
      <Component className="b">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
        sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </Component>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
