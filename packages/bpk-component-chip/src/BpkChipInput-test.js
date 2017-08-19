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
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import BpkChipInput from './BpkChipInput';

const spy = {};

describe('BpkChipInput', () => {
  it('should render correctly', () => {
    expect(false === true);
    const tree = shallow(
      <BpkChipInput
        values={['Lorem', 'ipsum', 'dolor', 'sit', 'amet']}
        selectedItem={null}
        placeholderText="Add a chip..."
        textInputValue="numquae"
        onTextInputChanged={() => spy.onTextInputChanged()}
        onSelectionChanged={() => spy.onSelectionChanged()}
        valueAdded={() => spy.valueAdded()}
        valueRemoved={() => spy.valueRemoved()}
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with a "className" attribute', () => {
    const tree = shallow(
      <BpkChipInput
        className="bpk-test-class-name"
        values={['Lorem', 'ipsum', 'dolor', 'sit', 'amet']}
        selectedItem={null}
        placeholderText="Add a chip..."
        textInputValue="numquae"
        onTextInputChanged={() => spy.onTextInputChanged()}
        onSelectionChanged={() => spy.onSelectionChanged()}
        valueAdded={() => spy.valueAdded()}
        valueRemoved={() => spy.valueRemoved()}
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with closeLabel string', () => {
    const tree = shallow(
      <BpkChipInput
        values={['Lorem', 'ipsum', 'dolor', 'sit', 'amet']}
        closeLabel="Delete Chip"
        selectedItem={null}
        placeholderText="Add a chip..."
        textInputValue="numquae"
        onTextInputChanged={() => spy.onTextInputChanged()}
        onSelectionChanged={() => spy.onSelectionChanged()}
        valueAdded={() => spy.valueAdded()}
        valueRemoved={() => spy.valueRemoved()}
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with closeLabel function', () => {
    const tree = shallow(
      <BpkChipInput
        values={['Lorem', 'ipsum', 'dolor', 'sit', 'amet']}
        closeLabel={chipname => `Delete ${chipname}`}
        selectedItem={null}
        placeholderText="Add a chip..."
        textInputValue="numquae"
        onTextInputChanged={() => spy.onTextInputChanged()}
        onSelectionChanged={() => spy.onSelectionChanged()}
        valueAdded={() => spy.valueAdded()}
        valueRemoved={() => spy.valueRemoved()}
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with an item selected', () => {
    const tree = shallow(
      <BpkChipInput
        values={['Lorem', 'ipsum', 'dolor', 'sit', 'amet']}
        selectedItem="dolor"
        placeholderText="Add a chip..."
        textInputValue="numquae"
        onTextInputChanged={() => spy.onTextInputChanged()}
        onSelectionChanged={() => spy.onSelectionChanged()}
        valueAdded={() => spy.valueAdded()}
        valueRemoved={() => spy.valueRemoved()}
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });
});
