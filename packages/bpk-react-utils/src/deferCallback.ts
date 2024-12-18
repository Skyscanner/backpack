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
 * Defer a task until the browser is idle, or till the next "tick" if the
 * browser does not support the idle callback API. This is useful for deferring
 * computationally heavy, non-essential tasks to keep the UI responsive. If the
 * task has not completed within the timeout, it will be executed regardless.
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback
 * @param {function} callback - callback to execute, value cannot be returned.
 * You'll typically want to wrap the callback `setState` to update React state.
 * @returns {void}
 */
const deferCallback = (callback: () => void) => {
  if (window.requestIdleCallback) {
    window.requestIdleCallback(callback, { timeout: 1000 });
  } else {
    setTimeout(callback, 0);
  }
};

export default deferCallback;
