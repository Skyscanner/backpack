import PropTypes from 'prop-types';
import React from 'react';
import { cssModules } from 'bpk-react-utils';

import STYLES from './color-swatch.scss';

const getClassName = cssModules(STYLES);

const ColorSwatch = (props) => {
  const style = {
    backgroundColor: props.color,
    backgroundImage: props.gradient,
  };

  const classNames = [getClassName('bpkdocs-color-swatch')];

  if (props.whiteColor) { classNames.push(getClassName('bpkdocs-color-swatch--light')); }
  if (props.border) { classNames.push(getClassName('bpkdocs-color-swatch--border')); }

  return <div style={style} className={classNames.join(' ')}>{props.name}</div>;
};

ColorSwatch.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  whiteColor: PropTypes.bool,
  border: PropTypes.bool,
  gradient: PropTypes.string,
};

ColorSwatch.defaultProps = {
  color: null,
  whiteColor: false,
  border: false,
  gradient: null,
};

export default ColorSwatch;
