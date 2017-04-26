import { PropTypes } from 'react';

const { number, array, shape, func, string } = PropTypes;

export default {
  width: number,
  height: number,
  data: array,
  maxYValue: PropTypes.number,
  margin: shape({
    top: number,
    bottom: number,
    left: number,
    right: number,
  }),
  xScaler: func,
  yScaler: func,
  xScaleDataKey: string,
  yScaleDataKey: string,
};
