/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* @flow strict */

import React from 'react';

const GRADIENT_ATTRIBUTES = {
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 1,
};

const BpkBarchartDefs = () => (
  <defs>
    <linearGradient id="bpk-barchart__def-gradient" {...GRADIENT_ATTRIBUTES}>
      <stop offset="0" stopColor="white" stopOpacity="0" />
      <stop offset="10%" stopColor="white" stopOpacity="1" />
    </linearGradient>
    <mask id="bpk-barchart__def-mask">
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill="url(#bpk-barchart__def-gradient)"
      />
    </mask>
  </defs>
);

export default BpkBarchartDefs;
