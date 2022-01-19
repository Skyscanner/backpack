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

const DIRECTIONS = {
  LTR: 'ltr',
  RTL: 'rtl',
};

const DIRECTION_CHANGE_EVENT = 'bpkchangedirection';

const getHtmlElement = () =>
  typeof document !== 'undefined' ? document.querySelector('html') : {};

export { DIRECTIONS, DIRECTION_CHANGE_EVENT, getHtmlElement };
