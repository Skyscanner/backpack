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
import BpkBarchart from './BpkBarchart';
import data from '../data.json';

const prices = data.prices;
const size = 200;

describe('BpkBarchart', () => {
  it('should render correctly', () => {
    const tree = shallow(
      <BpkBarchart
        xScaleDataKey="month"
        yScaleDataKey="price"
        xAxisLabel="Month"
        yAxisLabel="Average price (£)"
        initialWidth={size}
        initialHeight={size}
        data={prices}
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render with "showGridlines" prop', () => {
    const tree = shallow(
      <BpkBarchart
        xScaleDataKey="month"
        yScaleDataKey="price"
        xAxisLabel="Month"
        yAxisLabel="Average price (£)"
        initialWidth={size}
        initialHeight={size}
        data={prices}
        showGridlines
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render with "onBarClick" prop', () => {
    const tree = shallow(
      <BpkBarchart
        xScaleDataKey="month"
        yScaleDataKey="price"
        xAxisLabel="Month"
        yAxisLabel="Average price (£)"
        initialWidth={size}
        initialHeight={size}
        data={prices}
        onBarClick={() => null}
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render with "hideXAxisLabel" prop', () => {
    const tree = shallow(
      <BpkBarchart
        xScaleDataKey="month"
        yScaleDataKey="price"
        xAxisLabel="Month"
        yAxisLabel="Average price (£)"
        initialWidth={size}
        initialHeight={size}
        data={prices}
        hideXAxisLabel
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render with "hideYAxisLabel" prop', () => {
    const tree = shallow(
      <BpkBarchart
        xScaleDataKey="month"
        yScaleDataKey="price"
        xAxisLabel="Month"
        yAxisLabel="Average price (£)"
        initialWidth={size}
        initialHeight={size}
        data={prices}
        hideYAxisLabel
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render with "getBarLabel" prop', () => {
    const tree = shallow(
      <BpkBarchart
        xScaleDataKey="month"
        yScaleDataKey="price"
        xAxisLabel="Month"
        yAxisLabel="Average price (£)"
        initialWidth={size}
        initialHeight={size}
        data={prices}
        getBarLabel={() => null}
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render with "disableDataTable" prop', () => {
    const tree = shallow(
      <BpkBarchart
        xScaleDataKey="month"
        yScaleDataKey="price"
        xAxisLabel="Month"
        yAxisLabel="Average price (£)"
        initialWidth={size}
        initialHeight={size}
        data={prices}
        disableDataTable
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });
});
