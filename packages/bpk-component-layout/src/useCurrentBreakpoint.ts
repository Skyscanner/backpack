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

import { useEffect, useState } from 'react';

/**
 * Breakpoint min-widths in ascending order (mobile-first).
 * Must match the breakpoint definitions in tokens.ts
 * and the breakpoint mapping in tokens.ts.
 */
const BREAKPOINTS: ReadonlyArray<{ key: string; query: string }> = [
  { key: 'sm', query: '(min-width: 20rem)' },       // 320px — small-mobile
  { key: 'md', query: '(min-width: 22.5rem)' },      // 360px — mobile
  { key: 'lg', query: '(min-width: 32.0625rem)' },   // 513px — small-tablet
  { key: 'xl', query: '(min-width: 48.0625rem)' },   // 769px — tablet
  { key: '2xl', query: '(min-width: 64.0625rem)' },  // 1025px — desktop
];

function getCurrentBreakpoint(): string {
  if (typeof window === 'undefined' || !window.matchMedia) return 'base';
  let active = 'base';
  for (const { key, query } of BREAKPOINTS) {
    if (window.matchMedia(query).matches) active = key;
  }
  return active;
}

/**
 * Returns the current active breakpoint key based on viewport width.
 * Uses `window.matchMedia` listeners to re-render when breakpoints change.
 * SSR-safe: returns `'base'` when `window` is unavailable.
 *
 * @returns {string} The active breakpoint key ('base' | 'sm' | 'md' | 'lg' | 'xl' | '2xl')
 */
const useCurrentBreakpoint = (): string => {
  const [breakpoint, setBreakpoint] = useState(getCurrentBreakpoint);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return undefined;
    }

    const mqls = BREAKPOINTS.map(({ query }) => window.matchMedia(query));

    const update = () => {
      setBreakpoint(getCurrentBreakpoint());
    };

    mqls.forEach((mql) => mql.addEventListener('change', update));
    return () => {
      mqls.forEach((mql) => mql.removeEventListener('change', update));
    };
  }, []);

  return breakpoint;
};

export default useCurrentBreakpoint;
