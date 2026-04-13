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

import { tabbable } from 'tabbable';

let teardownFn: (() => void) | null = null;

function init(element: HTMLElement): () => void {
  function focus() {
    const firstTabbable = tabbable(element)[0];
    (firstTabbable || element).focus();
  }

  function onFocusIn(event: FocusEvent) {
    if (
      element !== event.target &&
      !element.contains(event.target as Node)
    ) {
      focus();
    }
  }

  focus();

  document.addEventListener('focusin', onFocusIn);

  return function teardown() {
    document.removeEventListener('focusin', onFocusIn);
  };
}

const focusScope = {
  scopeFocus(element: HTMLElement) {
    if (teardownFn) teardownFn();
    teardownFn = init(element);
  },

  unscopeFocus() {
    if (teardownFn) teardownFn();
    teardownFn = null;
  },
};

export default focusScope;
