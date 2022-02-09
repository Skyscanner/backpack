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

// This code is based on that from `a11y-focus-scope`.
// Instead of completely preventing focus leaving the target element,
// it only prevents it leaving due to keyboard events.
// Clicks outside the target element will move focus as normal.

import tabbable from 'tabbable';
import focusin from 'focusin';

let polyfilled = false;
let focusTrapped = false;

const init = (element) => {
  // lazily polyfill focusin for firefox
  if (!polyfilled) {
    focusin.polyfill();
    polyfilled = true;
  }

  const focus = () => {
    (tabbable(element)[0] || element).focus();
  };

  const enableFocusTrapping = () => {
    focusTrapped = true;
  };

  const disableFocusTrapping = () => {
    focusTrapped = false;
  };

  const checkFocus = (event) => {
    if (!focusTrapped) {
      return;
    }

    if (element !== event.target && !element.contains(event.target)) {
      focus();
    }
  };

  focus();

  // As we only want to trap focus for keyboard navigation, we enable focus trapping on keydown and disable it again on keyup.
  // This means that focus is trapped when pressing the tab key, but not trapped for other navigation events such as mouse clicks.
  document.addEventListener('keydown', enableFocusTrapping);
  document.addEventListener('focusin', checkFocus);
  document.addEventListener('keyup', disableFocusTrapping);

  return () => {
    document.removeEventListener('keydown', enableFocusTrapping);
    document.removeEventListener('focusin', checkFocus);
    document.removeEventListener('keyup', disableFocusTrapping);
  };
};

let teardownFn;

const scopeFocus = (element) => {
  if (teardownFn) teardownFn();
  teardownFn = init(element);
};

const unscopeFocus = () => {
  if (teardownFn) teardownFn();
  teardownFn = null;
};

export default { scopeFocus, unscopeFocus };
