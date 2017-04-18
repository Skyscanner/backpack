import React, { Component, PropTypes } from 'react';
import { axisLeft } from 'd3-axis';
import { select } from 'd3-selection';
import ContextTypes from './ContextTypes';

class BpkBarchartYAxis extends Component {
  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    const axis = axisLeft(this.context.yScaler).ticks(this.props.ticks);
    select(this.axis).call(axis);
  }

  render() {
    const { ticks, disableLine, ...rest } = this.props;
    const classNames = ['bpk-barchart__axis', 'bpk-barchart__axis--y'];
    if (disableLine) {
      classNames.push('bpk-barchart__axis--disable-line');
    }
    return (
      <g
        className={classNames.join(' ')}
        ref={(axis) => {
          this.axis = axis;
        }}
        {...rest}
      />
    );
  }
}

BpkBarchartYAxis.propTypes = {
  ticks: PropTypes.number,
  disableLine: PropTypes.bool,
};

BpkBarchartYAxis.defaultProps = {
  ticks: null,
  disableLine: false,
};

const { yScaler } = ContextTypes;

BpkBarchartYAxis.contextTypes = {
  yScaler,
};

export default BpkBarchartYAxis;
