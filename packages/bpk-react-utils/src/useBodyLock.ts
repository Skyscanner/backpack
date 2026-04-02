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

import { useEffect, useRef } from 'react';

/**
 * Locks body scroll when the modal is open, preventing background scroll and
 * iOS Safari bounce effects. Restores all body styles and scroll position on
 * cleanup.
 * @param {boolean} isLocked - Whether the body scroll should be locked.
 * @returns {void}
 */
const useBodyLock = (isLocked: boolean) => {
  const savedScrollYRef = useRef<number>(0);
  const savedBodyStylesRef = useRef<{
    overflow: string;
    position: string;
    top: string;
    width: string;
    touchAction: string;
    overscrollBehavior: string;
  } | null>(null);

  useEffect(() => {
    if (!isLocked) {
      return undefined;
    }

    const { body } = document;
    const currentScrollY = window.scrollY;
    savedScrollYRef.current = currentScrollY;

    savedBodyStylesRef.current = {
      overflow: body.style.overflow || '',
      position: body.style.position || '',
      top: body.style.top || '',
      width: body.style.width || '',
      touchAction: body.style.touchAction || '',
      overscrollBehavior: body.style.overscrollBehavior || '',
    };

    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${currentScrollY}px`;
    body.style.width = '100%';
    body.style.touchAction = 'none';
    body.style.overscrollBehavior = 'contain';

    return () => {
      if (savedBodyStylesRef.current) {
        const saved = savedBodyStylesRef.current;
        body.style.overflow = saved.overflow;
        body.style.position = saved.position;
        body.style.top = saved.top;
        body.style.width = saved.width;
        body.style.touchAction = saved.touchAction;
        body.style.overscrollBehavior = saved.overscrollBehavior;
        savedBodyStylesRef.current = null;

        window.scrollTo(0, savedScrollYRef.current);
      }
    };
  }, [isLocked]);
};

export default useBodyLock;
