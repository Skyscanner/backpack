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
  memo,
} from 'react';

import _ from 'lodash';

import { cssModules } from '../../../bpk-react-utils';
import { type CardListCarouselProps } from '../common-types';

import STYLES from './BpkCardListCarousel.module.scss';
import { useIntersectionObserver } from './utils';

const getClassName = cssModules(STYLES);

const BpkCardListCarousel = (props: CardListCarouselProps) => {
  const {
    children,
    initiallyShownCards,
    layout,
    currentIndex,
    setCurrentIndex,
  } = props;

  const totalIndicators = children.length;
  const [allVisibleIndex, setAllVisibleIndex] = useState<Array<number>>([]);
  const [root, setRoot] = useState<HTMLElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const setStateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [visibleRatios, setVisibleRatios] = useState<Array<number>>(
    Array(children.length).fill(0),
  );

  const observerVisibility = useIntersectionObserver(
    { root: root, threshold: 0.1 },
    visibleRatios,
    setVisibleRatios,
  );

  const shownNumberStyle = {
    flex: `0 0 calc(100% / ${initiallyShownCards})`,
  } as CSSProperties;

  // handle scroll events, and update the visible indices while scrolling
  useEffect(() => {
    const container = root;
    if (!container) {
        console.error('BpkCardListCarousel Root Container not found');
        return;
    };

    const debounceVerticalScroll = _.debounce(
      (event: WheelEvent) => {
        const delta = event.deltaY;
        const deltaIndex =
          delta > 0 ? (delta / 100) | (0 + 1) : (delta / 100) | (0 - 1);
        setCurrentIndex((prevIndex) => {
          return Math.max(
            Math.min(prevIndex + deltaIndex, totalIndicators - 1),
            0,
          );
        });
      },
      150,
      { leading: true, trailing: false },
    );

    const handleVerticalWheel = (event: WheelEvent) => {
      if (event.deltaX !== 0) return; 
      event.preventDefault();
      debounceVerticalScroll(event);
    };

    container.addEventListener('wheel', handleVerticalWheel, {
      passive: false,
    });

    const cleanUp = () => {
      container.removeEventListener('wheel', handleVerticalWheel);
      if (setStateTimeoutRef.current) clearTimeout(setStateTimeoutRef.current);
    };

    return cleanUp;
  }, [root]);

  // SET CURRENT INDEX to the first visible card index by visibleRatios
  useEffect(() => {
    if (!visibleRatios || visibleRatios.length === 0) return;

    if (setStateTimeoutRef.current) clearTimeout(setStateTimeoutRef.current);

    const firstVisibleIndex = visibleRatios.findIndex((ratio) => ratio > 0);

    // when the first visible card is not fully visible
    // the scrolling hasn't ended
    // we don't set the current index

    if (visibleRatios[firstVisibleIndex] > 0.95) {
      setStateTimeoutRef.current = setTimeout(
        () => {
            console.log('setCurrentIndex', firstVisibleIndex);
            setCurrentIndex(firstVisibleIndex)
        },
        150,
      );
    }
  }, [visibleRatios]);

  // currentIndex: scroll to the current card when currentIndex changes
  useEffect(() => {
    const targetCard = cardRefs.current[currentIndex];
    if (targetCard) {
      if (setStateTimeoutRef.current) {
        console.log('competing maybe')
        clearTimeout(setStateTimeoutRef.current);
    }
      targetCard.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
    }
  }, [currentIndex]);

  console.log('visibleRatios', visibleRatios);

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
      el.tabIndex = visibleRatios[index] > 0 ? 0 : -1; // 设置 tabIndex 为 0 或 -1
    });
  };

  return (
    <div
      className={getClassName(`bpk-card-list-row-rail__${layout}`)}
      data-testid="bpk-card-list-row-rail__content"
      role="region"
      ref={setRoot}
      aria-label="Self defiend Carousel"
    >
      {children.map((card, index) => {
        if (!isValidElement(card)) {
          return null;
        }
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
