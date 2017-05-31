import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import React, { Component } from 'react';
import { scaleLinear, scaleBand } from 'd3-scale';

import { identity } from './utils';

import './bpk-barchart.scss';
import propTypes from './propTypes';
import BpkBarchartDefs from './BpkBarchartDefs';
import BpkBarchartBars from './BpkBarchartBars';
import BpkChartMargin from './BpkChartMargin';
import BpkChartTitle from './BpkChartTitle';
import BpkChartAxis from './BpkChartAxis';
import BpkChartGridLines from './BpkChartGridLines';

import { applyArrayRTLTransform, applyDirectionalRTLTransform } from './RTLtransforms';
import { ORIENTATION_X, ORIENTATION_Y } from './orientation';

class BpkBarchart extends Component {
  constructor() {
    super();

    this.state = {
      width: 0,
      height: 0,
    };

    this.updateDimensions = this.updateDimensions.bind(this);

    this.maxYValue = null;
    this.xScale = scaleBand();
    this.yScale = scaleLinear();
    this.transformedData = null;
    this.onWindowResize = debounce(this.updateDimensions, 100);
  }

  componentWillMount() {
    this.setState({
      width: Number(this.props.width),
      height: Number(this.props.height),
    });
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
      children,
      data,
      margin,
      xScaleDataKey,
      yScaleDataKey,
      outlierPercentage,
      showGridlines,
      title,

      xAxisLabel,
      xAxisTickValue,
      xAxisTickOffset,
      xAxisTickEvery,

      yAxisLabel,
      yAxisTickValue,
      yAxisNumTicks,
      ...rest
    } = this.props;

    this.transformedData = applyArrayRTLTransform(data);
    this.transformedMargin = applyDirectionalRTLTransform(margin);

    const { transformedData, transformedMargin, xScale, yScale } = this;
    const width = this.state.width - transformedMargin.left - transformedMargin.right;
    const height = this.state.height - transformedMargin.top - transformedMargin.bottom;

    xScale.rangeRound([0, width]);
    xScale.domain(transformedData.map(d => d[xScaleDataKey]));
    yScale.rangeRound([height, 0]);

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

    yScale.domain([0, this.maxYValue]);

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="bpk-barchart"
        ref={(svg) => { this.svg = svg; }}
        {...rest}
      >
        <BpkBarchartDefs />
        <BpkChartMargin
          margin={transformedMargin}
        >
          <BpkChartAxis
            orientation={ORIENTATION_Y}
            width={this.state.width}
            height={this.state.height}
            margin={transformedMargin}
            scale={yScale}
            tickValue={yAxisTickValue}
            numTicks={yAxisNumTicks}
            label={yAxisLabel}
          />
          <BpkChartAxis
            orientation={ORIENTATION_X}
            width={this.state.width}
            height={this.state.height}
            margin={transformedMargin}
            scale={xScale}
            tickValue={xAxisTickValue}
            tickEvery={xAxisTickEvery}
            tickOffset={xAxisTickOffset}
            label={xAxisLabel}
          />
          { showGridlines && <BpkChartGridLines
            orientation={ORIENTATION_Y}
            height={this.state.height}
            margin={margin}
            scale={yScale}
            width={this.state.width}
          /> }
          <BpkBarchartBars
            height={this.state.height}
            margin={transformedMargin}
            data={transformedData}
            xScale={xScale}
            yScale={yScale}
            xScaleDataKey={xScaleDataKey}
            yScaleDataKey={yScaleDataKey}
            maxYValue={this.maxYValue}
          />
          { title &&
            <BpkChartTitle
              margin={transformedMargin}
              data={transformedData}
              width={width}
              xScale={xScale}
              xScaleDataKey={xScaleDataKey}
            >{ title }</BpkChartTitle> }
        </BpkChartMargin>
      </svg>
    );
  }
}

BpkBarchart.propTypes = {
  showGridlines: PropTypes.bool,

  xAxisLabel: PropTypes.string,
  xAxisTickValue: PropTypes.func,
  xAxisTickOffset: PropTypes.number,
  xAxisTickEvery: PropTypes.number,

  yAxisNumTicks: PropTypes.number,
  yAxisLabel: PropTypes.string,
  yAxisTickValue: PropTypes.func,
};

BpkBarchart.defaultProps = {
  width: null,
  height: null,
  outlierPercentage: null,
  margin: {
    top: 5,
    right: 20,
    bottom: 20,
    left: 60,
  },
  showGridlines: false,

  xAxisLabel: null,
  xAxisTickValue: identity,
  xAxisTickOffset: 0,
  xAxisTickEvery: 1,

  yAxisNumTicks: null,
  yAxisLabel: null,
  yAxisTickValue: identity,
};

export default BpkBarchart;
