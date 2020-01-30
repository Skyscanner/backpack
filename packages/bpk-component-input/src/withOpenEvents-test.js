/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2020 Skyscanner Ltd
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
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import withOpenEvents from './withOpenEvents';
import BpkInput from './BpkInput';

const Input = withOpenEvents(BpkInput);

describe('withOpenEvents', () => {
  it('should render correctly', () => {
    const tree = renderer
      .create(
        <Input
          id="my-input"
          name="my-input"
          value="value"
          hasTouchSupport={false}
          onChange={() => null}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should attach different event handlers when touch is supported', () => {
    const tree = renderer
      .create(
        <Input
          id="my-input"
          name="my-input"
          value="value"
          hasTouchSupport
          onChange={() => null}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "className" prop', () => {
    const tree = renderer
      .create(
        <Input
          id="my-input"
          name="my-input"
          value="value"
          className="my-custom-class"
          onChange={() => null}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should open on click', () => {
    const onOpen = jest.fn();
    const input = mount(
      <Input
        id="my-input"
        name="my-input"
        value="value"
        onOpen={onOpen}
        onChange={() => null}
      />,
    );

    expect(onOpen).not.toHaveBeenCalled();

    input.simulate('click');
    expect(onOpen).toHaveBeenCalled();
  });

  it('should open on focus', () => {
    const onOpen = jest.fn();
    const input = mount(
      <Input
        id="my-input"
        name="my-input"
        value="value"
        onOpen={onOpen}
        onChange={() => null}
      />,
    );

    expect(onOpen).not.toHaveBeenCalled();

    input.simulate('focus');
    expect(onOpen).toHaveBeenCalled();
  });

  it('should open on touch', () => {
    const onOpen = jest.fn();
    const input = mount(
      <Input
        id="my-input"
        name="my-input"
        value="value"
        onOpen={onOpen}
        hasTouchSupport
        onChange={() => null}
      />,
    );

    expect(onOpen).not.toHaveBeenCalled();
    // We need to focus the DOM node first, thanks to Really Annoying Hack™
    ReactDOM.findDOMNode(input.instance()).focus(); // eslint-disable-line react/no-find-dom-node

    input.simulate('touchEnd');
    expect(onOpen).toHaveBeenCalled();
  });

  it('should open on "Enter" key', () => {
    const onOpen = jest.fn();
    const input = mount(
      <Input
        id="my-input"
        name="my-input"
        value="value"
        onOpen={onOpen}
        onChange={() => null}
      />,
    );

    expect(onOpen).not.toHaveBeenCalled();

    input.simulate('keyDown', { keyCode: 13 });

    expect(onOpen).toHaveBeenCalled();
  });

  it('should open on "Space" key', () => {
    const onOpen = jest.fn();
    const input = mount(
      <Input
        id="my-input"
        name="my-input"
        value="value"
        onOpen={onOpen}
        onChange={() => null}
      />,
    );

    expect(onOpen).not.toHaveBeenCalled();

    input.simulate('keyUp', { keyCode: 32 });

    expect(onOpen).toHaveBeenCalled();
  });
});
