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

import BpkPageIndicator, {
  VARIANT,
} from '../../../bpk-component-page-indicator';
import { cssModules } from '../../../bpk-react-utils';
import { ACCESSORY_TYPES, LAYOUTS, type CardListRowRailProps } from '../common-types';


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

  const [currentIndex, setCurrentIndex] = useState(0); // 当前可见卡片的索引
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]); // 存储每个卡片的引用
  const setStateTimeoutRef = useRef<NodeJS.Timeout | null>(null); // 用于延迟设置 currentIndex 的计时器

  let accessoryContent;
  if (layout === LAYOUTS.row &&accessory === ACCESSORY_TYPES.Pagination) {
    accessoryContent = (
      <BpkPageIndicator
        currentIndex={currentIndex}
        totalIndicators={children.length}
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

    const handleWheel = (event: WheelEvent) => {

      const sensitivity = 2;
      const touchBarRatio = 40; // for the sensitivity issue


      const adjustedDeltaX = event.deltaX * touchBarRatio * sensitivity;
      // if (event.deltaX > -100 && event.deltaX < 100) {
      //   adjustedDeltaX = 0;
      // }
   
      console.log('DeltaMode', event.deltaMode,'DeltaX:', adjustedDeltaX, 'DeltaY:', event.deltaY);

      event.preventDefault(); // 阻止页面的默认滚动行为
      
      
      const delta =
        event.deltaX !== 0
          ? adjustedDeltaX 
          : event.deltaY * sensitivity;

      // 滚动容器
      container.scrollTo({
        left: container.scrollLeft + delta, // 将垂直滚动转换为横向滚动
        behavior: 'smooth', // 平滑滚动
      });
    };

    const handleScroll = () => {
      if (isTouching) return;

      const containerRect = container.getBoundingClientRect();
      let visibleIndex = -1;

      // 使用 for 循环遍历卡片
      for (let index = 0; index < cardRefs.current.length; index += 1) {
        const card = cardRefs.current[index];
        if (!card) {
          // Skip the iteration without using `continue`
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
    // container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('scroll', handleScroll);

    // 清理事件监听器
    // return () => {
    //   container.removeEventListener('touchstart', handleTouchStart);
    //   container.removeEventListener('touchend', handleTouchEnd);
    //   container.removeEventListener('wheel', handleWheel);
    //   container.removeEventListener('scroll', handleScroll);
    //   if (setStateTimeoutRef.current) clearTimeout(setStateTimeoutRef.current); // 清除计时器
    // };
  }, [setCurrentIndex]);

  useEffect(() => {
    console.log('index to card');
    // 根据 currentIndex 滚动到对应的卡片
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

          const onFocus = () => {
            
          }

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
