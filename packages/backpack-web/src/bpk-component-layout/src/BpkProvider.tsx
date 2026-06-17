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

import type { ReactElement, ReactNode } from 'react';
import { createContext, useContext, useEffect, useRef, useState } from 'react';

import { LocaleProvider } from '@ark-ui/react';
import { ChakraProvider, createSystem, defaultBaseConfig } from '@chakra-ui/react';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

import { createBpkConfig } from './theme';

import type { EmotionCache } from '@emotion/cache';

export interface BpkProviderProps {
  children: ReactNode;
}

/**
 * Creates a Chakra UI system with Backpack token mappings.
 *
 * Uses `defaultBaseConfig` (conditions + utilities only) instead of
 * `defaultConfig` to avoid bundling ~141KB of unused component recipes.
 * See: https://chakra-ui.com/guides/component-bundle-optimization
 */
const bpkSystem = createSystem(defaultBaseConfig, createBpkConfig());

// Cypress/Percy workaround: `hydrateRoot()` strips SSR <style> nodes, then
// Emotion falls back to speedy mode (insertRule) which Percy can't serialise.
// Force speedy:false + recreate after mount in Cypress. Remove once Emotion /
// React Router 7 provide a cleaner hydration story. Ported from hotels-website#12025.
type CypressWindow = Window & {
  Cypress?: unknown;
  bpkDisableEmotionSpeedy?: boolean;
};

const isCypressEnv = (): boolean => {
  if (typeof window === 'undefined') return false;
  const win = window as CypressWindow;
  // `bpkDisableEmotionSpeedy` is an explicit escape hatch for non-Cypress
  // Percy runs; consumers set it in their test bootstrap.
  if (win.Cypress || win.bpkDisableEmotionSpeedy) return true;
  try {
    return Boolean((win.parent as CypressWindow | undefined)?.Cypress);
  } catch {
    return false; // cross-origin parent frame
  }
};

// `'css'` is shared with Chakra v3's internal key on purpose — keeps this
// boundary in front of Chakra's auto-created cache.
const createBpkEmotionCache = (speedy?: boolean): EmotionCache =>
  createCache(speedy === undefined ? { key: 'css' } : { key: 'css', speedy });

const BpkEmotionCacheContext = createContext<EmotionCache | null>(null);

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

// Returns true when `locale` is a BCP 47 string that Intl.Locale accepts.
// Ark's LocaleProvider calls `new Intl.Locale(locale)` without a try/catch,
// so any value we hand it must be validated here first or it throws
// "Incorrect locale information provided".
const isValidLocale = (locale: string): boolean => {
  try {
    // Reading a property on the result (rather than bare `new`) satisfies the no-new lint rule.
    return Boolean(new Intl.Locale(locale).baseName);
  } catch {
    return false;
  }
};

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
//      - Use html[lang] only when it is a valid locale AND its direction is
//        consistent with html[dir].
//      - Otherwise fall back to FALLBACK_LOCALE_BY_DIRECTION[dir].
//      This prevents an LTR html[lang] (e.g. 'en' from a page template) from
//      overriding an explicit html[dir]="rtl" signal (e.g. from a dev RTL toggle).
//   2. If html[dir] is not set: use html[lang] if it is a valid locale, else 'en-US'.
//
// Every value returned here is validated with isValidLocale() because Ark's
// LocaleProvider passes it straight to `new Intl.Locale()`, which throws on
// malformed input (e.g. '', '123', 'en_US'). An unvalidated value crashes the
// provider, and when the ErrorBoundary fallback also mounts BpkProvider the same
// bad value is re-read on every remount, producing an indefinite crash loop.
//
// SSR-safe: returns 'en-US' when document is unavailable.
const getArkLocale = (): string => {
  if (typeof document === 'undefined') return 'en-US';

  const explicitDir = document.documentElement.getAttribute('dir');
  const lang = document.documentElement.getAttribute('lang');

  if (explicitDir === 'rtl' || explicitDir === 'ltr') {
    if (lang && isValidLocale(lang) && getLangDir(lang) === explicitDir) {
      return lang;
    }
    return FALLBACK_LOCALE_BY_DIRECTION[explicitDir];
  }

  if (lang && isValidLocale(lang)) return lang;
  return 'en-US';
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
 * @returns {ReactElement} The provider wrapping its children with Chakra and Ark context.
 */
export const BpkProvider = ({ children }: BpkProviderProps): ReactElement => {
  const parentCache = useContext(BpkEmotionCacheContext);
  const isNested = parentCache !== null;

  const [isCypress] = useState(isCypressEnv);
  const [ownCache, setOwnCache] = useState(() =>
    isNested ? parentCache : createBpkEmotionCache(isCypress ? false : undefined),
  );
  const hasRecreated = useRef(false);
  const locale = useArkLocale();

  // Recreate the cache once after mount in Cypress to replace SSR <style>
  // nodes the hydrator stripped. `hasRecreated` guards StrictMode double-invoke.
  // Deps stable for provider lifetime → empty array is intentional.
  useEffect(() => {
    if (isNested || !isCypress) return;
    if (hasRecreated.current) return;
    hasRecreated.current = true;
    setOwnCache(createBpkEmotionCache(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const inner = (
    <ChakraProvider value={bpkSystem}>
      <LocaleProvider locale={locale}>{children}</LocaleProvider>
    </ChakraProvider>
  );

  if (isNested) {
    return inner;
  }

  return (
    <BpkEmotionCacheContext.Provider value={ownCache}>
      <CacheProvider value={ownCache}>
        {inner}
      </CacheProvider>
    </BpkEmotionCacheContext.Provider>
  );
};
