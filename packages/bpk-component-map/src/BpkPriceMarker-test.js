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
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import BpkPriceMarker, { PRICE_MARKER_STATUSES } from './BpkPriceMarker';

describe('BpkMapMarker', () => {
  const position = {
    latitude: 41.386947,
    longitude: 2.170048,
  };

  it('should render properly', () => {
    const tree = shallow(<BpkPriceMarker label="£120" position={position} />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with "status" attribute as "focused" ', () => {
    const tree = shallow(
      <BpkPriceMarker
        label="£120"
        position={position}
        status={PRICE_MARKER_STATUSES.focused}
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with "status" attribute as "viewed" ', () => {
    const tree = shallow(
      <BpkPriceMarker
        label="£120"
        position={position}
        status={PRICE_MARKER_STATUSES.viewed}
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with a "disabled" attribute', () => {
    const tree = shallow(
      <BpkPriceMarker label="Sold out" position={position} disabled />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with a "className" attribute', () => {
    const tree = shallow(
      <BpkPriceMarker
        label="£120"
        position={position}
        className="custom-class-1 custom-class-2"
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with a "arrowClassName" attribute', () => {
    const tree = shallow(
      <BpkPriceMarker
        label="£120"
        position={position}
        arrowClassName="custom-class-1 custom-class-2"
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with a "buttonProps" attribute', () => {
    const tree = shallow(
      <BpkPriceMarker
        label="£120"
        position={position}
        buttonProps={{ testId: 'arbitrary value' }}
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with a "onClick" attribute', () => {
    const tree = shallow(
      <BpkPriceMarker
        label="£120"
        position={position}
        onClick={() => {
          alert('Marker clicked'); // eslint-disable-line no-alert
        }}
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });
});
