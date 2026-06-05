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

type Props = {
  xScaleDataKey: string,
  yScaleDataKey: string,
};

export default (props: Props, propName: string, componentName: string) => {
  const { xScaleDataKey, yScaleDataKey } = props;
  const data = props[propName];
  if (!Array.isArray(data)) {
    return new Error(
      `Invalid prop ${propName} supplied to ${componentName}. Should be an array`,
    );
  }

  for (let i = 0; i < data.length; i += 1) {
    const object = data[i];
    const valid =
      Object.prototype.hasOwnProperty.call(object, xScaleDataKey) &&
      Object.prototype.hasOwnProperty.call(object, yScaleDataKey);
    if (!valid) {
      return new Error(
        `Invalid prop ${propName} supplied to ${componentName}.` +
          `Value ${JSON.stringify(
            object,
          )} should contain keys '${xScaleDataKey}' and '${yScaleDataKey}'`,
      );
    }
  }

  return null;
};
