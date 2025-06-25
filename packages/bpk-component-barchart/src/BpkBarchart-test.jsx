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

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import data from '../data.json';

import BpkBarchart from './BpkBarchart';

const { prices } = data;
const size = 200;

describe('BpkBarchart', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
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
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "leadingScrollIndicatorClassName" prop', () => {
    const { asFragment } = render(
      <BpkBarchart
        xScaleDataKey="month"
        yScaleDataKey="price"
        xAxisLabel="Month"
        yAxisLabel="Average price (£)"
        initialWidth={size}
        initialHeight={size}
        data={prices}
        leadingScrollIndicatorClassName="my-custom-class-name"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "trailingScrollIndicatorClassName" prop', () => {
    const { asFragment } = render(
      <BpkBarchart
        xScaleDataKey="month"
        yScaleDataKey="price"
        xAxisLabel="Month"
        yAxisLabel="Average price (£)"
        initialWidth={size}
        initialHeight={size}
        data={prices}
        trailingScrollIndicatorClassName="my-custom-class-name"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with "getBarLabel" prop', () => {
    const { asFragment } = render(
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
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "yAxisDomain" prop', () => {
    const { asFragment } = render(
      <BpkBarchart
        xScaleDataKey="month"
        yScaleDataKey="price"
        xAxisLabel="Month"
        yAxisLabel="Average price (£)"
        initialWidth={size}
        initialHeight={size}
        data={prices}
        yAxisDomain={[null, 100]}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with "showGridlines" prop', () => {
    render(
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

    const gridLinesElement = document.getElementsByClassName(
      'bpk-chart__grid-lines',
    );
    expect(gridLinesElement.length).toEqual(1);
  });

  it('should call provided "onBarClick"', async () => {
    const onClickSpy = jest.fn();
    render(
      <BpkBarchart
        xScaleDataKey="month"
        yScaleDataKey="price"
        xAxisLabel="Month"
        yAxisLabel="Average price (£)"
        initialWidth={size}
        initialHeight={size}
        data={prices}
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
      <BpkBarchart
        xScaleDataKey="month"
        yScaleDataKey="price"
        xAxisLabel="Month"
        yAxisLabel="Average price (£)"
        initialWidth={size}
        initialHeight={size}
        data={prices}
        onBarHover={onHoverSpy}
      />,
    );

    const bar = screen.getByRole('graphics-symbol', { name: /Jan/i });
    await fireEvent.mouseEnter(bar);
    expect(onHoverSpy).toHaveBeenCalled();
  });

  it('should not render table when "disableDataTable" is true', () => {
    render(
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

    const dataTable = screen.queryByRole('table');
    expect(dataTable).not.toBeInTheDocument();
  });
});
