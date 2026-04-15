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
import { ChakraProvider, createSystem, defaultBaseConfig } from '@chakra-ui/react';

import { BpkPropOverridesProvider } from './BpkPropOverridesContext';
import { createBpkConfig } from './theme';

import type { PropOverridesConfig } from './BpkPropOverridesContext';

export interface BpkProviderProps {
  children: ReactNode;
  propOverrides?: PropOverridesConfig;
}

/**
 * Creates a Chakra UI system with Backpack token mappings.
 *
 * Uses `defaultBaseConfig` (conditions + utilities only) instead of
 * `defaultConfig` to avoid bundling ~141KB of unused component recipes.
 * See: https://chakra-ui.com/guides/component-bundle-optimization
 */
const bpkSystem = createSystem(defaultBaseConfig, createBpkConfig());

type Direction = 'ltr' | 'rtl';

// Fallback locale mapping used when no explicit locale is available on the document.
// Maps DOM direction to minimal BCP 47 locales understood by Ark's isRTL() utility.
// 'ar-SA' is the minimal RTL locale — Ark only uses it to derive dir='rtl'.
const FALLBACK_LOCALE_BY_DIRECTION: Record<Direction, string> = {
  ltr: 'en-US',
  rtl: 'ar-SA',
};

// Known RTL language subtags (ISO 639 codes). Used as fallback when
// Intl.Locale.textInfo is unavailable (Node < 22, older browsers).
const RTL_LANGUAGE_SUBTAGS = new Set([
  'ar', 'he', 'fa', 'ur', 'yi', 'iw', 'ps', 'sd', 'ug', 'ku',
]);

// Returns the text direction implied by a BCP 47 locale string.
// Uses Intl.Locale.textInfo when available (Chrome 99+, Safari 15.4+, Firefox 126+, Node 22+);
// falls back to a known-RTL-subtag lookup.
const getLangDir = (locale: string): Direction => {
  try {
    const dir = (new Intl.Locale(locale) as any).textInfo?.direction;
    if (dir) return dir === 'rtl' ? 'rtl' : 'ltr';
  } catch {
    // Ignore invalid locale strings
  }
  return RTL_LANGUAGE_SUBTAGS.has(locale.split('-')[0].toLowerCase())
    ? 'rtl'
    : 'ltr';
};

// Resolves the locale to pass to Ark's LocaleProvider.
//
// Priority rules:
//   1. If html[dir] is explicitly set:
//      - Use html[lang] only when its direction is consistent with html[dir].
//      - Otherwise fall back to FALLBACK_LOCALE_BY_DIRECTION[dir].
//      This prevents an LTR html[lang] (e.g. 'en' from a page template) from
//      overriding an explicit html[dir]="rtl" signal (e.g. from a dev RTL toggle).
//   2. If html[dir] is not set: use html[lang] if present, else 'en-US'.
//
// SSR-safe: returns 'en-US' when document is unavailable.
const getArkLocale = (): string => {
  if (typeof document === 'undefined') return 'en-US';

  const explicitDir = document.documentElement.getAttribute('dir');
  const lang = document.documentElement.getAttribute('lang');

  if (explicitDir === 'rtl' || explicitDir === 'ltr') {
    if (lang && getLangDir(lang) === explicitDir) return lang;
    return FALLBACK_LOCALE_BY_DIRECTION[explicitDir];
  }

  return lang || 'en-US';
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
export const BpkProvider = ({ children, propOverrides }: BpkProviderProps) => {
  const locale = useArkLocale();

  const inner = (
    <ChakraProvider value={bpkSystem}>
      <LocaleProvider locale={locale}>{children}</LocaleProvider>
    </ChakraProvider>
  );

  if (!propOverrides) return inner;

  return (
    <BpkPropOverridesProvider value={propOverrides}>
      {inner}
    </BpkPropOverridesProvider>
  );
};
