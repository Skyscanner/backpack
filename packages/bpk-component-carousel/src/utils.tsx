/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2022 Skyscanner Ltd
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
// @ts-nocheck

import { useEffect, useMemo, useRef } from 'react';
import type { MutableRefObject } from 'react';

import type { OnImageChangedHandler } from './types';

// Scrolls to a specific image in the carousel by index.
//
// This function provides programmatic scrolling control for the carousel component.
// It locates the target image element and scrolls its parent container to bring
// the image into view.
//
// The scrolling behavior uses the native browser scroll API with the 'left' position
// set to the target element's offsetLeft, ensuring the image aligns properly within
// the visible viewport of the carousel container.
function scrollImageToView(
  index: number,
  imagesRef: MutableRefObject<Array<HTMLElement | null>>,
  behavior: 'auto' | 'smooth' = 'smooth'
) {
  const element = imagesRef.current[index];
  if (!element) return;

  const parent = element.parentElement;
  if (!parent) return;

  // Some browsers and test environments don't support smooth scrolling,
  // so we must fall back to simply setting scrollLeft
  if (parent.scroll && typeof parent.scroll === 'function') {
    parent.scroll({
      left: element.offsetLeft,
      behavior,
    });
  } else {
    parent.scrollLeft = element.offsetLeft;
  }
}

// Hook that scrolls to the initial image when the carousel mounts.
//
// This ensures that when a carousel is rendered with a non-zero initialImageIndex,
// it immediately displays that image without animation. Uses 'auto' behavior to
// prevent unwanted animation on initial render.
export function useScrollToInitialImage(
  initialImageIndex: number,
  imagesRef: MutableRefObject<Array<HTMLElement | null>>,
) {
  useEffect(() => {
    scrollImageToView(initialImageIndex, imagesRef, 'auto');
  }, [initialImageIndex, imagesRef]);
}

// Scrolls to a specific image in the carousel with smooth animation.
//
// This function is typically used for user-initiated navigation (clicking indicators,
// navigation buttons, etc.) where a smooth animated scroll provides better UX.
export function scrollToIndex(
  index: number,
  imagesRef?: MutableRefObject<Array<HTMLElement | null>>,
) {
  if (!imagesRef) return;
  scrollImageToView(index, imagesRef, 'smooth');
}
export function useIntersectionObserver(
  onIntersecting: (index: number) => void,
  { root, threshold }: IntersectionObserverInit,
  onImageChanged?: OnImageChangedHandler,
) {
  const callbackRef = useRef(onIntersecting);

  useEffect(() => {
    callbackRef.current = onIntersecting;
  });

  const observe = useMemo<(element: HTMLElement | null) => void>(() => {
    if (!root) return () => {};
    const observer = new IntersectionObserver(
      (entries) => {
        const shownEntry = entries.find((entry) => entry.isIntersecting);
        if (!shownEntry) {
          return;
        }
        const { index } = (shownEntry.target as HTMLElement).dataset;
        if (index) {
          const currentIndex = parseInt(index, 10);
          callbackRef.current(currentIndex);
          if (onImageChanged) {
            onImageChanged(currentIndex)
          }
        }
      },
      { root, threshold },
    );

    const observeElement = (element: HTMLElement | null) => {

      if (element && observer) {
        observer.observe(element);
      }
    };

    return observeElement;
  }, [onImageChanged, root, threshold]);

  return observe;
}
