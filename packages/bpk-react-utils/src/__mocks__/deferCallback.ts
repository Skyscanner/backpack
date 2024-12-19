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

/**
 * Mock deferCallback to immediately invoke the callback. This ensures that
 * asynchronous state updates triggered by `deferCallback` run before asserting.
 * https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback
 * @param {function} callback - callback to execute, value cannot be returned.
 * You'll typically want to wrap the callback `setState` to update React state.
 * @returns {void}
 */
export default function deferCallback(callback: () => void) {
  callback();
}
