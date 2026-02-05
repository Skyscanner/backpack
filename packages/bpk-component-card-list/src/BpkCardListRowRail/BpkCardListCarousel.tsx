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
import {
  useRef,
  useState,
  useEffect,
  isValidElement,
  Children,
  useMemo,
} from 'react';

import throttle from 'lodash/throttle';

import { cssModules, getDataComponentAttribute } from '../../../bpk-react-utils';

import { RENDER_BUFFER_SIZE } from './constants';
import {
  setA11yTabIndex,
  useIntersectionObserver,
  usePageScrollSync,
} from './utils';

import type { CardListCarouselProps } from '../common-types';

import STYLES from './BpkCardListCarousel.module.scss';

const getClassName = cssModules(STYLES);

const PAGINATION_INDICATOR_MAX_SHOWN_COUNT = 5;

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
  const [, forceUpdate] = useState(0);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const hasBeenVisibleRef = useRef<Set<number>>(new Set());
  const firstCardWidthRef = useRef<number | null>(null);
  const firstCardHeightRef = useRef<number | null>(null);

  const [visibilityList, setVisibilityList] = useState<number[]>(
    Array(childrenLength).fill(0),
  );

  const observerVisibility = useIntersectionObserver(
    { root, threshold: 0.5 },
    setVisibilityList,
  );

  usePageScrollSync({
    currentIndex,
    setCurrentIndex,
    initiallyShownCards,
    cardRefs,
    visibilityList,
    container: root,
    enabled: !isMobile,
  });

  // Similar to Virtual Scrolling to improve performance
  const firstVisibleIndex = Math.max(0, visibilityList.indexOf(1));
  const lastVisibleIndex = firstVisibleIndex + initiallyShownCards - 1;

  const dynamicRenderBufferSize = useMemo(() => {
    if (childrenLength === 0 || initiallyShownCards === 0 || isMobile)
      return RENDER_BUFFER_SIZE;

    // Calculate how many cards to render based on the number of initially shown cards and total children
    const totalPages = Math.ceil(childrenLength / initiallyShownCards);
    const shownIndicatorCount = Math.min(
      totalPages,
      PAGINATION_INDICATOR_MAX_SHOWN_COUNT,
    );
    return Math.max(
      RENDER_BUFFER_SIZE,
      (shownIndicatorCount - 1) * initiallyShownCards,
    );
  }, [childrenLength, initiallyShownCards, isMobile]);

  const renderList = useMemo(
    () =>
      visibilityList.map((_, index) => {
        const isIndexVisible =
          index >= firstVisibleIndex - dynamicRenderBufferSize &&
          index <= lastVisibleIndex + dynamicRenderBufferSize;
        if (isIndexVisible) {
          hasBeenVisibleRef.current.add(index);
        }

        return isIndexVisible ? 1 : 0;
      }),
    [
      visibilityList,
      firstVisibleIndex,
      lastVisibleIndex,
      dynamicRenderBufferSize,
    ],
  );

  const cardRefFns = useMemo(
    () =>
      Array(childrenLength)
        .fill(null)
        .map((_, i) => (el: HTMLDivElement | null) => {
          cardRefs.current[i] = el;
          observerVisibility(el, i);
          setA11yTabIndex(el, i, visibilityList);
          // record the first card's width and height when it becomes visible
          if (el && visibilityList[i] === 0) {
            if (firstCardWidthRef.current == null && el.offsetWidth) {
              firstCardWidthRef.current = el.offsetWidth;
            }
            if (firstCardHeightRef.current == null && el.offsetHeight) {
              firstCardHeightRef.current = el.offsetHeight;
            }
          }
        }),
    [
      childrenLength,
      observerVisibility,
      visibilityList,
      firstCardWidthRef,
      firstCardHeightRef,
    ],
  );

  useEffect(() => {
    // update hasBeenVisibleRef to include the range of cards that should be visible
    const start = currentIndex * initiallyShownCards;
    const end = start + initiallyShownCards + dynamicRenderBufferSize;
    for (let i = start; i < end && i < childrenLength; i += 1) {
      hasBeenVisibleRef.current.add(i);
    }
  }, [
    currentIndex,
    initiallyShownCards,
    childrenLength,
    dynamicRenderBufferSize,
  ]);

  useEffect(() => {
    const handleResize = throttle(() => {
      firstCardWidthRef.current = null;
      firstCardHeightRef.current = null;
      forceUpdate((n) => n + 1);
    }, 200);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

   return (
    <div
      className={getClassName(`bpk-card-list-row-rail__${layout}`)}
      {...getDataComponentAttribute('CardListCarousel')}
      data-testid="bpk-card-list-row-rail__carousel"
      aria-label={carouselLabel(initiallyShownCards, childrenLength)}
      aria-roledescription="carousel"
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
      role="region"
      ref={setRoot}
    >
      {children.map((card, index) => {
        if (!isValidElement(card)) return null;

        const cardDimensionStyle: CSSProperties = {};
        if (firstCardWidthRef.current) {
          cardDimensionStyle.width = `${firstCardWidthRef.current}px`;
        }
        if (firstCardHeightRef.current) {
          cardDimensionStyle.height = `${firstCardHeightRef.current}px`;
        }

        const isPageStart = index % initiallyShownCards === 0;

        const commonProps = {
          className: getClassName(
            `bpk-card-list-row-rail__${layout}__card`,
            isPageStart && 'bpk-card-list-row-rail__card--page-start',
          ),
          style: shownNumberStyle,
          key: `carousel-card-${index.toString()}`,
          role: 'group',
        };

        // Only render cards that are within the renderList range or have been visible before
        const shouldRenderCard =
          renderList[index] === 1 || hasBeenVisibleRef.current.has(index);
        if (!shouldRenderCard) {
          return (
            <div
              {...commonProps}
              style={{
                ...commonProps.style,
                ...cardDimensionStyle,
                contain: 'paint',
              }}
              data-testid="bpk-card-list-carousel--placeholder"
              aria-hidden="true"
            >
              <div
                className={getClassName('bpk-card-list-row-rail__card-slot')}
              >
                {card}
              </div>
            </div>
          );
        }

        return (
          <div
            {...commonProps}
            ref={cardRefFns[index]}
            aria-label={slideLabel(index, childrenLength)}
          >
            <div className={getClassName('bpk-card-list-row-rail__card-slot')}>
              {card}
            </div>
          </div>
        );
      })}
    </div>
  )
};

export default BpkCardListCarousel;
