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

import { type ReactNode, useEffect, useRef } from 'react';

import { cssModules } from '../../bpk-react-utils';

import { useBpkContextMenuScroll } from './BpkContextMenuScrollContext';

import STYLES from './BpkContextMenu.module.scss';

const getClassName = cssModules(STYLES);

export type BpkContextMenuScrollableListProps = {
  children: ReactNode;
};

const BpkContextMenuScrollableList = ({
  children,
}: BpkContextMenuScrollableListProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = useBpkContextMenuScroll();

  // Tell the parent Content to apply the --scrollable modifier so the card
  // uses overflow:hidden and the scrollbar is scoped to this element.
  // More robust than CSS :has() which lacks universal browser support.
  //
  // No cleanup: BpkContextMenuContent resets hasScrollableList on its own
  // remount. Calling setScrollable(false) on unmount triggers a state update
  // outside React's act() scope during test teardown, producing spurious
  // "not wrapped in act" warnings.
  useEffect(() => {
    scroll?.setScrollable(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const container = ref.current;
    if (!container) return undefined;

    // Ark highlights items via data-highlighted rather than moving DOM focus,
    // so the browser never auto-scrolls. Watch for attribute changes and
    // scroll the newly highlighted item into view within this container.
    const observer = new MutationObserver(() => {
      const highlighted = container.querySelector<HTMLElement>(
        '[data-highlighted]',
      );
      if (highlighted) {
        highlighted.scrollIntoView({ block: 'nearest' });
      }
    });

    observer.observe(container, {
      attributes: true,
      attributeFilter: ['data-highlighted'],
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={getClassName('bpk-context-menu__scrollable-list')}
    >
      {children}
    </div>
  );
};

export default BpkContextMenuScrollableList;
