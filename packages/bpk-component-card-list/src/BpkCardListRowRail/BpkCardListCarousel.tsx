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
import type { CSSProperties } from 'react';
import { useRef, useState, useEffect, isValidElement, Children } from 'react';

import { cssModules } from '../../../bpk-react-utils';

import { RENDER_BUFFER_SIZE } from './constants';
import {
  lockScroll,
  setA11yTabIndex,
  useUpdateCurrentIndexByVisibility,
  useScrollToCard,
  useIntersectionObserver,
} from './utils';

import type { CardListCarouselProps } from '../common-types';

import STYLES from './BpkCardListCarousel.module.scss';

const getClassName = cssModules(STYLES);

const BpkCardListCarousel = (props: CardListCarouselProps) => {
  const {
    carouselLabel = (initiallyShownCards: number, childrenLength: number) =>
      `Entering Carousel with ${initiallyShownCards} slides shown at a time, ${childrenLength} slides in total. Please use Pagination below with the Previous and Next buttons to navigate, or the slide dot buttons at the end to jump to slides.`,
    children,
    currentIndex,
    initiallyShownCards,
    isMobile = false,
    layout,
    setCurrentIndex,
    slideLabel = (index: number, childrenLength: number) =>
      `slide ${index + 1} of ${childrenLength}`,
  } = props;

  type CustomCSSProperties = CSSProperties & {
    '--initially-shown-cards'?: number;
  };

  const shownNumberStyle: CustomCSSProperties = {
    '--initially-shown-cards': initiallyShownCards,
  };

  const childrenLength = Children.count(children);
  const [root, setRoot] = useState<HTMLElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const hasBeenVisibleRef = useRef<Set<number>>(new Set());
  const firstCardWidthRef = useRef<number | null>(null);

  const [visibilityList, setVisibilityList] = useState<number[]>(
    Array(childrenLength).fill(0),
  );

  const stateScrollingLockRef = useRef(false);
  const openSetStateLockTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const observerVisibility = useIntersectionObserver(
    { root, threshold: 0.5 },
    setVisibilityList,
  );

  useEffect(() => {
    const container = root;
    if (isMobile || !container) return undefined;

    const lockScrollDuringInteraction = () => {
      lockScroll(stateScrollingLockRef, openSetStateLockTimeoutRef);
    };

    container.addEventListener('wheel', lockScrollDuringInteraction);
    container.addEventListener('touchmove', lockScrollDuringInteraction);

    return () => {
      container.removeEventListener('touchmove', lockScrollDuringInteraction);
      container.removeEventListener('wheel', lockScrollDuringInteraction);
      if (openSetStateLockTimeoutRef.current) {
        clearTimeout(openSetStateLockTimeoutRef.current);
      }
    };
  }, [root]);

  // Calculate the first visible index and group index based on visibilityList
  const visibleIndexes = visibilityList
    .map((v, i) => (v === 1 ? i : -1))
    .filter((i) => i !== -1);
  const minVisibleIndex =
    visibleIndexes.length > 0 ? Math.min(...visibleIndexes) : 0;
  const groupIndex = Math.floor(minVisibleIndex / initiallyShownCards);

  useUpdateCurrentIndexByVisibility(
    isMobile,
    groupIndex,
    setCurrentIndex,
    stateScrollingLockRef,
    openSetStateLockTimeoutRef,
    initiallyShownCards,
  );

  useScrollToCard(
    currentIndex * initiallyShownCards,
    root,
    cardRefs,
    stateScrollingLockRef,
  );

  // Similar to Virtual Scrolling to improve performance
  const firstVisibleIndex = Math.max(0, visibilityList.indexOf(1));
  const lastVisibleIndex = firstVisibleIndex + initiallyShownCards - 1;
  const renderList = visibilityList.map((_, index) =>
    index >= firstVisibleIndex - RENDER_BUFFER_SIZE &&
    index <= lastVisibleIndex + RENDER_BUFFER_SIZE
      ? 1
      : 0,
  );

  const cardRefCallback = (index: number) => (el: HTMLDivElement | null) => {
    cardRefs.current[index] = el;
    observerVisibility(el, index);
    setA11yTabIndex(el, index, visibilityList);
    // 进入可视区时记录
    if (el && visibilityList[index] === 1) {
      hasBeenVisibleRef.current.add(index);
      if (firstCardWidthRef.current == null && el.offsetWidth) {
        firstCardWidthRef.current = el.offsetWidth;
      }
    }
  };

  return (
    <div
      className={getClassName(`bpk-card-list-row-rail__${layout}`)}
      data-testid="bpk-card-list-row-rail__carousel"
      aria-label={carouselLabel(initiallyShownCards, childrenLength)}
      aria-roledescription="carousel"
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
      role="region"
      ref={setRoot}
      onWheel={(e) => e.preventDefault()} // 禁止鼠标滚轮滑动
    >
      {children.map((card, index) => {
        if (!isValidElement(card)) return null;
        // Only render cards that are within the renderList range
        if (renderList[index] !== 1 && !hasBeenVisibleRef.current.has(index)) {
          // Placeholder for cards not yet visible
          return (
            <div
              key={`placeholder-${index.toString()}`}
              style={{
                width:
                  firstCardWidthRef.current && `${firstCardWidthRef.current}px`,
                visibility: 'hidden',
                pointerEvents: 'none',
              }}
              aria-hidden="true"
            />
          );
        }

        return (
          <div
            className={getClassName(`bpk-card-list-row-rail__${layout}__card`)}
            ref={cardRefCallback(index)}
            style={shownNumberStyle}
            key={`carousel-card-${index.toString()}`}
            role="group"
            aria-label={slideLabel(index, childrenLength)}
          >
            {card}
          </div>
        );
      })}
    </div>
  );
};

export default BpkCardListCarousel;
