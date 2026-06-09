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

// When a higher-priority overlay (e.g. BpkModalV3) is open, legacy Portal
// components (used by BpkDrawer, BpkModal, BpkDialog) should not respond to
// document click or keydown events — otherwise they start their close animation
// simultaneously with the overlay, causing a visible flash.
//
// A counter (not a boolean) is used so that nested BpkModalV3 instances each
// hold their own lock: opening a second modal increments to 2, closing it
// decrements back to 1, and the first modal's lock is still active.
//
// TODO: CLOV-1643 Remove once BpkDrawer, BpkModal, and BpkDialog are deprecated.

let lockCount = 0;

const portalLock = {
  lock() {
    lockCount += 1;
  },
  unlock() {
    if (lockCount > 0) {
      lockCount -= 1;
    }
  },
  isLocked() {
    return lockCount > 0;
  },
  // Exposed for testing only — do not use in production code.
  resetForTesting() {
    lockCount = 0;
  },
};

export default portalLock;
