import React from 'react';
import PropTypes from 'prop-types';
import propTypes from './propTypes';
import { isRTL } from './RTLtransforms';
import { ORIENTATION_X, ORIENTATION_Y } from './orientation';

const BpkChartAxisLabel = (props) => {
  const { children, orientation, className, height, width, margin, ...rest } = props;
  const classNames = [`bpk-barchart__axis-label bpk-barchart__axis-label--${orientation}`];

  const leftOffset = 0;
  const rightOffset = 20;

  const labelProps = {};
  if (orientation === ORIENTATION_X) {
    labelProps.dominantBaseline = 'text-before-edge';
    labelProps.x = (width - margin.left - margin.right) / 2;
    labelProps.y = margin.bottom;
  } else {
    labelProps.dominantBaseline = 'hanging';
    const translateX = isRTL() ? margin.right - rightOffset : -margin.left + leftOffset;
    const translateY = (height - margin.top - margin.bottom) / 2;
    labelProps.transform = `translate(${translateX}, ${translateY}) rotate(-90)`;
  }

  if (className) { classNames.push(className); }

  return (
    <text
      className={classNames.join(' ')}
      textAnchor="middle"
      {...labelProps}
      {...rest}
    >
      {children}
    </text>
  );
};

BpkChartAxisLabel.propTypes = {
  width: propTypes.width.isRequired,
  height: propTypes.height.isRequired,
  margin: propTypes.margin.isRequired,

  children: PropTypes.node.isRequired,
  orientation: PropTypes.oneOf([ORIENTATION_X, ORIENTATION_Y]).isRequired,
  className: PropTypes.string,
};

BpkChartAxisLabel.defaultProps = {
  className: null,
};

export default BpkChartAxisLabel;
