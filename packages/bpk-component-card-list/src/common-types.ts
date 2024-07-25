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

import type { Dispatch, ReactElement, SetStateAction } from 'react';

export const LAYOUTS = {
  row: 'row',
  grid: 'grid',
  rail: 'rail',
  stack: 'stack'
} as const;


export type layoutDesktopProps = typeof LAYOUTS.row | typeof LAYOUTS.grid;
export type layoutMobileProps = typeof LAYOUTS.stack | typeof LAYOUTS.rail;

export const ACCESSORY_TYPES = {
  Expand: 'expand',
  Button: 'button',
  Pagination: 'pagination',
} as const;

type CardListBaseProps = {
  title: string;
  description?: string;
  cardList: ReactElement[];
  initiallyShownCards?: number;
  layoutDesktop: layoutDesktopProps;
  layoutMobile: layoutMobileProps;
};

type GridProps = {
  layoutDesktop: typeof LAYOUTS.grid;
  accessory?: typeof ACCESSORY_TYPES.Expand | typeof ACCESSORY_TYPES.Button;
};

type RowProps = {
  layoutDesktop: typeof LAYOUTS.row;
  accessory?: typeof ACCESSORY_TYPES.Pagination;
  ariaLabelIndicator: string;
  ariaLabelNext: string;
  ariaLabelPrev: string;
};

type StackProps = {
  layoutMobile: typeof LAYOUTS.stack;
  accessory?: typeof ACCESSORY_TYPES.Expand | typeof ACCESSORY_TYPES.Button;
};

type RailProps = {
  layoutMobile: typeof LAYOUTS.rail;
};

type ButtonProps = {
  buttonText: string;
  onButtonClick: () => void;
  href?: string;
};

type HeaderButtonProps = ButtonProps;
type NoHeaderButton = Partial<ButtonProps>;

type NoAccessory = {
  accessory?: undefined;
};

type ButtonAccessory = {
  accessory: typeof ACCESSORY_TYPES.Button;
} & ButtonProps;

type PaginationAccessory = {
  accessory: typeof ACCESSORY_TYPES.Pagination;
};

type ExpandAccessory = {
  accessory: typeof ACCESSORY_TYPES.Expand;
  expandText: string;
  onButtonClick: () => void;
};

export type CardListProps = CardListBaseProps &
  (GridProps | RowProps) &
  (StackProps | RailProps) &
  (HeaderButtonProps | NoHeaderButton) &
  (NoAccessory | ButtonAccessory | PaginationAccessory | ExpandAccessory);

type CardListGridStackBaseProps = {
  children: ReactElement[];
};

type CardListGridStackExpandModeProps = {
  showContent: () => void;
  hideContent: () => void;
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
} & ExpandAccessory;

export type CardListGridStackProps = CardListGridStackBaseProps &
  (CardListGridStackExpandModeProps | ButtonAccessory | NoAccessory);

export type ExpandProps = {
  children: string | ReactElement;
  collapsed: boolean;
  hideContent: () => void;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
  showContent: () => void;
};
