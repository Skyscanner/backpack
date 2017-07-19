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
import BpkNudger from './BpkNudger';

describe('BpkNudger', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkNudger
        id="nudger"
        min={1}
        max={9}
        value={2}
        onChange={() => null}
        decreaseButtonLabel="Decrease"
        increaseButtonLabel="Increase"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "className" attribute', () => {
    const tree = renderer.create(
      <BpkNudger
        id="nudger"
        min={1}
        max={9}
        value={2}
        onChange={() => null}
        decreaseButtonLabel="Decrease"
        increaseButtonLabel="Increase"
        className="my-nudger"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a value = min', () => {
    const tree = renderer.create(
      <BpkNudger
        id="nudger"
        min={1}
        max={9}
        value={1}
        onChange={() => null}
        decreaseButtonLabel="Decrease"
        increaseButtonLabel="Increase"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a value = max', () => {
    const tree = renderer.create(
      <BpkNudger
        id="nudger"
        min={1}
        max={9}
        value={9}
        onChange={() => null}
        decreaseButtonLabel="Decrease"
        increaseButtonLabel="Increase"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a value < min', () => {
    const tree = renderer.create(
      <BpkNudger
        id="nudger"
        min={1}
        max={9}
        value={0}
        onChange={() => null}
        decreaseButtonLabel="Decrease"
        increaseButtonLabel="Increase"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a value > max', () => {
    const tree = renderer.create(
      <BpkNudger
        id="nudger"
        min={1}
        max={9}
        value={10}
        onChange={() => null}
        decreaseButtonLabel="Decrease"
        increaseButtonLabel="Increase"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should return a number up/down on change', () => {
    const onChangeSpy = jest.fn();
    const tree = renderer.create(
      <BpkNudger
        id="nudger"
        min={1}
        max={9}
        value={3}
        onChange={onChangeSpy}
        decreaseButtonLabel="Decrease"
        increaseButtonLabel="Increase"
      />,
    ).toJSON();

    tree.children[0].props.onClick();
    expect(onChangeSpy).toHaveBeenCalledWith(2);

    tree.children[2].props.onClick();
    expect(onChangeSpy).toHaveBeenCalledWith(4);
  });
});
