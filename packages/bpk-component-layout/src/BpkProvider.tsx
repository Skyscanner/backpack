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
import { useEffect, useState } from 'react';

import { LocaleProvider } from '@ark-ui/react';
import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';

import { createBpkConfig } from './theme';

export interface BpkProviderProps {
  children: ReactNode;
}

/**
 * Creates a Chakra UI system with Backpack token mappings
 * Chakra UI 3.0 uses `createSystem` with `defaultConfig` and custom config
 */
// Remove Chakra's global CSS to prevent style conflicts with Backpack components
const { globalCss: _chakraGlobalCss, ...defaultConfigWithoutGlobalCss } =
  defaultConfig;

const bpkSystem = createSystem(defaultConfigWithoutGlobalCss, createBpkConfig());

type Direction = 'ltr' | 'rtl';

// Maps DOM direction to a BCP 47 locale understood by Ark's isRTL() utility.
// 'ar-SA' is the minimal RTL locale — Ark only uses it to derive dir='rtl'.
const ARK_LOCALE: Record<Direction, string> = {
  ltr: 'en-US',
  rtl: 'ar-SA',
};

// SSR-safe: returns 'ltr' when document is unavailable (e.g. server-side rendering).
const getDocumentDir = (): Direction =>
  typeof document !== 'undefined' &&
  document.documentElement.getAttribute('dir') === 'rtl'
    ? 'rtl'
    : 'ltr';

// Reactive hook: subscribes to document.documentElement[dir] changes via MutationObserver.
// Re-renders BpkProvider when direction is toggled (e.g. Storybook RTL toolbar, locale switcher).
// SSR-safe: always initialises to 'ltr' so server and client agree on the first render,
//           avoiding hydration mismatches. The real direction is read inside useEffect,
//           which does not run on the server.
const useDocumentDir = (): Direction => {
  const [dir, setDir] = useState<Direction>('ltr');

  useEffect(() => {
    setDir(getDocumentDir());
    const observer = new MutationObserver(() => setDir(getDocumentDir()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['dir'],
    });
    return () => observer.disconnect();
  }, []);

  return dir;
};

/**
 * BpkProvider - Provides context for Backpack layout and Ark-based components.
 *
 * Wraps children with:
 * - Chakra UI system context (for layout components: BpkFlex, BpkGrid, etc.)
 * - Ark UI LocaleProvider (for Ark-based components: BpkCheckboxV2, BpkSegmentedControlV2, etc.)
 *
 * RTL support: reads document direction reactively via MutationObserver and passes
 * the appropriate locale to Ark's LocaleProvider. All Ark-based components in the
 * tree render correctly in RTL without requiring additional wrapping or prop changes.
 *
 * @param {BpkProviderProps} props - The provider props.
 * @returns {JSX.Element} The provider wrapping its children with Chakra and Ark context.
 */
export const BpkProvider = ({ children }: BpkProviderProps): JSX.Element => {
  const dir = useDocumentDir();

  return (
    <ChakraProvider value={bpkSystem}>
      <LocaleProvider locale={ARK_LOCALE[dir]}>{children}</LocaleProvider>
    </ChakraProvider>
  );
};
