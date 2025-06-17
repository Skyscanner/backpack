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

import { useEffect } from 'react';

export function setA11yTabIndex(
  el: HTMLDivElement | null,
  index: number,
  visibleRatios: number[],
) {
  console.log('visibleRatios', visibleRatios);
  if (!el) return;
  const focusableElements = el.querySelectorAll<HTMLElement>(
    'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])',
  );

  focusableElements.forEach((element: HTMLElement) => {
    const targetElement = element;
    targetElement.tabIndex = visibleRatios[index] >= 0.8 ? 0 : -1;
  });
}

export function useUpdateCurrentIndexByVisibility(
  visibleRatios: number[],
  setCurrentIndex: (index: number) => void,
  setStateTimeoutRef: React.MutableRefObject<NodeJS.Timeout | null>,
) {
  useEffect(() => {
    if (!visibleRatios || visibleRatios.length === 0) return;

    if (setStateTimeoutRef.current) clearTimeout(setStateTimeoutRef.current);

    const firstVisibleIndex = visibleRatios.findIndex((ratio) => ratio > 0);

    // when the first visible card is not fully visible
    // the scrolling hasn't ended
    // we don't set the current index

    if (visibleRatios[firstVisibleIndex] > 0.95) {
      // eslint-disable-next-line no-param-reassign
      setStateTimeoutRef.current = setTimeout(() => {
        setCurrentIndex(firstVisibleIndex);
      }, 150);
    }
  }, [visibleRatios]);
}

export function useScrollToCard(
  currentIndex: number,
  container: HTMLElement | null,
  cardRefs: React.MutableRefObject<Array<HTMLDivElement | null>>,
  stateScrollingLockRef: React.MutableRefObject<boolean>,
) {
  useEffect(() => {
    const isVisible =
      container &&
      container.getBoundingClientRect().bottom > 0 &&
      container.getBoundingClientRect().bottom <= window.innerHeight;
    if (!isVisible) return; // Escape from scrollIntoView if the container is not visible

    if (stateScrollingLockRef.current && stateScrollingLockRef.current === true)
      return;

    const targetCard = cardRefs.current[currentIndex];
    if (targetCard) {
      targetCard.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
    }
  }, [currentIndex]);
}

export function useIntersectionObserver(
  { root, threshold }: IntersectionObserverInit,
  visibleRatios: number[],
  setVisibleRatios: React.Dispatch<React.SetStateAction<number[]>>,
) {
  let observer: IntersectionObserver | null = null;

  if (root) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute('data-index'));

          if (entry.intersectionRatio !== visibleRatios[index]) {
            setVisibleRatios((prev) => {
              const newVisibleRatios = [...prev];
              newVisibleRatios[index] = entry.intersectionRatio;
              return newVisibleRatios;
            });
          }
        });
      },
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
