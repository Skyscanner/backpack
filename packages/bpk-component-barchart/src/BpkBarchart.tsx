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

import PropTypes from 'prop-types';
import type { ComponentType, MouseEvent, FocusEvent } from 'react';
import { Component } from 'react';

import { scaleLinear, scaleBand } from 'd3-scale';
import debounce from 'lodash.debounce';

import {
  lineHeightSm,
} from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import BpkMobileScrollContainer from '../../bpk-component-mobile-scroll-container';
import { cssModules } from '../../bpk-react-utils';

import BpkBarchartBar from './BpkBarchartBar';
import BpkBarchartBars from './BpkBarchartBars';
import BpkBarchartDefs from './BpkBarchartDefs';
import BpkChartAxis from './BpkChartAxis';
import BpkChartDataTable from './BpkChartDataTable';
import BpkChartGridLines from './BpkChartGridLines';
import BpkChartMargin from './BpkChartMargin';
import {
  applyArrayRTLTransform,
  applyMarginRTLTransform,
} from './RTLtransforms';
import dataProp from './customPropTypes';
import { ORIENTATION_X, ORIENTATION_Y } from './orientation';
import { identity, remToPx } from './utils';

import STYLES from './BpkBarchart.module.scss';

const getClassName = cssModules(STYLES);

const spacing = remToPx('.375rem');
const lineHeight = remToPx(lineHeightSm);

 
type DataPoint = Record<string, any>;

type Props = {
  data: DataPoint[];
  xScaleDataKey: string;
  yScaleDataKey: string;
  xAxisLabel: string;
  yAxisLabel: string;
  initialWidth: number;
  initialHeight: number;
  leadingScrollIndicatorClassName?: string | null;
  trailingScrollIndicatorClassName?: string | null;
  outlierPercentage?: number | null;
  showGridlines?: boolean;
  xAxisMargin?: number;
  xAxisTickValue?: (value: unknown) => unknown;
  xAxisTickOffset?: number;
  xAxisTickEvery?: number;
  yAxisMargin?: number;
  yAxisTickValue?: (value: unknown) => unknown;
  yAxisNumTicks?: number | null;
  yAxisDomain?: Array<number | null>;
  onBarClick?: ((event: MouseEvent, dataPoint: DataPoint) => void) | null;
  onBarHover?: ((event: MouseEvent, dataPoint: DataPoint) => void) | null;
  onBarFocus?: ((event: FocusEvent, dataPoint: DataPoint) => void) | null;
  getBarLabel?: (point: DataPoint, xScaleDataKey: string, yScaleDataKey: string) => string;
  getBarSelection?: (point: DataPoint) => boolean;
  BarComponent?: ComponentType<Record<string, unknown>>;
  disableDataTable?: boolean;
};

type State = {
  width: number;
  height: number;
};

const getMaxYValue = (
  dataPoints: number[],
  outlierPercentage: number | null | undefined,
): number => {
  const meanValue = dataPoints.reduce((d: number, t: number) => d + t, 0) / dataPoints.length;
  const maxYValue = Math.max(...dataPoints);

  return outlierPercentage
    ? Math.min(maxYValue, meanValue * (outlierPercentage / 100) + meanValue)
    : maxYValue;
};

class BpkBarchart extends Component<Props, State> {
  // eslint-disable-next-line react/sort-comp
  static defaultProps = {
    leadingScrollIndicatorClassName: null,
    trailingScrollIndicatorClassName: null,
    outlierPercentage: null,
    showGridlines: false,
    xAxisMargin: 2 * (lineHeight + spacing),
    xAxisTickValue: identity,
    xAxisTickOffset: 0,
    xAxisTickEvery: 1,
    yAxisMargin: 4 * lineHeight + spacing,
    yAxisTickValue: identity,
    yAxisNumTicks: null,
    yAxisDomain: [null, null],
    onBarClick: null,
    onBarHover: null,
    onBarFocus: null,
    // Using type any here as xScaleDataKey or yScaleDataKey are strings and there is an issue that strings are not valid keys
    getBarLabel: (point: DataPoint, xScaleDataKey: string, yScaleDataKey: string) =>
      `${point[xScaleDataKey]} - ${point[yScaleDataKey]}`,
    getBarSelection: () => false,
    BarComponent: BpkBarchartBar,
    disableDataTable: false,
  };


  xScale: any;


  yScale: any;

  onWindowResize: ReturnType<typeof debounce>;

  // eslint-disable-next-line react/sort-comp
  svgEl: SVGSVGElement | null = null;

  constructor(props: Props) {
    super(props);

    this.state = {
      width: props.initialWidth,
      height: props.initialHeight,
    };

    this.xScale = scaleBand();
    this.yScale = scaleLinear();

    this.onWindowResize = debounce(this.updateDimensions, 100);
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.onWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  }

  updateDimensions = () => {
    if (!this.svgEl) {
      return;
    }

    const { height, width } = this.svgEl.getBoundingClientRect();

    this.setState({ width, height });
  };

