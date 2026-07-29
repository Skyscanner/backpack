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

import { type FocusEvent, useCallback, useEffect, useRef } from 'react';

// Suppresses the focus ring when focus is returned to a menu trigger
// programmatically after a pointer-initiated close, while preserving
// the ring for genuine keyboard navigation (Tab).
//
// Sets data-pointer-focus on the trigger element when focus is
// pointer-initiated or returns from inside the menu. CSS uses this
// attribute to opt out of :focus-visible.
const useMenuTriggerFocusGuard = () => {
  const isPointerRef = useRef(false);

  useEffect(() => {
    const onPointerDown = () => {
      isPointerRef.current = true;
    };
    // Only Tab (inter-element navigation) switches to keyboard mode.
    // Arrow keys, Enter, Space, Escape are intra-widget and should not
    // override a pointer-initiated session.
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') isPointerRef.current = false;
    };
    document.addEventListener('pointerdown', onPointerDown, true);
    document.addEventListener('keydown', onKeyDown, true);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown, true);
      document.removeEventListener('keydown', onKeyDown, true);
    };
  }, []);

  const onFocus = useCallback((e: FocusEvent<HTMLElement>) => {
    const relatedTarget = e.relatedTarget as Element | null;
    const fromMenu = relatedTarget?.closest('[role="menu"]') != null;
    if (isPointerRef.current || fromMenu) {
      e.currentTarget.setAttribute('data-pointer-focus', '');
    }
  }, []);

  const onBlur = useCallback((e: FocusEvent<HTMLElement>) => {
    e.currentTarget.removeAttribute('data-pointer-focus');
  }, []);

  return { onFocus, onBlur };
};

export default useMenuTriggerFocusGuard;
