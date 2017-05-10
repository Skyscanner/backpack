import React from 'react';
import PropTypes from 'prop-types';

import contextTypes from './contextTypes';
import BpkBarchartAxis, { AXIS_TYPE_X } from './BpkBarchartAxis';

const BpkBarchartXAxis = (props, context) => {
  const { children, tickEvery, tickOffset, ...rest } = props;
  const { height, margin, xScaler } = context;

  const domain = xScaler.domain();
  const ticks = domain.filter((tick, i) => ((i - tickOffset) % tickEvery) === 0);

  return (
    <BpkBarchartAxis
      transform={`translate(0, ${height - margin.bottom - margin.top})`}
      textAnchor="middle"
      type={AXIS_TYPE_X}
      ticks={ticks}
      tickPosition={tick => [xScaler(tick) + (xScaler.bandwidth() / 2), 0]}
      textCoords={{
        y: 5,
        x: 0.5,
        dy: 0,
      }}
      {...rest}
    >
      {children}
    </BpkBarchartAxis>
  );
};

BpkBarchartXAxis.propTypes = {
  children: PropTypes.node,
  tickEvery: PropTypes.number,
  tickOffset: PropTypes.number,
  tickValue: PropTypes.func,
};

BpkBarchartXAxis.defaultProps = {
  children: null,
  tickEvery: 1,
  tickOffset: 0,
  tickValue: tick => tick,
};

BpkBarchartXAxis.contextTypes = contextTypes;

export default BpkBarchartXAxis;
