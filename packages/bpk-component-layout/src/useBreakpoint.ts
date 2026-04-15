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

import { useSyncExternalStore } from 'react';

import type { StyleBreakpointKey } from './tokens';

// Ordered from smallest to largest (min-width values).
// Must stay in sync with the breakpointMap in theme.ts.
const BREAKPOINTS: Array<{ key: StyleBreakpointKey; query: string }> = [
  { key: 'sm', query: '(min-width: 20rem)' },      // 320px
  { key: 'md', query: '(min-width: 22.5rem)' },     // 360px
  { key: 'lg', query: '(min-width: 32.0625rem)' },  // 513px
  { key: 'xl', query: '(min-width: 48.0625rem)' },  // 769px
  { key: '2xl', query: '(min-width: 64.0625rem)' }, // 1025px
];

// Ordered key list for cascade resolution (base → largest).
const ORDERED_KEYS: StyleBreakpointKey[] = ['base', 'sm', 'md', 'lg', 'xl', '2xl'];

// Singleton state shared by all component instances.
let currentBreakpoint: StyleBreakpointKey = 'base';
const listeners = new Set<() => void>();
let initialised = false;

/**
 * Computes the currently active breakpoint from matchMedia queries.
 *
 * @returns {StyleBreakpointKey} The highest active breakpoint key.
 */
function computeBreakpoint(): StyleBreakpointKey {
  if (typeof window === 'undefined') return 'base';
  let active: StyleBreakpointKey = 'base';
  BREAKPOINTS.forEach((bp) => {
    if (window.matchMedia(bp.query).matches) {
      active = bp.key;
    }
  });
  return active;
}

function handleBreakpointChange() {
  const next = computeBreakpoint();
  if (next !== currentBreakpoint) {
    currentBreakpoint = next;
    listeners.forEach((fn) => fn());
  }
}

function ensureListeners() {
  if (initialised || typeof window === 'undefined') return;
  initialised = true;
  currentBreakpoint = computeBreakpoint();

  BREAKPOINTS.forEach((bp) => {
    const mql = window.matchMedia(bp.query);
    mql.addEventListener('change', handleBreakpointChange);
  });
}

function subscribe(callback: () => void) {
  ensureListeners();
  listeners.add(callback);
  return () => { listeners.delete(callback); };
}

function getSnapshot(): StyleBreakpointKey {
  ensureListeners();
  return currentBreakpoint;
}

function getServerSnapshot(): StyleBreakpointKey {
  return 'base';
}

/**
 * Returns the currently active breakpoint key.
 * Uses singleton matchMedia listeners — only one set of listeners exists
 * regardless of how many components use this hook.
 *
 * @returns {StyleBreakpointKey} The active breakpoint.
 */
export function useBreakpoint(): StyleBreakpointKey {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Resolves a responsive value to the concrete value for the given breakpoint.
 * Mimics CSS min-width cascade: walks from `base` up to `activeBreakpoint`,
 * returning the last defined value.
 *
 * @param {T | Partial<Record<string, T>>} value - A scalar or responsive object.
 * @param {StyleBreakpointKey} activeBreakpoint - The currently active breakpoint.
 * @returns {T | undefined} The resolved value, or undefined.
 *
 * @example
 * resolveResponsive({ base: '1rem', tablet: '2rem' }, 'xl') // '2rem'
 * resolveResponsive('static-value', 'xl') // 'static-value'
 */
export function resolveResponsive<T>(
  value: T | Partial<Record<string, T>>,
  activeBreakpoint: StyleBreakpointKey,
): T | undefined {
  if (value === null || value === undefined) return undefined;

  // Scalar — not a responsive object
  if (typeof value !== 'object' || Array.isArray(value)) {
    return value as T;
  }

  const obj = value as Record<string, T>;
  const activeIndex = ORDERED_KEYS.indexOf(activeBreakpoint);
  let resolved: T | undefined;

  for (let i = 0; i <= activeIndex; i += 1) {
    const key = ORDERED_KEYS[i];
    if (key in obj) {
      resolved = obj[key];
    }
  }

  return resolved;
}

/**
 * Resolves all responsive values in a style props object for the given breakpoint.
 *
 * @param {Record<string, any>} props - Style props that may contain responsive objects.
 * @param {StyleBreakpointKey} activeBreakpoint - The currently active breakpoint.
 * @returns {Record<string, any>} Props with all responsive objects resolved to scalars.
 */
export function resolveAllResponsive(
  props: Record<string, any>,
  activeBreakpoint: StyleBreakpointKey,
): Record<string, any> {
  const resolved: Record<string, any> = {};
  Object.keys(props).forEach((key) => {
    const val = resolveResponsive(props[key], activeBreakpoint);
    if (val !== undefined) {
      resolved[key] = val;
    }
  });
  return resolved;
}
