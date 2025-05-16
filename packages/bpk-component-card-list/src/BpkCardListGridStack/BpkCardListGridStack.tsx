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
import {
  ACCESSORY_DESKTOP_TYPES,
  ACCESSORY_MOBILE_TYPES,
  type CardListGridStackProps,
} from '../common-types';

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
  let showExpand: boolean;
  if (
    accessory === (ACCESSORY_DESKTOP_TYPES.Expand ||
    ACCESSORY_MOBILE_TYPES.Expand)
  ) {
    defaultInitiallyShownCards = initiallyShownCards;
    showExpand = children.length > defaultInitiallyShownCards;
  } else {
    defaultInitiallyShownCards = children.length;
    showExpand = false;
  }

  const [collapsed, setCollapsed] = useState(true);
  const showButton = accessory === ACCESSORY_DESKTOP_TYPES.Button;
  const initiallCards = children.slice(0, defaultInitiallyShownCards);
  const restCards = children.slice(
    defaultInitiallyShownCards + 1,
    children.length,
  );

  const showContent = () => {
    setCollapsed(false);
    onButtonClick?.();
  };

  const hideContent = () => {
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

      {showButton && buttonAccessoryContent}

      {showExpand && (
        // This is for A11y considerations
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
