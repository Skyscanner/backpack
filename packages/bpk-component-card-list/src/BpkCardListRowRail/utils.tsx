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
  { root, threshold }: IntersectionObserverInit,
  visibleRatios: Array<number>,
  setVisibleRatios: React.Dispatch<
    React.SetStateAction <Array<number>>
  >,

) {
let observer: IntersectionObserver | null = null;

if (root) {
    observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const index = Number(entry.target.getAttribute('data-index'));

                if (entry.intersectionRatio !== visibleRatios[index]) {
                    const index = Number(entry.target.getAttribute('data-index'));
                    setVisibleRatios((prev) => {
                        const newVisibleRatios = [...prev];
                        newVisibleRatios[index] = entry.intersectionRatio;
                        return newVisibleRatios;
                    });
                }
            }
    )},      
        { root, threshold },
    );
}

const observe = (element: HTMLElement | null, index: number) => {
    if (element && observer) {
        element.setAttribute('data-index', index.toString());
        observer.observe(element);
    }
};

  return observe;
}
