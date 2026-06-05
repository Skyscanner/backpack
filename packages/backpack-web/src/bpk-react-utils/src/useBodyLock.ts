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

import { useEffect } from 'react';

interface SavedBodyState {
  overflow: string;
  position: string;
  top: string;
  width: string;
  touchAction: string;
  overscrollBehavior: string;
}

// Module-level shared state for reference counting across concurrent callers
let lockCount = 0;
let savedBodyStyles: SavedBodyState | null = null;
let savedScrollY = 0;

/**
 * Locks body scroll when the modal is open, preventing background scroll and
 * iOS Safari bounce effects. Restores all body styles and scroll position on
 * cleanup.
 *
 * Uses reference counting so multiple concurrent callers (e.g. Modal + BottomSheet)
 * coordinate correctly: styles are locked on the first caller and only restored
 * when the last caller unlocks.
 *
 * @param {boolean} isLocked - Whether the body scroll should be locked.
 * @returns {void}
 */
const useBodyLock = (isLocked: boolean) => {
  useEffect(() => {
    if (!isLocked) {
      return undefined;
    }

    const { body } = document;

    if (lockCount === 0) {
      savedScrollY = window.scrollY;
      savedBodyStyles = {
        overflow: body.style.overflow || '',
        position: body.style.position || '',
        top: body.style.top || '',
        width: body.style.width || '',
        touchAction: body.style.touchAction || '',
        overscrollBehavior: body.style.overscrollBehavior || '',
      };

      body.style.overflow = 'hidden';
      body.style.position = 'fixed';
      body.style.top = `-${savedScrollY}px`;
      body.style.width = '100%';
      body.style.touchAction = 'none';
      body.style.overscrollBehavior = 'contain';
    }
    lockCount += 1;

    return () => {
      lockCount -= 1;
      if (lockCount === 0 && savedBodyStyles) {
        const saved = savedBodyStyles;
        body.style.overflow = saved.overflow;
        body.style.position = saved.position;
        body.style.top = saved.top;
        body.style.width = saved.width;
        body.style.touchAction = saved.touchAction;
        body.style.overscrollBehavior = saved.overscrollBehavior;
        savedBodyStyles = null;

        window.scrollTo(0, savedScrollY);
      }
    };
  }, [isLocked]);
};

export default useBodyLock;
