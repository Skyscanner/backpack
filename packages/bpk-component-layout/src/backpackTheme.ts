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

/**
 * Backpack spacing token names mapped to numeric values
 * These are kept for backward compatibility but are no longer used internally.
 * Layout components now use CSS Modules with static CSS classes.
 */
export const BPK_SPACING_TOKENS = {
  none: 0, // bpk-spacing-none (0px)
  sm: 1, // bpk-spacing-sm (4px)
  md: 2, // bpk-spacing-md (8px)
  base: 4, // bpk-spacing-base (16px)
  lg: 6, // bpk-spacing-lg (24px)
  xl: 8, // bpk-spacing-xl (32px)
  xxl: 10, // bpk-spacing-xxl (40px)
  xxxl: 16, // bpk-spacing-xxxl (64px)
  xxxxl: 24, // bpk-spacing-xxxxl (96px)
} as const;

/**
 * Backpack breakpoint names mapped to string values
 * These are kept for backward compatibility but are no longer used internally.
 * Layout components now use CSS Modules with static CSS classes.
 */
export const BPK_BREAKPOINT_TOKENS = {
  smallMobile: 'sm', // Backpack SMALL_MOBILE
  mobile: 'md', // Backpack MOBILE
  smallTablet: 'lg', // Backpack SMALL_TABLET
  tablet: 'xl', // Backpack TABLET
  desktop: '2xl', // Backpack DESKTOP
} as const;

/**
 * @deprecated This export is kept for backward compatibility only.
 * With CSS Modules implementation, BpkProvider and theme configuration are no longer needed.
 * All layout components now use static CSS classes compiled at build time.
 *
 * This object is a stub and does nothing. You can safely remove BpkProvider from your code.
 */
export const backpackTheme = {} as any;

/**
 * @deprecated This export is kept for backward compatibility only.
 * With CSS Modules implementation, BpkProvider and theme configuration are no longer needed.
 * All layout components now use static CSS classes compiled at build time.
 *
 * This object is a stub and does nothing. You can safely remove BpkProvider from your code.
 */
export const backpackSystem = {} as any;
