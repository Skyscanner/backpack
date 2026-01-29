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
import { Children, useState } from 'react';

import BpkButton from '../../../bpk-component-button';
import { cssModules } from '../../../bpk-react-utils';
import ExpandAccessoryContent from '../BpkExpand/ExpandAccessoryContent';
import { ACCESSORY_DESKTOP_TYPES } from '../common-types';

import type { CardListGridStackProps } from '../common-types';

import STYLES from './BpkCardListGridStack.module.scss';

const getClassName = cssModules(STYLES);

const BpkCardListGridStack = (props: CardListGridStackProps) => {
  const {
    accessory,
    buttonContent,
    buttonHref,
    children,
    expandText,
    initiallyShownCards,
    layout,
    onButtonClick,
    onExpandClick,
  } = props;

  const gridStyle = {
    '--initially-shown-cards': initiallyShownCards,
  } as CSSProperties;

  const isExpandType: boolean = accessory === ACCESSORY_DESKTOP_TYPES.expand; // or ACCESSORY_MOBILE_TYPES.expand
  const defaultInitiallyShownCards = isExpandType
    ? initiallyShownCards
    : children.length;
  const showExpand: boolean = isExpandType
    ? children.length > defaultInitiallyShownCards
    : false;

  const [collapsed, setCollapsed] = useState(true);
  const showButton = accessory === ACCESSORY_DESKTOP_TYPES.button;
  const childrenArray = Children.toArray(children);
  const initialCards = childrenArray.slice(0, defaultInitiallyShownCards);
  const restCards = childrenArray.slice(
    defaultInitiallyShownCards,
    childrenArray.length,
  );

  const onExpandToggle = () => {
    setCollapsed((prev) => !prev);
    onExpandClick?.();
  };

  const expandAccessoryContent = (
    <ExpandAccessoryContent collapsed={collapsed} onExpandToggle={onExpandToggle}>
      {expandText || ''}
    </ExpandAccessoryContent>
  );

  const buttonAccessoryContent = (
    <div
      className={getClassName('bpk-card-list-grid-stack__accessory__button')} {...getDataComponentAttribute('CardListGridStack')}
    >
      <BpkButton
        data-testid="bpk-card-list__accessory-button"
        onClick={onButtonClick}
        href={buttonHref}
      >
        {buttonContent}
      </BpkButton>
    </div>
  );

  return (
    <div
      className={getClassName('bpk-card-list-grid-stack')}
      data-testid="bpk-card-list-grid-stack"
    >
      <div
        className={getClassName(`bpk-card-list-grid-stack__${layout}`)}
        data-testid="bpk-card-list-grid-stack__initial-content"
        style={gridStyle}
      >
        {initialCards}
      </div>

      {showButton && buttonAccessoryContent}

      {showExpand && (
        // This is for A11y considerations
        <>
          {collapsed === true && expandAccessoryContent}
          <div
            className={getClassName(`bpk-card-list-grid-stack__${layout}`)}
            data-testid="bpk-card-list-grid-stack__expanded-content"
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
