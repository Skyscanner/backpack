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

// Fallback locale mapping used when no explicit locale is available on the document.
// Maps DOM direction to minimal BCP 47 locales understood by Ark's isRTL() utility.
// 'ar-SA' is the minimal RTL locale — Ark only uses it to derive dir='rtl'.
const FALLBACK_LOCALE_BY_DIRECTION: Record<Direction, string> = {
  ltr: 'en-US',
  rtl: 'ar-SA',
};

// SSR-safe: returns 'ltr' when document is unavailable (e.g. server-side rendering).
const getDocumentDir = (): Direction =>
  typeof document !== 'undefined' &&
  document.documentElement.getAttribute('dir') === 'rtl'
    ? 'rtl'
    : 'ltr';

// Resolves the locale to pass to Ark's LocaleProvider.
// Priority: html[lang] > direction-based fallback.
// SSR-safe: returns 'en-US' when document is unavailable.
const getArkLocale = (): string => {
  if (typeof document === 'undefined') return 'en-US';
  const lang = document.documentElement.getAttribute('lang');
  return lang || FALLBACK_LOCALE_BY_DIRECTION[getDocumentDir()];
};

// Reactive hook: subscribes to document.documentElement[dir] and [lang] changes
// via MutationObserver. Re-renders BpkProvider when direction or locale is toggled
// (e.g. Storybook RTL toolbar, runtime locale switcher).
// SSR-safe: always initialises to 'en-US' so server and client agree on the first render,
//           avoiding hydration mismatches. The real locale is read inside useEffect,
//           which does not run on the server.
const useArkLocale = (): string => {
  const [locale, setLocale] = useState<string>('en-US');

  useEffect(() => {
    setLocale(getArkLocale());
    const observer = new MutationObserver(() => setLocale(getArkLocale()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['dir', 'lang'],
    });
    return () => observer.disconnect();
  }, []);

  return locale;
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
  const locale = useArkLocale();

  return (
    <ChakraProvider value={bpkSystem}>
      <LocaleProvider locale={locale}>{children}</LocaleProvider>
    </ChakraProvider>
  );
};
