import React from 'react';

const GRADIENT_ATTRIBUTES = {
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 1,
};

const BpkBarchartDefs = () => (
  <defs>
    <linearGradient
      id="bpk-barchart__def-gradient"
      {...GRADIENT_ATTRIBUTES}
    >
      <stop offset="0" stopColor="white" stopOpacity="0" />
      <stop offset="10%" stopColor="white" stopOpacity="1" />
    </linearGradient>
    <mask
      id="bpk-barchart__def-mask"
    >
      <rect x="0" y="0" width="100%" height="100%" fill="url(#bpk-barchart__def-gradient)" />
    </mask>
  </defs>
);

export default BpkBarchartDefs;
