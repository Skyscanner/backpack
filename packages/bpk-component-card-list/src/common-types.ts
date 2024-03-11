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

export type layoutDesktopProps = 'row' | 'grid';
export type layoutMobileProps = 'rail' | 'stack';

export const BpkAccessoryTypes = {
  Expand: 'expand',
  Button: 'button',
  Pagination: 'pagination',
} as const;

type BpkCardListBaseProps = {
  title: string;
  description?: string;
  cardList: ReactElement[];
  initiallyShownCards?: number;
  layoutDesktop: layoutDesktopProps;
  layoutMobile: layoutMobileProps;
};

type GridProps = {
  layoutDesktop: 'grid';
  accessory?: typeof BpkAccessoryTypes.Expand | typeof BpkAccessoryTypes.Button;
};

type RowProps = {
  layoutDesktop: 'row';
  accessory?: typeof BpkAccessoryTypes.Pagination;
};

type StackProps = {
  layoutMobile: 'stack';
  accessory?: typeof BpkAccessoryTypes.Expand | typeof BpkAccessoryTypes.Button;
};

type RailProps = {
  layoutMobile: 'rail';
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
  accessory: typeof BpkAccessoryTypes.Button;
} & ButtonProps;

type PaginationAccessory = {
  accessory: typeof BpkAccessoryTypes.Pagination;
};

type ExpandAccessory = {
  accessory: typeof BpkAccessoryTypes.Expand;
  expandText: string;
  onButtonClick: () => void;
};

export type BpkCardListProps = BpkCardListBaseProps &
  (GridProps | RowProps) &
  (StackProps | RailProps) &
  (HeaderButtonProps | NoHeaderButton) &
  (NoAccessory | ButtonAccessory | PaginationAccessory | ExpandAccessory);

interface BpkCardListGridStackBaseProps {
  children: ReactElement[];
  showContent: () => void;
  hideContent: () => void;
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
}

type BpkCardListGridStackExpandModeProps = {
  accessory: typeof BpkAccessoryTypes.Expand;
  expandText: string;
  onButtonClick: () => void;
};

type BpkCardListGridStackButtonModeProps = {
  accessory: typeof BpkAccessoryTypes.Button;
  buttonText: string;
  onButtonClick: () => void;
};

export type BpkCardListGridStackProps = BpkCardListGridStackBaseProps &
  (
    | BpkCardListGridStackExpandModeProps
    | (BpkCardListGridStackButtonModeProps & { expandText?: undefined })
    | (NoAccessory & { onButtonClick?: undefined; expandText?: undefined })
  );
