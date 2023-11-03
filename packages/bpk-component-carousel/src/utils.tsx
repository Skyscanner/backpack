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
          callbackRef.current(parseInt(index, 10));
          if (onImageChanged) {
            onImageChanged()
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
