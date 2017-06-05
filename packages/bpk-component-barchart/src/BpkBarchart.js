import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import React, { Component } from 'react';
import { scaleLinear, scaleBand } from 'd3-scale';
import { spacingXs, lineHeightSm } from 'bpk-tokens/tokens/base.es6';

import BpkBarchartDefs from './BpkBarchartDefs';
import BpkBarchartBars from './BpkBarchartBars';
import BpkChartMargin from './BpkChartMargin';
import BpkChartAxis from './BpkChartAxis';
import BpkChartGridLines from './BpkChartGridLines';
import { identity, remToPx } from './utils';
import { applyArrayRTLTransform, applyDirectionalRTLTransform } from './RTLtransforms';
import { ORIENTATION_X, ORIENTATION_Y } from './orientation';
import './bpk-barchart.scss';

const spacing = remToPx(spacingXs);
const lineHeight = remToPx(lineHeightSm);

class BpkBarchart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: props.initialWidth,
      height: props.initialHeight,
    };

    this.xScale = scaleBand();
    this.yScale = scaleLinear();

    this.updateDimensions = this.updateDimensions.bind(this);
    this.onWindowResize = debounce(this.updateDimensions, 100);
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.onWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  }

  updateDimensions() {
    if (!this.svg) {
      return;
    }

    const { width, height } = this.svg.getBoundingClientRect();

    this.setState({ width, height });
  }

  render() {
    const {
      className,
      data,
      initialWidth,
      initialHeight,
      xScaleDataKey,
      yScaleDataKey,
      outlierPercentage,
      showGridlines,
      xAxisMargin,
      xAxisLabel,
      xAxisTickValue,
      xAxisTickOffset,
      xAxisTickEvery,
      yAxisMargin,
      yAxisLabel,
      yAxisTickValue,
      yAxisNumTicks,
      ...rest
    } = this.props;

    const transformedData = applyArrayRTLTransform(data);
    const margin = applyDirectionalRTLTransform({
      top: spacing,
      left: yAxisMargin,
      right: 0,
      bottom: xAxisMargin,
    });

    const classNames = ['bpk-barchart'];
    if (className) { classNames.push(className); }

    const width = this.state.width - margin.left - margin.right;
    const height = this.state.height - margin.bottom - margin.top;

    this.xScale.rangeRound([0, width]);
    this.xScale.domain(transformedData.map(d => d[xScaleDataKey]));
    this.yScale.rangeRound([height, 0]);

    const dataPoints = transformedData.map(d => d[yScaleDataKey]);
    const meanValue =
      dataPoints.reduce((d, t) => d + t, 0) / transformedData.length;
    const maxYValue = Math.max(...dataPoints);

    this.maxYValue = outlierPercentage !== null
      ? Math.min(
          maxYValue,
          (meanValue * (outlierPercentage / 100)) + meanValue,
        )
      : maxYValue;

    this.yScale.domain([0, this.maxYValue]);

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={classNames.join(' ')}
        width={initialWidth}
        height={initialHeight}
        ref={(svg) => { this.svg = svg; }}
        {...rest}
      >
        <BpkBarchartDefs />
        <BpkChartMargin
          margin={margin}
        >
          <BpkChartAxis
            orientation={ORIENTATION_Y}
            width={this.state.width}
            height={this.state.height}
            margin={margin}
            scale={this.yScale}
            tickValue={yAxisTickValue}
            numTicks={yAxisNumTicks}
            label={yAxisLabel}
          />
          <BpkChartAxis
            orientation={ORIENTATION_X}
            width={this.state.width}
            height={this.state.height}
            margin={margin}
            scale={this.xScale}
            tickValue={xAxisTickValue}
            tickEvery={xAxisTickEvery}
            tickOffset={xAxisTickOffset}
            label={xAxisLabel}
          />
          { showGridlines && <BpkChartGridLines
            orientation={ORIENTATION_Y}
            height={this.state.height}
            margin={margin}
            scale={this.yScale}
            width={this.state.width}
          /> }
          <BpkBarchartBars
            height={this.state.height}
            margin={margin}
            data={transformedData}
            xScale={this.xScale}
            yScale={this.yScale}
            xScaleDataKey={xScaleDataKey}
            yScaleDataKey={yScaleDataKey}
            maxYValue={this.maxYValue}
            outerPadding={showGridlines ? undefined : 0}
          />
        </BpkChartMargin>
      </svg>
    );
  }
}

BpkBarchart.propTypes = {
  data: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  xScaleDataKey: PropTypes.string.isRequired,
  yScaleDataKey: PropTypes.string.isRequired,
  xAxisLabel: PropTypes.string.isRequired,
  yAxisLabel: PropTypes.string.isRequired,
  initialWidth: PropTypes.number.isRequired,
  initialHeight: PropTypes.number.isRequired,

  className: PropTypes.string,
  outlierPercentage: PropTypes.number,
  showGridlines: PropTypes.bool,
  xAxisMargin: PropTypes.number,
  xAxisTickValue: PropTypes.func,
  xAxisTickOffset: PropTypes.number,
  xAxisTickEvery: PropTypes.number,
  yAxisMargin: PropTypes.number,
  yAxisTickValue: PropTypes.func,
  yAxisNumTicks: PropTypes.number,
};

BpkBarchart.defaultProps = {
  className: null,
  outlierPercentage: null,
  showGridlines: false,
  xAxisMargin: 2 * (lineHeight + spacing),
  xAxisTickValue: identity,
  xAxisTickOffset: 0,
  xAxisTickEvery: 1,
  yAxisMargin: (4 * lineHeight) + spacing,
  yAxisTickValue: identity,
  yAxisNumTicks: null,
};

export default BpkBarchart;
