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

import type { RefObject, UIEventHandler } from 'react';
import { useCallback, useLayoutEffect, useMemo, useState } from 'react';

export function useScrollToInitialImage(shownImageRef: RefObject<HTMLElement>) {
  useLayoutEffect(() => {
    shownImageRef.current?.scrollIntoView({
      block: 'nearest',
      inline: 'start',
    });
    // only run on first mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export function useUpdateShownImageIndexWhenVisible(
  updateShownImageIndex: (index: number) => void,
) {
  const [containerEl, setContainerElement] = useState<HTMLDivElement | null>(
    null,
  );

  const intersectionObserver = useMemo(() => {
    if (!containerEl) return null;

    return new IntersectionObserver(
      (entries) => {
        const shownEntry = entries.find((entry) => entry.isIntersecting);
        if (!shownEntry) {
          return;
        }
        const { index } = (shownEntry.target as HTMLElement).dataset;
        if (index) {
          updateShownImageIndex(Number(index));
        }
      },
      {
        root: containerEl,
        threshold: 0.7,
      },
    );
  }, [containerEl, updateShownImageIndex]);

  const observe = (el: HTMLElement | null) => {
    if (el) {
      intersectionObserver?.observe(el);
    }
  };

  return [setContainerElement, observe] as const;
}

// Jump from fake image to the actual last or first
// "fakeLast"-imgFirst-img-imgLast-"fakeFirst"
export function useInfiniteContainerScrollHandler() {
  return useCallback<UIEventHandler<HTMLDivElement>>((e) => {
    const { offsetWidth, scrollLeft, scrollWidth } = e.currentTarget;

    const direction = document.dir === 'rtl' ? -1 : 1;
    const scrollLeftWithRtl = scrollLeft * direction;

    if (scrollLeftWithRtl <= 0) {
      e.currentTarget.scrollLeft = direction * (scrollWidth - offsetWidth * 2);
    } else if (scrollLeftWithRtl >= scrollWidth - offsetWidth) {
      e.currentTarget.scrollLeft = direction * offsetWidth;
    }
  }, []);
}

// Images served from content.skyscnr.com can be resized through Lambda:
// https://confluence.skyscannertools.net/pages/viewpage.action?spaceKey=WPT&title=Image+Lambda+-+AWS+Serverless+Image+Handler
export function getResizedImage(
  url: string,
  size?: `${number}px:${number}px`,
  quality?: number,
): string {
  if (!url.startsWith('https://content.skyscnr.com')) return url;
  let newUrl = url.includes('?') ? `${url}&` : `${url}?`;
  if (size) {
    newUrl += `resize=${size}`;
  }
  if (quality) {
    newUrl += `&quality=${quality}`;
  }
  return newUrl;
}
