import React from 'react';

import {
  colorBlue300,
  colorBlue500,
  colorWhite,
} from 'bpk-tokens/tokens/base.es6';

const GRADIENT_ATTRIBUTES = {
  x1: 0,
  x2: 0,
  y1: 0,
  y2: 1,
};

const BpkBarchartDefs = () => (
  <defs>
    <linearGradient
      id="bpk-barchart__def-gradient"
      {...GRADIENT_ATTRIBUTES}
    >
      <stop offset="0%" stopColor={colorWhite} />
      <stop offset="10%" stopColor={colorBlue300} />
    </linearGradient>
    <linearGradient
      id="bpk-barchart__def-gradient-hover"
      {...GRADIENT_ATTRIBUTES}
    >
      <stop offset="0%" stopColor={colorWhite} />
      <stop offset="10%" stopColor={colorBlue500} />
    </linearGradient>
  </defs>
);

export default BpkBarchartDefs;
