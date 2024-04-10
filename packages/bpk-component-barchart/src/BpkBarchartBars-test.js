/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
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

// TODO: remove this once we update the Chart implementation to accept values
// other than pixels
 

import { render, fireEvent, screen } from '@testing-library/react';
import { scaleLinear, scaleBand } from 'd3-scale';

import data from '../data.json';

import BpkBarchartBar from './BpkBarchartBar';
import BpkBarchartBars from './BpkBarchartBars';

const margin = {
  top: 10,
  right: 20,
  bottom: 30,
  left: 40,
};
const { prices } = data;
const size = 200;
const yScale = scaleLinear().domain([0, 500]).range([0, size]);
const xScale = scaleBand()
  .domain(prices.map((d) => d.month))
  .range([0, size]);

describe('BpkBarchartBars', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <BpkBarchartBars
        margin={margin}
        xScale={xScale}
        yScale={yScale}
        xScaleDataKey="month"
        yScaleDataKey="price"
        maxYValue={50}
        width={size}
        height={size}
        data={prices}
        getBarLabel={(point, xScaleDataKey, yScaleDataKey) =>
          `${point[xScaleDataKey]} - ${point[yScaleDataKey]}`
        }
        BarComponent={BpkBarchartBar}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with "rounded" prop set to "false"', () => {
    const { asFragment } = render(
      <BpkBarchartBars
        margin={margin}
        xScale={xScale}
        yScale={yScale}
        xScaleDataKey="month"
        yScaleDataKey="price"
        maxYValue={50}
        width={size}
        height={size}
        data={prices}
        getBarLabel={(point, xScaleDataKey, yScaleDataKey) =>
          `${point[xScaleDataKey]} - ${point[yScaleDataKey]}`
        }
        BarComponent={BpkBarchartBar}
        rounded={false}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "padding" prop', () => {
    const { asFragment } = render(
      <BpkBarchartBars
        margin={margin}
        xScale={xScale}
        yScale={yScale}
        xScaleDataKey="month"
        yScaleDataKey="price"
        maxYValue={50}
        width={size}
        height={size}
        data={prices}
        getBarLabel={(point, xScaleDataKey, yScaleDataKey) =>
          `${point[xScaleDataKey]} - ${point[yScaleDataKey]}`
        }
        BarComponent={BpkBarchartBar}
        padding={0}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "getBarSelection" prop', () => {
    const { asFragment } = render(
      <BpkBarchartBars
        margin={margin}
        xScale={xScale}
        yScale={yScale}
        xScaleDataKey="month"
        yScaleDataKey="price"
        maxYValue={50}
        width={size}
        height={size}
        data={prices}
        getBarLabel={(point, xScaleDataKey, yScaleDataKey) =>
          `${point[xScaleDataKey]} - ${point[yScaleDataKey]}`
        }
        BarComponent={BpkBarchartBar}
        padding={0}
        getBarSelection={(point) => point.month === 'Mar'}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should call provided "onBarClick"', async () => {
    const onClickSpy = jest.fn();
    render(
      <BpkBarchartBars
        margin={margin}
        xScale={xScale}
        yScale={yScale}
        xScaleDataKey="month"
        yScaleDataKey="price"
        maxYValue={50}
        width={size}
        height={size}
        data={prices}
        getBarLabel={(point, xScaleDataKey, yScaleDataKey) =>
          `${point[xScaleDataKey]} - ${point[yScaleDataKey]}`
        }
        BarComponent={BpkBarchartBar}
        padding={0}
        onBarClick={onClickSpy}
      />,
    );

    const bar = screen.getByRole('button', { name: /Jan/i });
    await fireEvent.click(bar);
    expect(onClickSpy).toHaveBeenCalled();
  });

  it('should call provided "onBarHover"', async () => {
    const onHoverSpy = jest.fn();
    render(
      <BpkBarchartBars
        margin={margin}
        xScale={xScale}
        yScale={yScale}
        xScaleDataKey="month"
        yScaleDataKey="price"
        maxYValue={50}
        width={size}
        height={size}
        data={prices}
        getBarLabel={(point, xScaleDataKey, yScaleDataKey) =>
          `${point[xScaleDataKey]} - ${point[yScaleDataKey]}`
        }
        BarComponent={BpkBarchartBar}
        padding={0}
        onBarHover={onHoverSpy}
      />,
    );

    const bar = screen.getByRole('graphics-symbol', { name: /Jan/i });
    await fireEvent.mouseEnter(bar);
    expect(onHoverSpy).toHaveBeenCalled();
  });

  it('should call provided "onBarFocus"', async () => {
    const onFocusSpy = jest.fn();
    render(
      <BpkBarchartBars
        margin={margin}
        xScale={xScale}
        yScale={yScale}
        xScaleDataKey="month"
        yScaleDataKey="price"
        maxYValue={50}
        width={size}
        height={size}
        data={prices}
        getBarLabel={(point, xScaleDataKey, yScaleDataKey) =>
          `${point[xScaleDataKey]} - ${point[yScaleDataKey]}`
        }
        BarComponent={BpkBarchartBar}
        padding={0}
        onBarFocus={onFocusSpy}
      />,
    );
    const bar = screen.getByRole('graphics-symbol', { name: /Jan/i });
    await fireEvent.focus(bar);
    expect(onFocusSpy).toHaveBeenCalled();
  });
});
