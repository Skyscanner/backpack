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
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import BpkInput, { INPUT_TYPES } from './BpkInput';

describe('BpkInput', () => {
  it('should render correctly', () => {
    const tree = renderer
      .create(<BpkInput id="test" name="test" value="" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with additional props', () => {
    const tree = renderer
      .create(
        <BpkInput
          id="test"
          name="test"
          value=""
          placeholder="Enter a country, city or airport"
          onChange={() => null}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with value', () => {
    const tree = renderer
      .create(<BpkInput id="test" name="test" value="My value" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with valid attribute set to "true"', () => {
    const tree = renderer
      .create(<BpkInput id="test" name="test" value="" valid />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with valid attribute set to "false"', () => {
    const tree = renderer
      .create(<BpkInput id="test" name="test" value="" valid={false} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "clearable" attribute', () => {
    // Will report a proptypes error because 'onClear' and 'clearButtonLabel'
    // are missing. Swallow that as it's tested in customPropTypes-test.js.
    jest.spyOn(console, 'error').mockImplementation(() => jest.fn());
    const tree = renderer
      .create(<BpkInput id="test" name="test" value="" clearable />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "onClear" attribute', () => {
    const tree = renderer
      .create(<BpkInput id="test" name="test" value="" onClear={() => {}} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "clearButtonLabel" attribute', () => {
    const tree = renderer
      .create(
        <BpkInput id="test" name="test" value="" clearButtonLabel="test" />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "clearable", "onClear" and "clearButtonLabel" attributes', () => {
    const tree = renderer
      .create(
        <BpkInput
          id="test"
          name="test"
          value=""
          clearable
          onClear={() => {}}
          clearButtonLabel="test"
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with type attribute', () => {
    const tree = renderer
      .create(
        <BpkInput type={INPUT_TYPES.PASSWORD} id="test" name="test" value="" />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "large" attribute', () => {
    const tree = renderer
      .create(<BpkInput id="test" name="test" value="" large />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "docked" attribute', () => {
    const tree = renderer
      .create(<BpkInput id="test" name="test" value="" docked />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "dockedFirst" attribute', () => {
    const tree = renderer
      .create(<BpkInput id="test" name="test" value="" dockedFirst />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "dockedMiddle" attribute', () => {
    const tree = renderer
      .create(<BpkInput id="test" name="test" value="" dockedMiddle />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "dockedLast" attribute', () => {
    const tree = renderer
      .create(<BpkInput id="test" name="test" value="" dockedLast />)
      .toJSON();
    expect(tree).toMatchSnapshot();
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
});
