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

type BpkChipGroup = ReactElement;
export const BpkAccessoryTypes = {
  Expand: 'expand',
  Button: 'button',
  Pagination: 'pagination',
} as const;

type BpkCardListBaseProps = {
  title: string;
  description?: string;
  chipGroup?: BpkChipGroup;
  cardList: ReactElement[];
  initiallyShownCards?: number;
  layoutDesktop: layoutDesktopProps;
  layoutMobile: layoutMobileProps;
};

type HeaderProps = {
  buttonText: string;
  onButtonClick: () => void;
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

type PaginationProps = {
  accessory: typeof BpkAccessoryTypes.Pagination;
};

type ExpandProps = {
  accessory: typeof BpkAccessoryTypes.Expand;
  expandText: string;
  onButtonClick?: () => void;
};

type ButtonProps = {
  accessory: typeof BpkAccessoryTypes.Button;
  buttonText: string;
  onButtonClick: () => void;
};

export type BpkCardListProps = BpkCardListBaseProps &
  (HeaderProps | ButtonProps | null | undefined) &
  (GridProps | RowProps) &
  (StackProps | RailProps) &
  (PaginationProps | ExpandProps | null | undefined);

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
    | BpkCardListGridStackButtonModeProps
    | null
    | undefined
  );

// Test cases
// TODO: Remove
// base + grid + stack + expand
const test1 = {
  title: 'title',
  cardList: [],
  layoutDesktop: 'grid',
  layoutMobile: 'stack',
  accessory: BpkAccessoryTypes.Expand,
  expandText: 'expand',
};

// base + grid + stack + button
const test2 = {
  title: 'title',
  cardList: [],
  layoutDesktop: 'grid',
  layoutMobile: 'stack',
  accessory: BpkAccessoryTypes.Button,
  buttonText: 'button',
  onButtonClick: () => {},
};

// base + grid + stack + no accessory
const test3 = {
  title: 'title',
  cardList: [],
  layoutDesktop: 'grid',
  layoutMobile: 'stack',
};

// base + grid + rail + expand
const test4 = {
  title: 'title',
  cardList: [],
  layoutDesktop: 'grid',
  layoutMobile: 'rail',
  accessory: BpkAccessoryTypes.Expand,
  expandText: 'expand',
};

// base + grid + rail + button
const test5 = {
  title: 'title',
  cardList: [],
  layoutDesktop: 'grid',
  layoutMobile: 'rail',
  accessory: BpkAccessoryTypes.Button,
  buttonText: 'button',
  onButtonClick: () => {},
};

// base + grid + rail + no accessory
const test6 = {
  title: 'title',
  cardList: [],
  layoutDesktop: 'grid',
  layoutMobile: 'rail',
};

// base + row + stack + no accessory
const test7 = {
  title: 'title',
  cardList: [],
  layoutDesktop: 'row',
  layoutMobile: 'stack',
};

// base + row + rail + pagination
const test8 = {
  title: 'title',
  cardList: [],
  layoutDesktop: 'row',
  layoutMobile: 'rail',
  accessory: BpkAccessoryTypes.Pagination,
};

// base + row + rail + no accessory
const test9 = {
  title: 'title',
  cardList: [],
  layoutDesktop: 'row',
  layoutMobile: 'rail',
};

// base + header + grid + stack + expand
const test10 = {
  title: 'title',
  description: 'description',
  buttonText: 'button',
  onButtonClick: () => {},
  cardList: [],
  layoutDesktop: 'grid',
  layoutMobile: 'stack',
  accessory: BpkAccessoryTypes.Expand,
  expandText: 'expand',
};

// base + header + grid + stack + no accessory
const test11 = {
  title: 'title',
  description: 'description',
  buttonText: 'button',
  onButtonClick: () => {},
  cardList: [],
  layoutDesktop: 'grid',
  layoutMobile: 'stack',
};

// base + header + grid + rail + expand
const test12 = {
  title: 'title',
  description: 'description',
  buttonText: 'button',
  onButtonClick: () => {},
  cardList: [],
  layoutDesktop: 'grid',
  layoutMobile: 'rail',
  accessory: BpkAccessoryTypes.Expand,
  expandText: 'expand',
};

// base + header + grid + rail + no accessory
const test13 = {
  title: 'title',
  description: 'description',
  buttonText: 'button',
  onButtonClick: () => {},
  cardList: [],
  layoutDesktop: 'grid',
  layoutMobile: 'rail',
};

// base + header + row + stack + no accessory
const test14 = {
  title: 'title',
  description: 'description',
  buttonText: 'button',
  onButtonClick: () => {},
  cardList: [],
  layoutDesktop: 'row',
  layoutMobile: 'stack',
};

// base + header + row + rail + pagination
const test15 = {
  title: 'title',
  description: 'description',
  buttonText: 'button',
  onButtonClick: () => {},
  cardList: [],
  layoutDesktop: 'row',
  layoutMobile: 'rail',
  accessory: BpkAccessoryTypes.Pagination,
};

// base + header + row + rail + no accessory
const test16 = {
  title: 'title',
  description: 'description',
  buttonText: 'button',
  onButtonClick: () => {},
  cardList: [],
  layoutDesktop: 'row',
  layoutMobile: 'rail',
};