  render() {
    const {
      BarComponent,
      data,
      disableDataTable,
      getBarLabel,
      getBarSelection,
      initialHeight,
      initialWidth,
      leadingScrollIndicatorClassName,
      onBarClick,
      onBarFocus,
      onBarHover,
      outlierPercentage,
      showGridlines,
      trailingScrollIndicatorClassName,
      xAxisLabel,
      xAxisMargin,
      xAxisTickEvery,
      xAxisTickOffset,
      xAxisTickValue,
      xScaleDataKey,
      yAxisDomain,
      yAxisLabel,
      yAxisMargin,
      yAxisNumTicks,
      yAxisTickValue,
      yScaleDataKey,
      ...rest
    } = this.props;

    const transformedData = applyArrayRTLTransform(data);
    const margin = applyMarginRTLTransform({
      top: spacing,
      left: yAxisMargin ?? 0,
      right: 0,
      bottom: xAxisMargin ?? 0,
    });

    const width = this.state.width - margin.left - margin.right;
    const height = this.state.height - margin.bottom - margin.top;
    const maxYValue = getMaxYValue(
      data.map((d: DataPoint) => d[yScaleDataKey]),
      outlierPercentage,
    );

    this.xScale.rangeRound([0, width]);
    this.xScale.domain(transformedData.map((d: DataPoint) => d[xScaleDataKey]));
    this.yScale.rangeRound([height, 0]);
    const domain = yAxisDomain ?? [null, null];
    this.yScale.domain([domain[0] || 0, domain[1] || maxYValue]);

    return (
      <BpkMobileScrollContainer
        leadingIndicatorClassName={leadingScrollIndicatorClassName ?? undefined}
        trailingIndicatorClassName={trailingScrollIndicatorClassName ?? undefined}
      >
        {!disableDataTable && (
          <BpkChartDataTable
            data={data}
            xScaleDataKey={xScaleDataKey}
            yScaleDataKey={yScaleDataKey}
            xAxisLabel={xAxisLabel}
            yAxisLabel={yAxisLabel}
          />
        )}
        {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={getClassName('bpk-barchart')}
          width={this.state.width}
          height={this.state.height}
          ref={(svgEl) => {
            this.svgEl = svgEl;
          }}
          {...rest}
        >
          <BpkBarchartDefs />
          <BpkChartMargin margin={margin}>
            <BpkChartAxis
              orientation={ORIENTATION_Y}
              width={this.state.width}
              height={this.state.height}
              margin={margin}
              scale={this.yScale}
               
              tickValue={yAxisTickValue as any}
              numTicks={yAxisNumTicks}
              label={yAxisLabel}
            />
            <BpkChartAxis
              orientation={ORIENTATION_X}
              width={this.state.width}
              height={this.state.height}
              margin={margin}
              scale={this.xScale}
               
              tickValue={xAxisTickValue as any}
              tickEvery={xAxisTickEvery}
              tickOffset={xAxisTickOffset}
              label={xAxisLabel}
            />
            {showGridlines && (
              <BpkChartGridLines
                orientation={ORIENTATION_Y}
                width={this.state.width}
                height={this.state.height}
                margin={margin}
                scale={this.yScale}
              />
            )}
            <BpkBarchartBars
              height={this.state.height}
              margin={margin}
              data={transformedData}
               
              xScale={this.xScale as any}
              yScale={this.yScale}
              xScaleDataKey={xScaleDataKey}
              yScaleDataKey={yScaleDataKey}
              maxYValue={maxYValue}
              outerPadding={showGridlines ? undefined : 0}
              onBarClick={onBarClick}
              onBarHover={onBarHover}
              onBarFocus={onBarFocus}
              getBarLabel={getBarLabel!}
              getBarSelection={getBarSelection}
              BarComponent={BarComponent!}
            />
          </BpkChartMargin>
        </svg>
      </BpkMobileScrollContainer>
    );
  }
}

// @ts-expect-error - propTypes are kept for backwards compatibility
BpkBarchart.propTypes = {
  /**
   * **Required**
   * An array of data points with a value for the x axis and y axis respectively.
   * The keys for the x axis and y axis can be anything you choose.
   * Specify the keys with the props `xScaleDataKey` and `yScaleDataKey`.
   */
  data: dataProp,
  /**
   * The key in each data point that holds the value for the x axis of that data point.
   */
  xScaleDataKey: PropTypes.string.isRequired,
  /**
   * The key in each data point that holds the value for the y axis of that data point.
   */
  yScaleDataKey: PropTypes.string.isRequired,
  xAxisLabel: PropTypes.string.isRequired,
  /**
   * Override the default y axis domain.  This is an array with two elements, the lower and upper domain.
   * If either value is set to `null` the default value is used instead.
   */
  yAxisLabel: PropTypes.string.isRequired,
  initialWidth: PropTypes.number.isRequired,
  initialHeight: PropTypes.number.isRequired,

  leadingScrollIndicatorClassName: PropTypes.string,
  trailingScrollIndicatorClassName: PropTypes.string,
  /**
   * Values that are `outlierPercentage` percent above the mean of the whole dataset are considered outliers and rendered cut off instead of at their full height.
   */
  outlierPercentage: PropTypes.number,
  showGridlines: PropTypes.bool,
  xAxisMargin: PropTypes.number,
  xAxisTickValue: PropTypes.func,
  xAxisTickOffset: PropTypes.number,
  xAxisTickEvery: PropTypes.number,
  yAxisMargin: PropTypes.number,
  yAxisTickValue: PropTypes.func,
  yAxisNumTicks: PropTypes.number,
  yAxisDomain: PropTypes.arrayOf(PropTypes.number),
  onBarClick: PropTypes.func,
  onBarHover: PropTypes.func,
  onBarFocus: PropTypes.func,
  getBarLabel: PropTypes.func,
  /**
   * Must be a function which returns true based on the `point` argument
   */
  getBarSelection: PropTypes.func,
  BarComponent: PropTypes.elementType,
  disableDataTable: PropTypes.bool,
};

export default BpkBarchart;
