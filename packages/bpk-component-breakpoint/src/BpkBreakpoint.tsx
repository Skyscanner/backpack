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

import { useEffect, useMemo, useState } from 'react';
import type { ReactElement, ReactNode } from 'react';

import { breakpoints } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import useMediaQuery from './useMediaQuery';

const BREAKPOINTS = {
  SMALL_MOBILE: breakpoints.breakpointQuerySmallMobile,
  MOBILE: breakpoints.breakpointQueryMobile,
  SMALL_TABLET: breakpoints.breakpointQuerySmallTablet,
  SMALL_TABLET_ONLY: breakpoints.breakpointQuerySmallTabletOnly,
  TABLET: breakpoints.breakpointQueryTablet,
  TABLET_ONLY: breakpoints.breakpointQueryTabletOnly,
  ABOVE_MOBILE: breakpoints.breakpointQueryAboveMobile,
  ABOVE_TABLET: breakpoints.breakpointQueryAboveTablet,
  ABOVE_DESKTOP: breakpoints.breakpointQueryAboveDesktop,
  DESKTOP_ONLY: breakpoints.breakpointQueryDesktopOnly,
} as const;
type Props = {
  /**
   * The content to render when the breakpoint matches.
   */
  children: ReactNode | ((matches: boolean) => ReactNode | null);
  query: string | (typeof BREAKPOINTS)[keyof typeof BREAKPOINTS];
  legacy?: boolean;
  matchSSR?: boolean;
};

const useLegacyWarning = (query: string, legacy: boolean, isClient: boolean) =>
  useMemo(() => {
    if (isClient) {
      // @ts-expect-error invariant check. query: string matching limited BREAKPOINTS string values
      if (!legacy && !Object.values(BREAKPOINTS).includes(query)) {
        console.warn(
          `Invalid query ${query}. Use one of the supported queries or pass the legacy prop.`,
        );
      }
    }
  }, [isClient, legacy, query]);

const BpkBreakpoint = ({
  children,
  legacy = false,
  matchSSR = false,
  query,
}: Props) => {
  /**
   * The useEffect and useState combination forces BpkBreakpoint to re-render.
   * Consumers of BpkBreakpoint have become reliant on this behaviour particularly when using BpkBreakpoint within a SSR'd application.
   * This shouldn't be removed without a breaking change & understanding how to migrate consumers away from this reliance.
   */
  const [, updateState] = useState({});
  useEffect(() => {
    updateState({}); // force re-render when on client
  }, []);
  const matches = useMediaQuery(query, matchSSR);
  const isClient = typeof window !== 'undefined';
  useLegacyWarning(query, legacy, isClient);
  if (isClient) {
    if (typeof children === 'function') {
      return children(matches) as ReactElement;
    }
    return matches ? (children as ReactElement) : null;
  }

  if (typeof children === 'function') {
    return children(matchSSR) as ReactElement;
  }
  return matchSSR ? (children as ReactElement) : null;
};
export { BREAKPOINTS };
export default BpkBreakpoint;
