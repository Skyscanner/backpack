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

import type { ReactElement, Dispatch, SetStateAction } from 'react';

const LAYOUTS = {
  grid: 'grid',
  stack: 'stack',
  row: 'row',
  rail: 'rail',
} as const;

type LayoutDesktop = typeof LAYOUTS.row | typeof LAYOUTS.grid;
type LayoutMobile = typeof LAYOUTS.rail | typeof LAYOUTS.stack;

const ACCESSORY_DESKTOP_TYPES = {
  pagination: 'pagination',
  expand: 'expand',
  button: 'button',
} as const;

const ACCESSORY_MOBILE_TYPES = {
  expand: 'expand',
  button: 'button',
} as const;

type ExpandProps = {
  children: string | ReactElement;
  collapsed: boolean;
  onExpandToggle: () => void;
};

type CardListBaseProps = {
  title: string;
  description?: string;
  cardList: ReactElement[];
  layoutMobile: LayoutMobile;
  layoutDesktop: LayoutDesktop;
  accessoryDesktop?: (typeof ACCESSORY_DESKTOP_TYPES)[keyof typeof ACCESSORY_DESKTOP_TYPES]; // added
  accessoryMobile?: (typeof ACCESSORY_MOBILE_TYPES)[keyof typeof ACCESSORY_MOBILE_TYPES]; // added
  initiallyShownCardsDesktop?: number;
  initiallyShownCardsMobile?: number;
  chipGroup?: ReactElement;
  buttonContent?: React.ReactNode;
  onButtonClick?: () => void;
  onExpandClick?: () => void; // added
  buttonHref?: string; // added
  expandText?: string;
};

type CardListGridStackProps = {
  children: ReactElement[];
  initiallyShownCards: number;
  layout: typeof LAYOUTS.grid | typeof LAYOUTS.stack;
  accessory?:
    | typeof ACCESSORY_DESKTOP_TYPES.expand
    | typeof ACCESSORY_DESKTOP_TYPES.button
    | typeof ACCESSORY_MOBILE_TYPES.expand
    | typeof ACCESSORY_MOBILE_TYPES.button;
  expandText?: string;
  buttonContent?: React.ReactNode;
  onButtonClick?: () => void;
  onExpandClick?: () => void;
  buttonHref?: string;
};

type CardListRowRailProps = {
  children: Array<ReactElement<HTMLDivElement | HTMLAnchorElement>>;
  initiallyShownCards: number;
  layout: typeof LAYOUTS.row | typeof LAYOUTS.rail;
  accessory?: typeof ACCESSORY_DESKTOP_TYPES.pagination;
  isMobile?: boolean;
};

type CardListCarouselProps = {
  children: Array<ReactElement<HTMLDivElement | HTMLAnchorElement>>;
  initiallyShownCards: number;
  layout: typeof LAYOUTS.row | typeof LAYOUTS.rail;
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  isMobile?: boolean;
};

type CardListProps = CardListBaseProps;

export default CardListProps;
export { LAYOUTS, ACCESSORY_DESKTOP_TYPES, ACCESSORY_MOBILE_TYPES };
export type {
  LayoutDesktop,
  LayoutMobile,
  CardListGridStackProps,
  CardListRowRailProps,
  CardListCarouselProps,
  ExpandProps,
};
