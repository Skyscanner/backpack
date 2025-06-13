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
import { useRef, useState, useEffect, isValidElement } from 'react';

import _ from 'lodash';

import { cssModules } from '../../../bpk-react-utils';
import { type CardListCarouselProps } from '../common-types';

import {
  setA11yTabIndex,
  useUpdateCurrentIndexByVisibility,
  useScrollToCard,
  useIntersectionObserver,
} from './utils';

import STYLES from './BpkCardListCarousel.module.scss';

const getClassName = cssModules(STYLES);

const BpkCardListCarousel = (props: CardListCarouselProps) => {
  const {
    children,
    currentIndex,
    initiallyShownCards,
    layout,
    setCurrentIndex,
  } = props;

  const shownNumberStyle = {
    flex: `0 0 calc((100% - ${8 * (initiallyShownCards - 1)}px) / ${initiallyShownCards})`,
  } as CSSProperties;

  const totalIndicators = children.length;
  const [root, setRoot] = useState<HTMLElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  const [visibleRatios, setVisibleRatios] = useState<number[]>(
    Array(children.length).fill(0),
  );
  const setStateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const stateScrollingLockRef = useRef(false);
  const openSetStateLockTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const observerVisibility = useIntersectionObserver(
    { root, threshold: 0.1 },
    visibleRatios,
    setVisibleRatios,
  );

  useEffect(() => {
    const container = root;
    if (!container) {
      console.error('BpkCardListCarousel Root Container not found');
      return undefined;
    }

    const lockScrollDuringInteraction = () => {
      stateScrollingLockRef.current = true; // Prevent scrollIntoView while scrolling
      if (openSetStateLockTimeoutRef.current) {
        clearTimeout(openSetStateLockTimeoutRef.current); // reset the release lock timeout
      }
      openSetStateLockTimeoutRef.current = setTimeout(() => {
        stateScrollingLockRef.current = false; // release the lock after 300ms
      }, 300);
    };

    // Prevent scrollIntoView scroll back up when the user scroll down 
    // rapidly and immediately after he scroll the carousel with touchBar
    container.addEventListener('mousewheel', lockScrollDuringInteraction)
    container.addEventListener('touchmove', lockScrollDuringInteraction);

    return () => {
      container.removeEventListener('touchmove', lockScrollDuringInteraction);
      container.removeEventListener('mousewheel', lockScrollDuringInteraction);
    };
  }, [root]);

  useUpdateCurrentIndexByVisibility(
    visibleRatios,
    setCurrentIndex,
    setStateTimeoutRef,
  );

  useScrollToCard(currentIndex, root, cardRefs, stateScrollingLockRef);

  const carouselAriaLabel = `Entering Carousel with ${initiallyShownCards} slides shown at a time, ${totalIndicators} slides in total. Please use Pagination below with the Previous and Next buttons to navigate, or the slide dot buttons at the end to jump to slides.`;

  return (
    <div
      className={getClassName(`bpk-card-list-row-rail__${layout}`)}
      data-testid="bpk-card-list-row-rail__carousel"
      aria-label={carouselAriaLabel}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
      role="region"
      ref={setRoot}
    >
      {children.map((card, index) => {
        if (!isValidElement(card)) return null;

        const cardRefCallback = (el: HTMLDivElement | null) => {
          cardRefs.current[index] = el;
          observerVisibility(el, index);
          setA11yTabIndex(el, index, visibleRatios);
        };

        const slideAriaLabel = `slide ${index + 1} of ${totalIndicators}`;

        return (
          <div
            className={getClassName(`bpk-card-list-row-rail__${layout}__card`)}
            ref={cardRefCallback}
            style={shownNumberStyle}
            role="group"
            aria-label={slideAriaLabel}
            aria-current={index === currentIndex ? 'true' : 'false'}
          >
            {card}
          </div>
        );
      })}
    </div>
  );
};

export default BpkCardListCarousel;
