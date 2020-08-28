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

/* @flow strict */

import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import data from '../data.json';

import BpkChartDataTable from './BpkChartDataTable';

const { prices } = data;

describe('BpkChartDataTable', () => {
  it('should render correctly', () => {
    const tree = shallow(
      <BpkChartDataTable
        xScaleDataKey="month"
        yScaleDataKey="price"
        xAxisLabel="Month"
        yAxisLabel="Average price (£)"
        data={prices}
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });
});
