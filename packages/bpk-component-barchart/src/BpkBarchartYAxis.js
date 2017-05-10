import React from 'react';
import PropTypes from 'prop-types';

import { isRTL } from './RTLtransforms';
import contextTypes from './contextTypes';
import BpkBarchartAxis, { AXIS_TYPE_Y } from './BpkBarchartAxis';

const BpkBarchartYAxis = (props, context) => {
  const { ticks, children, ...rest } = props;
  const { data, yScaler, xScaler, xScaleDataKey } = context;

  let x = 0;

  if (isRTL()) {
    const dataPoint = data[data.length - 1][xScaleDataKey];
    const padding = xScaler.bandwidth() * xScaler.padding();
    x = xScaler(dataPoint) + xScaler.bandwidth() + (padding * 2);
  }

  return (
    <BpkBarchartAxis
      transform={`translate(${x}, 0)`}
      textAnchor="end"
      type={AXIS_TYPE_Y}
      ticks={yScaler.ticks(ticks)}
      tickPosition={tick => [0, yScaler(tick)]}
      textCoords={{
        y: 0,
        x: -5,
        dy: '0.32em',
      }}
      {...rest}
    >
      {children}
    </BpkBarchartAxis>
  );
};

BpkBarchartYAxis.propTypes = {
  ticks: PropTypes.number,
  children: PropTypes.node,
  tickValue: PropTypes.func,
};

BpkBarchartYAxis.defaultProps = {
  ticks: null,
  children: null,
  tickValue: tick => tick,
};

BpkBarchartYAxis.contextTypes = contextTypes;

export default BpkBarchartYAxis;
