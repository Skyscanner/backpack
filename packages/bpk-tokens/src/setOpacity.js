/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2020 Skyscanner Ltd
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

import Color from 'color';

const setOpacity = (colorToken, opacity) => {
  if (!parseFloat(opacity)) {
    // eslint-disable-next-line max-len
    throw new Error(
      `Invalid arg \`opacity\` of type \`${typeof opacity}\` supplied to \`setOpacity\`, expected a numeric value between 0.0 and 1.0.`,
    );
  } else if (opacity > 1.0 || opacity < 0.0) {
    // eslint-disable-next-line max-len
    throw new Error(
      `Invalid arg \`opacity\` of value \`${opacity}\` supplied to \`setOpacity\`, expected a value between 0.0 and 1.0.`,
    );
  }
  return new Color(colorToken).alpha(opacity).string();
};

export default setOpacity;
