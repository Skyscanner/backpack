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
/* @flow strict */

// eslint-disable-next-line import/prefer-default-export
export const hasClassName = (
  eventTarget: EventTarget,
  className: ?string,
): boolean => {
  if (!eventTarget) {
    return false;
  }

  /* Flow does not work well with EventTarget type, but we need to use it in this case, because we need
   * event propagation; the eventHadler is placed on the outer Header element, but we want to know when a
   * click has happened on the inner 'arrowUp' or 'arrowDown' icons, in order to apply the correct sortDirection.
   */
  // $FlowFixMe[prop-missing] - see above
  const nodeClassName = eventTarget.getAttribute('class');
  return (
    nodeClassName != null && nodeClassName.split(' ').indexOf(className) !== -1
  );
};
