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
export const hasClassName = (node: ?Element, className: ?string): boolean => {
  if (node == null) {
    return false;
  }

  const nodeClassName = node.getAttribute('class');
  return (
    nodeClassName != null && nodeClassName.split(' ').indexOf(className) !== -1
  );
};
