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
import getDisplayName from 'recompose/getDisplayName';
import hasChildrenOfType from './hasChildrenOfType';

const Component = () => <div>Component</div>;
const Child = () => <span>Child</span>;

const runPropTypeValidatorWith = (
  component,
  { atLeast = 1, propName = 'children', type = Child } = {},
) => {
  const propTypeValidator = hasChildrenOfType(type, atLeast);
  return propTypeValidator(
    component.props,
    propName,
    getDisplayName(component.type),
  );
};

describe('hasChildrenOfType', () => {
  it('should not return an error if conditions are satisfied', () => {
    const error = runPropTypeValidatorWith(
      <Component>
        <Child />
      </Component>,
    );
    expect(error).toBeUndefined();
  });

  it('should return an error if it has less children than it should (0 < 1)', () => {
    const error = runPropTypeValidatorWith(<Component />);
    expect(error).toEqual(
      Error("Component requires at least 1 'Child' child."),
    );
  });

  it('should return an error if it has less children than it should (1 < 2)', () => {
    const error = runPropTypeValidatorWith(
      <Component>
        <Child />
      </Component>,
      { atLeast: 2 },
    );
    expect(error).toEqual(
      Error("Component requires at least 2 'Child' children."),
    );
  });

  it('should not return an error if it does not require children', () => {
    const error = runPropTypeValidatorWith(<Component />, { atLeast: 0 });
    expect(error).toBeUndefined();
  });

  it('should return an error if it has single non matching child ', () => {
    const error = runPropTypeValidatorWith(
      <Component>
        <div />
      </Component>,
    );
    expect(error).toEqual(
      Error("Component only allows 'Child' as children. Found 'div'."),
    );
  });

  it('should return an error if it has a mix of matching and non matching children ', () => {
    const error = runPropTypeValidatorWith(
      <Component>
        <Child />
        <div />
      </Component>,
    );
    expect(error).toEqual(
      Error("Component only allows 'Child' as children. Found 'div'."),
    );
  });

  it(`should return an error if used on a prop other than 'children'`, () => {
    const error = runPropTypeValidatorWith(<Component something={Child} />, {
      propName: 'something',
    });
    expect(error).toEqual(
      Error(`hasChildrenOfType can only be used on 'children' propTypes`),
    );
  });
});
