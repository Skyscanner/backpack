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

const LAYOUTS = {
  grid: 'grid',
  stack: 'stack',
} as const;

type DesktopLayouts = typeof LAYOUTS.grid;
type MobileLayouts = typeof LAYOUTS.stack;

const ACCESSORY_TYPES = {
  Expand: 'expand',
  Button: 'button',
} as const;

type ExpandProps = {
  children: string | ReactElement;
  collapsed: boolean;
  hideContent: () => void;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
  showContent: () => void;
};

type CardListBaseProps = {
  title: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  buttonHref?: string;
  layoutMobile: MobileLayouts;
  layoutDesktop: DesktopLayouts;
  initiallyShownCards?: number;
  cardList: ReactElement[];
  expandText?: string;
  accessory?: (typeof ACCESSORY_TYPES)[keyof typeof ACCESSORY_TYPES];
};

type CardListGridStackProps = {
  children: ReactElement[];
  accessory?: typeof ACCESSORY_TYPES.Expand | typeof ACCESSORY_TYPES.Button;
  expandText?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  initiallyShownCards: number;
  layout: typeof LAYOUTS.grid | typeof LAYOUTS.stack;
};

type CardListProps = CardListBaseProps;

export default CardListProps;
export { LAYOUTS, ACCESSORY_TYPES };
export type {
  DesktopLayouts,
  MobileLayouts,
  CardListGridStackProps,
  ExpandProps,
};
