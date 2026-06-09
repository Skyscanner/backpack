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

/*
 * Based on a11y-focus-scope by CloudFlare, Inc.
 * https://github.com/cloudflare/a11y-focus-scope
 *
 * Copyright (c) 2015, CloudFlare, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * 3. Neither the name of the copyright holder nor the names of its
 *    contributors may be used to endorse or promote products derived from
 *    this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

import { tabbable } from 'tabbable';

let teardownFn: (() => void) | null = null;
let pausedElement: HTMLElement | null = null;

function focusElement(element: HTMLElement) {
  const firstTabbable = tabbable(element)[0];
  if (firstTabbable) {
    firstTabbable.focus();
  } else {
    if (!element.hasAttribute('tabindex')) {
      element.setAttribute('tabindex', '-1');
    }
    element.focus();
  }
}

// Registers the focusin listener that redirects focus back into element.
// Does NOT call focus() immediately — use init() when initial focus steal is needed.
function registerListener(element: HTMLElement): () => void {
  function onFocusIn(event: FocusEvent) {
    if (
      element !== event.target &&
      !element.contains(event.target as Node)
    ) {
      focusElement(element);
    }
  }

  document.addEventListener('focusin', onFocusIn);

  return function teardown() {
    document.removeEventListener('focusin', onFocusIn);
  };
}

function init(element: HTMLElement): () => void {
  focusElement(element);
  return registerListener(element);
}

const focusScope = {
  scopeFocus(element: HTMLElement) {
    if (teardownFn) teardownFn();
    pausedElement = element;
    teardownFn = init(element);
  },

  unscopeFocus() {
    if (teardownFn) teardownFn();
    teardownFn = null;
    pausedElement = null;
  },

  // Temporarily deactivates the active focusScope listener without discarding
  // the scoped element. Call resumeFocus() to re-register the listener.
  // Used by BpkModalV3 to prevent a focus loop when opened over a withScrim
  // component (e.g. BpkDrawer). To be removed when BpkDrawer migrates to ark-ui.
  pauseFocus() {
    if (teardownFn) {
      teardownFn();
      teardownFn = null;
    }
  },

  // Re-registers the focusin listener for the previously paused element
  // without stealing focus. This lets ark-ui's own focus-return logic run
  // first before the focusScope listener takes effect.
  resumeFocus() {
    if (pausedElement) {
      teardownFn = registerListener(pausedElement);
    }
  },
};

export default focusScope;
