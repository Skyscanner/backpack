import React, { Component, PropTypes } from 'react';
import { axisBottom } from 'd3-axis';
import { select } from 'd3-selection';
import ContextTypes from './ContextTypes';

class BpkBarchartXAxis extends Component {
  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    const axis = axisBottom(this.context.xScaler);
    select(this.axis).call(axis);
  }

  render() {
    const { height, margin } = this.context;
    const { top, bottom } = margin;
    const { disableLine, ...rest } = this.props;
    const axisHeight = height - top - bottom;
    const classNames = ['bpk-barchart__axis', 'bpk-barchart__axis--x'];
    if (disableLine) {
      classNames.push('bpk-barchart__axis--disable-line');
    }
    return (
      <g
        className={classNames.join(' ')}
        ref={(axis) => {
          this.axis = axis;
        }}
        transform={`translate(0, ${axisHeight})`}
        {...rest}
      />
    );
  }
}

BpkBarchartXAxis.propTypes = {
  disableLine: PropTypes.bool,
};

BpkBarchartXAxis.defaultProps = {
  disableLine: false,
};

BpkBarchartXAxis.contextTypes = ContextTypes;

export default BpkBarchartXAxis;
