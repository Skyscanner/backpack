import React, { PropTypes } from 'react';
import ContextTypes from './BpkBarchartContextTypes';

export const AXIS_TYPE_X = 'x';
export const AXIS_TYPE_Y = 'y';

const BpkBarchartAxis = ({
  type,
  ticks,
  tickValue,
  tickPosition,
  textCoords,
  children,
  ...rest
}) => (
  <g className={`bpk-barchart__axis bpk-barchart__axis--${type}`} {...rest}>
    {ticks.map((tick, i) => (
      <g
        className="bpk-barchart__axis-tick--group"
        transform={`translate(${tickPosition(tick).join(', ')})`}
        key={`${type}axis${i.toString()}`}
      >
        <text
          dominantBaseline={type === AXIS_TYPE_X ? 'hanging' : 'auto'}
          className="bpk-barchart__axis-tick--text"
          {...textCoords}
        >
          {tickValue(tick)}
        </text>
      </g>
    ))}
    {children}
  </g>
);

BpkBarchartAxis.propTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf([AXIS_TYPE_Y, AXIS_TYPE_X]).isRequired,
  ticks: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  tickValue: PropTypes.func.isRequired,
  tickPosition: PropTypes.func.isRequired,
  textCoords: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  label: PropTypes.string,
};

BpkBarchartAxis.defaultProps = {
  children: null,
  label: null,
};

BpkBarchartAxis.contextTypes = ContextTypes;

export default BpkBarchartAxis;
