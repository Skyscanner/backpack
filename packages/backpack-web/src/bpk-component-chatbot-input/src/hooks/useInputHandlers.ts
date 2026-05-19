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

import { useCallback, useRef } from 'react';
import type { ChangeEvent, ForwardedRef, MouseEvent, TouchEvent } from 'react';

const useInputHandlers = <T extends HTMLInputElement | HTMLTextAreaElement>(
  ref: ForwardedRef<T>,
  onInputChange: (value: string) => void,
  onInputClick: () => void,
) => {
  const touchStartTargetRef = useRef<EventTarget | null>(null);

  const handleInputChange = useCallback(
    (e: ChangeEvent<T>) => {
      onInputChange(e.target.value);
    },
    [onInputChange],
  );

  const handleInputClick = useCallback(
    (e: MouseEvent<T>) => {
      e.stopPropagation();
      if (
        ref &&
        typeof ref !== 'function' &&
        ref.current &&
        !ref.current.disabled
      ) {
        ref.current.focus();
        onInputClick();
      }
    },
    [onInputClick, ref],
  );

  const handleTouchStart = useCallback((e: TouchEvent<T>) => {
    e.stopPropagation();
    touchStartTargetRef.current = e.target;
  }, []);

  const handleTouchEnd = useCallback(
    (e: TouchEvent<T>) => {
      e.stopPropagation();
      if (touchStartTargetRef.current === e.target) {
        if (
          ref &&
          typeof ref !== 'function' &&
          ref.current &&
          !ref.current.disabled
        ) {
          e.preventDefault();
          ref.current.focus();
          onInputClick();
        }
      }
      touchStartTargetRef.current = null;
    },
    [onInputClick, ref],
  );

  return {
    handleInputChange,
    handleInputClick,
    handleTouchStart,
    handleTouchEnd,
  };
};

export default useInputHandlers;
