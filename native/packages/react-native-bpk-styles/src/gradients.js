/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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
/* @flow */

/*
 * iOS 11
 *
 * With define: UIFontWeightSemibold: 0x3fd3333333333333
 * Without define: UIFontWeightSemibold: 0x3fd3333340000000
 *
 * iOS 10
 *
 * With define: UIFontWeightSemibold: 0x3fd3333333333333
 * Without define: UIFontWeightSemibold: 0x3fd3333340000000
 */

import { colorBlue500 } from 'bpk-tokens/tokens/base.react.native';

const ANGLES = {
  down: 'down',
  right: 'right',
  left: 'left',
  up: 'up',
  topLeft: 'topLeft',
  topRight: 'topRight',
  bottomLeft: 'bottomLeft',
  bottomRight: 'bottomRight',
};

type Angle = $Keys<typeof ANGLES>;

const ANGLES_TO_START_END = {
  [ANGLES.down]: {
    start: [0.5, 0.0],
    end: [0.5, 1.0],
  },
  [ANGLES.right]: {
    start: [0.0, 0.5],
    end: [1.0, 0.5],
  },
  [ANGLES.left]: {
    start: [1.0, 0.5],
    end: [0.0, 0.5],
  },
  [ANGLES.up]: {
    start: [0.5, 1.0],
    end: [0.5, 0.0],
  },
  [ANGLES.topLeft]: {
    start: [0.0, 0.0],
    end: [1.0, 1.0],
  },
  [ANGLES.topRight]: {
    start: [1.0, 0.0],
    end: [0.0, 1.0],
  },
  [ANGLES.bottomLeft]: {
    start: [0.0, 1.0],
    end: [1.0, 0.0],
  },
  [ANGLES.bottomRight]: {
    start: [1.0, 1.0],
    end: [0.0, 0.0],
  },
};

const gradientLight = '#02DDD8';

export const startAndEndFromAngle = (angle: Angle) =>
  Object.keys(ANGLES_TO_START_END).includes(angle)
    ? ANGLES_TO_START_END[angle]
    : ANGLES_TO_START_END[ANGLES.topLeft];

export default {
  primary: (angle: Angle = ANGLES.topLeft) => {
    const { start, end } = startAndEndFromAngle(angle);

    return {
      colors: [colorBlue500, gradientLight],
      start: { x: start[0], y: start[1] },
      end: { x: end[0], y: end[1] },
    };
  },
  ANGLES,
};
