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

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from 'react';

import { resolveLayoutConfig, updateCssVariables } from './cssVariables';

import type {
  LayoutConfig,
  LayoutPreset,
  BreakpointPreset,
  Brand,
} from './cssVariables';

const defaultLayoutPreset: LayoutPreset = 'default';
const defaultBreakpointPreset: BreakpointPreset = 'default';
const defaultBrand: Brand = 'core';

export interface BpkProviderProps {
  children: ReactNode;
  layoutPreset?: LayoutPreset;
  breakpointPreset?: BreakpointPreset;
  brand?: Brand;
}

interface BpkLayoutContextValue extends LayoutConfig {
  layoutPreset: LayoutPreset;
  breakpointPreset: BreakpointPreset;
  brand: Brand;
  isRoot: boolean;
}

const BpkLayoutContext = createContext<BpkLayoutContextValue | null>(null);

export function useBpkLayoutContext(): BpkLayoutContextValue | null {
  return useContext(BpkLayoutContext);
}

export const BpkProvider = ({
  brand = defaultBrand,
  breakpointPreset = defaultBreakpointPreset,
  children,
  layoutPreset = defaultLayoutPreset,
}: BpkProviderProps) => {
  const parentContext = useContext(BpkLayoutContext);
  const isRoot = parentContext === null;
  const config = useMemo(
    () => resolveLayoutConfig(layoutPreset, breakpointPreset, brand),
    [layoutPreset, breakpointPreset, brand],
  );

  useEffect(() => {
    if (isRoot) {
      updateCssVariables(config);
    }

    const hasOverrides = (
      layoutPreset !== defaultLayoutPreset ||
      breakpointPreset !== defaultBreakpointPreset ||
      brand !== defaultBrand
    );

    if (!isRoot && hasOverrides && process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn(
        'Nested BpkProvider overrides are ignored. ' +
        'Only the root provider controls layout configuration.',
      );
    }
  }, [breakpointPreset, brand, config, isRoot, layoutPreset]);

  const contextValue = useMemo<BpkLayoutContextValue>(() => ({
    ...config,
    brand,
    breakpointPreset,
    layoutPreset,
    isRoot: isRoot || parentContext?.isRoot === true,
  }), [
    brand,
    breakpointPreset,
    config,
    layoutPreset,
    isRoot,
    parentContext,
  ]);

  return (
    <BpkLayoutContext.Provider value={contextValue}>
      {children}
    </BpkLayoutContext.Provider>
  );
};
