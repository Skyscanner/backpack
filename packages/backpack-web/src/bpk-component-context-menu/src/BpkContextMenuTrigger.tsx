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

import { type FocusEvent, type ReactNode, useCallback, useEffect, useRef } from 'react';

import { Menu } from '@ark-ui/react';

import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkContextMenu.module.scss';

const getClassName = cssModules(STYLES);

export type BpkContextMenuTriggerProps = {
  children: ReactNode;
  /**
   * Accessible label for the trigger button. Required when the trigger
   * contains only an icon with no visible text.
   */
  'aria-label'?: string;
  /**
   * When true, delegates trigger behaviour to the child element rather than
   * rendering a Backpack-owned button. The child must be a DOM element or a
   * forwardRef component. Use this to compose with an existing product button
   * (e.g. BpkSaveButton) that owns its own styling and state.
   */
  asChild?: boolean;
};

const BpkContextMenuTrigger = ({
  'aria-label': ariaLabel,
  asChild = false,
  children,
}: BpkContextMenuTriggerProps) => {
  // Track whether the last document interaction was pointer or keyboard.
  // Zag calls focus({ preventScroll: true }) on close, but some browsers
  // still show :focus-visible when keyboard navigation happened inside the
  // menu. We suppress it ourselves when the close was pointer-initiated.
  const isPointerRef = useRef(false);

  useEffect(() => {
    const onPointerDown = () => { isPointerRef.current = true; };
    // Only Tab (inter-element navigation) switches to keyboard mode.
    // Arrow keys, Enter, Space, Escape are intra-widget and should not
    // override a pointer-initiated session.
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') isPointerRef.current = false;
    };
    document.addEventListener('pointerdown', onPointerDown, true);
    document.addEventListener('keydown', onKeyDown, true);
    return () => {
      // on unMount remove the eventListeners
      document.removeEventListener('pointerdown', onPointerDown, true);
      document.removeEventListener('keydown', onKeyDown, true);
    };
  }, []);

  const handleFocus = useCallback((e: FocusEvent<HTMLElement>) => {
    const relatedTarget = e.relatedTarget as Element | null;
    const fromMenu = relatedTarget?.closest('[role="menu"]') != null;
    if (isPointerRef.current || fromMenu) {
      e.currentTarget.setAttribute('data-pointer-focus', '');
    }
  }, []);

  const handleBlur = useCallback((e: FocusEvent<HTMLElement>) => {
    e.currentTarget.removeAttribute('data-pointer-focus');
  }, []);

  return (
    <Menu.Trigger
      asChild={asChild}
      aria-label={ariaLabel}
      className={asChild ? undefined : getClassName('bpk-context-menu__trigger')}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {children}
    </Menu.Trigger>
  );
};

export default BpkContextMenuTrigger;
