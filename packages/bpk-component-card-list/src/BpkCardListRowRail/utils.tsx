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

import type { Dispatch, SetStateAction, RefObject } from 'react';
import { useEffect, useRef } from 'react';

import { RELEASE_LOCK_DELAY } from './constants';

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

export const useIntersectionObserver = (
  { root, threshold }: IntersectionObserverInit,
  setVisibilityList: Dispatch<SetStateAction<number[]>>,
) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!root) return () => {};
    observerRef.current = new IntersectionObserver(
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
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [root, threshold, setVisibilityList]);

  const observeElement = (element: HTMLElement | null, index: number) => {
    if (element && observerRef.current) {
      element.setAttribute('data-index', index.toString());
      observerRef.current.observe(element);
    }
  };
  return observeElement;
};

type UseCarouselScrollSyncOptions = {
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  initiallyShownCards: number;
  cardRefs: RefObject<Array<HTMLDivElement | null>>;
  visibilityList: number[];
  container: HTMLElement | null;
  enabled: boolean;
};

export const useCarouselScrollSync = ({
  cardRefs,
  container,
  currentIndex,
  enabled,
  initiallyShownCards,
  setCurrentIndex,
  visibilityList,
}: UseCarouselScrollSyncOptions): void => {
  const isUserScrollingRef = useRef<boolean>(false);
  const isProgrammaticScrollRef = useRef<boolean>(false);
  const scrollEndTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const lastCurrentIndexRef = useRef<number>(currentIndex);

  // Effect 1: Programmatic scroll when currentIndex changes
  useEffect(() => {
    if (
      !enabled ||
      // Avoid triggering programmatic scroll when currentIndex changes due to user scroll
      isUserScrollingRef.current ||
      lastCurrentIndexRef.current === currentIndex
    ) {
      return;
    }

    lastCurrentIndexRef.current = currentIndex;

    const isVisible =
      container &&
      container.getBoundingClientRect().bottom > 0 &&
      container.getBoundingClientRect().bottom <= window.innerHeight;

    if (!isVisible) {
      return;
    }

    const targetCard = cardRefs.current?.[currentIndex * initiallyShownCards];
    if (!targetCard) {
      return;
    }

    isProgrammaticScrollRef.current = true;
    targetCard.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  }, [currentIndex, enabled, container, initiallyShownCards, cardRefs]);

  // Effect 2: Scroll detection and silence-based lock release for both scroll types
  useEffect(() => {
    if (!enabled || !container) return undefined;

    const handleScroll = () => {
      // Mark as user scrolling only if not programmatic
      if (!isProgrammaticScrollRef.current) {
        isUserScrollingRef.current = true;
      }

      // Reset silence timer on every scroll event
      if (scrollEndTimeoutRef.current) {
        clearTimeout(scrollEndTimeoutRef.current);
      }

      // Release both locks after scroll silence
      scrollEndTimeoutRef.current = setTimeout(() => {
        isUserScrollingRef.current = false;
        isProgrammaticScrollRef.current = false;
      }, RELEASE_LOCK_DELAY);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (scrollEndTimeoutRef.current) {
        clearTimeout(scrollEndTimeoutRef.current);
      }
    };
  }, [enabled, container]);

  // Effect 3: Update currentIndex from visibility during user scroll
  useEffect(() => {
    if (
      !enabled ||
      !isUserScrollingRef.current ||
      isProgrammaticScrollRef.current
    )
      return;

    const firstVisibleIndex = visibilityList.indexOf(1);
    if (firstVisibleIndex === -1) return;

    const newPageIndex = Math.floor(firstVisibleIndex / initiallyShownCards);
    if (newPageIndex !== currentIndex) {
      setCurrentIndex(newPageIndex);
      lastCurrentIndexRef.current = newPageIndex;
    }
  }, [
    visibilityList,
    enabled,
    initiallyShownCards,
    currentIndex,
    setCurrentIndex,
  ]);
};
