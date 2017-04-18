import { PropTypes } from 'react';

export default {
  width: PropTypes.number,
  height: PropTypes.number,
  data: PropTypes.array,
  margin: PropTypes.shape({
    top: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
  }),
  xScaler: PropTypes.func,
  yScaler: PropTypes.func,
  xScaleDataKey: PropTypes.string,
  yScaleDataKey: PropTypes.string,
};
