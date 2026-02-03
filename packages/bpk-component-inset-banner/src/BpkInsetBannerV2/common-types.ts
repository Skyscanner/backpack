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

export const VARIANT = {
  onLight: 'on-light',
  onDark: 'on-dark',
};

type callToActionType = {
  text?: string;
  bottomSheetContent: Array<{
    title: string;
    description: string;
  }>;
  bottomSheetTitle?: string;
  buttonCloseLabel?: string;
  bottomSheetLabel?: string;
  bottomSheetId?: string;
  bottomSheetWidth?: string;
  bottomSheetMarginStart?: string;
  bottomSheetMarginEnd?: string;
  bottomSheetA11yLabel?: string;
  labelTitle?: boolean;
  closeBtnIcon?: boolean;
  zIndexCustom?: number;
};

export type CommonProps = {
  accessibilityLabel?: string;
  backgroundColor?: string;
  callToAction?: callToActionType & {
    bottomSheetContent: callToActionType['bottomSheetContent'];
  };
  logo: string;
  subheadline?: string;
  title?: string;
  variant?: (typeof VARIANT)[keyof typeof VARIANT];
  image?: {
    src: string;
    altText: string;
    aspectRatio: number;
  };
  adInfoA11yLabel?: string;
  ariaAdScenicA11yLabel?: string;
};
