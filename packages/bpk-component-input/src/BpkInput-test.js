/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
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
/* @flow strict */

import React from 'react';
import { mount } from 'enzyme';
import { render } from '@testing-library/react';

import BpkInput from './BpkInput';
import { INPUT_TYPES } from './common-types';

describe('BpkInput', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<BpkInput id="test" name="test" value="" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with additional props', () => {
    const { asFragment } = render(
      <BpkInput
        id="test"
        name="test"
        value=""
        placeholder="Enter a country, city or airport"
        onChange={() => null}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with value', () => {
    const { asFragment } = render(
      <BpkInput id="test" name="test" value="My value" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with valid attribute set to "true"', () => {
    const { asFragment } = render(
      <BpkInput id="test" name="test" value="" valid />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with valid attribute set to "false"', () => {
    const { asFragment } = render(
      <BpkInput id="test" name="test" value="" valid={false} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "clearButtonMode=whileEditing" attribute', () => {
    // Will report a proptypes error because 'onClear' and 'clearButtonLabel'
    // are missing. Swallow that as it's tested in customPropTypes-test.js.
    jest.spyOn(console, 'error').mockImplementation(() => jest.fn());
    const { asFragment } = render(
      <BpkInput
        id="test"
        name="test"
        value=""
        clearButtonMode="whileEditing"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "clearButtonMode=always" attribute', () => {
    // Will report a proptypes error because 'onClear' and 'clearButtonLabel'
    // are missing. Swallow that as it's tested in customPropTypes-test.js.
    jest.spyOn(console, 'error').mockImplementation(() => jest.fn());
    const { asFragment } = render(
      <BpkInput id="test" name="test" value="" clearButtonMode="always" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "onClear" attribute', () => {
    const { asFragment } = render(
      <BpkInput id="test" name="test" value="" onClear={() => {}} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "clearButtonLabel" attribute', () => {
    const { asFragment } = render(
      <BpkInput id="test" name="test" value="" clearButtonLabel="test" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "clearable", "onClear" and "clearButtonLabel" attributes', () => {
    const { asFragment } = render(
      <BpkInput
        id="test"
        name="test"
        value=""
        clearButtonMode="whileEditing"
        onClear={() => {}}
        clearButtonLabel="test"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with type attribute', () => {
    const { asFragment } = render(
      <BpkInput type={INPUT_TYPES.password} id="test" name="test" value="" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "large" attribute', () => {
    const { asFragment } = render(
      <BpkInput id="test" name="test" value="" large />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "docked" attribute', () => {
    const { asFragment } = render(
      <BpkInput id="test" name="test" value="" docked />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "dockedFirst" attribute', () => {
    const { asFragment } = render(
      <BpkInput id="test" name="test" value="" dockedFirst />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "dockedMiddle" attribute', () => {
    const { asFragment } = render(
      <BpkInput id="test" name="test" value="" dockedMiddle />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "dockedLast" attribute', () => {
    const { asFragment } = render(
      <BpkInput id="test" name="test" value="" dockedLast />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should expose input reference to parent components', () => {
    let inputRef;
    const storeInputReference = ref => {
      inputRef = ref;
    };
    const tree = mount(
      <BpkInput
        id="test"
        name="test"
        value=""
        inputRef={storeInputReference}
      />,
    );
    const input = tree
      .find('input')
      .at(0)
      .instance();
    expect(input).toEqual(inputRef);
  });

  it('should call "onClear" when clearing', () => {
    const onClear = jest.fn();

    const name = 'field_name';

    const wrapper = mount(
      <BpkInput
        id="test"
        name={name}
        value="value"
        clearButtonMode="always"
        onClear={onClear}
        clearButtonLabel="clear"
      />,
    );

    wrapper.find('BpkClearButton').simulate('click');

    expect(onClear).toHaveBeenCalledWith(
      expect.objectContaining({ target: expect.objectContaining({ name }) }),
    );
  });
});
