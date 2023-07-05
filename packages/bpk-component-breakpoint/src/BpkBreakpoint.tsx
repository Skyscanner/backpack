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

import type { ReactNode } from 'react';
import MediaQuery from 'react-responsive';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import TOKENS from '@skyscanner/bpk-foundations-web/tokens/base.common';

const BREAKPOINTS = {
  SMALL_MOBILE: TOKENS.breakpointQuerySmallMobile,
  MOBILE: TOKENS.breakpointQueryMobile,
  SMALL_TABLET: TOKENS.breakpointQuerySmallTablet,
  SMALL_TABLET_ONLY: TOKENS.breakpointQuerySmallTabletOnly,
  TABLET: TOKENS.breakpointQueryTablet,
  TABLET_ONLY: TOKENS.breakpointQueryTabletOnly,
  ABOVE_MOBILE: TOKENS.breakpointQueryAboveMobile,
  ABOVE_TABLET: TOKENS.breakpointQueryAboveTablet,
  ABOVE_DESKTOP: TOKENS.breakpointQueryAboveDesktop,
  DESKTOP_ONLY: TOKENS.breakpointQueryDesktopOnly,
} as const;

type Props = {
  children: ReactNode | ((matches: boolean) => ReactNode | null);
  query: string | (typeof BREAKPOINTS)[keyof typeof BREAKPOINTS];
  legacy?: boolean;
};

const BpkBreakpoint = ({ children, legacy = false, query }: Props) => {
  if (!legacy && !Object.values(BREAKPOINTS).includes(query)) {
    console.warn(
      `Invalid query ${query}. Use one of the supported queries or pass the legacy prop.`,
    );
  }
  return <MediaQuery query={query}>{children}</MediaQuery>;
};

export { BREAKPOINTS };
export default BpkBreakpoint;
