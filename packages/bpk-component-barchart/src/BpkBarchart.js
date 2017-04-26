import React, { Component, PropTypes } from 'react';

import scaleBand from 'd3-scale/src/band';
import scaleLinear from 'd3-scale/src/linear';
import debounce from 'lodash.debounce';
import BpkBarchartMargin from './BpkBarchartMargin';
import BpkBarchartDefs from './BpkBarchartDefs';
import BpkBarchartContextTypes from './BpkBarchartContextTypes';
import { applyArrayRTLTransform, applyDirectionalRTLTransform } from './RTLtransforms';

import './bpk-barchart.scss';

class BpkBarchart extends Component {
  constructor() {
    super();
    this.state = {
      width: 0,
      height: 0,
    };
    this.maxYValue = null;
    this.transformedData = null;
    this.onWindowResize = debounce(this.updateDimensions.bind(this), 100);
    this.xScaler = scaleBand();
    this.yScaler = scaleLinear();
  }

  getChildContext() {
    const { yScaleDataKey, xScaleDataKey } = this.props;
    const { width, height } = this.state;
    const { xScaler, yScaler, maxYValue, transformedData, transformedMargin } = this;
    return {
      width,
      height,
      data: transformedData,
      margin: transformedMargin,
      yScaleDataKey,
      xScaleDataKey,
      xScaler,
      yScaler,
      maxYValue,
    };
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
    if (this.svg) {
      const { width, height } = this.svg.getBoundingClientRect();
      this.setState({
        width,
        height,
      });
    }
  }

  render() {
    const {
      children,
      data,
      margin,
      xScaleDataKey,
      yScaleDataKey,
      outlierPercentage,
      ...rest
    } = this.props;

    this.transformedData = applyArrayRTLTransform(data);
    this.transformedMargin = applyDirectionalRTLTransform(margin);

    const { transformedData, transformedMargin, xScaler, yScaler } = this;
    const width = this.state.width - transformedMargin.left - transformedMargin.right;
    const height = this.state.height - transformedMargin.top - transformedMargin.bottom;

    xScaler.rangeRound([0, width]);
    xScaler.domain(transformedData.map(d => d[xScaleDataKey]));
    yScaler.rangeRound([height, 0]);

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

    yScaler.domain([0, this.maxYValue]);

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="bpk-barchart"
        ref={(svg) => {
          this.svg = svg;
        }}
        {...rest}
      >
        <BpkBarchartDefs />
        <BpkBarchartMargin>
          {children}
        </BpkBarchartMargin>
      </svg>
    );
  }
}

BpkBarchart.propTypes = {
  children: PropTypes.node.isRequired,
  ...BpkBarchartContextTypes,
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
};

BpkBarchart.childContextTypes = BpkBarchartContextTypes;

export default BpkBarchart;
