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

import { useEffect, useRef } from 'react';

import { RELEASE_LOCK_DELAY } from './constants';

/**
 * Typically used to prevent useScrollToCard() from being called, to prevent scrollings caused by state changes, so as to avoid cyclic dependencies.
 * @param stateScrollingLockRef - Ref to the state that indicates if scrollIntoView should be locked
 * @param openSetStateLockTimeoutRef - Ref to the timeout that releases the lock after a delay. Should be renewed every time another scroll action is triggered, with a new lock is added.
 */

export const lockScroll = (
  stateScrollingLockRef: React.MutableRefObject<boolean>,
  openSetStateLockTimeoutRef: React.MutableRefObject<NodeJS.Timeout | null>,
) => {
  // eslint-disable-next-line no-param-reassign
  stateScrollingLockRef.current = true;
  if (openSetStateLockTimeoutRef.current) {
    clearTimeout(openSetStateLockTimeoutRef.current);
  }
  // eslint-disable-next-line no-param-reassign
  openSetStateLockTimeoutRef.current = setTimeout(() => {
    // eslint-disable-next-line no-param-reassign
    stateScrollingLockRef.current = false;
  }, RELEASE_LOCK_DELAY);
};

/**
 * Only sets the tabIndex of focusable elements as 0 if the card is visible, otherwise sets it to -1, including all its children.
 * For example, if there is a button inside a card which is not shown, it cannot be focused as well.
 * @param el - Card container element, typically a div used to wrap the card content.
 * @param index - Current container index
 */

export const setA11yTabIndex = (
  el: HTMLDivElement | null,
  index: number,
  visibilityList: number[],
) => {
  if (!el) return;
  const focusableElements = el.querySelectorAll<HTMLElement>(
    'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])',
  );

  focusableElements.forEach((element: HTMLElement) => {
    const targetElement = element;
    targetElement.tabIndex = visibilityList[index] === 1 ? 0 : -1;
  });
};

export const useScrollToCard = (
  currentIndex: number,
  container: HTMLElement | null,
  cardRefs: React.MutableRefObject<Array<HTMLDivElement | null>>,
  stateScrollingLockRef: React.MutableRefObject<boolean>,
) => {
  useEffect(() => {
    const isVisible =
      container &&
      container.getBoundingClientRect().bottom > 0 &&
      container.getBoundingClientRect().bottom <= window.innerHeight;

    if (!isVisible) return; // Escape from scrollIntoView if the container is not visible, otherwise the webpage will scroll down to the last rendered & non-visible container

    console.log({ currentIndex, stateScrollingLockRef: stateScrollingLockRef.current })

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
};

export const useIntersectionObserver = (
  { root, threshold }: IntersectionObserverInit,
  setVisibilityList: React.Dispatch<React.SetStateAction<number[]>>,
) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!root) {
      console.log('❌ [IntersectionObserver] No root element, skipping setup');
      return () => { };
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        console.log('🎯 [IntersectionObserver] Processing entries:', entries.length);

        entries.forEach((entry) => {
          const { index } = (entry.target as HTMLElement).dataset;
          if (!index) {
            console.log('⚠️ [IntersectionObserver] No index found on target');
            return;
          }

          const currentIndex = parseInt(index, 10);
          const isIntersecting = entry.isIntersecting;
          const intersectionRatio = entry.intersectionRatio;
          const boundingRect = entry.boundingClientRect;
          const rootBounds = entry.rootBounds;

          console.log(`📊 [IntersectionObserver] Card ${currentIndex}:`, {
            isIntersecting,
            intersectionRatio: intersectionRatio.toFixed(3),
            target: {
              top: Math.round(boundingRect.top),
              left: Math.round(boundingRect.left),
              width: Math.round(boundingRect.width),
              height: Math.round(boundingRect.height),
            },
            root: rootBounds ? {
              top: Math.round(rootBounds.top),
              left: Math.round(rootBounds.left),
              width: Math.round(rootBounds.width),
              height: Math.round(rootBounds.height),
            } : null,
          });

          if (isIntersecting) {
            console.log(`✅ [IntersectionObserver] Card ${currentIndex} became visible`);
            setVisibilityList((prevList) => {
              console.log(`📝 [IntersectionObserver] Setting card ${currentIndex} visible:`, {
                before: prevList.map((v, i) => `${i}:${v}`).join(','),
                action: `${currentIndex}:0→1`
              });
              const newList = [...prevList];
              newList[currentIndex] = 1;
              console.log(`📝 [IntersectionObserver] After update:`,
                newList.map((v, i) => `${i}:${v}`).join(',')
              );
              return newList;
            });
          } else {
            console.log(`❌ [IntersectionObserver] Card ${currentIndex} became hidden`);
            setVisibilityList((prevList) => {
              console.log(`📝 [IntersectionObserver] Setting card ${currentIndex} hidden:`, {
                before: prevList.map((v, i) => `${i}:${v}`).join(','),
                action: `${currentIndex}:1→0`
              });
              const newList = [...prevList];
              newList[currentIndex] = 0;
              console.log(`📝 [IntersectionObserver] After update:`,
                newList.map((v, i) => `${i}:${v}`).join(',')
              );
              return newList;
            });
          }
        });
      },
      { root, threshold },
    );

    return () => {
      console.log('🧹 [IntersectionObserver] Cleaning up observer');
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [root, threshold, setVisibilityList]);

  const observeElement = (element: HTMLElement | null, index: number) => {
    if (element && observerRef.current) {
      console.log(`👀 [IntersectionObserver] Observing element at index ${index}:`, {
        element: element.tagName,
        className: element.className,
        rect: element.getBoundingClientRect(),
        isPlaceholder: element.children.length === 0,
        hasContent: element.children.length > 0
      });

      element.setAttribute('data-index', index.toString());
      observerRef.current.observe(element);
    } else {
      console.log(`⚠️ [IntersectionObserver] Cannot observe element at index ${index}:`, {
        hasElement: !!element,
        hasObserver: !!observerRef.current
      });
    }
  };

  return observeElement;
};
