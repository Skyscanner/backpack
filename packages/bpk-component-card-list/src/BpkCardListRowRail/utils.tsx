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

import { useEffect, useRef, useMemo } from 'react';

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

export const useUpdateCurrentIndexByVisibility = (
  isMobile: boolean,
  groupIndex: number,
  setCurrentIndex: (index: number) => void,
  stateScrollingLockRef: React.MutableRefObject<boolean>,
  openSetStateLockTimeoutRef: React.MutableRefObject<NodeJS.Timeout | null>,
  initiallyShownCards: number,
) => {
  useEffect(() => {
    if (isMobile) return; // No pagination on mobile, so no need to update the current index
    // if (!visibilityList || visibilityList.length === 0) return;
    
    setCurrentIndex(groupIndex);
    lockScroll(stateScrollingLockRef, openSetStateLockTimeoutRef); // prevent scrollIntoView from being called immediately after the current index is set
  }, [groupIndex]);
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
  const callbackRef = useRef(setVisibilityList);

  useEffect(() => {
    callbackRef.current = setVisibilityList;
  });

  const observeAll = useMemo<
    (element: HTMLElement | null, index: number) => void
  >(() => {
    if (!root) return () => {};
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const { index } = (entry.target as HTMLElement).dataset;
          if (!index) return;

          const currentIndex = parseInt(index, 10);

          if (entry.isIntersecting) {
            setVisibilityList((prevList) => {
              const newList = [...prevList];
              newList[currentIndex] = 1;
              return newList;
            });
          } else {
            setVisibilityList((prevList) => {
              const newList = [...prevList];
              newList[currentIndex] = 0;
              return newList;
            });
          }
        });
      },

      { root, threshold },
    );

    const observeElement = (element: HTMLElement | null, index: number) => {
      if (element && observer) {
        element.setAttribute('data-index', index.toString());
        observer.observe(element);
      }
    };

    return observeElement;
  }, [root, threshold]);

  return observeAll;
};
