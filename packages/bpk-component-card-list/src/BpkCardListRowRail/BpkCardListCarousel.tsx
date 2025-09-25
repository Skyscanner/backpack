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

import { cssModules } from '../../../bpk-react-utils';

import {
  lockScroll,
  setA11yTabIndex,
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
  const [, forceUpdate] = useState(0);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const firstCardWidthRef = useRef<number | null>(null);
  const firstCardHeightRef = useRef<number | null>(null);

  const [visibilityList, setVisibilityList] = useState<number[]>(
    Array(childrenLength).fill(0),
  );

  const stateScrollingLockRef = useRef(false);
  const openSetStateLockTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const observerVisibility = useIntersectionObserver(
    { root, threshold: 0.5 },
    setVisibilityList,
  );

  useScrollToCard(
    currentIndex * initiallyShownCards,
    root,
    cardRefs,
    stateScrollingLockRef,
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
  }, [root, isMobile]);

  useEffect(() => {
    const firstVisible = visibilityList.indexOf(1);
    if (firstVisible >= 0) {
      const newIndex = Math.floor(firstVisible / initiallyShownCards);
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
      }
    }
  }, [initiallyShownCards]);

  useEffect(() => {
    const handleResize = throttle(() => {
      firstCardWidthRef.current = null;
      firstCardHeightRef.current = null;
      forceUpdate((n) => n + 1);
    }, 200);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const shouldCardBeVisible = (index: number) => visibilityList[index] === 1;

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
    >
      {children.map((card, index) => {
        if (!isValidElement(card)) return null;

        // Dynamic card dimensions (inline styles are appropriate here)
        const cardDimensionStyle: CSSProperties = {};
        if (firstCardWidthRef.current) {
          cardDimensionStyle.width = `${firstCardWidthRef.current}px`;
        }
        if (firstCardHeightRef.current) {
          cardDimensionStyle.height = `${firstCardHeightRef.current}px`;
        }

        // Card virtualization optimization styles
        const cardVirtualizationStyle: CSSProperties = {};
        const isCardVisible = shouldCardBeVisible(index);

        if (!isCardVisible) {
          cardVirtualizationStyle.contentVisibility = 'auto';
          if (cardDimensionStyle.width && cardDimensionStyle.height) {
            cardVirtualizationStyle.containIntrinsicSize = `${cardDimensionStyle.width} ${cardDimensionStyle.height}`;
          }
        }

        return (
          <div
            className={getClassName(`bpk-card-list-row-rail__${layout}__card`)}
            ref={cardRefFns[index]}
            style={{
              ...shownNumberStyle,
              ...cardDimensionStyle,
              ...cardVirtualizationStyle,
            }}
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
