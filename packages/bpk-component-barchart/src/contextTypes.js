import { number, array, shape, func, string } from 'prop-types';

export default {
  width: number,
  height: number,
  data: array,
  maxYValue: number,
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
