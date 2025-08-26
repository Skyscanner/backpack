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

import { useEffect, useMemo, useRef } from 'react';
import type { MutableRefObject } from 'react';

import type { OnImageChangedHandler } from './types';

export function useScrollToInitialImage(
  initialImageIndex: number,
  imagesRef: MutableRefObject<Array<HTMLElement | null>>,
) {
  useEffect(() => {
    const element = imagesRef.current[initialImageIndex];
    if (element) {
      element.scrollIntoView({
        block: 'nearest',
        inline: 'start',
      });
    }
  }, [initialImageIndex, imagesRef]);
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
