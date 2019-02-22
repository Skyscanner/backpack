/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 - 2019 Skyscanner Ltd
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

import BpkMapMarker from './BpkMapMarker';

describe('BpkMapMarker', () => {
  const position = {
    latitude: 41.386947,
    longitude: 2.170048,
  };
  const icon = <span>Icon</span>;

  it('should render properly', () => {
    const tree = shallow(<BpkMapMarker position={position} icon={icon} />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with a "large" attribute', () => {
    const tree = shallow(
      <BpkMapMarker position={position} icon={icon} large />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with a "className" attribute', () => {
    const tree = shallow(
      <BpkMapMarker
        position={position}
        icon={icon}
        className="custom-class-1 custom-class-2"
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with a "arrowClassName" attribute', () => {
    const tree = shallow(
      <BpkMapMarker
        position={position}
        icon={icon}
        arrowClassName="custom-class-1 custom-class-2"
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });
});
