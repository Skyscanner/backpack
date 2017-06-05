import React from 'react';
import PropTypes from 'prop-types';
import { spacingXs, lineHeightSm } from 'bpk-tokens/tokens/base.es6';
import { rtlConditionalValue } from './RTLtransforms';
import { ORIENTATION_X, ORIENTATION_Y } from './orientation';
import { identity, center, remToPx } from './utils';
import './bpk-chart.scss';

const spacing = remToPx(spacingXs);
const lineHeight = remToPx(lineHeightSm);

const getAxisConfig = ({ orientation, margin, height, width, scale }) => {
  const position = (scale.bandwidth ? center : identity)(scale.copy());

  if (orientation === ORIENTATION_X) {
    return {
      containerProps: {
        textAnchor: 'middle',
        transform: `translate(0, ${height - margin.bottom - margin.top})`,
      },
      textProps: {
        y: lineHeight,
        x: 0,
      },
      labelProps: {
        x: (width - margin.left - margin.right) / 2,
        y: margin.bottom - spacing,
      },
      tickPosition: tick => [position(tick), 0],
    };
  }

  const x = rtlConditionalValue(0, width - margin.right);
  const translateX = rtlConditionalValue(lineHeight - margin.left, margin.right - spacing);
  const translateY = (height - margin.top - margin.bottom) / 2;

  return {
    containerProps: {
      textAnchor: 'end',
      transform: `translate(${x}, 0)`,
    },
    textProps: {
      y: 0,
      x: rtlConditionalValue(-1, 1) * spacing,
      dy: '0.32em',
    },
    labelProps: {
      transform: `translate(${translateX}, ${translateY}) rotate(-90)`,
    },
    tickPosition: tick => [0, position(tick)],
  };
};

const BpkChartAxis = (props) => {
  const {
    orientation,
    numTicks,
    tickValue,
    tickOffset,
    height,
    width,
    margin,
    scale,
    tickEvery,
    label,
    ...rest
  } = props;

  const { textProps, tickPosition, containerProps, labelProps } = getAxisConfig(props);

  const ticks = scale.ticks ?
    scale.ticks(numTicks) :
    scale.domain().filter((tick, i) => ((i - tickOffset) % tickEvery) === 0);

  return (
    <g
      className={`bpk-barchart__axis bpk-barchart__axis--${orientation}`}
      {...containerProps}
      {...rest}
    >
      {ticks.map((tick, i) => (
        <g
          className="bpk-barchart__axis-tick--group"
          transform={`translate(${tickPosition(tick).join(', ')})`}
          key={`${orientation}axis${i.toString()}`}
        >
          <text
            className="bpk-barchart__axis-tick--text"
            {...textProps}
          >
            {tickValue(tick, i)}
          </text>
        </g>
      ))}
      { label && <text
        className={`bpk-barchart__axis-label bpk-barchart__axis-label--${orientation}`}
        textAnchor="middle"
        {...labelProps}
      >{ label }</text> }
    </g>
  );
};

BpkChartAxis.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  margin: PropTypes.shape({
    top: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
  }).isRequired,
  scale: PropTypes.func.isRequired,
  label: PropTypes.node,

  orientation: PropTypes.oneOf([ORIENTATION_X, ORIENTATION_Y]).isRequired,
  tickValue: PropTypes.func,
  numTicks: PropTypes.number,
  tickOffset: PropTypes.number,
  tickEvery: PropTypes.number,
};

BpkChartAxis.defaultProps = {
  children: null,
  tickOffset: 0,
  tickEvery: 1,
  tickValue: identity,
  numTicks: null,
  label: null,
};

export default BpkChartAxis;
