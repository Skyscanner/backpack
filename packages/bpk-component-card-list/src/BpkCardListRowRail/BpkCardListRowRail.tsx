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
import { useRef, useState, useEffect } from 'react';
import _ from 'lodash';

import BpkPageIndicator, {
  VARIANT,
} from '../../../bpk-component-page-indicator';
import { cssModules } from '../../../bpk-react-utils';
import {
  ACCESSORY_TYPES,
  LAYOUTS,
  type CardListRowRailProps,
} from '../common-types';

import STYLES from './BpkCardListRowRail.module.scss';

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

  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const setStateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  let accessoryContent;

  const totalIndicators = children.length;
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

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isTouching = false; // 标记是否正在触摸
    let isThrottled = false; // 标记是否处于节流状态

    const handleHorizontalWheel = _.debounce((event: WheelEvent) => {
      if (event.deltaX !== 0) {
        console.log('horizontal wheel');
        console.log('event.deltaX', event.deltaX);
        event.preventDefault(); // 阻止页面的默认滚动行为
        const delta = event.deltaX;
        container.scrollTo({
          left: container.scrollLeft + delta,
          behavior: 'smooth',
        });
      }
    }, 500); // 100ms 的防抖延迟

    const handleVerticalWheel2 = _.throttle(
      (event: WheelEvent) => {
        if (event.deltaY !== 0 && event.deltaX === 0) {
          event.preventDefault();
          const delta = event.deltaY;
          container.scrollTo({
            left: container.scrollLeft + delta,
            behavior: 'smooth',
          });
        }
      },
      10,
      { leading: true, trailing: false },
    ); // 100ms 的防抖延迟

    const handleVerticalWheel = _.debounce(
      (event: WheelEvent) => {
        if (event.deltaY !== 0 && event.deltaX === 0) {
          event.preventDefault(); // 阻止页面的默认滚动行为
          const delta = event.deltaY;
          const deltaIndex =
            delta > 0 ? (delta / 400) | (0 + 1) : (delta / 400) | (0 - 1);
          setCurrentIndex((prevIndex) => {
            return Math.max(
              Math.min(prevIndex + deltaIndex, totalIndicators - 1),
              0,
            );
          });
        }
      },
      200,
      { leading: true, trailing: false },
    );

    const handleScroll = () => {
      if (isTouching) return;

      const containerRect = container.getBoundingClientRect();
      let visibleIndex = -1;

      // 使用 for 循环遍历卡片
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
          visibleIndex = index;
          break; // 找到第一个符合条件的卡片后停止遍历
        }
      }

      // 更新 currentIndex
      if (visibleIndex !== -1) {
        if (setStateTimeoutRef.current)
          clearTimeout(setStateTimeoutRef.current);

        setStateTimeoutRef.current = setTimeout(
          () => setCurrentIndex(visibleIndex),
          150,
        );
      }
    };

    const handleTouchStart = () => {
      isTouching = true; // 标记触摸开始
    };

    // 添加事件监听器
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
  }, [setCurrentIndex]);

  useEffect(() => {
    const targetCard = cardRefs.current[currentIndex];
    if (targetCard) {
      targetCard.scrollIntoView({
        behavior: 'smooth', // 平滑滚动
        block: 'nearest', // 滚动到最近的可见位置
        inline: 'start', // 元素左侧与视图左侧对齐
      });
    }
  }, [currentIndex]); // 当 currentIndex 改变时触发

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
          const cardRefCallback = (el: HTMLDivElement | null) => {
            cardRefs.current[index] = el;
          };

          const onFocus = () => {}; //A11y issue

          return (
            <div
              className={getClassName(
                `bpk-card-list-row-rail__${layout}__card`,
              )}
              ref={cardRefCallback}
              onFocus={onFocus}
            >
              {card}
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
