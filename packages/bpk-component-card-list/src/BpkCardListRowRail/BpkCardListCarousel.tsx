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
import {
  useRef,
  useState,
  useEffect,
  CSSProperties,
  isValidElement,
} from 'react';

import _ from 'lodash';

import { cssModules } from '../../../bpk-react-utils';
import { type CardListCarouselProps } from '../common-types';

import STYLES from './BpkCardListCarousel.module.scss';
import {
  useUpdateCurrentIndexByVisibility,
  useScrollToCard,
  useIntersectionObserver,
} from './utils';

const getClassName = cssModules(STYLES);

const BpkCardListCarousel = (props: CardListCarouselProps) => {
  const {
    children,
    initiallyShownCards,
    layout,
    currentIndex,
    setCurrentIndex,
  } = props;

  const shownNumberStyle = {
    flex: `0 0 calc((100% - ${12 * (initiallyShownCards - 1)}px) / ${initiallyShownCards})`,
  } as CSSProperties;

  const totalIndicators = children.length;
  const [root, setRoot] = useState<HTMLElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  const [visibleRatios, setVisibleRatios] = useState<Array<number>>(
    Array(children.length).fill(0),
  );
  const setStateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const setStateLockRef = useRef(false);
  const openSetStateLockTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const observerVisibility = useIntersectionObserver(
    { root: root, threshold: 0.1 },
    visibleRatios,
    setVisibleRatios,
  );

  const setA11yTabIndex = (
    el: HTMLDivElement | null,
    index: number,
    visibleRatios: Array<number>,
  ) => {
    if (!el) return;
    const focusableElements = el.querySelectorAll<HTMLElement>(
      'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])',
    );

    focusableElements.forEach((el) => {
      el.tabIndex = visibleRatios[index] > 0 ? 0 : -1;
    });
  };

  // handle scroll events, and update the visible indices while scrolling
  useEffect(() => {
    const container = root;
    if (!container) {
      console.error('BpkCardListCarousel Root Container not found');
      return;
    }

    const debounceVerticalScroll = _.debounce(
      (event: WheelEvent) => {
        const delta = event.deltaY;
        const deltaIndex = delta > 0 ? (delta / 100) | 1 : (delta / 100) | -1;
        setCurrentIndex((prevIndex) => {
          return Math.max(
            Math.min(prevIndex + deltaIndex, totalIndicators - 1),
            0,
          );
        });
      },
      100,
      { leading: true, trailing: false },
    );

    const handleTouchScroll = () => {
      setStateLockRef.current = true;
      if (openSetStateLockTimeoutRef.current) {
        clearTimeout(openSetStateLockTimeoutRef.current); // refresh and reset the timeout
      }
      openSetStateLockTimeoutRef.current = setTimeout(() => {
        setStateLockRef.current = false;
      }, 300);
    };

    const handleWheel = (event: WheelEvent) => {
      if (event.deltaX !== 0) {
        handleTouchScroll();
      } else {
        // Mouse Wheel Scroll
        event.preventDefault();
        debounceVerticalScroll(event);
      }
    };

    container.addEventListener('wheel', handleWheel);
    container.addEventListener('touchmove', handleTouchScroll);

    const cleanUp = () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchmove', handleTouchScroll);
      setStateTimeoutRef.current && clearTimeout(setStateTimeoutRef.current);
      openSetStateLockTimeoutRef.current &&
        clearTimeout(openSetStateLockTimeoutRef.current);
      setStateLockRef.current && (setStateLockRef.current = false);
    };

    return cleanUp;
  }, [root]);

  useUpdateCurrentIndexByVisibility(
    visibleRatios,
    setCurrentIndex,
    setStateTimeoutRef,
  );

  useScrollToCard(currentIndex, cardRefs, setStateTimeoutRef, setStateLockRef);

  return (
    <div
      className={getClassName(`bpk-card-list-row-rail__${layout}`)}
      data-testid="bpk-card-list-row-rail__content"
      role="region"
      ref={setRoot}
      aria-label="Self defiend Carousel"
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
          <>
            <div
              className={getClassName(
                `bpk-card-list-row-rail__${layout}__card`,
              )}
              ref={cardRefCallback}
              style={shownNumberStyle}
              role="group"
              aria-label={slideAriaLabel}
              aria-current={index === currentIndex ? 'true' : 'false'}
            >
              {card}
            </div>
          </>
        );
      })}
    </div>
  );
};

export default BpkCardListCarousel;
