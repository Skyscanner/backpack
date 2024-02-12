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
};

type NoAccessory = {
  accessory?: undefined;
};

type ButtonAccessory = {
  accessory: typeof BpkAccessoryTypes.Button;
  buttonText: string;
  onButtonClick: () => void;
};

type PaginationAccessory = {
  accessory: typeof BpkAccessoryTypes.Pagination;
};

type ExpandAccessory = {
  accessory: typeof BpkAccessoryTypes.Expand;
  expandText: string;
  onButtonClick: () => void;
};

type DontGiveMe<T extends {}, O extends {}> = {
  [Key in Exclude<keyof T, keyof O>]?: undefined;
};

type MaybeWithButtonProps<T> = T extends {}
  ? (DontGiveMe<ButtonProps, T> & T) | (T & ButtonProps)
  : never;

export type BpkCardListProps = BpkCardListBaseProps &
  (GridProps | RowProps) &
  (StackProps | RailProps) &
  MaybeWithButtonProps<
    NoAccessory | ButtonAccessory | PaginationAccessory | ExpandAccessory
  >;
/*
  (
    | (NoAccessory | ButtonAccessory | PaginationAccessory | ExpandAccessory)
    | (NoAccessory & ButtonProps)
    | (ButtonAccessory & ButtonProps)
    | (PaginationAccessory & ButtonProps)
    | (ExpandAccessory & ButtonProps)
  );
  */

type VeryExplicitBpkCardListProps =
  | (BpkCardListBaseProps & GridProps & RailProps & ButtonAccessory)
  | (BpkCardListBaseProps & GridProps & RailProps & ExpandAccessory)
  | (BpkCardListBaseProps & GridProps & RailProps & PaginationAccessory)
  | (BpkCardListBaseProps & GridProps & RailProps)
  | (BpkCardListBaseProps & GridProps & StackProps & ButtonAccessory)
  | (BpkCardListBaseProps & GridProps & StackProps & ExpandAccessory)
  | (BpkCardListBaseProps & GridProps & StackProps)
  | (BpkCardListBaseProps & RowProps & RailProps & ExpandAccessory)
  | (BpkCardListBaseProps & RowProps & RailProps & PaginationAccessory)
  | (BpkCardListBaseProps & RowProps & RailProps)
  | (BpkCardListBaseProps & RowProps & StackProps & ExpandAccessory)
  | (BpkCardListBaseProps & RowProps & StackProps)

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

// Test cases
// TODO: Remove
// BpkCardListGridStackProps
// base + expand
const BpkCardListGridStackTest1: BpkCardListGridStackProps = {
  children: [],
  showContent: () => {},
  hideContent: () => {},
  collapsed: false,
  setCollapsed: () => {},
  accessory: BpkAccessoryTypes.Expand,
  expandText: 'expand',
  onButtonClick: () => {},
};

// base + button
const BpkCardListGridStackTest2: BpkCardListGridStackProps = {
  children: [],
  showContent: () => {},
  hideContent: () => {},
  collapsed: false,
  setCollapsed: () => {},
  accessory: BpkAccessoryTypes.Button,
  buttonText: 'button',
  onButtonClick: () => {},
};

// base + no accessory
const BpkCardListGridStackTest3: BpkCardListGridStackProps = {
  children: [],
  showContent: () => {},
  hideContent: () => {},
  collapsed: false,
  setCollapsed: () => {},
};

const BpkCardListGridStackTest4: BpkCardListGridStackProps = {
  children: [],
  showContent: () => {},
  hideContent: () => {},
  collapsed: false,
  setCollapsed: () => {},
  accessory: undefined,

};
