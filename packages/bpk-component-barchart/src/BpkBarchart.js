import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import React, { Component } from 'react';
import scaleBand from 'd3-scale/src/band';
import scaleLinear from 'd3-scale/src/linear';

import './bpk-barchart.scss';
import contextTypes from './contextTypes';
import BpkBarchartDefs from './BpkBarchartDefs';
import BpkBarchartMargin from './BpkBarchartMargin';
import { applyArrayRTLTransform, applyDirectionalRTLTransform } from './RTLtransforms';

class BpkBarchart extends Component {
  constructor() {
    super();

    this.state = {
      width: 0,
      height: 0,
    };

    this.updateDimensions = this.updateDimensions.bind(this);

    this.maxYValue = null;
    this.xScaler = scaleBand();
    this.yScaler = scaleLinear();
    this.transformedData = null;
    this.onWindowResize = debounce(this.updateDimensions, 100);
  }

  getChildContext() {
    const { yScaleDataKey, xScaleDataKey } = this.props;
    const { width, height } = this.state;
    const { xScaler, yScaler, maxYValue, transformedData, transformedMargin } = this;

    return {
      // props
      yScaleDataKey,
      xScaleDataKey,

      // state
      width,
      height,

      // this
      xScaler,
      yScaler,
      maxYValue,
      data: transformedData,
      margin: transformedMargin,
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
        ref={(svg) => { this.svg = svg; }}
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
  ...contextTypes,
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

BpkBarchart.childContextTypes = contextTypes;

export default BpkBarchart;
