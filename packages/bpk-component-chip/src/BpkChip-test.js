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
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import BpkChip from './BpkChip';

describe('BpkChip', () => {
  it('should render correctly', () => {
    const tree = shallow(
      <BpkChip onClose={() => null} closeLabel="Close">
        This is a Chip!
      </BpkChip>,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with a "className" attribute', () => {
    const tree = shallow(
      <BpkChip onClose={() => null} closeLabel="Close" className="custom-class">
        This is a Chip!
      </BpkChip>,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with a "closeLabel" function attribute', () => {
    const tree = shallow(
      <BpkChip
        onClose={() => null}
        closeLabel={children => {
          if (typeof children === 'string') {
            return `Custom close (${children.toString().toLowerCase()})`;
          }

          return 'Close';
        }}
      >
        This is a Chip!
      </BpkChip>,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with a "closeLabel" string attribute', () => {
    const tree = shallow(
      <BpkChip onClose={() => null} closeLabel="close it">
        This is a Chip!
      </BpkChip>,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });
});
