import React, { Component, PropTypes } from 'react';
import { scaleBand, scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import debounce from 'lodash.debounce';
import ContextTypes from './ContextTypes';

import './bpk-barchart.scss';

class BpkBarchart extends Component {
  constructor() {
    super();
    this.state = {
      width: 0,
      height: 0,
    };
    this.onWindowResize = debounce(this.updateDimensions.bind(this), 100);
    this.xScaler = scaleBand();
    this.yScaler = scaleLinear();
  }

  getChildContext() {
    const { data, margin, yScaleDataKey, xScaleDataKey } = this.props;
    const { width, height } = this.state;
    const { xScaler, yScaler } = this;
    return {
      width,
      height,
      data,
      margin,
      yScaleDataKey,
      xScaleDataKey,
      xScaler,
      yScaler,
    };
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.onWindowResize);
  }

  componentDidUpdate() {
    this.updateDimensions();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  }

  updateDimensions() {
    const { clientWidth, clientHeight } = this.svg;
    const { width, height } = this.state;
    const dimensionsChanged = clientWidth !== width || clientHeight !== height;
    if (dimensionsChanged) {
      this.setState({
        width: clientWidth,
        height: clientHeight,
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
      ...rest
    } = this.props;

    const width = this.state.width - margin.left - margin.right;
    const height = this.state.height - margin.top - margin.bottom;

    this.xScaler.rangeRound([0, width]);
    this.xScaler.domain(data.map(d => d[xScaleDataKey]));

    this.yScaler.rangeRound([height, 0]);
    this.yScaler.domain([0, max(data, d => d[yScaleDataKey])]);

    return (
      <svg
        className="bpk-barchart"
        ref={(svg) => {
          this.svg = svg;
        }}
        {...rest}
      >
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {this.props.children}
        </g>
      </svg>
    );
  }
}

BpkBarchart.propTypes = {
  children: PropTypes.node.isRequired,
  margin: PropTypes.shape({
    top: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
  }),
  data: React.PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  xScaleDataKey: PropTypes.string.isRequired,
  yScaleDataKey: PropTypes.string.isRequired,
};

BpkBarchart.defaultProps = {
  margin: {
    top: 5,
    right: 30,
    bottom: 30,
    left: 30,
  },
};

BpkBarchart.childContextTypes = ContextTypes;

export default BpkBarchart;
