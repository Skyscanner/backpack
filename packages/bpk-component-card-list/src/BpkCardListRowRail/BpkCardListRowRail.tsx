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
  ReactNode,
  ReactElement,
  cloneElement,
  isValidElement,
  Children,
  JSXElementConstructor,
} from 'react';
import _, { find, set, update } from 'lodash';

import BpkPageIndicator from '../../../bpk-component-page-indicator';
import BpkSnippet from '../../../bpk-component-snippet';
import { cssModules } from '../../../bpk-react-utils';
import {
  ACCESSORY_TYPES,
  LAYOUTS,
  type CardListRowRailProps,
} from '../common-types';

import STYLES from './BpkCardListRowRail.module.scss';
import { number } from 'prop-types';

const getClassName = cssModules(STYLES);

const BpkCardListRowRail = (props: CardListRowRailProps) => {
  const {
    accessory,
    buttonText,
    children,
    expandText,
    initiallyShownCards,
    layout,
    onButtonClick,
  } = props;

  const totalIndicators = children.length;
  const [allVisibleIndex, setAllVisibleIndex] = useState<Array<number>>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const setStateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const shownNumberStyle = {
    flex: `0 0 calc(100% / ${initiallyShownCards})`,
  } as CSSProperties;

  let accessoryContent = null;

  if (layout === LAYOUTS.row && accessory === ACCESSORY_TYPES.Pagination) {
    accessoryContent = (
      <BpkPageIndicator
        currentIndex={currentIndex}
        totalIndicators={totalIndicators}
        onClick={(_e, index) => {
          setCurrentIndex(index);
        }}
        showNav
        indicatorLabel="Go to slide"
        prevNavLabel="Previous slide"
        nextNavLabel="Next slide"
      />
    );
  }

  const findAllVisibleIndex = (): number[] => {
    if (!containerRef.current) {
      return [];
    }
    const containerRect = containerRef.current.getBoundingClientRect();
    let allVisibleIndex: Array<number> = [];
    for (let index = 0; index < cardRefs.current.length; index += 1) {
      const card = cardRefs.current[index];
      if (!card) {
        break;
      }
      const cardRect = card.getBoundingClientRect();
      if (
        cardRect.left >= containerRect.left - 1 &&
        cardRect.left < containerRect.right
      ) {
        allVisibleIndex.push(index);
      }
    }
    return allVisibleIndex;
  };

  // intialize all visually visible cards' indices
  useEffect(() => {
    findAllVisibleIndex(); // initialize
  }, []);

  // handle scroll events, and update the visible indices while scrolling
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isTouching = false;

    const handleHorizontalWheel = _.debounce((event: WheelEvent) => {
      event.preventDefault();
      if (event.deltaX !== 0) {
        const delta = event.deltaX;
        container.scrollTo({
          left: container.scrollLeft + delta,
          behavior: 'smooth',
        });
      }
    }, 500);

    // const handleVerticalWheel2 = _.throttle(
    //   (event: WheelEvent) => {
    //     event.preventDefault();
    //     if (event.deltaY !== 0 && event.deltaX === 0) {
    //       const delta = event.deltaY;
    //       container.scrollTo({
    //         left: container.scrollLeft + delta,
    //         behavior: 'smooth',
    //       });
    //     }
    //   },
    //   10,
    //   { leading: true, trailing: false },
    // ); // 100ms 的防抖延迟

    const debounceVerticalScroll = _.debounce(
      (event: WheelEvent) => {
        const delta = event.deltaY;
        const deltaIndex =
          delta > 0 ? (delta / 400) | (0 + 1) : (delta / 400) | (0 - 1);
        setCurrentIndex((prevIndex) => {
          return Math.max(
            Math.min(prevIndex + deltaIndex, totalIndicators - 1),
            0,
          );
        });
      },
      200,
      { leading: true, trailing: false },
    );

    const handleVerticalWheel = (event: WheelEvent) => {
      if (event.deltaY !== 0 && event.deltaX === 0) {
        event.preventDefault();
        debounceVerticalScroll(event);
      }
    };

    const handleScroll = () => {
      if (isTouching) return;
      const currentAllVisibleIndex = findAllVisibleIndex();
      if (allVisibleIndex !== currentAllVisibleIndex) {
        setAllVisibleIndex(currentAllVisibleIndex);
      }
    };

    const handleTouchStart = () => {
      isTouching = true; // 标记触摸开始
    };

    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('wheel', handleHorizontalWheel, {
      passive: false,
    });
    container.addEventListener('wheel', handleVerticalWheel, {
      passive: false,
    });
    container.addEventListener('scroll', handleScroll);

    const cleanUp = () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('wheel', handleHorizontalWheel);
      container.removeEventListener('wheel', handleVerticalWheel);
      container.removeEventListener('scroll', handleScroll);
      if (setStateTimeoutRef.current) clearTimeout(setStateTimeoutRef.current);
    };

    return cleanUp;
  }, []);

  useEffect(() => {
    if (!allVisibleIndex || allVisibleIndex.length === 0) return;

    const firstVisibleIndex = findAllVisibleIndex()[0];
    if (setStateTimeoutRef.current) clearTimeout(setStateTimeoutRef.current);
    setStateTimeoutRef.current = setTimeout(
      () => setCurrentIndex(firstVisibleIndex),
      150,
    );
  }, [allVisibleIndex]);

  useEffect(() => {
    const targetCard = cardRefs.current[currentIndex];
    if (targetCard) {
      targetCard.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
    }
  }, [currentIndex]);

  function isTabValidElement(
    element: React.ReactNode,
  ): element is ReactElement<
    HTMLDivElement | HTMLAnchorElement,
    string | JSXElementConstructor<any>
  > {
    // Check if the element is a valid React element
    if (!isValidElement(element)) {
      return false;
    }

    if (typeof element.type === 'string') {
      return element.type === 'div' || element.type === 'a';
    }

    return false;
  }

  const updateTabIndex = (
    element: ReactElement<
      HTMLDivElement | HTMLAnchorElement,
      string | JSXElementConstructor<any>
    >,
    tabIndex: number,
  ): ReactNode => {
    if (typeof element === 'string' || typeof element === 'function') {
      return null; // 如果是字符串或函数，直接返回
    }

    if (
      element instanceof HTMLDivElement ||
      element instanceof HTMLAnchorElement
    ) {
      const updatedElement = cloneElement(element, {
        tabIndex: element.tabIndex === 0 ? tabIndex : element.tabIndex,
      });

      if (updatedElement.props?.children) {
        const children = updatedElement.props.children;
        // 处理 children 是字符串
        if (typeof children === 'string' || typeof element === 'function') {
          return null;
        }

        // 处理 children 是数组
        if (Array.isArray(children)) {
          const updatedChildren = Children.map(children, (child) => {
            if (!isValidElement(child) || !isTabValidElement(child)) {
              return child; // 如果不是有效的 React 元素，直接返回
            }
            return updateTabIndex(child, tabIndex); // 递归更新 tabIndex
          });
          return cloneElement(updatedElement, { children: updatedChildren });
        }

        // // 处理 children 是单个元素
        if (!isValidElement(children) || !isTabValidElement(children)) {
          const updatedChildren = children; // 如果不是有效的 React 元素，直接返回
          return cloneElement(updatedElement, { children: updatedChildren });
        }

        if (isValidElement(children) && isTabValidElement(children)) {
          const updatedChildren = updateTabIndex(children, tabIndex); // 递归更新 tabIndex
          return cloneElement(updatedElement, { children: updatedChildren });
        }

        // return cloneElement(updatedElement, { children: updatedChildren });
      }
    }
  };

  console.log('allVisibleIndex', allVisibleIndex);

  return (
    <div
      className={getClassName('bpk-card-list-row-rail')}
      data-testid="bpk-card-list-row-rail')}"
    >
      <div
        className={getClassName(`bpk-card-list-row-rail__${layout}`)}
        data-testid="bpk-card-list-row-rail__content"
        ref={containerRef}
      >
        {children.map((card, index) => {
          if (!isValidElement(card)) {
            return null; // Skip invalid elements
          }
          const cardRefCallback = (el: HTMLDivElement | null) => {
            cardRefs.current[index] = el;
          };

          const updatedCard = updateTabIndex(
            card,
            allVisibleIndex.includes(index) ? 0 : -1,
          );

          return (
            <div
              className={getClassName(
                `bpk-card-list-row-rail__${layout}__card`,
              )}
              ref={cardRefCallback}
              style={shownNumberStyle}
            >
              {cloneElement(card, { tabIndex: allVisibleIndex.includes(index) ? 0 : -1 })}
              {/* {updatedCard}x */}
            </div>
          );
        })}
      </div>

      <div
        className={getClassName(`bpk-card-list-row-rail__accessory`)}
        data-testid="bpk-card-list-row-rail__accessory"
      >
        {accessoryContent}
      </div>
    </div>
  );
};

export default BpkCardListRowRail;
