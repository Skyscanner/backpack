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

import { useState, CSSProperties } from 'react';

import { BpkButtonV2 } from '../../../bpk-component-button';
import { cssModules } from '../../../bpk-react-utils';
import BpkExpand from '../BpkExpand';
import { ACCESSORY_TYPES, type CardListGridStackProps } from '../common-types';

import STYLES from './BpkCardListGridStack.module.scss';

const getClassName = cssModules(STYLES);

const BpkCardListGridStack = (props: CardListGridStackProps) => {
  const {
    accessory,
    buttonText,
    children,
    expandText,
    initiallyShownCards,
    layout,
    onButtonClick,
  } = props;

  const gridStyle = {
    '--initially-shown-cards': initiallyShownCards,
  } as CSSProperties;

  let defaultInitiallyShownCards: number;
  if (accessory === ACCESSORY_TYPES.Expand) {
    defaultInitiallyShownCards = initiallyShownCards;
  } else {
    defaultInitiallyShownCards = children.length;
  }

  const [collapsed, setCollapsed] = useState(true);
  // const [visibleCards, setVisibleCards] = useState(
  //   children.slice(0, defaultInitiallyShownCards),
  // );

  const showExpand = children.length > defaultInitiallyShownCards;
  const initiallCards = children.slice(0, defaultInitiallyShownCards);
  const restCards = children.slice(defaultInitiallyShownCards + 1, children.length);

  const showContent = () => {
    // setVisibleCards(children);
    setCollapsed(false);
    onButtonClick?.();
  };

  const hideContent = () => {
    // setVisibleCards(children.slice(0, initiallyShownCards));
    setCollapsed(true);
    onButtonClick?.();
  };

  const expandAccessoryContent = (
          <BpkExpand
            showContent={showContent}
            hideContent={hideContent}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          >
            {expandText || ''}
          </BpkExpand>
        );

  const buttonAccessoryContent = (
        <div
          className={getClassName('bpk-card-list-grid-stack__accessory__button')}
        >
          <BpkButtonV2 onClick={onButtonClick}>{buttonText}</BpkButtonV2>
        </div>
      );

  return (
    <div
      className={getClassName('bpk-card-list-grid-stack')}
      data-testid="bpk-card-list-grid-stack"
    >
      <div
        className={getClassName(`bpk-card-list-grid-stack__${layout}`)}
        data-testid="bpk-card-list-grid-stack__content"
        style={gridStyle}
      >
        {initiallCards}
      </div>

      {accessory === ACCESSORY_TYPES.Button && buttonAccessoryContent}

      {showExpand && (
          <>
            {collapsed === true && expandAccessoryContent}
            <div
              className={getClassName(`bpk-card-list-grid-stack__${layout}`)}
              data-testid="bpk-card-list-grid-stack__content"
              style={gridStyle}
            >
              {collapsed === false && restCards}
            </div>
            {collapsed === false && expandAccessoryContent}
          </>
        )}
    </div>
  );
};

export default BpkCardListGridStack;
