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
import renderer from 'react-test-renderer';
import { scaleLinear, scaleBand } from 'd3-scale';
import BpkChartAxis from './BpkChartAxis';
import { ORIENTATION_X, ORIENTATION_Y } from './orientation';

const margin = {
  top: 40,
  right: 40,
  bottom: 40,
  left: 40,
};

const size = 200;
const linearScale = scaleLinear()
  .domain([5, 480]).range([0, size]);
const bandScale = scaleBand()
  .domain(['North America', 'South America', 'Europe', 'Asia', 'Australia', 'Antartica']).range([0, size]);

describe('BpkChartAxis', () => {
  describe('X', () => {
    it('should render linear scale', () => {
      const tree = renderer.create(
        <BpkChartAxis
          width={size}
          height={size}
          margin={margin}
          scale={linearScale}
          orientation={ORIENTATION_X}
        />,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render linear scale with "numTicks" attribute', () => {
      const tree = renderer.create(
        <BpkChartAxis
          width={size}
          height={size}
          margin={margin}
          scale={linearScale}
          orientation={ORIENTATION_X}
          numTicks={2}
        />,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render band scale', () => {
      const tree = renderer.create(
        <BpkChartAxis
          width={size}
          height={size}
          margin={margin}
          scale={bandScale}
          orientation={ORIENTATION_X}
        />,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render band scale with "tickEvery" attribute', () => {
      const tree = renderer.create(
        <BpkChartAxis
          width={size}
          height={size}
          margin={margin}
          scale={bandScale}
          orientation={ORIENTATION_X}
          tickEvery={2}
        />,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render band scale with "tickEvery" and "tickOffset" attributes', () => {
      const tree = renderer.create(
        <BpkChartAxis
          width={size}
          height={size}
          margin={margin}
          scale={bandScale}
          orientation={ORIENTATION_X}
          tickEvery={2}
          tickOffset={1}
        />,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render with label', () => {
      const tree = renderer.create(
        <BpkChartAxis
          width={size}
          height={size}
          margin={margin}
          scale={linearScale}
          orientation={ORIENTATION_X}
          label="X axis label"
        />,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('Y', () => {
    it('should render linear scale', () => {
      const tree = renderer.create(
        <BpkChartAxis
          width={size}
          height={size}
          margin={margin}
          scale={linearScale}
          orientation={ORIENTATION_Y}
        />,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render linear scale with "numTicks" attribute', () => {
      const tree = renderer.create(
        <BpkChartAxis
          width={size}
          height={size}
          margin={margin}
          scale={linearScale}
          orientation={ORIENTATION_Y}
          numTicks={2}
        />,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render band scale', () => {
      const tree = renderer.create(
        <BpkChartAxis
          width={size}
          height={size}
          margin={margin}
          scale={bandScale}
          orientation={ORIENTATION_Y}
        />,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render band scale with "tickEvery" attribute', () => {
      const tree = renderer.create(
        <BpkChartAxis
          width={size}
          height={size}
          margin={margin}
          scale={bandScale}
          orientation={ORIENTATION_Y}
          tickEvery={2}
        />,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render band scale with "tickEvery" and "tickOffset" attributes', () => {
      const tree = renderer.create(
        <BpkChartAxis
          width={size}
          height={size}
          margin={margin}
          scale={bandScale}
          orientation={ORIENTATION_Y}
          tickEvery={2}
          tickOffset={1}
        />,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render with label', () => {
      const tree = renderer.create(
        <BpkChartAxis
          width={size}
          height={size}
          margin={margin}
          scale={linearScale}
          orientation={ORIENTATION_Y}
          label="Y axis label"
        />,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
