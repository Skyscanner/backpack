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

import './index.scss';

(() => {
  if (typeof document === 'undefined') {
    return;
  }

  const classNames = [];

  // touch support
  classNames.push(
    'ontouchstart' in window ||
      (window.DocumentTouch && document instanceof DocumentTouch) // eslint-disable-line no-undef
      ? 'touch-support'
      : 'no-touch-support',
  );

  // add more feature tests here...


  document.documentElement.className += ` ${classNames
    .map((className) => `bpk-${className}`)
    .join(' ')}`;
})();
