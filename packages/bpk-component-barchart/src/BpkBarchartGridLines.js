import React from 'react';
import PropTypes from 'prop-types';

export const GRIDLINE_TYPE_X = 'x';
export const GRIDLINE_TYPE_Y = 'y';

const BpkBarchartYGridLines = (props) => {
  const { ticks, type, lineProps, ...rest } = props;

  const toLine = (tick, i) => (
    <line
      className={`bpk-barchart__grid-line bpk-barchart__grid-line--${type}`}
      key={`${type}gridline${i.toString()}`}
      {...lineProps(tick)}
      {...rest}
    />
  );

  return (
    <g className={`bpk-barchart__grid-lines bpk-barchart__grid-lines--${type}`}>
      {ticks.map(toLine)}
    </g>
  );
};

BpkBarchartYGridLines.propTypes = {
  type: PropTypes.oneOf([GRIDLINE_TYPE_X, GRIDLINE_TYPE_Y]).isRequired,
  ticks: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  lineProps: PropTypes.func.isRequired,
};

export default BpkBarchartYGridLines;
