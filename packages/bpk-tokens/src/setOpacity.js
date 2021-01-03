/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
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
  // IE11 doesn't support `Number.isNaN` so we must use the global.
  // When IE11 support drops we can migrate.
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(parseFloat(opacity))) {
    throw new Error(
      `Invalid arg \`opacity\` of type \`${typeof opacity}\` supplied to \`setOpacity\`, expected a numeric value between 0.0 and 1.0.`,
    );
  } else if (opacity > 1.0 || opacity < 0.0) {
    throw new Error(
      `Invalid arg \`opacity\` of value \`${opacity}\` supplied to \`setOpacity\`, expected a value between 0.0 and 1.0.`,
    );
  }
  return new Color(colorToken).alpha(opacity).string();
};

export default setOpacity;
